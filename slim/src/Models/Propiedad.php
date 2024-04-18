<?php

namespace App\Models;

use App\Models\DataBase;

class propiedad extends DataBase
{
    static $tabla = "propiedades";

    protected ?int $id;
    protected string $domicilio;
    protected int $localidad_id;
    protected ?int $cantidad_habitaciones;
    protected ?int $cantidad_banios;
    protected bool $cochera;
    protected int $cantidad_huespedes;
    protected string $fecha_inicio_disponibilidad;
    protected int $cantidad_dias;
    protected bool $disponible;
    protected int $valor_noche;
    protected int $moneda_id;
    protected int $tipo_propiedad_id;
    protected ?string $imagen;
    protected ?string $tipo_imagen;

    public function __construct($domicilio, $localidad_id, $cantidad_habitaciones, $cantidad_banios, $cochera, $cantidad_huespedes, $fecha_inicio_disponibilidad, $cantidad_dias, $disponible, $valor_noche, $tipo_propiedad_id, $imagen, $tipo_imagen, $id = null)
    {
        $this->domicilio = $domicilio;
        $this->localidad_id = $localidad_id;
        $this->cantidad_habitaciones = $cantidad_habitaciones;
        $this->cantidad_banios = $cantidad_banios;
        $this->cochera = $cochera;
        $this->cantidad_huespedes = $cantidad_huespedes;
        $this->fecha_inicio_disponibilidad = $fecha_inicio_disponibilidad;
        $this->cantidad_dias = $cantidad_dias;
        $this->disponible = $disponible;
        $this->valor_noche = $valor_noche;
        $this->tipo_propiedad_id = $tipo_propiedad_id;
        $this->imagen = $imagen;
        $this->tipo_imagen = $tipo_imagen;
        $this->id = $id;
    }

    public static function findOrNew($data)
    {
        $propiedad = propiedad::select("WHERE domicilio = '" . $data['domicilio'] . "' AND localidad_id = " . $data['localidad_id']);
        if (!$propiedad) {
            $propiedad = new propiedad($data['domicilio'], $data['localidad_id'], $data['cantidad_habitaciones'], $data['cantidad_banios'], $data['cochera'], $data['cantidad_huespedes'], $data['fecha_inicio_disponibilidad'], $data['cantidad_dias'], $data['disponible'], $data['valor_noche'], $data['tipo_propiedad_id'], $data['imagen'], $data['tipo_imagen']);
        } else {
            $propiedad = new propiedad($propiedad['domicilio'], $propiedad['localidad_id'], $propiedad['cantidad_habitaciones'], $propiedad['cantidad_banios'], $propiedad['cochera'], $propiedad['cantidad_huespedes'], $propiedad['fecha_inicio_disponibilidad'], $propiedad['cantidad_dias'], $propiedad['disponible'], $propiedad['valor_noche'], $propiedad['tipo_propiedad_id'], $propiedad['imagen'], $propiedad['tipo_imagen'], $propiedad['id']);
        }
        return $propiedad;
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

    public static function estaDisponible($id, $fechaInicio, $cantNoches)
    {
        $propiedad = Propiedad::find($id);
        $fechaInicio = strtotime($fechaInicio);
        $fechaFin = strtotime('+' . $cantNoches . ' days', $fechaInicio);
        $fechaInicioDisponibilidad = strtotime($propiedad['fecha_inicio_disponibilidad']);
        $fechaFinDisponibilidad = strtotime('+' . $propiedad['cantidad_dias'] . ' days', $fechaInicioDisponibilidad);
        if ($fechaInicio >= $fechaInicioDisponibilidad && $fechaFin <= $fechaFinDisponibilidad) {

            return true;
        } else {
            return false;
        }
    }
}
