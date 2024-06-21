<?php

namespace App\Models;

use App\Models\DataBase;

class Inquilino extends DataBase
{
    static $tabla = "inquilinos";

    protected ?int $id;
    protected String $nombre;
    protected String $apellido;
    protected int $documento;
    protected string $email;
    protected bool $activo;

    public function __construct($nombre, $apellido, $documento, $email, $activo, $id = null)
    {
        $this->nombre = $nombre;
        $this->apellido = $apellido;
        $this->documento = $documento;
        $this->email = $email;
        $this->activo = $activo ?? true;
        $this->id = $id;
    }

    public static function findOrnew($data)
    {
        $inquilino = Inquilino::select('WHERE documento = "' . $data['documento'] . '"');
        if (!$inquilino) {
            return new Inquilino($data['nombre'], $data['apellido'], $data['documento'], $data['email'], null);
        } else {
            if (is_array($inquilino) && count($inquilino) > 0) {
                $inquilino = $inquilino[0];
            }
            return new Inquilino($inquilino['nombre'], $inquilino['apellido'], $inquilino['documento'], $inquilino['email'], $inquilino['activo'], $inquilino['id']);
        }
    }

    public static function new($data)
    {
        return new Inquilino($data['nombre'], $data['apellido'], $data['documento'], $data['email'], null);
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
    public static function reservas($id)
    {
        return Reserva::select('WHERE inquilino_id = ' . $id);
    }
}
