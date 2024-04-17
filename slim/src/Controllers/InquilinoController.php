<?php

namespace App\Controllers;

use App\Models\Inquilino;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class InquilinoController
{
    public static function comprobarCampos($data)
    {
        // uso de coleccion
        $respuesta = array();
        if (!isset($data['nombre']) || empty($data['nombre'])) {
            $error = 'Error. El campo nombre es obligatorio.';
            $respuesta[] = $error;
        }
        if (!isset($data['apellido']) || empty($data['apellido'])) {
            $error ='Error. El campo apellido es obligatorio.';
            $respuesta[] = $error;;
        }
        if (!isset($data['documento']) || empty($data['documento'])) {
            $error = 'Error. El campo documento es obligatorio.';
            $respuesta[] = $error;
        }
        if (!isset($data['email']) || empty($data['email'])) {
            $error = 'Error. El campo email es obligatorio.';
            $respuesta[] = $error;
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
            $inquilino = Inquilino::findOrNew($data);
            if ($inquilino->esNuevo()) {
                if ($inquilino->guardar()) {
                    $data = [
                        'status' => 'Success. Inquilino creado.',
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
                    'status' => 'Error. Inquilino existente.',
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
            $inquilinoDb = Inquilino::find($id);
            if ($inquilinoDb) {
                $inquilino = new Inquilino($data['nombre'], $data['apellido'], $data['documento'], $data['email'], $data['activo']);
                if ($inquilino->update($id, $inquilino)) {
                    $data = [
                        'status' => 'Success. Inquilino actualizado',
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
                    'message' => 'Iniquilino no encontrado',
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
        $inquilinoDb = Inquilino::find($id);
        if ($inquilinoDb) {
            try {
                Inquilino::delete($id);
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
                'message' => 'Inquilino no encontrado',
            ];
            $statusCode = 404;
        }
        $response->getBody()->write(json_encode($data));

        return $response->withHeader('Content-Type', 'application/json')->withStatus($statusCode);
    }

    public function listar(Request $request, Response $response, $args)
    {
        $inquilinosDb = Inquilino::select();
        if ($inquilinosDb === false) {
            $data = [
                'code' => 500,
                'message' => 'Error en base de datos',
            ];
            $statusCode = 500;
        } else {
            $data = [
                'Inquilinos' => $inquilinosDb,
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
        $inquilinoDb = Inquilino::find($id);
        if ($inquilinoDb) {
            $data = [
                'Inquilino' => $inquilinoDb,
            ];
            $statusCode = 200;
        } else {
            $data = [
                'code' => 404,
                'message' => 'Inquilino no encontrado',
            ];
            $statusCode = 404;
        }
        $response->getBody()->write(json_encode($data));
        return $response->withHeader('Content-Type', 'application/json')->withStatus($statusCode);
    }
}
