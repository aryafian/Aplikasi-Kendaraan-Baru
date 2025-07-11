-- VehicleFlow Database Schema for PostgreSQL

-- Create custom enum types
CREATE TYPE user_role AS ENUM ('admin', 'requester', 'approver');
CREATE TYPE booking_status AS ENUM ('pending', 'approved_level1', 'approved_level2', 'approved', 'rejected', 'completed');
CREATE TYPE vehicle_status AS ENUM ('available', 'in_use', 'maintenance');
CREATE TYPE approval_level AS ENUM ('level1', 'level2');

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role user_role NOT NULL,
    department VARCHAR(100),
    approval_level approval_level,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Vehicles table
CREATE TABLE IF NOT EXISTS vehicles (
    id SERIAL PRIMARY KEY,
    make VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    year INTEGER NOT NULL,
    license_plate VARCHAR(20) UNIQUE NOT NULL,
    capacity INTEGER DEFAULT 4,
    fuel_type VARCHAR(20) DEFAULT 'gasoline',
    status vehicle_status DEFAULT 'available',
    next_maintenance DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Drivers table
CREATE TABLE IF NOT EXISTS drivers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    license_number VARCHAR(50) UNIQUE NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(100),
    status vehicle_status DEFAULT 'available',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    booking_number VARCHAR(20) UNIQUE NOT NULL,
    requester_id INTEGER REFERENCES users(id),
    vehicle_id INTEGER REFERENCES vehicles(id),
    driver_id INTEGER REFERENCES drivers(id),
    destination TEXT NOT NULL,
    purpose TEXT NOT NULL,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    passenger_count INTEGER DEFAULT 1,
    status booking_status DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Approvals table
CREATE TABLE IF NOT EXISTS approvals (
    id SERIAL PRIMARY KEY,
    booking_id INTEGER REFERENCES bookings(id),
    approver_id INTEGER REFERENCES users(id),
    level approval_level NOT NULL,
    status booking_status NOT NULL,
    comments TEXT,
    approved_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Activity logs table
CREATE TABLE IF NOT EXISTS activity_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id INTEGER,
    details TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_bookings_requester_id ON bookings(requester_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_start_date ON bookings(start_date);
CREATE INDEX IF NOT EXISTS idx_approvals_booking_id ON approvals(booking_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_user_id ON activity_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON activity_logs(created_at);

-- Insert default admin user (password: admin123)
INSERT INTO users (username, password_hash, full_name, role, department) 
VALUES ('admin', '$2b$10$K8BVJZZy.KNJh2kIhJ5LJe4FJVZIhP3yKKTDYF0mZ0V1K8yMZIhJe', 'System Administrator', 'admin', 'IT') 
ON CONFLICT (username) DO NOTHING;

-- Insert sample approvers (password: approver123)
INSERT INTO users (username, password_hash, full_name, role, department, approval_level) 
VALUES 
    ('approver1', '$2b$10$K8BVJZZy.KNJh2kIhJ5LJe4FJVZIhP3yKKTDYF0mZ0V1K8yMZIhJe', 'John Doe', 'approver', 'Operations', 'level1'),
    ('approver2', '$2b$10$K8BVJZZy.KNJh2kIhJ5LJe4FJVZIhP3yKKTDYF0mZ0V1K8yMZIhJe', 'Jane Smith', 'approver', 'Management', 'level2')
ON CONFLICT (username) DO NOTHING;

-- Insert sample requester (password: user123)
INSERT INTO users (username, password_hash, full_name, role, department) 
VALUES ('user1', '$2b$10$K8BVJZZy.KNJh2kIhJ5LJe4FJVZIhP3yKKTDYF0mZ0V1K8yMZIhJe', 'Bob Wilson', 'requester', 'Sales') 
ON CONFLICT (username) DO NOTHING;

-- Insert sample vehicles
INSERT INTO vehicles (make, model, year, license_plate, capacity, fuel_type) 
VALUES 
    ('Toyota', 'Avanza', 2022, 'B1234XYZ', 7, 'gasoline'),
    ('Honda', 'CR-V', 2023, 'B5678ABC', 5, 'gasoline'),
    ('Mitsubishi', 'Xpander', 2021, 'B9012DEF', 7, 'gasoline')
ON CONFLICT (license_plate) DO NOTHING;

-- Insert sample drivers
INSERT INTO drivers (name, license_number, phone, email) 
VALUES 
    ('Ahmad Rizki', 'SIM001234567', '+62812345678', 'ahmad.rizki@company.com'),
    ('Siti Nurhaliza', 'SIM098765432', '+62823456789', 'siti.nurhaliza@company.com'),
    ('Budi Santoso', 'SIM567891234', '+62834567890', 'budi.santoso@company.com')
ON CONFLICT (license_number) DO NOTHING;