<?php

//LISTO EL POLLO

namespace App\Controllers;

use Exception;
use App\Models\TipoPropiedad;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class  TipoPropiedadController
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
                $tipoPropiedad = TipoPropiedad::findOrNew($data);
                if ($tipoPropiedad->esNuevo()) {
                    $tipoPropiedad->guardar();
                    $data = [
                        'status' => 'Success. Tipo de propiedad creada.',
                        'code' => 200,
                    ];
                    $statusCode = 200;
                } else {
                    $data = [
                        'status' => 'Error. Tipo de propiedad ya existente.',
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
        try {
            if (!$comprobacion) {
                $id = $args['id'];
                $tipoPropDb = TipoPropiedad::find($id);
                if ($tipoPropDb) {
                    $tipoProp = new TipoPropiedad($data['nombre']);
                    $tipoProp->update($id, $tipoProp);
                    $data = [
                        'status' => 'Success',
                        'code' => 200,
                    ];
                    $statusCode = 200;
                } else {
                    $data = [
                        'code' => 404,
                        'message' => 'Tipo de Propiedad no encontrado',
                    ];
                    $statusCode = 404;
                }
            } else {
                $data = $comprobacion;
                $statusCode = 400;
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

    public function eliminar(Request $request, Response $response, $args)
    {
        $id = $args['id'];
        $tipoPropDb = TipoPropiedad::find($id);
        try {
            if ($tipoPropDb) {
                $propiedades = TipoPropiedad::propiedades($id);
                if (count($propiedades) > 0) {
                    $data = [
                        'code' => 409,
                        'message' => 'Error. este tipo de propiedad esta asignada a una o mas propiedades',
                    ];
                    $statusCode = 409;
                } else {
                    TipoPropiedad::delete($id);
                    $data = [
                        'status' => 'Success',
                        'code' => 200,
                    ];
                    $statusCode = 200;
                }
            } else {
                $data = [
                    'code' => 404,
                    'message' => 'Tipo de Propiedad no encontrado',
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
            $tipoPropDb = TipoPropiedad::select();
            $data = [
                'Tipo de propiedades' => $tipoPropDb,
                'code' => 200,
            ];
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
}
