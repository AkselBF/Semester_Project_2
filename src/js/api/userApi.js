import { authenticatedRequest } from './auth/api.js';

// Function to fetch user profile data
export const fetchUserProfile = async () => {
  try {
    const endpoint = 'profile'; // Adjust to the actual endpoint for fetching user profile data
    const response = await authenticatedRequest(endpoint);
    return response;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw new Error('Failed to fetch user profile data.');
  }
};

export const fetchUserData = async () => {
  try {
    const response = await authenticatedRequest('user'); // Assuming 'user' is the endpoint to fetch user details
    return response; // Assuming the API returns user data in JSON format
  } catch (error) {
    throw new Error('Failed to fetch user data');
  }
};