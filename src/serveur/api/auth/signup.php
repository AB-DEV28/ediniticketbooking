<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

// Include database configuration
require_once '../../../../src/serveur/config/db.php';

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get JSON data from request body
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    // Extract user data
    $firstName = isset($data['firstName']) ? $data['firstName'] : '';
    $lastName = isset($data['lastName']) ? $data['lastName'] : '';
    $email = isset($data['email']) ? $data['email'] : '';
    $password = isset($data['password']) ? $data['password'] : '';
    $phone_number = isset($data['phone']) ? $data['phone'] : ''; // Changed from phone_number to phone

    // Validate required fields
    if (empty($firstName) || empty($lastName) || empty($email) || empty($password) || empty($phone_number)) {
        echo json_encode([
            'success' => false,
            'message' => 'All fields are required',
            'debug' => [
                'firstName' => $firstName,
                'lastName' => $lastName,
                'email' => $email,
                'password_length' => strlen($password),
                'phone_number' => $phone_number
            ]
        ]);
        exit();
    }

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode([
            'success' => false,
            'message' => 'Invalid email format'
        ]);
        exit();
    }

    try {
        // Check if email already exists
        $checkStmt = $con->prepare("SELECT email FROM Passengers WHERE email = ?");
        $checkStmt->bind_param("s", $email);
        $checkStmt->execute();
        $result = $checkStmt->get_result();

        if ($result->num_rows > 0) {
            echo json_encode([
                'success' => false,
                'message' => 'Email already registered'
            ]);
            $checkStmt->close();
            exit();
        }
        $checkStmt->close();

        // Insert new user - using password directly without hashing
        $insertStmt = $con->prepare("INSERT INTO Passengers (first_name, last_name, email, password, phone_number) VALUES (?, ?, ?, ?, ?)");
        $insertStmt->bind_param("sssss", $firstName, $lastName, $email, $password, $phone_number);
        
        if ($insertStmt->execute()) {
            $userId = $con->insert_id; // Changed from $insertStmt->insert_id
            $insertStmt->close();

            // Fetch the newly created user
            $fetchStmt = $con->prepare("SELECT first_name, last_name, email, phone_number FROM Passengers WHERE email = ?");
            $fetchStmt->bind_param("s", $email);
            $fetchStmt->execute();
            $user = $fetchStmt->get_result()->fetch_assoc();
            $fetchStmt->close();

            echo json_encode([
                'success' => true,
                'message' => 'Registration successful',
                'user' => $user
            ]);
        } else {
            throw new Exception("Failed to insert user");
        }
    } catch(Exception $e) {
        error_log("Database error: " . $e->getMessage());
        echo json_encode([
            'success' => false,
            'message' => 'Database error occurred',
            'debug' => [
                'error' => $e->getMessage()
            ]
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method',
        'debug' => [
            'method' => $_SERVER['REQUEST_METHOD']
        ]
    ]);
}
?>