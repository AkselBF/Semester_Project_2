import { baseUrl } from '../constants.js';
import { headers } from '../headers.js';

// Function to make authenticated API requests
export const authenticatedRequest = async (endpoint, method = 'GET', data = null) => {
  const requestOptions = {
    method,
    headers: headers('application/json'),
    body: data ? JSON.stringify(data) : null,
  };

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, requestOptions);
    
    if (!response.ok) {
      const errorMessage = `Network response was not ok. Status: ${response.status} - ${response.statusText}`;
      throw errorMessage;
    }
    return await response.json();
  } 
  catch (error) {
    throw error;
  }
};