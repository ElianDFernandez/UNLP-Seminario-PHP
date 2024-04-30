<?php

// LISTO EL POLLO

namespace App\Controllers;

use Exception;
use App\Models\Localidad;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class LocalidadController
{
    public function comprobarCampos($data)
    {
        $respuesta = null;
        if (!isset($data['nombre']) || empty($data['nombre'])) {
            return [
                $respuesta = [
                    'code' => 400,
                    'message' => 'Error. El campo nombre es obligatorio.',
                ]
            ];
        } else {
            if (strlen($data['nombre']) > 50) {
                return [
                    $respuesta = [
                        'code' => 400,
                        'message' => 'Error. El campo nombre no puede tener más de 50 caracteres.',
                    ]
                ];
            }
        }
        return $respuesta;
    }

    public function crear(Request $request, Response $response, $args)
    {
        $contenido = $request->getBody()->getContents();
        $data = json_decode($contenido, true);
        $comprobacion = self::comprobarCampos($data);
        if ($comprobacion) {
            $data = $comprobacion;
            $statusCode = 400;
        } else {
            try {
                $localidad = Localidad::findOrNew($data);
                if ($localidad->esNuevo()) {
                    $localidad->guardar();
                    $data = [
                        'status' => 'Success. Localidad creada.',
                        'code' => 200,
                    ];
                    $statusCode = 200;
                } else {
                    $data = [
                        'status' => 'Error. Localidad existente.',
                        'code' => 409,
                    ];
                    $statusCode = 409;
                }
            } catch (Exception $e) {
                $data = [
                    'code' => 500,
                    'message' => 'Error en la base de datos. ' . $e->getMessage(),
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
                if (Localidad::find($id)) { // Buscar por id para asegurar que existe, y verificar que no tenga mismos datos que otra localidad con findornew
                    $localidadDb = Localidad::findOrNew($data); // Si encontro una en DB vuelve con id, si no vuelve con id null, es decir es nuevo
                    if (!$localidadDb->esNuevo()) {
                        $data = [
                            'code' => 409,
                            'message' => 'Error. Localidad existente.',
                        ];
                        $statusCode = 409;
                    } else {
                        $localidadDb->update($id, $data);
                        $data = [
                            'status' => 'Success. Localidad Actualizada.',
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
            $localidadDB = Localidad::find($id);
            if ($localidadDB) {
                $propiedades = Localidad::propiedades($id); // Antes de eliminar una localidad debo asegurarme que no esta vincula con ninguna propiedad
                if (count($propiedades) > 0) {
                    $data = [
                        'code' => 409,
                        'message' => 'Error. Localidad en uso.',
                    ];
                    $statusCode = 409;
                } else {
                    Localidad::delete($id);
                    $data = [
                        'status' => 'Success. Localidad eliminada.',
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

        $response->getBody()->write(json_encode($data));

        return $response->withHeader('Content-Type', 'application/json')->withStatus($statusCode);
    }

    public function listar(Request $request, Response $response, $args)
    {
        try {
            $localidadesDb = Localidad::select();
            $data = [
                'Inquilinos' => $localidadesDb,
            ];
            $statusCode = 200;
        } catch (Exception $e) {
            $data = [
                'code' => 500,
                'message' => 'Error en base de datos: ' . $e->getMessage(),
            ];
            $statusCode = 500;
        }
        $response->getBody()->write(json_encode($data));

        return $response->withHeader('Content-Type', 'application/json')->withStatus($statusCode);
    }
}
