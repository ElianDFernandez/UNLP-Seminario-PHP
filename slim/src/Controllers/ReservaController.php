<?php

namespace App\Controllers;

use App\Models\Reserva;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class ReservaController
{
    public function index(Request $request, Response $response, $args)
    {
        $Reserva = Reserva::select();
        $data = [
            'Reserva' => $Reserva,
        ];
        $response->getBody()->write(json_encode($data));

        return $response->withHeader('Content-Type', 'application/json');
    }

    function show(Request $request, Response $response, $args) 
    {
        $id = $args['id'];
        $Reserva = Reserva::find($id);
        $data = [
            'id' => $id,
            'Reserva' => $Reserva,
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