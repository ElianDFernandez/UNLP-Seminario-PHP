<?php

namespace App\Models;

use PDO;

/** En esta clase defino metodos estaticos para el manejo de mi base de datos, en cada herencia de esta clase reemplazo $tabla con la tabla conrrespondiente al modelo.
 *  En cada modelo me ahorro el codigo de las consultas a base de datos y simplemente trabajo cosas especificas de cada uno.
 */

class DataBase
{
    protected static $tabla = '';

    protected static function execute(String $consulta){
        // Abro conexion a DB.
        $conexion = new PDO('mysql:host=db;dbname=inmobiliaria;charset=utf8mb4', 'root', 'root');
        // Manejo de errores.
        $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        // Ejecutar consulta.
        $consultaStm = $conexion->prepare($consulta);
        $resultados = $consultaStm->execute();
        // Si no trajo anda null
        if ($consultaStm->rowCount() == 0) {
            return null;
        }
        // Retorno un array con los resultados.
        $array = [];
        while($r = $consultaStm->fetch(PDO::FETCH_ASSOC)){
            $array[] = $r;
        }

        return $array;
    }

    public static function select( $where =  '' ){
        $consulta = "SELECT * FROM " . static::$tabla;

        return self::execute($consulta);
    }

    public static function find($id = 0){
        $consulta = "SELECT * FROM " . static::$tabla . " WHERE id=". $id;
        $resultado = self::execute($consulta);

        return $resultado[0] ?? null;
    }

    public static function save($objeto){
        $insercion = "INSERT INTO ";
    }
}