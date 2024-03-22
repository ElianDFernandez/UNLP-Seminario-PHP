<?php

namespace App\Controllers;

use App\Models\Propiedad;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class PropiedadController
{
    public function index(Request $request, Response $response, $args)
    {
        $propiedades = Propiedad::select();
        $data = [
            'propiedades' => $propiedades,
        ];
        $response->getBody()->write(json_encode($data));

        return $response->withHeader('Content-Type', 'application/json');
    }

    function show(Request $request, Response $response, $args) 
    {
        $id = $args['id'];
        $propiedad = Propiedad::find($id);
        $data = [
            'id' => $id,
            'propiedad' => $propiedad,
        ];
        $response->getBody()->write(json_encode($data));
    
        return $response->withHeader('Content-Type', 'application/json');
    }

    function save(Request $request, Response $response, $args) 
    {
        $contenido = $request->getBody()->getContents();
        $data = json_decode($contenido, true);
        $propiedad = new Propiedad();
        // $propiedad->fill($data);
        // $propiedad->save();
        $responseData = [
            'message' => 'La propiedad ha sido creada exitosamente.'
        ];
        $response->getBody()->write(json_encode($data));

        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }
}