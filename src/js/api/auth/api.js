import { baseUrl } from '../constants.js';
import { headers } from '../headers.js';
import { load } from '../../storage/index.js';

// Function to make authenticated API requests
export const authenticatedRequest = async (endpoint, method = 'GET', data = null) => {
  const token = load('accessToken');
  //console.log(data);

  const requestOptions = {
    method,
    headers: headers('application/json'),
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
    //console.error('Error:', error);
    throw new Error('Failed to fetch data.');
  }
};