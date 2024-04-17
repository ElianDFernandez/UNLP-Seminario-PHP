<?php

namespace App\Models;

use App\Models\DataBase;

class Reserva extends DataBase
{
    static $tabla = "Reserva";

    protected $id;
    protected int $propiedadId;
    protected int $inquilinoId;
    protected ? string $fechaInicio;
    protected ? int $cantNoches;
    protected ? int $montoTotal;

    public function getMontoTotal()
    {
        $id = $this->propiedadId;
        $prop = self::select("WHERE id = $id");
        return $prop['precioNoche'] * $this->cantNoches;
    }
}
