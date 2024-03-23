<?php

namespace App\Models;

use PDO;

/** En esta clase defino metodos estaticos para el manejo de mi base de datos, en cada herencia de esta clase reemplazo $tabla con la tabla conrrespondiente al modelo.
 *  En cada modelo me ahorro el codigo de las consultas a base de datos y simplemente trabajo cosas especificas de cada uno.
 */

class DataBase
{
    protected static $tabla = '';

    protected static function execute(String $consulta)
    {
        // Abro conexion a DB.
        $conexion = new PDO('mysql:host=db;dbname=inmobiliaria;charset=utf8mb4', 'root', 'root');
        // Manejo de errores.
        $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        // Ejecutar consulta.
        $consultaStm = $conexion->prepare($consulta);
        $consultaStm->execute();
        return $consultaStm;
    }

    public static function select($where = '') 
    {
        $consulta = "SELECT * FROM " . static::$tabla;
        $consultaStm = self::execute($consulta);
        if (!$consultaStm) {
            return false; // Retorna false si hubo un error al ejecutar la consulta
        }
        if ($consultaStm->rowCount() == 0) {
            return null;
        }
        $array = [];
        while ($r = $consultaStm->fetch(PDO::FETCH_ASSOC)) {
            $array[] = $r;
        }
    
        return $array;
    }

    public static function save($objeto)
    {   
        $atributos = get_object_vars($objeto);
        $nombresAtributos = implode(", ", array_keys($atributos));
        $valoresAtributos = "'" . implode("', '", array_values($atributos)) . "'";
        $consulta = "INSERT INTO " . static::$tabla . " ($nombresAtributos) VALUES ($valoresAtributos)";
        self::execute($consulta);
        return $consulta;
    }
    
}