<?php

namespace App\Models;

class Helper {
    public static function logError(\Throwable $exception) {
        $detalle = 'Excepcion: ' . $exception->getMessage() . PHP_EOL . 'Ubicacion: ' . $exception->getFile() . ' en la linea: ' . $exception->getLine();
        // Ruta del archivo de registro
        $ubicacionArchivoLog = 'src/Storage/Errores.log';
        $carpeta = dirname($ubicacionArchivoLog);
        if (!file_exists($carpeta)) {
            mkdir($carpeta, 0777, true);
        }
        $errorLog = fopen($ubicacionArchivoLog, 'a');
        fwrite($errorLog, date('[Y-m-d H:i:s]') . ' ' . $detalle . PHP_EOL);
        fclose($errorLog);
        return true;
    }
}

?>