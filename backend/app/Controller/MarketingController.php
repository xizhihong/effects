<?php

declare(strict_types=1);

namespace App\Controller;

use App\Service\EffectService;
use Psr\Http\Message\ResponseInterface;

class MarketingController extends AbstractController
{
    private EffectService $effectService;

    public function __construct(EffectService $effectService)
    {
        $this->effectService = $effectService;
    }

    public function sections(): ResponseInterface
    {
        return $this->response->json([
            'data' => $this->effectService->marketingSections(),
        ]);
    }
}
