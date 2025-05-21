<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: PUT, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

require_once '../../config/db.php';

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Route ID is required']);
    exit();
}

$route_id = (int)$data['id'];
$updates = [];
$params = [];
$types = '';

if (isset($data['from_location'])) {
    $updates[] = 'from_location = ?';
    $params[] = $data['from_location'];
    $types .= 's';
}

if (isset($data['to_location'])) {
    $updates[] = 'to_location = ?';
    $params[] = $data['to_location'];
    $types .= 's';
}

if (isset($data['distance'])) {
    $updates[] = 'distance = ?';
    $params[] = (float)$data['distance'];
    $types .= 'd';
}

if (isset($data['estimated_time'])) {
    $updates[] = 'estimated_time = ?';
    $params[] = $data['estimated_time'];  // Keep as string for TIME format
    $types .= 's';  // Change to string type instead of integer
}

if (empty($updates)) {
    http_response_code(400);
    echo json_encode(['error' => 'No fields to update']);
    exit();
}

$sql = "UPDATE routes SET " . implode(', ', $updates) . " WHERE route_id = ?";  // Change 'id' to 'route_id'
$types .= 'i';
$params[] = $route_id;

$stmt = mysqli_prepare($con, $sql);
mysqli_stmt_bind_param($stmt, $types, ...$params);

if (mysqli_stmt_execute($stmt)) {
    echo json_encode([
        'success' => true,
        'message' => 'Route updated successfully'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'error' => 'Failed to update route',
        'details' => mysqli_error($con)
    ]);
}

mysqli_stmt_close($stmt);
mysqli_close($con);
?>