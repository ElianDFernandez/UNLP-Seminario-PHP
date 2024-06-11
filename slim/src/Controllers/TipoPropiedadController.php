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
                        'message' => 'Success. Tipo de propiedad creada.',
                        'code' => 200,
                    ];
                    $statusCode = 200;
                } else {
                    $data = [
                        'message' => 'Error. Tipo de propiedad ya existente.',
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
                if (TipoPropiedad::find($id)) {
                    $tipoPropDb = TipoPropiedad::findOrNew($data);
                    if (!$tipoPropDb->esNuevo()) {
                        $data = [
                            'code' => 409,
                            'message' => 'Error. Tipo Propiedad existente.',
                        ];
                        $statusCode = 409;
                    } else {
                        $tipoPropDb->update($id, $data);
                        $data = [
                            'message' => 'Success. Tipo Propiedad Actualizada.',
                            'code' => 200,
                        ];
                        $statusCode = 200;
                    }
                } else {
                    $data = [
                        'code' => 404,
                        'message' => 'Error. Tipo Propiedad no encontrada.',
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
            $tipoPropDb = TipoPropiedad::find($id);
            if ($tipoPropDb) {
                $propiedades = TipoPropiedad::propiedades($id); // Antes de eliminar un TipoPropiedad debo asegurarme que no esta vincula con ninguna propiedad
                if ($propiedades === null) {
                    TipoPropiedad::delete($id);
                    $data = [
                        'status' => 'Success',
                        'code' => 200,
                    ];
                    $statusCode = 200;
                } else {
                    $data = [
                        'code' => 409,
                        'message' => 'Error. este tipo de propiedad esta asignada a una o mas propiedades',
                    ];
                    $statusCode = 409;
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
            $data = $tipoPropDb;
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
            $tipoPropDb = TipoPropiedad::find($id);
            if ($tipoPropDb) {
                $data = $tipoPropDb;
                $statusCode = 200;
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
}
