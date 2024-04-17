<?php

namespace App\Models;

use App\Models\DataBase;

class Inquilino extends DataBase
{
    static $tabla = "inquilinos";

    protected ? int $id;
    protected String $nombre;
    protected String $apellido;
    protected int $documento;
    protected string $email;
    protected bool $activo;

    public function __construct($nombre, $apellido, $documento, $email, $activo, $id = null)
    {
        $this->nombre=$nombre;
        $this->apellido=$apellido;
        $this->documento=$documento;
        $this->email=$email;
        $this->activo= $activo ?? true;
        $this->id=$id;
    }

    public static function findOrnew($data)
    {
        $inquilino = Inquilino::select('WHERE nombre = "' . $data['documento'] . '"');
        if (!$inquilino) {
            return new Inquilino($data['nombre'], $data['apellido'], $data['documento'], $data['email'], null);
        } else {
            return new Inquilino($inquilino[0]['nombre'], $inquilino[0]['apellido'], $inquilino[0]['documento'], $inquilino[0]['email'], $inquilino[0]['activo'], $inquilino[0]['id']);
        }
    }

    public function esNuevo()
    {
        return $this->id == null;
    }

    public function guardar()
    {
        if ($this->id == null) {
            unset($this->id);
        }
        return $this->save($this);
    }
}
