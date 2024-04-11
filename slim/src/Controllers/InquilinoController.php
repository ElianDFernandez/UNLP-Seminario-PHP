<?php

namespace App\Controllers;

use App\Models\Inquilino;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class InquilinoController
{
    public static function comprobarCampos($data)
    {
        // uso de coleccion
        $respuesta = array();
        if (!isset($data['nombre']) || empty($data['nombre'])) {
            $error = 'Error. El campo nombre es obligatorio.';
            $respuesta[] = $error;
        }
        if (!isset($data['apellido']) || empty($data['apellido'])) {
            $error = [
                'message' => 'Error. El campo apellido es obligatorio.',
            ];
            $respuesta[] = $error;;
        }
        if (!isset($data['dni']) || empty($data['dni'])) {
            $error = [
                'message' => 'Error. El campo dni es obligatorio.',
            ];
            $respuesta[] = $error;

            if (!isset($data['telefono']) || empty($data['telefono'])) {
                $error = [
                    'message' => 'Error. El campo telefono es obligatorio.',
                ];
                $respuesta[] = $error;
            }
            if (!isset($data['email']) || empty($data['email'])) {
                $error = [
                    'message' => 'Error. El campo email es obligatorio.',
                ];
                $respuesta[] = $error;
            }
            if (!isset($data['fechaNacimiento']) || empty($data['fechaNacimiento'])) {
                $error = [
                    'message' => 'Error. El campo fechaNacimiento es obligatorio.',
                ];
                $respuesta[] = $error;
            }
            if (count($respuesta) > 0) {
                return $respuesta;
            } else {
                return false;
            }
        }
    }
}
