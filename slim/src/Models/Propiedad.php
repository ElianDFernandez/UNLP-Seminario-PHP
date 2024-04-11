<?php

namespace App\Models;

use App\Models\DataBase;
use DateTime;

class Propiedad extends DataBase
{
    static $tabla = "propiedades";

    protected int $localidad_id;
    protected int $cantHabitaciones;
    protected int $cantBanios;
    protected bool $cochera;

    protected int $cantHuespedes;
    protected DateTime $fechaInicio;
    protected int $precioPorNoche;
    protected int $cantDias;
    protected bool $disponible;
    protected int $Propiedad_id;
    protected String $imagen;
    protected String $tipoImagen;

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
