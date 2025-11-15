<?php

declare(strict_types=1);

namespace App\Controller\Api;

use App\Controller\AbstractController;
use App\Service\MarketingContentService;
use Hyperf\HttpMessage\Upload\UploadedFile;
use Hyperf\HttpServer\Contract\ResponseInterface;

class GeneratorController extends AbstractController
{
    public function __construct(private readonly MarketingContentService $service)
    {
    }

    public function generate(): ResponseInterface
    {
        $effectSlug = (string) $this->request->input('effect', '');
        $effect = $this->service->findEffect($effectSlug);
        if ($effect === null) {
            return $this->response->json([
                'message' => 'Invalid effect slug provided.',
            ])->withStatus(422);
        }

        $uploads = $this->normalizeUploads();
        if (count($uploads) === 0) {
            return $this->response->json([
                'message' => '请上传至少一张图片（JPG/PNG/WebP）。',
            ])->withStatus(422);
        }

        $validationError = $this->validateUploads($uploads);
        if ($validationError !== null) {
            return $this->response->json([
                'message' => $validationError,
            ])->withStatus(422);
        }

        return $this->response->json([
            'data' => [
                'videoUrl' => $effect['sample_video'],
                'thumbnail' => $effect['cover_image'],
                'creditsUsed' => $effect['stats']['credits'] ?? 8,
                'status' => 'completed',
                'effect' => $effectSlug,
            ],
        ]);
    }

    /**
     * @return UploadedFile[]
     */
    private function normalizeUploads(): array
    {
        $files = $this->request->getUploadedFiles();
        $images = $files['images'] ?? [];

        if ($images instanceof UploadedFile) {
            return [$images];
        }

        if (is_array($images)) {
            return array_filter($images, static fn ($file) => $file instanceof UploadedFile);
        }

        return [];
    }

    /**
     * @param UploadedFile[] $files
     */
    private function validateUploads(array $files): ?string
    {
        if (count($files) > 3) {
            return '最多上传 3 张照片。';
        }

        $allowed = ['image/jpeg', 'image/png', 'image/webp'];

        foreach ($files as $file) {
            if (! in_array($file->getClientMediaType(), $allowed, true)) {
                return '仅支持 JPG、PNG、WebP 格式。';
            }

            if ($file->getSize() > (5 * 1024 * 1024)) {
                return '单张图片需小于 5MB。';
            }
        }

        return null;
    }
}
