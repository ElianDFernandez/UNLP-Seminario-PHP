<?php

// NOMBRE INMOBILIARIA 
// "PIPO PROPIEDADES"

use Slim\Factory\AppFactory;

require __DIR__ . '/../../vendor/autoload.php';

$app = AppFactory::create();

require __DIR__ . "/Routes.php";

$app->run();
