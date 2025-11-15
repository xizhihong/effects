<?php

declare(strict_types=1);
/**
 * This file is part of Hyperf.
 *
 * @link     https://www.hyperf.io
 * @document https://hyperf.wiki
 * @contact  group@hyperf.io
 * @license  https://github.com/hyperf/hyperf/blob/master/LICENSE
 */
use Hyperf\HttpServer\Router\Router;

Router::addRoute(['GET', 'POST', 'HEAD'], '/', 'App\Controller\IndexController@index');

Router::get('/favicon.ico', function () {
    return '';
});

Router::addGroup('/api', static function () {
    Router::get('/effects', [\App\Controller\Api\EffectController::class, 'index']);
    Router::get('/effects/{slug}', [\App\Controller\Api\EffectController::class, 'show']);

    Router::get('/templates', [\App\Controller\Api\TemplateController::class, 'index']);
    Router::get('/creations', [\App\Controller\Api\CreationController::class, 'index']);

    Router::post('/auth/login', [\App\Controller\Api\AuthController::class, 'login']);
    Router::post('/auth/register', [\App\Controller\Api\AuthController::class, 'register']);

    Router::post('/generate', [\App\Controller\Api\GeneratorController::class, 'generate']);
});
