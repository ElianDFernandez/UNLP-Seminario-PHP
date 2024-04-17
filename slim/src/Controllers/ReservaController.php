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

}
