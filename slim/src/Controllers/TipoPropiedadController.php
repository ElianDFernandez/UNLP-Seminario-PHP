<?php

namespace App\Controllers;

use App\Models\Tipo_propiedad;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class  TipoPropiedadController
{
    public function crear(Request $request, Response $response, $args)
    {
        $contenido = $request->getBody()->getContents();
        $data = json_decode($contenido, true);
        $tipo = new tipo();
        $tipo->fill($data);
        if ($tipo->save($tipo)) {
            $data = [
                'status' => 'Success',
                'code' => 200,
                'message' => 'tipo creado correctamente',
            ];
        } else {
            $data = [
                'code' => 400,
                'message' => 'Error al crear el tipo'
            ];
            $statusCode = 400;
        }
        $response->getBody()->write(json_encode($data));

        return $response->withHeader('Content-Type', 'application/json')->withStatus($statusCode);
    }

    public function editar(Request $request, Response $response, $args)
    {
        $id = $args['id'];
        $tipoDB = tipo::find($id);
        if ($tipoDB) {
            $tipo = new tipo();
            $contenido = $request->getBody()->getContents();
            $data = json_decode($contenido, true);
            $tipo->fill($data);
            $tipo->update($id, $tipo);
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
        $tipoDB = tipo::find($id);
        if ($tipoDB) {
            tipo::delete($id);
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
        $tipo = tipo::select();
        $data = [
            'tipo' => $tipo,
        ];
        $response->getBody()->write(json_encode($data));

        return $response->withHeader('Content-Type', 'application/json');
    }
}
