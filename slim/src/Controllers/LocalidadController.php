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
        $Localidad = new Localidad();
        $Localidad->fill($data);
        if ($Localidad->save($Localidad)) {
            $data = [
                'message' => 'Localidad creada correctamente',
                'Localidad' => $Localidad
            ];
            $statusCode = 200;
        } else {
            $data = [
                'message' => 'Error al crear la Localidad'
            ];
            $statusCode = 400;
        }
        $response->getBody()->write(json_encode($data));
    
        return $response->withHeader('Content-Type', 'application/json')->withStatus($statusCode);
    }

    public function editar(Request $request, Response $response, $args) 
    {
        $id = $args['id'];
        $Localidad = Localidad::find($id);
        if ($Localidad) {
            $Localidad = new Localidad();
            $Localidad->fill($Localidad);
        }
        var_dump($Localidad);
    }

    public function eliminar(Request $request, Response $response, $args) 
    {

    }

    public function listar(Request $request, Response $response, $args)
    {
        $Localidad = Localidad::select();
        $data = [
            'Localidad' => $Localidad,
        ];
        $response->getBody()->write(json_encode($data));

        return $response->withHeader('Content-Type', 'application/json');
    }
}