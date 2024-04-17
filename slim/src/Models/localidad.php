<?php

namespace App\Models;

use App\Models\DataBase;

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

    public static function findOrNew($name)
    {
        $localidad = Localidad::select('WHERE nombre = "' . $name . '"');
        if (!$localidad) {
            $localidad = new Localidad($name);
        } else {
            $localidad = new Localidad($localidad[0]['nombre'], $localidad[0]["id"]);
        }
        return $localidad;
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
