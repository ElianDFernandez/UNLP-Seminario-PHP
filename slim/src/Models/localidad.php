<?php

namespace App\Models;

use App\Models\DataBase;

class Localidad extends DataBase
{
    static $tabla = "localidades";

    public String $nombre;
    
    public function fill($data)
    {
        $this->nombre = $data['nombre'];
    }
}