<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

require_once '../../config/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

$sql = "SELECT * FROM Routes";
$result = mysqli_query($con, $sql);

if ($result) {
    $routes = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $routes[] = $row;
    }
    echo json_encode([
        'success' => true,
        'routes' => $routes
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'error' => 'Failed to fetch routes',
        'details' => mysqli_error($con)
    ]);
}

mysqli_close($con);
?>