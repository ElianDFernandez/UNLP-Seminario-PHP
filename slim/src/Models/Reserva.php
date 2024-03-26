<?php

namespace App\Models;

use App\Models\DataBase;

class Reserva extends DataBase
{
    static $tabla = "Reserva";
    public integer $PropiedadID;
    public integer $InquilinoID;
    public string $fechaInicio;
    public integer $cantNoches;
    public real $montoTotal;
    
    public function fill($data)
    {
        $this->nombre = $data['nombre'];
        $this->PropiedadID = $data['propiedadID'];
        $this->InquilinoID = $data['InquilinoID'];
        $this->fechaInicio = $data['fechaInicio'];
        $this->cantNoches = $data['cantNoches'];
        //  $this->montoTotal = cant noches * precioNoche
}

