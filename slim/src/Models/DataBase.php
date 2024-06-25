<?php

namespace App\Models;

use PDO;
use App\Models\Helper;
use Exception;

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
        } catch (Exception $e) {
            throw new Exception("Fallo la ejecucion de la consulta.: " . $consulta);
        }
    }

    public static function select($where = '')
    {
        try {
            $consulta = "SELECT * FROM `" . static::$tabla . '` ' . $where;
            $resultado = self::execute($consulta);
            if ($resultado == false) {
                return false;
            }
            if ($resultado->rowCount() == 0) {
                return null;
            }
            $result = $resultado->fetchAll(PDO::FETCH_ASSOC);

            return $result;
        } catch (Exception $e) {
            throw new Exception("Fallo en SQL: ". $consulta);
        }
    }

    public static function save($objeto)
    {
        try {
            foreach ($objeto as $key => $value) {
                if ($value === false) {
                    $value = 0;
                }
                $nombresAtributos[] = $key;
                $valoresAtributos[] = "'" . $value . "'";
            }
            $consulta = "INSERT INTO " . static::$tabla . " (" . implode(", ", $nombresAtributos) . ") VALUES (" . implode(", ", $valoresAtributos) . ")";
            $resultado = self::execute($consulta);
            return $resultado;
        } catch (Exception $e) {
            throw new Exception("Fallo en SQL: ". $consulta);
        }
    }

    public static function find($id)
    {
        try {
            $consulta = "SELECT * FROM " . static::$tabla . " WHERE id = $id";
            $resultado = self::execute($consulta);
            if ($resultado == false) {
                return false;
            }
            if ($resultado->rowCount() == 0) {
                return null;
            }
            $r = $resultado->fetch(PDO::FETCH_ASSOC);
            return $r;
        } catch (Exception $e) {
            throw new Exception("Fallo en SQL: ". $consulta);
        }
    }
    public static function update($id, $objeto)
    {
        try {
            $updates = [];
            foreach ($objeto as $key => $value) {
                if ($value !== null) {
                    if ($value === false) {
                        $value = 0;
                    }
                    $updates[] = $key . " = '" . $value . "'";
                }
            }
            $setClause = implode(', ', $updates);
            $consulta = "UPDATE " . static::$tabla . " SET " . $setClause . " WHERE " . static::$tabla . ".id = " . $id;
            $resultado = self::execute($consulta);
            if ($resultado == false) {
                return false;
            }
            return $resultado;
        } catch (Exception $e) {
            throw new Exception("Fallo en SQL: ". $consulta);
        }
    }

    public static function delete($id)
    {
        try {
            $consulta = "DELETE FROM " . static::$tabla . " WHERE id = $id";
            self::execute($consulta);
            return true;
        } catch (Exception $e) {
            throw new Exception("Fallo en SQL: ". $consulta);
        }
    }
}
