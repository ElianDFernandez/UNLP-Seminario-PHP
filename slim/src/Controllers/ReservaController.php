<?php

namespace App\Controllers;

use App\Models\Reserva;
use App\Models\propiedad;
use app\Models\Inquilino;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class ReservaController
{
    public function comprobarCampos($data)
    {
        $respuesta = array();
        if (!isset($data['propiedadId']) || empty($data['PropiedadId'])) {
            $error = 'Error. El campo propiedad es obligatorio.';
        } else {
            $propiedadId = Propiedad::find($data['propiedadId']);
            if ($propiedadId == null) {
                $error = 'Error. la propiedad no existe.';
                $respuesta[] = $error;
            }
        }
        if (!isset($data['inquilinoId']) || empty($data['inquilinoId'])) {
            $error = 'Error. El campo inquilino es obligatorio.';
        } else {
            $inquilino = Inquilino::find($data['inquilinoId']);
            if ($inquilino == null) {
                $error = 'Error. el inquilino no existe.';
                $respuesta[] = $error;
            }
        }
        if (isset($data['fechaInicio']) && !empty($data['fechaInicio'])) {
            $error = 'Error. el campo fechaInicio es obligatorio.';
            $respuesta[] = $error;
        }
        if (!isset($data['cantNoches']) || empty($data['cantNoches'])) {
            $error = 'Error. El campo cantidad de noches es obligatorio.';
            $respuesta[] = $error;
        }
        if (count($respuesta) > 0) {
            return $respuesta;
        } else {
            return false;
        }
    }
}
