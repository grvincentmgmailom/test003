-- Create the database
CREATE DATABASE user_management;

-- Connect to the database
\c user_management

-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert some sample data
INSERT INTO users (name, email) VALUES
    ('John Doe', 'john@example.com'),
    ('Jane Smith', 'jane@example.com');

-- Create a role for PostgREST
CREATE ROLE web_anon nologin;
GRANT web_anon TO postgres;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO web_anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON users TO web_anon;
GRANT USAGE, SELECT ON SEQUENCE users_id_seq TO web_anon;