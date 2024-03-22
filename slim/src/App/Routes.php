<?php

use App\Controllers\HomeController;
use App\Controllers\PropiedadController;
use App\Controllers\InquilinoController;
use App\Controllers\LocalidadController;
use App\Controllers\ReservaController;
use App\Models\Reserva;

// Inicio APP
$app->get('/auth', HomeController::class . ':index');

// Propiedades
$app->get('/propiedades/index', PropiedadController::class . ':index');
$app->get('/propiedades/show/{id}', PropiedadController::class . ':show');
$app->post('/propiedades/save', PropiedadController::class . ':save');
//Inquilinos
$app->get('/inquilinos/index', InquilinoController::class . ':index');
//localidades
$app ->get('/localidades/index', LocalidadController::class .'index');
//reservas
$app    ->get('/Reservas/index', ReservaController::class .'index');