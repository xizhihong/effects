<?php

declare(strict_types=1);

namespace App\Controller;

use Hyperf\HttpServer\Contract\RequestInterface;
use Psr\Http\Message\ResponseInterface;

class AuthController extends AbstractController
{
    public function login(RequestInterface $request): ResponseInterface
    {
        $email = (string) $request->input('email', 'studio@xxx.ai');
        $provider = $request->input('provider', 'email');

        return $this->response->json([
            'token' => base64_encode($email . '|' . $provider),
            'user' => [
                'id' => uniqid('user-', true),
                'name' => $provider === 'google' ? 'Google Creator' : 'Email Creator',
                'email' => $email,
                'avatar' => $provider === 'google'
                    ? 'https://i.pravatar.cc/96?img=13'
                    : 'https://api.dicebear.com/7.x/identicon/svg?seed=fx',
                'provider' => $provider,
            ],
        ]);
    }

    public function register(RequestInterface $request): ResponseInterface
    {
        $email = (string) $request->input('email', 'studio@xxx.ai');

        return $this->response->json([
            'message' => 'Registration successful',
            'email' => $email,
        ]);
    }
}
