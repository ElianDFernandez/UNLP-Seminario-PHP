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
                'status' => 'Success',
                'code' => 200,
                'message' => 'Localidad creada correctamente',
            ];
        } else {
            $data = [
                'code' => 400,
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
            $LocalidadDb::delete($id);
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
        $Localidad = Localidad::select();
        $data = [
            'Localidad' => $Localidad,
        ];
        $response->getBody()->write(json_encode($data));

        return $response->withHeader('Content-Type', 'application/json');
    }
}