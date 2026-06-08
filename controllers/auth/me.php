<?php
declare(strict_types=1);
require_once __DIR__ . '/../../config/response.php';
require_once __DIR__ . '/../../config/auth.php';

only_method('GET');

$user = session_user();

if (!$user) {
    json_ok(['loggedIn' => false]);
}

json_ok(array_merge($user, ['loggedIn' => true]));
