<?php

declare(strict_types=1);

namespace App\Controller\Api;

use App\Controller\AbstractController;
use App\Service\MarketingContentService;
use Hyperf\HttpServer\Contract\ResponseInterface;

class CreationController extends AbstractController
{
    public function __construct(private readonly MarketingContentService $service)
    {
    }

    public function index(): ResponseInterface
    {
        return $this->response->json([
            'data' => $this->service->listCreations(),
        ]);
    }
}
