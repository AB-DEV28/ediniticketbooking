<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
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
$from_location = isset($_GET['from_location']) ? mysqli_real_escape_string($con, $_GET['from_location']) : null;
$to_location = isset($_GET['to_location']) ? mysqli_real_escape_string($con, $_GET['to_location']) : null;
$date = isset($_GET['date']) ? mysqli_real_escape_string($con, $_GET['date']) : null;
$route_id = isset($_GET['route_id']) ? (int)$_GET['route_id'] : null;
$schedule_id = isset($_GET['schedule_id']) ? (int)$_GET['schedule_id'] : null;

// Build query based on filters
$sql = "SELECT s.*, r.from_location, r.to_location, v.vehicle_number, v.vehicle_type, v.total_seats 
        FROM schedules s 
        JOIN routes r ON s.route_id = r.route_id 
        JOIN vehicles v ON s.vehicle_id = v.vehicle_id
        WHERE 1=1";

// Add filters if they exist
if ($from_location) {
    $sql .= " AND r.from_location LIKE '%$from_location%'";
}

if ($to_location) {
    $sql .= " AND r.to_location LIKE '%$to_location%'";
}

if ($date) {
    $sql .= " AND DATE(s.departure_time) = '$date'";
}

if ($route_id) {
    $sql .= " AND s.route_id = $route_id";
}

if ($schedule_id) {
    $sql .= " AND s.schedule_id = $schedule_id";
}

// Order by departure time
$sql .= " ORDER BY s.departure_time ASC";

$result = mysqli_query($con, $sql);

if ($result) {
    $schedules = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $schedules[] = [
            'schedule_id' => $row['schedule_id'],
            'route_id' => $row['route_id'],
            'vehicle_id' => $row['vehicle_id'],
            'from_location' => $row['from_location'],
            'to_location' => $row['to_location'],
            'departure_time' => $row['departure_time'],
            'arrival_time' => $row['arrival_time'],
            'available_seats' => $row['available_seats'],
            'price' => $row['price'],
            'status' => $row['status'],
            'vehicle_number' => $row['vehicle_number'],
            'vehicle_type' => $row['vehicle_type'],
            'total_seats' => isset($row['total_seats']) ? $row['total_seats'] : null
        ];
    }
    echo json_encode([
        'success' => true,
        'schedules' => $schedules
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Failed to fetch schedules',
        'details' => mysqli_error($con)
    ]);
}

mysqli_close($con);
?>