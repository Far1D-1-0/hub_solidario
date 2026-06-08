<?php
declare(strict_types=1);

function boot_session(): void {
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
}

function session_user(): ?array {
    boot_session();
    return $_SESSION['user'] ?? null;
}

function require_auth(): array {
    $u = session_user();
    if (!$u) json_err('No autenticado', 401);
    return $u;
}

function require_role(string ...$roles): array {
    $u = require_auth();
    if (!in_array($u['rol_codigo'], $roles, true)) {
        json_err('Acceso no permitido', 403);
    }
    return $u;
}
