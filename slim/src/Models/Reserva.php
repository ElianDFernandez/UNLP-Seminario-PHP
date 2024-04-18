<?php

namespace App\Models;

use App\Models\DataBase;

class Reserva extends DataBase
{
    static $tabla = "Reserva";

    protected $id;
    protected int $propiedad_id;
    protected int $inquilino_id;
    protected ?string $fecha_desde;
    protected ?int $cantidad_noches;
    protected ?int $monto_total;

    public function getMontoTotal()
    {
        $id = $this->propiedad_id;
        $prop = Propiedad::select("WHERE id = $id");
        return $prop['precioNoche'] * $this->cantidad_noches;
    }
    public function __construct($propiedad_id, $inquilino_id, $fecha_desde, $cantidad_noches, $id = null)
    {
        $this->propiedad_id = $propiedad_id;
        $this->inquilino_id = $inquilino_id;
        $this->fecha_desde = $fecha_desde;
        $this->cantidad_noches = $cantidad_noches;
        $this->monto_total = self::getMontoTotal();
        $this->id = $id;
    }

    public static function findOrNew($data)
    {
        $reserva = Reserva::select("WHERE reservaId = '" . $data['reservaId']);
        if (!$reserva) {
            $reserva = new Reserva($data['inquilino_id'], $data['fecha_desde'], $data['cantidad_noches'], $data['monto_total']);
        } else {
            $reserva = new Reserva($reserva['inquilino_id'], $reserva['fecha_desde'], $reserva['cantidad_noches'], $reserva['monto_total']);
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

    public static function estaDisponible($fecha_desde, $cantidad_noches, $propiedad_id)
    {
        $reservas = Reserva::select("WHERE propiedad_id = " . $propiedad_id);
        foreach ($reservas as $reserva) {
            $fechaFin = date('Y-m-d', strtotime($fecha_desde . ' + ' . $cantidad_noches . ' days'));
            $fechaFinReserva = date('Y-m-d', strtotime($reserva['fecha_desde'] . ' + ' . $reserva['cantidad_noches'] . ' days'));
            if ($fecha_desde >= $reserva['fecha_desde'] && $fecha_desde <= $fechaFinReserva) {
                return false;
            }
            if ($fechaFin >= $reserva['fecha_desde'] && $fechaFin <= $fechaFinReserva) {
                return false;
            }
        }
        return true;
    }
}
