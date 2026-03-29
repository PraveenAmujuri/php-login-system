<?php
session_start();

if (!isset($_SESSION["user_id"])) {
    header("Location: index.html");
    exit();
}
?>

<h2>Welcome <?php echo htmlspecialchars($_SESSION["user_email"]); ?></h2>
<a href="logout.php">Logout</a>