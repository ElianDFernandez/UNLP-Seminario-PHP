<?php

namespace App\Models;

use App\Models\DataBase;

class Reserva extends DataBase
{
    static $tabla = "Reserva";

    protected $id;
    protected int $reservaId;
    protected int $inquilinoId;
    protected ?string $fechaInicio;
    protected ?int $cantNoches;
    protected ?int $montoTotal;

    public function getMontoTotal()
    {
        $id = $this->reservaId;
        $prop = self::select("WHERE id = $id");
        return $prop['precioNoche'] * $this->cantNoches;
    }
    public function __construct($reservaId, $inquilinoId, $fechaInicio, $cantNoches = null)
    {
        $this->reservaId = $reservaId;
        $this->inquilinoId = $inquilinoId;
        $this->fechaInicio = $fechaInicio;
        $this->cantNoches = $cantNoches;
        $this->montoTotal = self::getMontoTotal();   //asi esta bien?//
    }

    public static function findOrNew($data)
    {
        $reserva = Reserva::select("WHERE reservaId = '" . $data['reservaId']);
        if (!$reserva) {
            $reserva = new Reserva($data['inquilinoId'], $data['fechaInicio'], $data['cantNoches'], $data['montoTotal']);
        } else {
            $reserva = new Reserva($reserva['inquilinoId'], $reserva['fechaInicio'], $reserva['cantNoches'], $reserva['montoTotal']);
        }
        return $reserva;
    }

    public function esNuevo()
    {
        return $this->id == null;
    }

    public function guardar()
    {
        if ($this->id == null) {
            unset($this->id);
        }
        return $this->save($this);
    }
}
