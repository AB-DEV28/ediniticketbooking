<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

require_once '../../config/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Change this line
$sql = "SELECT * FROM vehicles";
//$sql = "SELECT * FROM vehicles WHERE status = 'active'";
// To this (capitalize Vehicles to match table name)
//$sql = "SELECT * FROM vehicles WHERE status = 'active'";
$result = mysqli_query($con, $sql);

if ($result) {
    $vehicles = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $vehicles[] = $row;
    }
    echo json_encode([
        'success' => true,
        'vehicles' => $vehicles
    ]);
}
else {
    http_response_code(500);
    echo json_encode([
        'error' => 'Failed to fetch vehicles',
        'details' => mysqli_error($con)
    ]);
}

mysqli_close($con);
?>