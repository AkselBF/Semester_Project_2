import { baseUrl } from '../constants.js';
import { loadToken } from '../../storage/token.js';

// Function to make authenticated API requests
export const authenticatedRequest = async (endpoint, method = 'GET', data = null) => {
  const token = loadToken();

  console.log(data);

  const requestOptions = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: data ? JSON.stringify(data) : null,
  };

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, requestOptions);
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    return await response.json();
  } 
  catch (error) {
    console.error('Error:', error);
    throw new Error('Failed to fetch data.');
  }
};

// Example function for registration request
export const registerUser = async (name, email, password, avatar) => {
  try {
    const data = { name: name, email: email, password: password, avatar: avatar };
    const response = await authenticatedRequest('auth/register', 'POST', data);
    // Handle response data here
    console.log(response);
    return response;
  } 
  catch (error) {
    throw error;
  }
};

// Example function for login request
export const loginUser = async (email, password) => {
  try {
    const data = { email: email, password: password };
    const response = await authenticatedRequest('auth/login', 'POST', data);
    //const jsonResponse = await response.json();
    // Handle response data here
    
    if (response.accessToken) {
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("name", response.name || '');
      localStorage.setItem("email", response.email || '');
      localStorage.setItem("avatar", response.avatar || '');      
      localStorage.setItem("credits", response.credits || '');

      //localStorage.setItem("credits", jsonResponse.credits);

      console.log(response);

      window.location.href = '../../../../index.html';

      return response;
    } else {
      throw new Error('Invalid response format: No accessToken found.');
    }
  } 
  catch (error) {
    console.error(error);
    throw error;
  }
};