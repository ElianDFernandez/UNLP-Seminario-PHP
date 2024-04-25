<?php

//LISTO EL POLLO

namespace App\Controllers;

use App\Models\TipoPropiedad;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class  TipoPropiedadController
{
    public function crear(Request $request, Response $response, $args)
    {
        $contenido = $request->getBody()->getContents();
        $data = json_decode($contenido, true);
        if (!isset($data['nombre']) || empty($data['nombre'])) {
            $data = [
                'code' => 400,
                'message' => 'Error. El campo nombre es obligatorio.',
            ];
            $statusCode = 400;
        } else {
            $tipoPropiedad = TipoPropiedad::findOrNew($data);
            if ($tipoPropiedad->esNuevo()) {
                if ($tipoPropiedad->guardar()) {
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
        if (isset($data['nombre']) && !empty($data['nombre'])) {
            $id = $args['id'];
            $tipoPropDb = TipoPropiedad::find($id);
            if ($tipoPropDb) {
                $tipoProp = new TipoPropiedad($data['nombre']);
                if ($tipoProp->update($id, $tipoProp)) {
                    $data = [
                        'status' => 'Success',
                        'code' => 200,
                    ];
                    $statusCode = 200;
                } else {
                    $data = [
                        'code' => 500,
                        'message' => 'Error al actualizar en la base de datos',
                    ];
                    $statusCode = 500;
                }
            } else {
                $data = [
                    'code' => 404,
                    'message' => 'Tipo de Propiedad no encontrado',
                ];
                $statusCode = 404;
            }
        } else {
            $data = [
                'code' => 400,
                'message' => 'Error. El campo nombre es obligatorio.',
            ];
            $statusCode = 400;
        }
        $response->getBody()->write(json_encode($data));

        return $response->withHeader('Content-Type', 'application/json')->withStatus($statusCode);
    }

    public function eliminar(Request $request, Response $response, $args)
    {
        $id = $args['id'];
        $tipoPropDb = TipoPropiedad::find($id);
        if ($tipoPropDb) {
            if (TipoPropiedad::delete($id)){
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
                'message' => 'Tipo de Propiedad no encontrado',
            ];
            $statusCode = 404;
        }
        $response->getBody()->write(json_encode($data));

        return $response->withHeader('Content-Type', 'application/json')->withStatus($statusCode);
    }

    public function listar(Request $request, Response $response, $args)
    {
        $tipoPropDb = TipoPropiedad::select();
        if ($tipoPropDb === false) {
            $data = [
                'code' => 500,
                'message' => 'Error en base de datos',
            ];
            $statusCode = 500;
        } else {
            $data = [
                'Tipo de propiedades' => $tipoPropDb,
            ];
            $statusCode = 200;
        }
        $response->getBody()->write(json_encode($data));

        return $response->withHeader('Content-Type', 'application/json')->withStatus($statusCode);
    }
}
