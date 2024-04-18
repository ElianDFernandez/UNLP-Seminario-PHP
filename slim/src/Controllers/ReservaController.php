<?php

namespace App\Controllers;

use App\Models\Reserva;
use App\Models\Propiedad;
use app\Models\Inquilino;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class ReservaController
{
    public function comprobarCampos($data)
    {
        $respuesta = array();
        if (!isset($data['propiedad_id']) || empty($data['Propiedad_id'])) {
            $respuesta[] = $error = 'Error. El campo propiedad es obligatorio.';
        } else {
            $propiedad_id = Propiedad::find($data['propiedad_id']);
            if ($propiedad_id == null) {
                $error = 'Error. la propiedad no existe.';
                $respuesta[] = $error;
            }
        }
        if (!isset($data['inquilino_id']) || empty($data['inquilino_id'])) {
            $respuesta[] = $error = 'Error. El campo inquilino es obligatorio.';
        } else {
            $inquilino = Inquilino::find($data['inquilino_id']);
            if ($inquilino == null) {
                $error = 'Error. el inquilino no existe.';
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
    public function reservaValida($data)
    {
        $reserva = Reserva::select("WHERE propiedad_id = '" . $data['propiedad_id'] . "' AND fecha_desde = '" . $data['fecha_desde'] . "'");
        if ($reserva) {
            return false;
        } else {
            $propiedad = Propiedad::estaDisponible($data['propiedad_id'], $data['fecha_desde'], $data['cantidad_noches']);
            if ($propiedad) {
                return Reserva::estaDisponible($data['fecha_desde'], $data['cantidad_noches'], $data['propiedad_id']);
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
            $data = [
                'code' => 400,
                'message' => $comprobacion,
            ];
            $statusCode = 400;
        } else {
            $reserva = self::reservaValida($data);
            if ($reserva) {
                $res = new Reserva($data['propiedad_id'], $data['inquilino_id'], $data['fecha_desde'], $data['cantidad_noches']);
                if ($res->guardar()) {
                    $data = [
                        'status' => 'Success. reserva creada.',
                        'code' => 200,
                    ];
                    $statusCode = 200;
                } else {
                    $data = [
                        'status' => 'Error. Fallo al guardar.',
                        'code' => 500,
                    ];
                    $statusCode = 500;
                }
            } else {
                $data = [
                    'status' => 'Error. ya hay una reserva para esta fecha.',
                    'code' => 409,
                ];
                $statusCode = 409;
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
            $data = [
                'code' => 409,
                'message' => $comprobacion,
            ];
            $statusCode = 409;
        } else {
            $id = $args['id'];
            $reservaDb = Reserva::find($id);
            if ($reservaDb) {
                if (self::reservaValida($data)) {
                    $reserva = new Propiedad($data['domicilio'], $data['localidad_id'], $data['cantidad_habitaciones'], $data['cantidad_banios'], $data['cochera'], $data['cantidad_huespedes'], $data['fecha_inicio_disponibilidad'], $data['cantidad_dias'], $data['disponible'], $data['valor_noche'], $data['tipo_propiedad_id'], $data['imagen'], $data['tipo_imagen']);
                    if ($reserva->update($id, $reserva)) {
                        $data = [
                            'status' => 'Success',
                            'code' => 200,
                        ];
                        $statusCode = 200;
                    } else {
                        $data = [
                            'status' => 'Error al actualizar en la base de datos',
                            'code' => 500,
                        ];
                        $statusCode = 500;
                    }
                } else {
                    $data = [
                        'status' => 'Error. ya hay una reserva para esta fecha.',
                        'code' => 409,
                    ];
                    $statusCode = 409;
                }
            } else {
                $data = [
                    'code' => 404,
                    'message' => 'Propiedad no encontrada',
                ];
                $statusCode = 404;
            }
        }
        $response->getBody()->write(json_encode($data));

        return $response->withHeader('Content-Type', 'application/json')->withStatus($statusCode);
    }
}
