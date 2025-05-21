<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

require_once '../../config/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['from_location']) || !isset($data['to_location'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit();
}

$from_location = mysqli_real_escape_string($con, $data['from_location']);
$to_location = mysqli_real_escape_string($con, $data['to_location']);
$distance = isset($data['distance']) ? (float)$data['distance'] : null;
$estimated_time = isset($data['estimated_time']) ? (int)$data['estimated_time'] : null;

$sql = "INSERT INTO routes (from_location, to_location, distance, estimated_time) VALUES (?, ?, ?, ?)";
$stmt = mysqli_prepare($con, $sql);
mysqli_stmt_bind_param($stmt, 'ssdi', $from_location, $to_location, $distance, $estimated_time);

if (mysqli_stmt_execute($stmt)) {
    $route_id = mysqli_insert_id($con);
    echo json_encode([
        'success' => true,
        'message' => 'Route created successfully',
        'route_id' => $route_id
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'error' => 'Failed to create route',
        'details' => mysqli_error($con)
    ]);
}

mysqli_stmt_close($stmt);
mysqli_close($con);
?>