<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

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
if (!isset($data['passenger_id']) || !isset($data['schedule_id']) || 
    !isset($data['seat_list']) || !isset($data['total_amount'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit();
}

try {
    // First verify if passenger exists
    $check_user = "SELECT passenger_id FROM passengers WHERE passenger_id = ?";
    $stmt = mysqli_prepare($con, $check_user);
    mysqli_stmt_bind_param($stmt, 'i', $data['passenger_id']);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    
    if (mysqli_num_rows($result) === 0) {
        throw new Exception("Passenger not found");
    }

    // Verify if schedule exists and has available seats
    $check_schedule = "SELECT available_seats FROM schedules WHERE schedule_id = ?";
    $stmt = mysqli_prepare($con, $check_schedule);
    mysqli_stmt_bind_param($stmt, 'i', $data['schedule_id']);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    
    if (mysqli_num_rows($result) === 0) {
        throw new Exception("Schedule not found");
    }
    
    $schedule = mysqli_fetch_assoc($result);
    if ($schedule['available_seats'] < 1) {
        throw new Exception("No seats available");
    }

    // Start transaction
    mysqli_begin_transaction($con);

    // Insert booking
    $sql = "INSERT INTO bookings (passenger_id, schedule_id, seat_list, total_amount) 
            VALUES (?, ?, ?, ?)";
    $stmt = mysqli_prepare($con, $sql);
    mysqli_stmt_bind_param($stmt, 'iiss', 
        $data['passenger_id'],
        $data['schedule_id'],
        $data['seat_list'],
        $data['total_amount']
    );
    
    if (!mysqli_stmt_execute($stmt)) {
        throw new Exception("Failed to create booking: " . mysqli_error($con));
    }
    
    $booking_id = mysqli_insert_id($con);

    // Update available seats in schedule
    $seat_count = count(array_filter(array_map('trim', explode(',', str_replace(['{','}','[',']','"'], '', $data['seat_list'])))));
    $sql = "UPDATE schedules SET available_seats = available_seats - ? 
            WHERE schedule_id = ? AND available_seats >= ?";
    $stmt = mysqli_prepare($con, $sql);
    mysqli_stmt_bind_param($stmt, 'iii', $seat_count, $data['schedule_id'], $seat_count);
    
    if (!mysqli_stmt_execute($stmt)) {
        throw new Exception("Failed to update seats: " . mysqli_error($con));
    }

    // Commit transaction
    mysqli_commit($con);

    echo json_encode([
        'success' => true,
        'booking_id' => $booking_id,
        'message' => 'Booking created successfully'
    ]);

} catch (Exception $e) {
    if (isset($con)) {
        mysqli_rollback($con);
    }
    http_response_code(500);
    echo json_encode([
        'error' => $e->getMessage()
    ]);
}

mysqli_close($con);
?>