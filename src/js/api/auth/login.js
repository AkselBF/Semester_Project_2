
import { authenticatedRequest } from './api.js';
import { saveToken } from '../../storage/index.js';

// Function for login request
export const loginUser = async (email, password) => {
  try {
    const data = { email: email, password: password };
    const response = await authenticatedRequest('auth/login', 'POST', data);
    handleLoginResponse(response);
    return response;
  } 
  catch (error) {
    console.error(error);
    throw error;
  }
};

// Handle login response
const handleLoginResponse = (response) => {
  if (response.accessToken) {
    saveToken(response.accessToken);
    saveUserData(response);
    redirectToProfilePage();
  } 
  else {
    throw new Error('Invalid response format: No accessToken found.');
  }
};

// Save user data to localStorage
const saveUserData = (userData) => {
  localStorage.setItem('name', userData.name ? userData.name : '');
  localStorage.setItem('email', userData.email || '');
  localStorage.setItem('avatar', userData.avatar || '');
  localStorage.setItem('credits', userData.credits || '');
};

// Redirect to the profile page
const redirectToProfilePage = () => {
  window.location.href = '/src/html/pages/profile.html';
};
