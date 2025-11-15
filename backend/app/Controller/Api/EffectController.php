<?php

declare(strict_types=1);

namespace App\Controller\Api;

use App\Controller\AbstractController;
use App\Service\MarketingContentService;
use Hyperf\HttpServer\Contract\ResponseInterface;

class EffectController extends AbstractController
{
    public function __construct(private readonly MarketingContentService $service)
    {
    }

    public function index(): ResponseInterface
    {
        return $this->response->json([
            'data' => $this->service->listEffects(),
        ]);
    }

    public function show(string $slug): ResponseInterface
    {
        $effect = $this->service->findEffect($slug);

        if ($effect === null) {
            return $this->response->json([
                'message' => 'Effect not found',
            ])->withStatus(404);
        }

        return $this->response->json([
            'data' => $effect,
        ]);
    }
}
