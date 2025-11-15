<?php

declare(strict_types=1);

namespace App\Service;

use App\Model\Creation;
use App\Model\EffectTemplate;
use App\Model\VideoEffect;
use Hyperf\Database\Schema\Schema;
use Hyperf\Di\Annotation\Inject;
use Psr\Log\LoggerInterface;
use function Hyperf\Support\config;

class MarketingContentService
{
    #[Inject]
    protected LoggerInterface $logger;

    private array $config;

    public function __construct()
    {
        $this->config = config('marketing_content', [
            'effects' => [],
            'templates' => [],
            'creations' => [],
        ]);
    }

    public function listEffects(): array
    {
        if ($this->tableReady('video_effects') && VideoEffect::query()->exists()) {
            return VideoEffect::query()->with('templates')->get()->toArray();
        }

        return $this->config['effects'];
    }

    public function findEffect(string $slug): ?array
    {
        if ($this->tableReady('video_effects')) {
            $model = VideoEffect::query()->with('templates')->where('slug', $slug)->first();
            if ($model !== null) {
                return $model->toArray();
            }
        }

        foreach ($this->config['effects'] as $effect) {
            if ($effect['slug'] === $slug) {
                return $effect;
            }
        }

        return null;
    }

    public function listTemplates(): array
    {
        if ($this->tableReady('effect_templates') && EffectTemplate::query()->exists()) {
            return EffectTemplate::query()->with('effect')->get()->toArray();
        }

        return $this->config['templates'];
    }

    public function listCreations(): array
    {
        if ($this->tableReady('creations') && Creation::query()->exists()) {
            return Creation::query()->with('effect')->latest()->get()->toArray();
        }

        return $this->config['creations'];
    }

    private function tableReady(string $table): bool
    {
        try {
            return Schema::hasTable($table);
        } catch (\Throwable $throwable) {
            $this->logger->debug(sprintf('Schema check skipped for %s: %s', $table, $throwable->getMessage()));
            return false;
        }
    }
}
