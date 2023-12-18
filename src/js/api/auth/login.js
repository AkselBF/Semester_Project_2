import { authenticatedRequest } from './api.js';
import { save } from '../../storage/index.js';

// Function for login request
export const loginUser = async (email, password) => {
  try {
    const data = { email: email, password: password };
    const response = await authenticatedRequest('auth/login', 'POST', data);
    handleLoginResponse(response);
    return response;
  } 
  catch (error) {
    throw error.message;
  }
};

// Handle login response
const handleLoginResponse = (response) => {
  if (response.accessToken) {
    save('accessToken', response.accessToken);
    save('name', response.name || '');
    save('email', response.email || '');
    save('avatar', response.avatar || '');
    save('credits', response.credits || '');
    redirectToProfilePage();
  } 
  else {
    throw new Error('Invalid response format: No accessToken found.');
  }
};

// Redirect to the profile page dynamically including the repository name
const redirectToProfilePage = () => {
  const isGitHubPages = window.location.hostname.includes('github.io');
  const repositoryName = isGitHubPages ? window.location.pathname.split('/')[1] : '';
  const profilePagePath = `${repositoryName}/src/html/pages/profile.html`;
  window.location.href = `${window.location.origin}/${profilePagePath}`;
  //window.location.href = './src/html/pages/profile.html';
};