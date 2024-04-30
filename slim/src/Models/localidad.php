<?php

namespace App\Models;

use Exception;
use App\Models\DataBase;
use App\Models\propiedad;

class Localidad extends DataBase
{
    static $tabla = "localidades";

    protected ? int $id;
    protected String  $nombre;

    //constructor 
    public function __construct($nombre, $id = null)
    {
        $this->id = $id;
        $this->nombre = $nombre;
    }

    public static function findOrNew($data)
    {
        $localidad = Localidad::select('WHERE nombre = "' . $data['nombre'] . '"');
        if (!$localidad) {
            $localidad = new Localidad($data['nombre']);
        } else {
            $localidad = new Localidad($localidad['nombre'], $localidad["id"]);
        }
        return $localidad;
    }

    public static function propiedades($id)
    {
        return Propiedad::find('WHERE localidad = ' . $id);
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
