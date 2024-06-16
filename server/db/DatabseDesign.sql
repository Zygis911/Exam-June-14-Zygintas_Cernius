-- Define roles for staff members and customers
CREATE TYPE ROLE AS ENUM ('vet', 'assistant', 'receptionist', 'admin', 'customer');

-- Table to store information about users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role ROLE NOT NULL DEFAULT 'customer',
    registered_on DATE NOT NULL
);

-- Table to store information about animals
CREATE TABLE animals (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    species VARCHAR(100) NOT NULL,
    breed VARCHAR(100),
    date_of_birth DATE,
    owner_id INT NOT NULL,
    registered_on DATE NOT NULL,
    CONSTRAINT fk_users FOREIGN KEY(owner_id) REFERENCES users(id)
);

-- Define statuses for appointments and treatments
CREATE TYPE APPOINTMENT_STATUS AS ENUM ('scheduled', 'completed', 'cancelled');
CREATE TYPE TREATMENT_STATUS AS ENUM ('pending', 'in progress', 'completed');

-- Table to store information about staff members
CREATE TABLE staff (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role ROLE NOT NULL DEFAULT 'vet',
    email VARCHAR(255) NOT NULL UNIQUE,
    phone_number VARCHAR(20) NOT NULL UNIQUE,
    registered_on DATE NOT NULL
);

-- Table to store information about appointments
CREATE TABLE appointments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    -- appointment_date TIMESTAMP NOT NULL,
    status APPOINTMENT_STATUS NOT NULL DEFAULT 'scheduled'
    -- CONSTRAINT fk_animals FOREIGN KEY(animal_id) REFERENCES animals(id),
    -- CONSTRAINT fk_staff FOREIGN KEY(staff_id) REFERENCES staff(id)
);

-- Table to store information about treatments
CREATE TABLE treatments (
    id SERIAL PRIMARY KEY,
    appointment_id INT NOT NULL,
    treatment_name VARCHAR(255) NOT NULL,
    status TREATMENT_STATUS NOT NULL DEFAULT 'pending',
    CONSTRAINT fk_appointments FOREIGN KEY(appointment_id) REFERENCES appointments(id)
);

-- update  2024-06-16
BEGIN;

-- Step 1: Remove Foreign Key Constraints
ALTER TABLE appointments DROP CONSTRAINT fk_animals;
ALTER TABLE appointments DROP CONSTRAINT fk_staff;

-- Step 2: Add New Columns
ALTER TABLE appointments ADD COLUMN name VARCHAR(255) NOT NULL;
ALTER TABLE appointments ADD COLUMN description TEXT NOT NULL;

-- Step 3: Drop Existing Columns
ALTER TABLE appointments DROP COLUMN animal_id;
ALTER TABLE appointments DROP COLUMN staff_id;

ALTER TABLE appointments
DROP COLUMN appointment_date;

COMMIT;