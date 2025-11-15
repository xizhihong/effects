<?php

declare(strict_types=1);

namespace App\Service;

use Hyperf\Contract\ConfigInterface;

class EffectService
{
    private ConfigInterface $config;

    public function __construct(ConfigInterface $config)
    {
        $this->config = $config;
    }

    public function catalog(): array
    {
        return $this->config->get('effects.catalog', []);
    }

    public function findBySlug(string $slug): ?array
    {
        foreach ($this->catalog() as $effect) {
            if (($effect['slug'] ?? '') === $slug) {
                return $effect;
            }
        }

        return null;
    }

    public function marketingSections(): array
    {
        return $this->config->get('effects.marketing_sections', []);
    }

    public function generations(): array
    {
        return $this->config->get('effects.generations', []);
    }

    public function templates(): array
    {
        $templates = $this->config->get('effects.templates', []);
        $catalog = [];
        foreach ($this->catalog() as $effect) {
            $catalog[$effect['slug']] = $effect;
        }

        foreach ($templates as &$template) {
            $slug = $template['effectSlug'] ?? null;
            if ($slug && isset($catalog[$slug])) {
                $template['effect'] = $catalog[$slug];
            }
        }

        return $templates;
    }
}
