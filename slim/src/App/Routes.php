<?php

use App\Controllers\HomeController;
use App\Controllers\PropiedadController;
use App\Controllers\InquilinoController;
use App\Controllers\LocalidadController;
use App\Controllers\ReservaController;
use App\Controllers\TipoPropiedadController;

// Inicio APP
$app->get('/', HomeController::class . ':index');

/**Endpoints API */

//Localidad
$app->post('/localidades', LocalidadController::class . ':crear');
$app->put('/localidades/{id}', LocalidadController::class . ':editar');
$app->delete('/localidades/{id}', LocalidadController::class . ':eliminar');
$app->get('/localidades', LocalidadController::class . ':listar');

//Inquilino
$app->post('/inquilinos', InquilinoController::class . ':crear');
$app->put('/inquilinos/{id}', InquilinoController::class . ':editar');
$app->delete('/inquilinos/{id}', InquilinoController::class . ':eliminar');
$app->get('/inquilinos', InquilinoController::class . ':listar');
$app->get('/inquilinos/{id}', InquilinoController::class . ':buscar');

//Propiedad
$app->post('/propiedades', PropiedadController::class . ':crear');
$app->put('/propiedades/{id}', PropiedadController::class . ':editar');
$app->delete('/propiedades/{id}', PropiedadController::class . ':eliminar');
$app->get('/propiedades', PropiedadController::class . ':listar');
$app->get('/propiedades/{id}', PropiedadController::class . ':buscar');

//Reserva
$app->post('/reservas', ReservaController::class . ':crear');
$app->put('/reservas/{id}', ReservaController::class . ':editar');
$app->delete('/reservas/{id}', ReservaController::class . ':eliminar');
$app->get('/reservas', ReservaController::class . ':listar');

//TipoPropiedad
$app->post('/tipos_propiedad', TipoPropiedadController::class . ':crear');
$app->put('/tipos_propiedad/{id}', TipoPropiedadController::class . ':editar');
$app->delete('/tipos_propiedad/{id}', TipoPropiedadController::class . ':eliminar');
$app->get('/tipos_propiedad', TipoPropiedadController::class . ':listar');

//test

// Fin APP