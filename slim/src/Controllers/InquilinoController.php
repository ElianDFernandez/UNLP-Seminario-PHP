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

    function show(Request $request, Response $response, $args) 
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

    function save(Request $request, Response $response, $args) 
    {
        $contenido = $request->getBody()->getContents();
        $data = json_decode($contenido, true);
        //$propiedad = new Propiedad();
        // $propiedad->fill($data);
        // $propiedad->save();
        $responseData = [
            'message' => 'La propiedad ha sido creada exitosamente.'
        ];
        $response->getBody()->write(json_encode($data));

        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }
}