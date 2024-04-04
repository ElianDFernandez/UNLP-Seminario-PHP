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

    function listar(Request $request, Response $response, $args) 
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
        $ReservaDb = Reserva::find($id);
        if ($ReservaDb) {
            $Reserva = new Reserva();
            $contenido = $request->getBody()->getContents();
            $data = json_decode($contenido, true);
            $Reserva->fill($data);
            $Reserva->update($id, $Reserva);
            $data = [
                'status' => 'Success',
                'code' => 200,
            ];
        } else {
            $data = [
                'code' => 404,
                'message' => 'Reserva no encontrada',
            ];
        }
        $response->getBody()->write(json_encode($data));

        return $response;
    }

    public function eliminar(Request $request, Response $response, $args)
    {
        $id = $args['id'];
        $ReservaDb = Reserva::find($id);
        if ($ReservaDb) {
            Reserva::delete($id);
            $data = [
                'status' => 'Success',
                'code' => 200,
            ];
        }
        $response->getBody()->write(json_encode($data));

        return $response;
    }
}
}