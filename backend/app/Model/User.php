<?php

declare(strict_types=1);

namespace App\Model;

class User extends Model
{
    protected ?string $table = 'users';

    protected array $fillable = [
        'name',
        'email',
        'avatar',
        'auth_method',
    ];
}
