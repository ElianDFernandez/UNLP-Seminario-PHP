<?php

namespace App\Controllers;

use App\Models\Localidad;
use App\Models\TipoPropiedad;
use App\Models\Propiedad;
use Exception;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class PropiedadController
{
    public function comprobarCampos($data)
    {
        $respuesta = array();
        if (!isset($data['domicilio']) || empty($data['domicilio'])) {
            $error = 'Error. El campo domicilio es obligatorio.';
            $respuesta[] = $error;
        }
        if (!isset($data['localidad_id']) || empty($data['localidad_id'])) {
            $error = 'Error. El campo localidad es obligatorio.';
            $respuesta[] = $error;
        }
        if (isset($data['localidad_id']) && !empty($data['localidad_id'])) {
            $localidad = Localidad::find($data['localidad_id']);
            if ($localidad == null) {
                $error = 'Error. La localidad no existe.';
                $respuesta[] = $error;
            }
        }
        if (!isset($data['cantidad_huespedes']) || empty($data['cantidad_huespedes'])) {
            $error = 'Error. El campo cantidad de huespedes es obligatorio.';
            $respuesta[] = $error;
        }
        if (!isset($data['fecha_inicio_disponibilidad']) || empty($data['fecha_inicio_disponibilidad'])) {
            $error = 'Error. Fecha de inicio de disponibilidad es obligatorio.';
            $respuesta[] = $error;
        }
        if (!isset($data['cantidad_dias']) || empty($data['cantidad_dias'])) {
            $error = 'Error. Cantidad dias es obligatorio.';
            $respuesta[] = $error;
        }
        if (!isset($data['disponible']) || empty($data['disponible'])) {
            $error = 'Error. El campo disponible es obligatorio.';
            $respuesta[] = $error;
        }
        if (!isset($data['valor_noche']) || empty($data['valor_noche'])) {
            $error = 'Error. El campo valor de la noche es obligatorio.';
            $respuesta[] = $error;
        }
        if (!isset($data['tipo_propiedad_id']) || empty($data['tipo_propiedad_id'])) {
            $error = 'Error. El tipo de propiedad es obligatorio.';
            $respuesta[] = $error;
        }
        if (isset($data['tipo_propiedad_id']) && !empty($data['tipo_propiedad_id'])) {
            $tipoPropiedad = TipoPropiedad::find($data['tipo_propiedad_id']);
            if ($tipoPropiedad == null) {
                $error = 'Error. El tipo de propiedad no existe.';
                $respuesta[] = $error;
            }
        }
        if (count($respuesta) > 0) {
            return $respuesta;
        } else {
            return false;
        }
    }

    public function crear(Request $request, Response $response, $args)
    {
        $contenido = $request->getBody()->getContents();
        $data = json_decode($contenido, true);
        $comprobacion = self::comprobarCampos($data);
        if ($comprobacion) {
            $data = [
                'code' => 400,
                'message' => $comprobacion,
            ];
            $statusCode = 400;
        } else {
            try {
                $propiedad = Propiedad::findOrNew($data);
                if ($propiedad->esNuevo()) {
                    $propiedad->guardar();
                    $data = [
                        'message' => 'Success. Propiedad creada.',
                        'code' => 200,
                    ];
                    $statusCode = 200;
                } else {
                    $data = [
                        'message' => 'Error. Propiedad ya existente. Misma localidad y domicilio.',
                        'code' => 409,
                    ];
                    $statusCode = 409;
                }
            } catch (Exception $e) {
                $data = [
                    'code' => 500,
                    'message' => 'Error en la base de datos: ' . $e->getMessage(),
                ];
                $statusCode = 500;
            }
        }
        $response->getBody()->write(json_encode($data));

        return $response->withHeader('Content-Type', 'application/json')->withStatus($statusCode);
    }

    public function editar(Request $request, Response $response, $args)
    {
        $contenido = $request->getBody()->getContents();
        $data = json_decode($contenido, true);
        $comprobacion = self::comprobarCampos($data);
        if ($comprobacion) {
            $data = $comprobacion;
            $statusCode = 400;
        } else {
            try {
                $id = $args['id'];
                if (Propiedad::find($id)) { // Buscar por id para asegurar que existe, y verificar que no tenga mismos datos que otra localidad con findornew
                    $propiedadDb = Propiedad::findOrNew($data); // Si encontro una en DB vuelve con id, si no vuelve con id null, es decir es nuevo
                    if (!$propiedadDb->esNuevo()) {
                        $data = [
                            'code' => 409,
                            'message' => 'Error. Propiedad ya existente. Misma localidad y domicilio.',
                        ];
                        $statusCode = 409;
                    } else {
                        $propiedadDb->update($id, $data);
                        $data = [
                            'message' => 'Success. Localidad Actualizada.',
                            'code' => 200,
                        ];
                        $statusCode = 200;
                    }
                } else {
                    $data = [
                        'code' => 404,
                        'message' => 'Error. Localidad no encontrada.',
                    ];
                    $statusCode = 404;
                }
            } catch (Exception $e) {
                $data = [
                    'code' => 500,
                    'message' => 'Error en la base de datos: ' . $e->getMessage(),
                ];
                $statusCode = 500;
            }
        }
        $response->getBody()->write(json_encode($data));
        return $response->withHeader('Content-Type', 'application/json')->withStatus($statusCode);
    }

    public function eliminar(Request $request, Response $response, $args)
    {
        $id = $args['id'];
        try {
            $propiedadDb = Propiedad::find($id);
            if ($propiedadDb) {
                $propiedades = Propiedad::reservas($id); // Antes de eliminar una localidad debo asegurarme que no esta vincula con ninguna propiedad
                if ($propiedades === null) {
                    Propiedad::delete($id);
                    $data = [
                        'status' => 'Success. Propiedad eliminada.',
                        'code' => 200,
                    ];
                    $statusCode = 200;
                } else {
                    $data = [
                        'code' => 409,
                        'message' => 'Error. Propiedad con reservas.',
                    ];
                    $statusCode = 409;
                }
            } else {
                $data = [
                    'code' => 404,
                    'message' => 'Error. Propiedad no encontrada.',
                ];
                $statusCode = 404;
            }
        } catch (Exception $e) {
            $data = [
                'code' => 500,
                'message' => 'Error en la base de datos: ' . $e->getMessage(),
            ];
            $statusCode = 500;
        }

        $response->getBody()->write(json_encode($data));
        return $response->withHeader('Content-Type', 'application/json')->withStatus($statusCode);
    }

    public function listar(Request $request, Response $response, $args)
    {
        $localidad_id = $args['localidad_id'] ?? null;
        $disponible = $args['disponible'] ?? null;
        $fecha_inicio_disponibilidad = $args['fecha_inicio_disponibilidad'] ?? null;
        $cantidad_huespedes = $args['cantidad_huespedes'] ?? null;

        $where = '';
        $filtros = [];
        if ($localidad_id !== "null") {
            $filtros[] = 'localidad_id = ' . $localidad_id;
        }
        if ($disponible !== "null") {
            $filtros[] = 'disponible = ' . $disponible;
        }
        if ($fecha_inicio_disponibilidad !== "null") {
            $filtros[] = "fecha_inicio_disponibilidad = '" . $fecha_inicio_disponibilidad . "'";
        }
        if ($cantidad_huespedes !== "null") {
            $filtros[] = 'cantidad_huespedes = ' . $cantidad_huespedes;
        }

        if (!empty($filtros)) {
            $where = ' WHERE ' . implode(' AND ', $filtros);
        }
        try {
            $propiedadesDb = Propiedad::select($where);
            $data = [
                'Propiedades' => $propiedadesDb,
            ];
            $statusCode = 200;
        } catch (Exception $e) {
            $data = [
                'code' => 500,
                'message' => 'Error en la base de datos: ' . $e->getMessage(),
            ];
        }
        $response->getBody()->write(json_encode($data));
        return $response->withHeader('Content-Type', 'application/json')->withStatus($statusCode);
    }

    public function buscar(Request $request, Response $response, $args)
    {
        $id = $args['id'];
        try {
            $propiedadDb = Propiedad::find($id);
            if ($propiedadDb) {
                $data = [
                    'Propiedad' => $propiedadDb,
                ];
                $statusCode = 200;
            } else {
                $data = [
                    'code' => 404,
                    'message' => 'Propiedad no encontrada',
                ];
                $statusCode = 404;
            }
        } catch (Exception $e) {
            $data = [
                'code' => 500,
                'message' => 'Error en la base de datos: ' . $e->getMessage(),
            ];
            $statusCode = 500;
        }
        $response->getBody()->write(json_encode($data));
        return $response->withHeader('Content-Type', 'application/json')->withStatus($statusCode);
    }
}
