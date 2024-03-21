<?php

use App\Controllers\HomeController;
use App\Controllers\PropiedadesController;

// Inicio APP
$app->get('/auth', HomeController::class . ':index');

// Propiedades
$app->get('/propiedades/index', PropiedadesController::class . ':index');
$app->get('/propiedades/show/{id}', PropiedadesController::class . ':show');
$app->post('/propiedades/save', PropiedadesController::class . ':save');
