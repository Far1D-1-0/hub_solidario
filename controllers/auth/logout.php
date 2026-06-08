<?php
declare(strict_types=1);
require_once __DIR__ . '/../../config/response.php';
require_once __DIR__ . '/../../config/auth.php';

only_method('POST');
boot_session();

$_SESSION = [];
session_destroy();

json_ok(['loggedIn' => false]);
