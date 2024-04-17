<?php

namespace App\Models;

use App\Models\DataBase;

class TipoPropiedad extends DataBase
{
    static $tabla = "tipo_propiedades";

    protected ? int $id;
    protected string $nombre;

    public function __construct($nombre, $id = null)
    {
        $this->nombre = $nombre;
        $this->id = $id;
    }

    public static function findOrNew($nombre)
    {
        $tipoPropiedad = TipoPropiedad::select('WHERE nombre = "' . $nombre . '"');
        if (!$tipoPropiedad) {
            $tipoPropiedad = new TipoPropiedad($nombre);
        } else {
            $tipoPropiedad = new Tipopropiedad($tipoPropiedad[0]['nombre'], $tipoPropiedad[0]["id"]);
        }
        return $tipoPropiedad;
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
