<?php

namespace App\Models;

use App\Models\DataBase;

class Reserva extends DataBase
{
    static $tabla = "Reserva";
    public int $propiedadID;
    public int $inquilinoID;
    public string $fechaInicio;
    public int $cantNoches;
    public int $montoTotal;

    public function getMontoTotal()
    {
        $id = $this->propiedadID;
        $prop = self::select("WHERE id = $id");
        return $prop['precioNoche'] * $this->cantNoches;
    }

    public function fill($data)
    {
        $this->propiedadID = $data['propiedadID'];
        $this->inquilinoID = $data['InquilinoID'];
        $this->fechaInicio = $data['fechaInicio'];
        $this->cantNoches = $data['cantNoches'];
        $this->montoTotal = $this->getMontoTotal();
    }
}
