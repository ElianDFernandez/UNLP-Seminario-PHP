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

    function Listar(Request $request, Response $response, $args)
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
        $PropiedadDb = Propiedad::find($id);
        if ($PropiedadDb) {
            $Propiedad = new Propiedad();
            $contenido = $request->getBody()->getContents();
            $data = json_decode($contenido, true);
            $Propiedad->fill($data);
            $Propiedad->update($id, $Propiedad);
            $data = [
                'status' => 'Success',
                'code' => 200,
            ];
        } else {
            $data = [
                'code' => 404,
                'message' => 'Propiedad no encontrada',
            ];
        }
        $response->getBody()->write(json_encode($data));

        return $response;
    }

    public function eliminar(Request $request, Response $response, $args)
    {
        $id = $args['id'];
        $PropiedadDb = Propiedad::find($id);
        if ($PropiedadDb) {
            Propiedad::delete($id);
            $data = [
                'status' => 'Success',
                'code' => 200,
            ];
        }
        $response->getBody()->write(json_encode($data));

        return $response;
    }
}
