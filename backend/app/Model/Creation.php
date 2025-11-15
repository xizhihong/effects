<?php

declare(strict_types=1);

namespace App\Model;

use Hyperf\Database\Model\Relations\BelongsTo;

class Creation extends Model
{
    protected ?string $table = 'creations';

    protected array $fillable = [
        'video_effect_id',
        'user_id',
        'title',
        'preview_url',
        'status',
        'credits_used',
        'meta',
    ];

    protected array $casts = [
        'meta' => 'array',
    ];

    public function effect(): BelongsTo
    {
        return $this->belongsTo(VideoEffect::class, 'video_effect_id');
    }
}
