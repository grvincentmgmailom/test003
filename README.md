# User Management System with PostgREST

This is a simple user management system using HTML, JavaScript, and PostgREST to interact with a PostgreSQL database.

## Prerequisites

1. PostgreSQL installed on your system
2. PostgREST installed
3. Web browser

## Setup Instructions

### 1. Database Setup

1. Open PostgreSQL command prompt or pgAdmin
2. Execute the SQL commands in `database.sql`:
   ```bash
   psql -U postgres -f database.sql
   ```

### 2. Configure PostgREST

1. Edit `postgrest.conf`:
   - Update the `db-uri` with your PostgreSQL password
   - Save the file

2. Start PostgREST:
   ```bash
   postgrest postgrest.conf
   ```

### 3. Run the Application

1. You can use any simple HTTP server to serve the files. For example, with Python:
   ```bash
   python -m http.server 8080
   ```
   Or with Node.js's `http-server`:
   ```bash
   npx http-server
   ```

2. Open your browser and navigate to:
   - If using Python: `http://localhost:8080`
   - If using http-server: `http://localhost:8000`

## Features

- View all users
- Add new users
- Edit existing users
- Delete users

## API Endpoints

The following REST endpoints are available at `http://localhost:3000`:

- GET `/users` - List all users
- POST `/users` - Create a new user
- PATCH `/users?id=eq.{id}` - Update a user
- DELETE `/users?id=eq.{id}` - Delete a user