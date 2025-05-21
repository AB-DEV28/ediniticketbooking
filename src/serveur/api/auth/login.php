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

    $email = isset($data['email']) ? $data['email'] : '';
    $password = isset($data['password']) ? $data['password'] : '';

    // Log the received data for debugging
    error_log("Received data - Email: " . $email . ", Password length: " . strlen($password));

    if (empty($email) || empty($password)) {
        echo json_encode([
            'success' => false,
            'message' => 'Email and password are required',
            'debug' => [
                'email' => $email,
                'password_length' => strlen($password)
            ]
        ]);
        exit();
    }

    try {
        $stmt = $con->prepare("SELECT * FROM Passengers WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();
        $user = $result->fetch_assoc();

        if ($user) {
            if ($password == $user['password']) {
                // Login successful
                unset($user['password']); // Remove password from response
                echo json_encode([
                    'success' => true,
                    'message' => 'Login successful',
                    'user' => $user
                ]);
            } else {
                // Password verification failed
                echo json_encode([
                    'success' => false,
                    'message' => 'Invalid password',
                    'debug' => [
                        'email_exists' => true,
                        'password_verify' => false
                    ]
                ]);
            }
        } else {
            // User not found
            echo json_encode([
                'success' => false,
                'message' => 'User not found',
                'debug' => [
                    'email_exists' => false
                ]
            ]);
        }
        $stmt->close();
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