import { authenticatedRequest } from './auth/api.js';

// Function to fetch user profile data
export const fetchUserProfile = async () => {
  try {
    const endpoint = 'profile';
    const response = await authenticatedRequest(endpoint);
    return response;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw new Error('Failed to fetch user profile data.');
  }
};

export const fetchUserData = async () => {
  try {
    const response = await authenticatedRequest('user');
    return response;
  } catch (error) {
    throw new Error('Failed to fetch user data');
  }
};