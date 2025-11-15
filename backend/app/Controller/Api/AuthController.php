<?php

declare(strict_types=1);

namespace App\Controller\Api;

use App\Controller\AbstractController;
use App\Model\User;
use Hyperf\HttpServer\Contract\ResponseInterface;
use Hyperf\Validation\Contract\ValidatorFactoryInterface;
use Hyperf\Validation\ValidationException;
use Hyperf\Database\Schema\Schema;

class AuthController extends AbstractController
{
    public function __construct(private readonly ValidatorFactoryInterface $validatorFactory)
    {
    }

    public function login(): ResponseInterface
    {
        $data = $this->validateAuthPayload();

        $user = $this->persistUser($data);

        return $this->response->json([
            'data' => [
                'token' => base64_encode($user['email'] . '|' . microtime()),
                'profile' => $user,
            ],
        ]);
    }

    public function register(): ResponseInterface
    {
        $data = $this->validateAuthPayload(true);
        $user = $this->persistUser($data);

        return $this->response->json([
            'data' => [
                'token' => base64_encode('register|' . $user['email'] . '|' . microtime()),
                'profile' => $user,
            ],
        ])->withStatus(201);
    }

    private function validateAuthPayload(bool $isRegister = false): array
    {
        $validator = $this->validatorFactory->make(
            $this->request->all(),
            [
                'email' => 'required|email',
                'name' => 'nullable|string|max:120',
                'auth_method' => 'nullable|in:email,google',
            ]
        );

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        $payload = $validator->validated();
        $payload['auth_method'] = $payload['auth_method'] ?? ($isRegister ? 'email' : 'email');

        return $payload;
    }

    private function persistUser(array $payload): array
    {
        if ($this->usersTableReady()) {
            $user = User::query()->firstOrCreate(
                ['email' => $payload['email']],
                [
                    'name' => $payload['name'] ?? null,
                    'avatar' => $payload['avatar'] ?? null,
                    'auth_method' => $payload['auth_method'] ?? 'email',
                ]
            );

            if ($payload['name'] ?? false) {
                $user->name = $payload['name'];
            }
            if ($payload['auth_method'] ?? false) {
                $user->auth_method = $payload['auth_method'];
            }
            $user->save();

            return $user->toArray();
        }

        return [
            'name' => $payload['name'] ?? 'Pulse Creator',
            'email' => $payload['email'],
            'avatar' => $payload['avatar'] ?? 'https://api.dicebear.com/7.x/shapes/svg?seed=pulse',
            'auth_method' => $payload['auth_method'] ?? 'email',
        ];
    }

    private function usersTableReady(): bool
    {
        try {
            return Schema::hasTable('users');
        } catch (\Throwable) {
            return false;
        }
    }
}
