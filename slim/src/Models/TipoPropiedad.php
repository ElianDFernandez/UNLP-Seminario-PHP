<?php

namespace App\Models;

use App\Models\DataBase;

class TipoPropiedad extends DataBase
{
    static $tabla = "tipo_propiedades";

    protected ?int $id;
    protected string $nombre;

    public function __construct($nombre, $id = null)
    {
        $this->nombre = $nombre;
        $this->id = $id;
    }

    public static function findOrNew($data)
    {
        $tipoPropiedad = TipoPropiedad::select('WHERE nombre = "' . $data['nombre'] . '"');
        if (!$tipoPropiedad) {
            $tipoPropiedad = new TipoPropiedad($data['nombre']);
        } else {
            if (is_array($tipoPropiedad) && count($tipoPropiedad) > 0) {
                $tipoPropiedad = $tipoPropiedad[0];
            }
            $tipoPropiedad = new Tipopropiedad($tipoPropiedad['nombre'], $tipoPropiedad["id"]);
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
    public static function propiedades($id)
    {
        return propiedad::select('WHERE tipo_propiedad_id = ' . $id);
    }
}
