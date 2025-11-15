<?php

declare(strict_types=1);

namespace App\Model;

use Hyperf\Database\Model\Relations\HasMany;

class VideoEffect extends Model
{
    protected ?string $table = 'video_effects';

    protected array $fillable = [
        'slug',
        'name',
        'tagline',
        'description',
        'category',
        'hero_image',
        'cover_image',
        'sample_video',
        'stats',
        'steps',
        'tags',
        'accent_color',
    ];

    protected array $casts = [
        'stats' => 'array',
        'steps' => 'array',
        'tags' => 'array',
    ];

    public function templates(): HasMany
    {
        return $this->hasMany(EffectTemplate::class);
    }

    public function creations(): HasMany
    {
        return $this->hasMany(Creation::class);
    }
}
