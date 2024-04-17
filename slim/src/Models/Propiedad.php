<?php

namespace App\Models;

use App\Models\DataBase;
use DateTime;

class Propiedad extends DataBase
{
    static $tabla = "propiedades";

    protected int $localidadId;
    protected ? int $cantHabitaciones;
    protected ? int $cantBanios;
    protected ? bool $cochera;

    protected ? int $cantHuespedes;
    protected ? DateTime $fechaInicio;
    protected ? int $precioPorNoche;
    protected ? int $cantDias; //Cantidad de dias total para reservas
    protected ? bool $disponible;
    protected int $tipoPropiedadId;
    protected ? String $imagen;
    protected ? String $tipoImagen;


}
