<?php

namespace App\Models;

use App\Models\DataBase;

class Tipo_propiedad extends DataBase
{
    static $tabla = "Tipo_propiedades";

    public String $nombre;
    
    public function fill($data)
    {
        $this->nombre = $data['nombre'];
    }
}