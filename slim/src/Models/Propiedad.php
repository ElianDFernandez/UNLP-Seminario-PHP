<?php

namespace App\Models;

use App\Models\DataBase;
use DateTime;

class Propiedad extends DataBase
{
    static $tabla = "propiedades";

    public int $localidad_id;
    public int $cantHabitaciones;
    public int $cantBanios;
    public bool $cochera;

    public int $cantHuespedes;
    public DateTime $fechaInicio;
    public int $precioPorNoche;
    public int $cantDias;
    public bool $disponible;
    public int $Propiedad_id;
    public String $imagen;
    public String $tipoImagen;

    public function fill($data)
    {
        $this->localidad_id = $data['localidad_id'];
        $this->cantHabitaciones = $data['cantHabitaciones'];
        $this->cantBanios = $data['cantBanios'];
        $this->cochera = $data['cochera'];
        $this->cantHuespedes = $data['cantHuespedes'];
        $this->fechaInicio = $data['fechaInicio'];
        $this->precioPorNoche = $data['precioPorNoche'];
        $this->cantDias = $data['cantDias'];
        $this->disponible = $data['disponible'];
        $this->Propiedad_id = $data['Propiedad_id'];
        $this->imagen = $data['imagen'];
        $this->tipoImagen = $data['tipoImagen'];
    }
}
