<?php

namespace App\Models;

use PDO;
use App\Models\Helper;
/** En esta clase defino metodos estaticos para el manejo de mi base de datos, en cada herencia de esta clase reemplazo $tabla con la tabla conrrespondiente al modelo.
 *  En cada modelo me ahorro el codigo de las consultas a base de datos y simplemente trabajo cosas especificas de cada uno.
 */

class DataBase
{
    protected static $tabla = '';

    protected static function execute(String $consulta)
    {
        try {
            $conexion = new PDO('mysql:host=db;dbname=inmobiliaria;charset=utf8mb4', 'root', 'root');
            $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $consultaStm = $conexion->prepare($consulta);
            $consultaStm->execute();
            return $consultaStm;
        } catch (\Throwable $th) {
            Helper::logError($th);
            return false;
        }
    }

    public static function select($where = '')
    {
        try {
            $consulta = "SELECT * FROM `" . static::$tabla . '` ' . $where;
            $consultaStm = self::execute($consulta);
            if ($consultaStm->rowCount() == 0) {
                return null;
            }
            $result = $consultaStm->fetchAll(PDO::FETCH_ASSOC);
            if (count($result) === 1) {
                return $result[0];
            }
            return $result;
        } catch (\Throwable $th) {
            Helper::logError($th);
            return false;
        }
    }

    public static function save($objeto)
    {
        try {
            foreach ($objeto as $key => $value) {
                $nombresAtributos[] = $key;
                $valoresAtributos[] = "'" . $value . "'";
            }
            $consulta = "INSERT INTO " . static::$tabla . " (" . implode(", ", $nombresAtributos) . ") VALUES (" . implode(", ", $valoresAtributos) . ")";
            self::execute($consulta);
            return $consulta;
        } catch (\Throwable $th) {
            Helper::logError($th);
            return false;
        }
    }

    public static function find($id)
    {
        try {
            $consulta = "SELECT * FROM " . static::$tabla . " WHERE id = $id";
            $consultaStm = self::execute($consulta);
            if (!$consultaStm) {
                return false;
            }
            if ($consultaStm->rowCount() == 0) {
                return null;
            }
            $r = $consultaStm->fetch(PDO::FETCH_ASSOC);
            return $r;
        } catch (\Throwable $th) {
            Helper::logError($th);
            return false;
        }
    }
    public static function update($id, $objeto)
    {
        try {
            $updates = [];
            foreach ($objeto as $key => $value) {
                if ($value !== null) {
                    $updates[] = $key . " = '" . $value . "'";
                }
            }
            $setClause = implode(', ', $updates);
            $consulta = "UPDATE " . static::$tabla . " SET " . $setClause . " WHERE " . static::$tabla . ".id = " . $id;
            self::execute($consulta);
            return $consulta;
        } catch (\Throwable $th) {
            Helper::logError($th);
            return false;
        }
    }

    public static function delete($id)
    {
        try {
            $consulta = "DELETE FROM " . static::$tabla . " WHERE id = $id";
            $consultaStm = self::execute($consulta);
            if (!$consultaStm) {
                return false;
            };
            return true;
        } catch (\Throwable $th) {
            Helper::logError($th);
            return false;
        }
    }
}
