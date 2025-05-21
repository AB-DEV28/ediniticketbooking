<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

require_once '../../config/db.php';

// Handle preflight OPTIONS request
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

if (!isset($data['vehicle_number']) || !isset($data['vehicle_type']) || !isset($data['total_seats'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit();
}

$vehicle_number = mysqli_real_escape_string($con, $data['vehicle_number']);
$vehicle_type = mysqli_real_escape_string($con, $data['vehicle_type']);
$total_seats = (int)$data['total_seats'];

$sql = "INSERT INTO vehicles (vehicle_number, vehicle_type, total_seats) VALUES (?, ?, ?)";
$stmt = mysqli_prepare($con, $sql);
mysqli_stmt_bind_param($stmt, 'ssi', $vehicle_number, $vehicle_type, $total_seats);

if (mysqli_stmt_execute($stmt)) {
    $vehicle_id = mysqli_insert_id($con);
    echo json_encode([
        'success' => true,
        'message' => 'Vehicle created successfully',
        'vehicle_id' => $vehicle_id
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'error' => 'Failed to create vehicle',
        'details' => mysqli_error($con)
    ]);
}

mysqli_stmt_close($stmt);
mysqli_close($con);
?>