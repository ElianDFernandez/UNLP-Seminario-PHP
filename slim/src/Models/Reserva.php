<?php

namespace App\Models;

use App\Models\DataBase;

class Reserva extends DataBase
{
    static $tabla = "Reserva";
    protected int $propiedadID;
    protected int $inquilinoID;
    protected string $fechaInicio;
    protected int $cantNoches;
    protected int $montoTotal;

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
