<?php

// NOMBRE INMOBILIARIA 
// "PIPO PROPIEDADES"

use Slim\Factory\AppFactory;

require __DIR__ . '/../../vendor/autoload.php';

$app = AppFactory::create();

$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Headers:X-Request-With');

header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

require __DIR__ . "/Routes.php";

$app->run();
