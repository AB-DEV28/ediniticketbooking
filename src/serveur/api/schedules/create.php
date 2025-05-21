<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../../config/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

$data = json_decode(file_get_contents('php://input'), true);

// Validate required fields
if (!isset($data['route_id']) || !isset($data['vehicle_id']) || 
    !isset($data['departure_time']) || !isset($data['arrival_time']) || 
    !isset($data['price']) || !isset($data['available_seats'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit();
}

// Prepare data
$route_id = (int)$data['route_id'];
$vehicle_id = (int)$data['vehicle_id'];
$departure_time = mysqli_real_escape_string($con, $data['departure_time']);
$arrival_time = mysqli_real_escape_string($con, $data['arrival_time']);
$price = (float)$data['price'];
$available_seats = (int)$data['available_seats'];

// Create schedule
$sql = "INSERT INTO Schedules (route_id, vehicle_id, departure_time, arrival_time, price, available_seats) 
        VALUES (?, ?, ?, ?, ?, ?)";
$stmt = mysqli_prepare($con, $sql);
mysqli_stmt_bind_param($stmt, 'iissdi', $route_id, $vehicle_id, $departure_time, $arrival_time, $price, $available_seats);

if (mysqli_stmt_execute($stmt)) {
    $schedule_id = mysqli_insert_id($con);
    echo json_encode([
        'success' => true,
        'message' => 'Schedule created successfully',
        'schedule_id' => $schedule_id
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'error' => 'Failed to create schedule',
        'details' => mysqli_error($con)
    ]);
}

mysqli_stmt_close($stmt);
mysqli_close($con);
?>