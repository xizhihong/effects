<?php

declare(strict_types=1);

namespace App\Controller;

use App\Service\EffectService;
use Hyperf\HttpMessage\Exception\NotFoundHttpException;
use Psr\Http\Message\ResponseInterface;

class EffectController extends AbstractController
{
    private EffectService $effectService;

    public function __construct(EffectService $effectService)
    {
        $this->effectService = $effectService;
    }

    public function index(): ResponseInterface
    {
        return $this->response->json([
            'data' => $this->effectService->catalog(),
        ]);
    }

    public function show(string $slug): ResponseInterface
    {
        $effect = $this->effectService->findBySlug($slug);
        if (! $effect) {
            throw new NotFoundHttpException(sprintf('Effect %s not found', $slug));
        }

        return $this->response->json([
            'data' => $effect,
        ]);
    }
}
