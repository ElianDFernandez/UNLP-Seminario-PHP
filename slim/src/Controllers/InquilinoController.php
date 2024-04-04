<?php

namespace App\Controllers;

use App\Models\Inquilino;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class InquilinoController
{
    public function index(Request $request, Response $response, $args)
    {
        $inquilinos = Inquilino::select();
        $data = [
            'inquilino' => $inquilinos,
        ];
        $response->getBody()->write(json_encode($data));

        return $response->withHeader('Content-Type', 'application/json');
    }

    function listar(Request $request, Response $response, $args)
    {
        $id = $args['id'];
        $inquilino = Inquilino::find($id);
        $data = [
            'id' => $id,
            'inquilino' => $inquilino,
        ];
        $response->getBody()->write(json_encode($data));

        return $response->withHeader('Content-Type', 'application/json');
    }

    function crear(Request $request, Response $response, $args)
    {
        $contenido = $request->getBody()->getContents();
        $data = json_decode($contenido, true);
        $propiedad = new Propiedad();
        $propiedad->fill($data);
        $propiedad->save();
        $responseData = [
            'message' => 'La propiedad ha sido creada exitosamente.'
        ];
        $response->getBody()->write(json_encode($data));

        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }
    public function editar(Request $request, Response $response, $args)
    {
        $id = $args['id'];
        $InquilinoDb = Inquilino::find($id);
        if ($InquilinoDb) {
            $Inquilino = new Inquilino();
            $contenido = $request->getBody()->getContents();
            $data = json_decode($contenido, true);
            $Inquilino->fill($data);
            $Inquilino->update($id, $Inquilino);
            $data = [
                'status' => 'Success',
                'code' => 200,
            ];
        } else {
            $data = [
                'code' => 404,
                'message' => 'Inquilino no encontrado',
            ];
        }
        $response->getBody()->write(json_encode($data));

        return $response;
    }

    public function eliminar(Request $request, Response $response, $args)
    {
        $id = $args['id'];
        $InquilinoDb = Inquilino::find($id);
        if ($InquilinoDb) {
            Inquilino::delete($id);
            $data = [
                'status' => 'Success',
                'code' => 200,
            ];
        }
        $response->getBody()->write(json_encode($data));

        return $response;
    }
}
