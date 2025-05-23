<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../../config/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Get query parameters for filtering
$passenger_id = isset($_GET['passenger_id']) ? (int)$_GET['passenger_id'] : null;
$status = isset($_GET['status']) ? mysqli_real_escape_string($con, $_GET['status']) : null;
$schedule_id = isset($_GET['schedule_id']) ? (int)$_GET['schedule_id'] : null;

$sql = "SELECT b.*, s.departure_time, s.arrival_time, s.price,
               r.from_location, r.to_location,
               v.vehicle_number, v.vehicle_type
        FROM bookings b
        JOIN schedules s ON b.schedule_id = s.schedule_id
        JOIN routes r ON s.route_id = r.route_id
        JOIN vehicles v ON s.vehicle_id = v.vehicle_id";

$where = [];
if ($passenger_id) $where[] = "b.passenger_id = $passenger_id";
if ($status) $where[] = "b.status = '$status'";
if ($schedule_id) $where[] = "b.schedule_id = $schedule_id";
if (count($where) > 0) {
    $sql .= ' WHERE ' . implode(' AND ', $where);
}

$sql .= " ORDER BY b.booking_date DESC";

$result = mysqli_query($con, $sql);

if ($result) {
    $bookings = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $bookings[] = $row;
    }
    echo json_encode([
        'success' => true,
        'bookings' => $bookings
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'error' => 'Failed to fetch bookings',
        'details' => mysqli_error($con)
    ]);
}

mysqli_close($con);
?>