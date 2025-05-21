<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Include database configuration
require_once 'db.php';


// Create Passengers table
$sql_passengers = "CREATE TABLE IF NOT EXISTS Passengers (
    passenger_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

// Create Vehicles table
$sql_vehicles = "CREATE TABLE vehicles (
    vehicle_id INT AUTO_INCREMENT PRIMARY KEY,
    vehicle_number VARCHAR(20) UNIQUE NOT NULL,
    vehicle_type ENUM('bus', 'taxi') NOT NULL,
    total_seats INT NOT NULL,
    status ENUM('active', 'maintenance', 'inactive') DEFAULT 'active'
)";

// Create Routes table
$sql_routes = "CREATE TABLE IF NOT EXISTS routes (
    route_id INT AUTO_INCREMENT PRIMARY KEY,
    from_location VARCHAR(100) NOT NULL,
    to_location VARCHAR(100) NOT NULL,
    distance FLOAT,
    base_price DECIMAL(10,2) NOT NULL,
    estimated_time TIME NOT NULL
)";

// Create Schedules table
$sql_schedules = "CREATE TABLE IF NOT EXISTS schedules (
    schedule_id INT AUTO_INCREMENT PRIMARY KEY,
    route_id INT,
    vehicle_id INT,
    departure_time DATETIME NOT NULL,
    arrival_time DATETIME NOT NULL,
    available_seats INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    status ENUM('scheduled', 'departed', 'completed', 'cancelled') DEFAULT 'scheduled',
    FOREIGN KEY (route_id) REFERENCES Routes(route_id),
    FOREIGN KEY (vehicle_id) REFERENCES Vehicles(vehicle_id)
)";

// Create Bookings table
$sql_bookings = "CREATE TABLE IF NOT EXISTS Bookings (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    passenger_id INT,
    schedule_id INT,
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    seat_numbers INT,
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending',
    payment_status ENUM('pending', 'paid', 'refunded') DEFAULT 'pending',
    FOREIGN KEY (passenger_id) REFERENCES Passengers(passenger_id),
    FOREIGN KEY (schedule_id) REFERENCES Schedules(schedule_id)
)";

// Execute the creation of tables
$tables = [
    'Passengers' => $sql_passengers,
    'Vehicles' => $sql_vehicles,
    'Routes' => $sql_routes,
    'Schedules' => $sql_schedules,
    'Bookings' => $sql_bookings
];

$all_success = true;
foreach ($tables as $table_name => $sql) {
    if (mysqli_query($con, $sql)) {
        echo "$table_name table created successfully<br>";
    } else {
        echo "Error creating $table_name table: " . mysqli_error($con) . "<br>";
        $all_success = false;
    }
}

if ($all_success) {
    echo "\nAll tables created successfully!";
}

mysqli_close($con);
?>