<?php

namespace App\Controllers;

use App\Models\Reserva;
use App\Models\Propiedad;
use App\Models\Inquilino;
use DateTime;
use Exception;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class ReservaController
{
    public function comprobarCampos($data)
    {
        $respuesta = array();
        if (!isset($data['propiedad_id']) || empty($data['propiedad_id'])) {
            $respuesta[] = $error = 'Error. El campo propiedad es obligatorio.';
        } else {
            $propiedad_id = Propiedad::find($data['propiedad_id']);
            if ($propiedad_id == null || $propiedad_id['disponible'] == 0) {
                $error = 'Error. la propiedad no existe o no disponible.';
                $respuesta[] = $error;
            }
        }
        if (!isset($data['inquilino_id']) || empty($data['inquilino_id'])) {
            $respuesta[] = $error = 'Error. El campo inquilino es obligatorio.';
        } else {
            $inquilino = Inquilino::find($data['inquilino_id']);
            if ($inquilino == null || $inquilino['activo'] == 0) {
                $error = 'Error. el inquilino no existe o esta inactivo.';
                $respuesta[] = $error;
            }
        }
        if (!isset($data['fecha_desde']) || empty($data['fecha_desde'])) {
            $error = 'Error. el campo fecha_desde es obligatorio.';
            $respuesta[] = $error;
        }
        if (!isset($data['cantidad_noches']) || empty($data['cantidad_noches'])) {
            $error = 'Error. El campo cantidad de noches es obligatorio.';
            $respuesta[] = $error;
        }
        if (count($respuesta) > 0) {
            return $respuesta;
        } else {
            return false;
        }
    }
    public function reservaValida($data, $reservaId = null)
    {
        // Caso en el que la reserva ya exista misma propiedad misma fecha de inicio
        if ($reservaId === null) {
            $reserva = Reserva::select("WHERE propiedad_id = '" . $data['propiedad_id'] . "' AND fecha_desde = '" . $data['fecha_desde'] . "'");
        } else {
            $reserva = Reserva::select("WHERE propiedad_id = '" . $data['propiedad_id'] . "' AND fecha_desde = '" . $data['fecha_desde'] . "' AND id <> '" . $reservaId . "'");
        }
        if ($reserva !== null) {
            return false;
        } else {
            // Caso en el que la reserva no exista. Se comprueba que la propiedad este disponible para las fechas requeridas.
            $propiedad = Propiedad::estaDisponible($data['propiedad_id'], $data['fecha_desde'], $data['cantidad_noches']);
            if ($propiedad) {
                // Se verifica si la reserva no se superpone con otra reserva.
                return Reserva::estaDisponible($data['fecha_desde'], $data['cantidad_noches'], $data['propiedad_id'], $reservaId);
            } else {
                return false;
            }
        }
    }

    public function crear(Request $request, Response $response, $args)
    {
        $contenido = $request->getBody()->getContents();
        $data = json_decode($contenido, true);
        $comprobacion = self::comprobarCampos($data);
        if ($comprobacion) {
            $data = $comprobacion;
            $statusCode = 400;
        } else {
            try {
                $reserva = self::reservaValida($data);
                if ($reserva) {
                    $res = new Reserva($data['propiedad_id'], $data['inquilino_id'], $data['fecha_desde'], $data['cantidad_noches']);
                    $res->guardar();
                    $data = [
                        'status' => 'Success. reserva creada.',
                        'code' => 200,
                    ];
                    $statusCode = 200;
                } else {
                    $data = [
                        'status' => 'Error. Ya hay una reserva para esta fecha o fecha no disponile para la propiedad.',
                        'code' => 400,
                    ];
                    $statusCode = 400;
                }
            } catch (Exception $e) {
                $data = [
                    'code' => 500,
                    'message' => 'Error en la base de datos: ' . $e->getMessage(),
                ];
                $statusCode = 500;
            }
        }
        $response->getBody()->write(json_encode($data));
        return $response->withHeader('Content-Type', 'application/json')->withStatus($statusCode);
    }

    public function editar(Request $request, Response $response, $args)
    {
        $contenido = $request->getBody()->getContents();
        $data = json_decode($contenido, true);
        $comprobacion = self::comprobarCampos($data);
        if ($comprobacion) {
            $data = $comprobacion;
            $statusCode = 400;
        } else {
            $id = $args['id'];
            try {
                $reservaDb = Reserva::find($id);
                if ($reservaDb && $reservaDb['fecha_desde'] > Date('Y-m-d')) {
                    if (self::reservaValida($data, $args['id'])) {
                        $reserva = new Reserva($data['propiedad_id'], $data['inquilino_id'], $data['fecha_desde'], $data['cantidad_noches']);
                        $reserva->update($id, $reserva);
                        $data = [
                            'status' => 'Success',
                            'code' => 200,
                        ];
                        $statusCode = 200;
                    } else {
                        $data = [
                            'status' => 'Error. Ya hay una reserva para esta fecha o fecha no disponile para la propiedad.',
                            'code' => 409,
                        ];
                        $statusCode = 409;
                    }
                } else {
                    $data = [
                        'code' => 404,
                        'message' => 'Reserva no encontrada o completada',
                    ];
                    $statusCode = 404;
                }
            } catch (Exception $e) {
                $data = [
                    'code' => 500,
                    'message' => 'Error en la base de datos: ' . $e->getMessage(),
                ];
                $statusCode = 500;
            }
        }
        $response->getBody()->write(json_encode($data));
        return $response->withHeader('Content-Type', 'application/json')->withStatus($statusCode);
    }

    public function eliminar(Request $request, Response $response, $args)
    {
        $id = $args['id'];
        try {
            $reservaDb = Reserva::find($id);
            if ($reservaDb) {
                Reserva::delete($id);
                $data = [
                    'status' => 'Success. Reserva eliminada',
                    'code' => 200,
                ];
                $statusCode = 200;
            } else {
                $data = [
                    'code' => 404,
                    'message' => 'Error. Reserva no encontrada',
                ];
                $statusCode = 404;
            }
        } catch (Exception $e) {
            $data = [
                'code' => 500,
                'message' => 'Error en la base de datos: ' . $e->getMessage(),
            ];
            $statusCode = 500;
        }
        $response->getBody()->write(json_encode($data));

        return $response->withHeader('Content-Type', 'application/json')->withStatus($statusCode);
    }

    public function listar(Request $request, Response $response, $args)
    {
        try {
            $reservasDb = Reserva::select();
            $data = $reservasDb;
            $statusCode = 200;
        } catch (Exception $e) {
            $data = [
                'code' => 500,
                'message' => 'Error en la base de datos: ' . $e->getMessage(),
            ];
            $statusCode = 500;
        }
        $response->getBody()->write(json_encode($data));
        return $response->withHeader('Content-Type', 'application/json')->withStatus($statusCode);
    }
}
