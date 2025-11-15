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

Router::addGroup('/api', function () {
    Router::get('/effects', 'App\Controller\EffectController@index');
    Router::get('/effects/{slug}', 'App\Controller\EffectController@show');
    Router::get('/marketing-sections', 'App\Controller\MarketingController@sections');
    Router::get('/generations', 'App\Controller\GenerationController@index');
    Router::get('/templates', 'App\Controller\TemplateController@index');
    Router::post('/auth/login', 'App\Controller\AuthController@login');
    Router::post('/auth/register', 'App\Controller\AuthController@register');
});
