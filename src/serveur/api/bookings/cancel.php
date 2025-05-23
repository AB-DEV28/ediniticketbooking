<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require_once '../../config/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['booking_id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Booking ID is required']);
    exit();
}

$booking_id = (int)$data['booking_id'];

// Start transaction
mysqli_begin_transaction($con);

try {
    // Check if booking exists and can be cancelled
    $check_sql = "SELECT b.status, b.seat_list, b.schedule_id, s.departure_time 
                  FROM bookings b 
                  JOIN schedules s ON b.schedule_id = s.id 
                  WHERE b.id = ?";
    $check_stmt = mysqli_prepare($con, $check_sql);
    mysqli_stmt_bind_param($check_stmt, 'i', $booking_id);
    mysqli_stmt_execute($check_stmt);
    $result = mysqli_stmt_get_result($check_stmt);
    $booking = mysqli_fetch_assoc($result);

    if (!$booking) {
        throw new Exception('Booking not found');
    }

    if ($booking['status'] === 'cancelled') {
        throw new Exception('Booking is already cancelled');
    }

    if ($booking['status'] === 'completed') {
        throw new Exception('Cannot cancel completed booking');
    }

    // Check if cancellation is within allowed time (e.g., 24 hours before departure)
    $departure_time = strtotime($booking['departure_time']);
    $current_time = time();
    $hours_difference = ($departure_time - $current_time) / 3600;

    if ($hours_difference < 24) {
        throw new Exception('Cannot cancel booking less than 24 hours before departure');
    }

    // Update booking status
    $update_sql = "UPDATE bookings SET status = 'cancelled', payment_status = 'refunded' WHERE id = ?";
    $update_stmt = mysqli_prepare($con, $update_sql);
    mysqli_stmt_bind_param($update_stmt, 'i', $booking_id);

    if (!mysqli_stmt_execute($update_stmt)) {
        throw new Exception('Failed to cancel booking');
    }

    // Return seats to available inventory
    $seat_count = count(array_filter(array_map('trim', explode(',', str_replace(['{','}','[',']','"'], '', $booking['seat_list'])))));
    $seats_sql = "UPDATE schedules 
                  SET available_seats = available_seats + ? 
                  WHERE id = ?";
    $seats_stmt = mysqli_prepare($con, $seats_sql);
    mysqli_stmt_bind_param($seats_stmt, 'ii', $seat_count, $booking['schedule_id']);

    if (!mysqli_stmt_execute($seats_stmt)) {
        throw new Exception('Failed to update seat inventory');
    }

    mysqli_commit($con);

    echo json_encode([
        'success' => true,
        'message' => 'Booking cancelled successfully',
        'refund_status' => 'initiated'
    ]);

} catch (Exception $e) {
    mysqli_rollback($con);
    http_response_code(500);
    echo json_encode([
        'error' => $e->getMessage()
    ]);
}

mysqli_close($con);
?>