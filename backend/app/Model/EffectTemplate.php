<?php

declare(strict_types=1);

namespace App\Model;

use Hyperf\Database\Model\Relations\BelongsTo;

class EffectTemplate extends Model
{
    protected ?string $table = 'effect_templates';

    protected array $fillable = [
        'video_effect_id',
        'name',
        'model',
        'sample_image',
        'sample_video',
        'prompt',
        'credit_cost',
        'metadata',
    ];

    protected array $casts = [
        'metadata' => 'array',
    ];

    public function effect(): BelongsTo
    {
        return $this->belongsTo(VideoEffect::class, 'video_effect_id');
    }
}
