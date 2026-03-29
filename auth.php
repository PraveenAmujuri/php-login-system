<?php
session_start();
require "config.php";

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

$stmt = $conn->prepare("SELECT id, userId, password FROM users WHERE userId = ?");
if (!$stmt) {
    http_response_code(500);
    exit("Query error");
}

$stmt->bind_param("s", $userId);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows !== 1) {
    header("Location: index.html?error=user_not_found");
    exit();
}

$user = $result->fetch_assoc();

if (!password_verify($password, $user["password"])) {
    header("Location: index.html?error=wrong_password");
    exit();
}

// secure session
session_regenerate_id(true);
$_SESSION["user_id"] = $user["id"];
$_SESSION["user_email"] = $user["userId"];

header("Location: dashboard.php");
exit();