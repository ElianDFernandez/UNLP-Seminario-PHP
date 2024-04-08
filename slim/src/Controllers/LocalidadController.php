<?php

namespace App\Controllers;

use App\Models\Localidad;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class LocalidadController
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
            $localidad = Localidad::findOrNew($data['nombre']);
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
                    'code' => 500,
                ];
                $statusCode = 500;
            }
        }
        $response->getBody()->write(json_encode($data));

        return $response->withHeader('Content-Type', 'application/json')->withStatus($statusCode);
    }

    public function editar(Request $request, Response $response, $args)
    {
        $id = $args['id'];
        $LocalidadDb = Localidad::find($id);
        if ($LocalidadDb) {
            $Localidad = new Localidad();
            $contenido = $request->getBody()->getContents();
            $data = json_decode($contenido, true);
            $Localidad->fill($data);
            $Localidad->update($id, $Localidad);
            $data = [
                'status' => 'Success',
                'code' => 200,
            ];
        } else {
            $data = [
                'code' => 404,
                'message' => 'Localidad no encontrada',
            ];
        }
        $response->getBody()->write(json_encode($data));

        return $response;
    }

    public function eliminar(Request $request, Response $response, $args)
    {
        $id = $args['id'];
        $LocalidadDb = Localidad::find($id);
        if ($LocalidadDb) {
            Localidad::delete($id);
            $data = [
                'status' => 'Success',
                'code' => 200,
            ];
        }
        $response->getBody()->write(json_encode($data));

        return $response;
    }

    public function listar(Request $request, Response $response, $args)
    {
        $localidad = Localidad::select();
        $data = [
            'Localidad' => $localidad,
        ];
        $response->getBody()->write(json_encode($data));

        return $response->withHeader('Content-Type', 'application/json');
    }
}
