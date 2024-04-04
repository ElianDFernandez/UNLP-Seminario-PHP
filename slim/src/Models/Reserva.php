<?php

namespace App\Models;

use App\Models\DataBase;

class Reserva extends DataBase
{
    static $tabla = "Reserva";
    public int $PropiedadID;
    public int $InquilinoID;
    public string $fechaInicio;
    public int $cantNoches;
    public int $montoTotal;

    public function fill($data)
    {
        $this->PropiedadID = $data['propiedadID'];
        $this->InquilinoID = $data['InquilinoID'];
        $this->fechaInicio = $data['fechaInicio'];
        $this->cantNoches = $data['cantNoches'];
        //$this->montoTotal = $cantNoches * propiedad.$propiedad id.$precioNoche
        //accedo al preci x noche de la propiedad (no se bien como hacerlo jijiji)
    }
}
