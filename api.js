const API_URL = "http://localhost:5001/api";

export const login = async (email, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    return res.json();
};

export const getProfile = async (token) => {
    const res = await fetch(`${API_URL}/users/profile`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
};
import { api } from './utils/api';

// Example: Fetch user profile
async function fetchUserProfile() {
  try {
    const response = await api.get(`${API_BASE_URL}/auth/profile`);
    console.log('User profile:', response);
  } catch (error) {
    console.error('Error fetching profile:', error);
  }
}