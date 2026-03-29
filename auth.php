<?php

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: index.html");
    exit();
}

$userId = trim($_POST["userId"] ?? "");
$password = trim($_POST["password"] ?? "");

if ($userId === "" || $password === "") {
    header("Location: index.html?error=empty");
    exit();
}

if (!filter_var($userId, FILTER_VALIDATE_EMAIL)) {
    header("Location: index.html?error=invalid_email");
    exit();
}

if (strlen($password) < 8) {
    header("Location: index.html?error=weak_password");
    exit();
}

header("Location: index.html?success=1");
exit();