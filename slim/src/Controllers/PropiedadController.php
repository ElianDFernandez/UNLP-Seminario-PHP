<?php

namespace App\Controllers;

use App\Models\Localidad;
use App\Models\TipoPropiedad;
use App\Models\Propiedad;
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
            $error ='Error. El campo localidad es obligatorio.';
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
            $propiedad = Propiedad::findOrNew($data);
            if ($propiedad->esNuevo()) {
                if ($propiedad->guardar()) {
                    $data = [
                        'status' => 'Success. Propiedad creada.',
                        'code' => 200,
                    ];
                    $statusCode = 200;
                } else {
                    $data = [
                        'status' => 'Error. Fallo al guardar.',
                        'code' => 500,
                    ];
                    $statusCode = 500;
                }
            } else {
                $data = [
                    'status' => 'Error. Propiedad existente.',
                    'code' => 409,
                ];
                $statusCode = 409;
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
            $data = [
                'code' => 409,
                'message' => $comprobacion,
            ];
            $statusCode = 409;
        } else {
            $id = $args['id'];
            $propiedadDb = Propiedad::find($id);
            if ($propiedadDb) {
                $propiedad = new Propiedad($data['domicilio'], $data['localidad_id'],$data['cantidad_habitaciones'],$data['cantidad_banios'],$data['cochera'],$data['cantidad_huespedes'],$data['fecha_inicio_disponibilidad'],$data['cantidad_dias'],$data['disponible'],$data['valor_noche'],$data['tipo_propiedad_id'],$data['imagen'],$data['tipo_imagen']);
                if ($propiedad->update($id, $propiedad)) {
                    $data = [
                        'status' => 'Success',
                        'code' => 200,
                    ];
                    $statusCode = 200;
                } else {
                    $data = [
                        'status' => 'Error al actualizar en la base de datos',
                        'code' => 500,
                    ];
                    $statusCode = 500;
                }
            } else {
                $data = [
                    'code' => 404,
                    'message' => 'Propiedad no encontrada',
                ];
                $statusCode = 404;
            } 
        }
        $response->getBody()->write(json_encode($data));

        return $response->withHeader('Content-Type', 'application/json')->withStatus($statusCode);
    }

    public function eliminar(Request $request, Response $response, $args)
    {
        $id = $args['id'];
        $propiedadDb = Propiedad::find($id);
        if ($propiedadDb) {
            try {
                Propiedad::delete($id);
                $data = [
                    'status' => 'Success',
                    'code' => 200,
                ];
                $statusCode = 200;
            } catch (\Exception $e) {
                $data = [
                    'status' => 'Error al eliminar en la base de datos',
                    'code' => 500,
                ];
                $statusCode = 500;
            }
        } else {
            $data = [
                'code' => 404,
                'message' => 'Propiedad no encontrada',
            ];
            $statusCode = 404;
        }
        $response->getBody()->write(json_encode($data));

        return $response->withHeader('Content-Type', 'application/json')->withStatus($statusCode);
    }

    public function listar(Request $request, Response $response, $args)
    {
        $contenido = $request->getBody()->getContents();
        $data = json_decode($contenido, true);
        $where = '';
        $filtros = [];
        if ($data['localidad_id'] !== null) {
            $filtros[] = 'localidad_id = ' . $data['localidad_id'];
        }
        if ($data['disponible'] !== null) {
            $filtros[] = 'disponible = ' . $data['disponible'];
        }
        if ($data['fecha_inicio_disponibilidad'] !== null) {
            $filtros[] = "fecha_inicio_disponibilidad = '" . $data['fecha_inicio_disponibilidad'] . "'";
        }
        if ($data['cantidad_huespedes'] !== null) {
            $filtros[] = 'cantidad_huespedes = ' . $data['cantidad_huespedes'];
        }
        
        if (!empty($filtros)) {
            $where = ' WHERE ' . implode(' AND ', $filtros);
        }
        $propiedadesDb = Propiedad::select($where);
        if ($propiedadesDb === false) {
            $data = [
                'code' => 500,
                'message' => 'Error en base de datos',
            ];
            $statusCode = 500;
        } else {
            $data = [
                'Propiedades' => $propiedadesDb,
            ];
            $statusCode = 200;
        }
        $statusCode = 200;
        $response->getBody()->write(json_encode($data));

        return $response->withHeader('Content-Type', 'application/json')->withStatus($statusCode);
    }

    public function buscar(Request $request, Response $response, $args)
    {
        $id = $args['id'];
        $propiedadDb = Propiedad::find($id);
        if ($propiedadDb) {
            $data = [
                'Propiedad' => $propiedadDb,
            ];
            $statusCode = 200;
        } else {
            $data = [
                'code' => 404,
                'message' => 'Propiedad no encontrado',
            ];
            $statusCode = 404;
        }
        $response->getBody()->write(json_encode($data));
        return $response->withHeader('Content-Type', 'application/json')->withStatus($statusCode);
    }
}
