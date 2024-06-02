-- Define roles for users
CREATE TYPE ROLE AS ENUM ('vet', 'assistant', 'receptionist', 'admin');

-- Table to store information about staff members
CREATE TABLE staff (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role ROLE NOT NULL DEFAULT 'vet',
    email VARCHAR(255) NOT NULL UNIQUE,
    phone_number VARCHAR(20) NOT NULL UNIQUE,
    registered_on DATE NOT NULL
);

-- Define statuses for appointments and treatments
CREATE TYPE APPOINTMENT_STATUS AS ENUM ('scheduled', 'completed', 'cancelled');
CREATE TYPE TREATMENT_STATUS AS ENUM ('pending', 'in progress', 'completed');

-- Table to store information about animals
CREATE TABLE animals (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    species VARCHAR(100) NOT NULL,
    breed VARCHAR(100),
    date_of_birth DATE,
    owner_name VARCHAR(255) NOT NULL,
    owner_email VARCHAR(255),
    owner_phone_number VARCHAR(20),
    registered_on DATE NOT NULL
);

-- Table to store information about appointments
CREATE TABLE appointments (
    id SERIAL PRIMARY KEY,
    animal_id INT NOT NULL,
    staff_id INT NOT NULL,
    appointment_date TIMESTAMP NOT NULL,
    status APPOINTMENT_STATUS NOT NULL DEFAULT 'scheduled',
    CONSTRAINT fk_animals FOREIGN KEY(animal_id) REFERENCES animals(id),
    CONSTRAINT fk_staff FOREIGN KEY(staff_id) REFERENCES staff(id)
);

-- Table to store information about treatments
CREATE TABLE treatments (
    id SERIAL PRIMARY KEY,
    appointment_id INT NOT NULL,
    treatment_name VARCHAR(255) NOT NULL,
    status TREATMENT_STATUS NOT NULL DEFAULT 'pending',
    CONSTRAINT fk_appointments FOREIGN KEY(appointment_id) REFERENCES appointments(id)
);

-- update 
-- Define roles for users
CREATE TYPE ROLE AS ENUM ('user', 'admin', 'owner');

-- Table to store information about users
ALTER TABLE staff
ADD COLUMN role ROLE NOT NULL DEFAULT 'vet';

-- Drop the existing role column from the staff table
ALTER TABLE staff
DROP COLUMN role;

-- Change the default role to 'user' for users who don't have a role assigned
ALTER TABLE staff
ALTER COLUMN role SET DEFAULT 'user';

-- Define statuses for projects and tasks
CREATE TYPE PROJECT_STATUS AS ENUM ('ongoing', 'done');
CREATE TYPE TASK_STATUS AS ENUM ('to do', 'in progress', 'done');

-- Change the status column in the appointments table to use the APPOINTMENT_STATUS enum
ALTER TABLE appointments
ALTER COLUMN status TYPE APPOINTMENT_STATUS USING status::text::APPOINTMENT_STATUS;

-- Change the status column in the treatments table to use the TREATMENT_STATUS enum
ALTER TABLE treatments
ALTER COLUMN status TYPE TREATMENT_STATUS USING status::text::TREATMENT_STATUS;

-- Drop the existing status enum types
DROP TYPE APPOINTMENT_STATUS;
DROP TYPE TREATMENT_STATUS;

-- Table to store information about animals
ALTER TABLE animals
ADD COLUMN owner_id INT;

-- Add a foreign key constraint to reference the users table
ALTER TABLE animals
ADD CONSTRAINT fk_owner FOREIGN KEY(owner_id) REFERENCES users(id);

-- Define statuses for appointments and treatments
CREATE TYPE APPOINTMENT_STATUS AS ENUM ('scheduled', 'completed', 'cancelled');
CREATE TYPE TREATMENT_STATUS AS ENUM ('pending', 'in progress', 'completed');

-- Table to store information about appointments
ALTER TABLE appointments
ALTER COLUMN status TYPE APPOINTMENT_STATUS USING status::text::APPOINTMENT_STATUS;

-- Table to store information about treatments
ALTER TABLE treatments
ALTER COLUMN status TYPE TREATMENT_STATUS USING status::text::TREATMENT_STATUS;