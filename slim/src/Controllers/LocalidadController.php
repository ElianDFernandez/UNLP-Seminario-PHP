<?php

// LISTO EL POLLO

namespace App\Controllers;

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
            $localidad = Localidad::findOrNew($data);
            if ($localidad->esNuevo()) {
                if ($localidad->guardar()) {
                    $data = [
                        'status' => 'Success. Localidad creada.',
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
                    'status' => 'Error. Localidad existente.',
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
        if (!$comprobacion) {
            $id = $args['id'];
            $LocalidadDb = Localidad::find($id);
            if ($LocalidadDb) {
                $Localidad = new Localidad($data['nombre']);
                if ($Localidad->update($id, $Localidad)) {
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
                    'message' => 'Localidad no encontrada',
                ];
                $statusCode = 404;
            }
        } else {
            $data = $comprobacion;
            $statusCode = 400;
        }
        $response->getBody()->write(json_encode($data));

        return $response->withHeader('Content-Type', 'application/json')->withStatus($statusCode);
    }

    public function eliminar(Request $request, Response $response, $args)
    {
        $id = $args['id'];
        $localidadDB = Localidad::find($id);
        if ($localidadDB) {
            if (Localidad::delete($id)) {
                $data = [
                    'status' => 'Success',
                    'code' => 200,
                ];
                $statusCode = 200;
            } else {
                $data = [
                    'status' => 'Error al eliminar en la base de datos',
                    'code' => 500,
                ];
                $statusCode = 500;
            }
        } else {
            $data = [
                'code' => 404,
                'message' => 'Localidad no encontrado',
            ];
            $statusCode = 404;
        }
        $response->getBody()->write(json_encode($data));

        return $response->withHeader('Content-Type', 'application/json')->withStatus($statusCode);
    }

    public function listar(Request $request, Response $response, $args)
    {
        $localidadesDb = Localidad::select();
        if ($localidadesDb === false) {
            $data = [
                'code' => 500,
                'message' => 'Error en base de datos',
            ];
            $statusCode = 500;
        } else {
            $data = [
                'Inquilinos' => $localidadesDb,
            ];
            $statusCode = 200;
        }
        $response->getBody()->write(json_encode($data));

        return $response->withHeader('Content-Type', 'application/json')->withStatus($statusCode);
    }
}
