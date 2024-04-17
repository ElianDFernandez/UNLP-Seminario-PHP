<?php

namespace App\Controllers;

use App\Models\Reserva;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class ReservaController
{
    public function comprobarCampos($data)
    {
        $respuesta = array();
        if (!isset($data['reservaId']) || empty($data['reservaId'])) {
            $error = 'Error. El campo Id es obligatorio.';
            $respuesta[] = $error;
        }
        if (!isset($data['inquilinoId']) || empty($data['inquilinoId'])) {
            $reserva = Reserva::find($data['inquilinoId']);
            if ($reserva == null) {
                $error = 'Error. el inquilino no existe.';
                $respuesta[] = $error;
        }
        if (isset($data['fechaInicio']) && !empty($data['fechaInicio'])) {
                $error = 'Error. el campo frvhaInicio es obligatorio.';
                $respuesta[] = $error;
            }
        }
        if (!isset($data['cantNoches']) || empty($data['cantNoches'])) {
            $error = 'Error. El campo cantidad de noches es obligatorio.';
            $respuesta[] = $error;
        }
    }
        if (count($respuesta) > 0) {
            return $respuesta;
        } else {
            return false;
        }
}
