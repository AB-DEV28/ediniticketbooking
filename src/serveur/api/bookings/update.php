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

if (!isset($data['booking_id']) || !isset($data['status'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Booking ID and status are required']);
    exit();
}

$booking_id = (int)$data['booking_id'];
$status = mysqli_real_escape_string($con, $data['status']);

// Start transaction
mysqli_begin_transaction($con);

try {
    // Update booking status
    $sql = "UPDATE Bookings SET status = ? WHERE booking_id = ?";
    $stmt = mysqli_prepare($con, $sql);
    mysqli_stmt_bind_param($stmt, 'si', $status, $booking_id);

    if (!mysqli_stmt_execute($stmt)) {
        throw new Exception('Failed to update booking status');
    }

    // If cancelling, return seats to available inventory
    if ($status === 'cancelled') {
        // Get booking details
        $select_sql = "SELECT b.seat_numbers, b.schedule_id 
                       FROM Bookings b 
                       WHERE b.booking_id = ?";
        $select_stmt = mysqli_prepare($con, $select_sql);
        mysqli_stmt_bind_param($select_stmt, 'i', $booking_id);
        mysqli_stmt_execute($select_stmt);
        $result = mysqli_stmt_get_result($select_stmt);
        $booking = mysqli_fetch_assoc($result);

        // Update available seats
        $seat_count = count(explode(',', $booking['seat_numbers']));
        $update_sql = "UPDATE Schedules 
                       SET available_seats = available_seats + ? 
                       WHERE schedule_id = ?";
        $update_stmt = mysqli_prepare($con, $update_sql);
        mysqli_stmt_bind_param($update_stmt, 'ii', $seat_count, $booking['schedule_id']);

        if (!mysqli_stmt_execute($update_stmt)) {
            throw new Exception('Failed to update available seats');
        }
    }

    mysqli_commit($con);

    echo json_encode([
        'success' => true,
        'message' => 'Booking status updated successfully'
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