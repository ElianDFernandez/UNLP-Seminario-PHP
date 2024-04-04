<?php

namespace App\Models;

use App\Models\DataBase;

class Inquilino extends DataBase
{
    static $tabla = "inquilinos";
    public String $nombre;
    public String $apellido;
    public int $dni;
    public string $email;
    // public   ¿Boolean? $activo;


    public function fill($data)
    {
        $this->nombre = $data['nombre'];
        $this->apellido = $data['apellido'];
        $this->dni = $data['dni'];
        $this->email = $data['email'];
        // $this->activo = $data['activo'];
    }
}
