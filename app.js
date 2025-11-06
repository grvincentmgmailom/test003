// Configuration
const API_BASE_URL = 'http://localhost:3000';

// DOM Elements
const userForm = document.getElementById('userForm');
const usersTableBody = document.getElementById('usersTableBody');
const submitBtn = document.getElementById('submitBtn');
const userIdInput = document.getElementById('userId');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');

// Event Listeners
document.addEventListener('DOMContentLoaded', loadUsers);
userForm.addEventListener('submit', handleFormSubmit);

// Load all users
async function loadUsers() {
    try {
        const response = await fetch(`${API_BASE_URL}/users`);
        const users = await response.json();
        displayUsers(users);
    } catch (error) {
        console.error('Error loading users:', error);
        alert('Failed to load users');
    }
}

// Display users in the table
function displayUsers(users) {
    usersTableBody.innerHTML = '';
    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>
                <button onclick="editUser(${user.id})" class="action-btn edit-btn">Edit</button>
                <button onclick="deleteUser(${user.id})" class="action-btn delete-btn">Delete</button>
            </td>
        `;
        usersTableBody.appendChild(row);
    });
}

// Handle form submission (create/update user)
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const userData = {
        name: nameInput.value,
        email: emailInput.value
    };

    const userId = userIdInput.value;
    const method = userId ? 'PATCH' : 'POST';
    const url = userId ? `${API_BASE_URL}/users?id=eq.${userId}` : `${API_BASE_URL}/users`;

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) throw new Error('Failed to save user');

        resetForm();
        loadUsers();
    } catch (error) {
        console.error('Error saving user:', error);
        alert('Failed to save user');
    }
}

// Edit user
async function editUser(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/users?id=eq.${id}`);
        const [user] = await response.json();
        
        userIdInput.value = user.id;
        nameInput.value = user.name;
        emailInput.value = user.email;
        submitBtn.textContent = 'Update User';
    } catch (error) {
        console.error('Error loading user for edit:', error);
        alert('Failed to load user for editing');
    }
}

// Delete user
async function deleteUser(id) {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
        const response = await fetch(`${API_BASE_URL}/users?id=eq.${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Failed to delete user');
        loadUsers();
    } catch (error) {
        console.error('Error deleting user:', error);
        alert('Failed to delete user');
    }
}

// Reset form
function resetForm() {
    userForm.reset();
    userIdInput.value = '';
    submitBtn.textContent = 'Add User';
}