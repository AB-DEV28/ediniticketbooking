<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: PUT');
header('Access-Control-Allow-Headers: Content-Type');

require_once '../../config/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['schedule_id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Schedule ID is required']);
    exit();
}

$schedule_id = (int)$data['schedule_id'];
$updates = [];
$params = [];
$types = '';

if (isset($data['departure_time'])) {
    $updates[] = 'departure_time = ?';
    $params[] = $data['departure_time'];
    $types .= 's';
}

if (isset($data['arrival_time'])) {
    $updates[] = 'arrival_time = ?';
    $params[] = $data['arrival_time'];
    $types .= 's';
}

if (isset($data['price'])) {
    $updates[] = 'price = ?';
    $params[] = (float)$data['price'];
    $types .= 'd';
}

if (isset($data['available_seats'])) {
    $updates[] = 'available_seats = ?';
    $params[] = (int)$data['available_seats'];
    $types .= 'i';
}

if (isset($data['status'])) {
    $updates[] = 'status = ?';
    $params[] = $data['status'];
    $types .= 's';
}

if (empty($updates)) {
    http_response_code(400);
    echo json_encode(['error' => 'No fields to update']);
    exit();
}

$sql = "UPDATE Schedules SET " . implode(', ', $updates) . " WHERE schedule_id = ?";
$types .= 'i';
$params[] = $schedule_id;

$stmt = mysqli_prepare($con, $sql);
mysqli_stmt_bind_param($stmt, $types, ...$params);

if (mysqli_stmt_execute($stmt)) {
    echo json_encode([
        'success' => true,
        'message' => 'Schedule updated successfully'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'error' => 'Failed to update schedule',
        'details' => mysqli_error($con)
    ]);
}

mysqli_stmt_close($stmt);
mysqli_close($con);
?>