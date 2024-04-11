<?php

namespace App\Models;

use App\Models\DataBase;

class Inquilino extends DataBase
{
    static $tabla = "inquilinos";
    protected String $nombre;
    protected String $apellido;
    protected int $dni;
    protected string $email;
    protected bool $activo;


    public function fill($data)
    {
        $this->nombre = $data['nombre'];
        $this->apellido = $data['apellido'];
        $this->dni = $data['dni'];
        $this->email = $data['email'];
        $this->activo = $data['activo'];
    }
}
