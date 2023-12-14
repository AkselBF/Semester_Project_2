import { authenticatedRequest } from './api.js';

export const registerUser = async (name, email, password, avatar) => {
  try {
    const data = { name: name, email: email, password: password, avatar: avatar };
    const response = await authenticatedRequest('auth/register', 'POST', data);
    
    console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
};