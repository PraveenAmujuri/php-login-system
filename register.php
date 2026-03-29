<?php
require "config.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: signup.html");
    exit();
}

$userId = trim($_POST["userId"]);
$password = trim($_POST["password"]);

if ($userId === "" || $password === "") {
    header("Location: signup.html?error=empty");
    exit();
}

if (!filter_var($userId, FILTER_VALIDATE_EMAIL)) {
    header("Location: signup.html?error=invalid_email");
    exit();
}

// hash password
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// check if user exists
$stmt = $conn->prepare("SELECT id FROM users WHERE userId = ?");
$stmt->bind_param("s", $userId);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    header("Location: signup.html?error=user_exists");
    exit();
}

// insert user
$stmt = $conn->prepare("INSERT INTO users (userId, password) VALUES (?, ?)");
$stmt->bind_param("ss", $userId, $hashedPassword);

if ($stmt->execute()) {
    header("Location: index.html?success=registered");
} else {
    header("Location: signup.html?error=failed");
}
exit();