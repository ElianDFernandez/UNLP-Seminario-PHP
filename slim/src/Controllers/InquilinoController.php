<?php

namespace App\Controllers;

use Exception;
use App\Models\Inquilino;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class InquilinoController
{
    public static function comprobarCampos($data)
    {
        $respuesta = array();
        if (!isset($data['nombre']) || empty($data['nombre'])) {
            $error = 'Error. El campo nombre es obligatorio.';
            $respuesta[] = $error;
        } else {
            if (strlen($data['nombre']) > 25) {
                $error = 'Error. El campo nombre no puede tener más de 25 caracteres.';
                $respuesta[] = $error;
            }
        }
        if (!isset($data['apellido']) || empty($data['apellido'])) {
            $error = 'Error. El campo apellido es obligatorio.';
            $respuesta[] = $error;;
        } else {
            if (strlen($data['apellido']) > 15) {
                $error = 'Error. El campo apellido no puede tener más de 15 caracteres.';
                $respuesta[] = $error;
            }
        }
        if (!isset($data['documento']) || empty($data['documento'])) {
            $error = 'Error. El campo documento es obligatorio.';
            $respuesta[] = $error;
        }
        if (!isset($data['email']) || empty($data['email'])) {
            $error = 'Error. El campo email es obligatorio.';
            $respuesta[] = $error;
        } else {
            if (strlen($data['email']) > 20) {
                $error = 'Error. El campo email no puede tener más de 20 caracteres.';
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
                $inquilino = Inquilino::findOrNew($data);
                if ($inquilino->esNuevo()) {
                    $inquilino->guardar();
                    $data = [
                        'message' => 'Success. Inquilino creado.',
                        'code' => 200,
                    ];
                    $statusCode = 200;
                } else {
                    $data = [
                        'message' => 'Error. DNI del Inquilino ya existente.',
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
                if (Inquilino::find($id)) {
                    $inquilinoDb = Inquilino::findOrNew($data);
                    if (!$inquilinoDb->esNuevo()) {
                        $data = [
                            'code' => 409,
                            'message' => 'Error. DNI del Inquilino ya existente.',
                        ];
                        $statusCode = 409;
                    } else {
                        $inquilinoDb->update($id, $data);
                        $data = [
                            'message' => 'Success. Inquilino Actualizada.',
                            'code' => 200,
                        ];
                        $statusCode = 200;
                    }
                } else {
                    $data = [
                        'code' => 404,
                        'message' => 'Error. Inquilino no encontrada.',
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
            $inquilinoDb = Inquilino::find($id);
            if ($inquilinoDb) {
                $reservas = Inquilino::reservas($id);
                if ($reservas === null) {
                    Inquilino::delete($id);
                    $data = [
                        'status' => 'Success',
                        'code' => 200,
                    ];
                    $statusCode = 200;
                } else {
                    $data = [
                        'code' => 409,
                        'message' => 'Error. este Inquilino tiene una reserva asociada.',
                    ];
                    $statusCode = 409;
                }
            } else {
                $data = [
                    'code' => 404,
                    'message' => 'Inquilino no encontrado',
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
            $inquilinosDb = Inquilino::select();
            $data = $inquilinosDb;
            $statusCode = 200;
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

    public function buscar(Request $request, Response $response, $args)
    {
        $id = $args['id'];
        try {
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
