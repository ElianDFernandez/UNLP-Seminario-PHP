<?php

namespace App\Models;

use App\Models\DataBase;

class Propiedad extends DataBase
{
    static $tabla = "propiedades";

    public int $localidad_id;
    public int $cantHabitaciones;
    public int $cantBanios;
    // public ¿ tinyint ? $cochera;

    public int $cantHuespedes;
    //public ¿date? $fechaInicio;
    public int $precioPorNoche;
    public int $cantDias;
    //public ¿tinyint? $disponible;
    public int $tipoPropiedad_id;
    //imagen text???
    // tipo imagen varchar (50) ???

    public function fill($data)
    {
        $this->localidad_id = $data['localidad_id'];
        $this->cantHabitaciones = $data['cantHabitaciones'];
        $this->cantBanios = $data['cantBanios'];
        //$this->cochera = $data['cochera'];
        $this->cantHuespedes = $data['cantHuespedes'];
        //$this->fechaInicio = $data['fechaInicio'];
        $this->precioPorNoche = $data['precioPorNoche'];
        $this->cantDias = $data['cantDias'];
        //$this->disponible = $data['disponible'];
        $this->tipoPropiedad_id = $data['tipoPropiedad_id'];
        //$this->imagen = $data['imagen'];
        //$this->tipoImagen = $data['tipoImagen'];
    }
}
