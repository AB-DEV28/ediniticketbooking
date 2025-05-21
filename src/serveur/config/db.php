<?php

$db_server = "localhost";
$db_user = "root";
$db_pass = "";
$db_name = "edini";

$con = mysqli_connect($db_server, $db_user, $db_pass, $db_name);

if (!$con) {
    die(json_encode([
        'success' => false,
        'message' => 'Connection failed: ' . mysqli_connect_error()
    ]));
}

// Don't output anything on successful connection
?>
