<?php

use App\Controllers\HomeController;
use App\Controllers\PropiedadController;
use App\Controllers\InquilinoController;
use App\Controllers\LocalidadController;
use App\Controllers\ReservaController;
use App\Models\Reserva;

// Inicio APP
$app->get('/auth', HomeController::class . ':index');

/**Endpoints API */
//Localidad
$app->post('/localidades', LocalidadController::class . ':crear');
$app->put('/localidades/$id', LocalidadController::class . ':editar');
$app->delete('/localidades/$id', LocalidadController::class . ':eliminar');
$app->get('/localidades', LocalidadController::class . ':listar');
