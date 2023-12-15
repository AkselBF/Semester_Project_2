import { authenticatedRequest } from './api.js';
import { save } from '../../storage/index.js';


//const errorMessagesContainer = document.querySelector('#error_message');

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
    //throw error;
    /*
    if (error.response && error.response.status === 401) {
      displayLoginError('Invalid email or password');
    }*/
  }
};
/*
// Function to display login error message
const displayLoginError = (message) => {
  errorMessagesContainer.textContent = message;
};
*/

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
/*
// Redirect to the profile page
const redirectToProfilePage = () => {
  window.location.href = './src/html/pages/profile.html';
};*/

// Redirect to the profile page dynamically including the repository name
const redirectToProfilePage = () => {
  const isGitHubPages = window.location.hostname.includes('github.io');
  const repositoryName = isGitHubPages ? window.location.pathname.split('/')[1] : '';
  const profilePagePath = `${repositoryName}/src/html/pages/profile.html`;
  window.location.href = `${window.location.origin}/${profilePagePath}`;
};