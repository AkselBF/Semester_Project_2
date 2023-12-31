import { remove } from "../../storage/index.js";

// Function to clear the JWT token and user data upon logout
export function logout() {
  remove('accessToken');
  remove('name');
  remove('email');
  remove('avatar');
  remove('credits');
}

// Event listener for the logout button
const logoutButton = document.querySelector('#logout');
const logoutBButton = document.querySelector('#b_logout');

if (logoutButton) {
  logoutButton.addEventListener('click', (event) => {
    event.preventDefault();
    logout();

    // Redirect the user to the login page after logout
    const isGitHubPages = window.location.hostname.includes('github.io');
    const repositoryName = isGitHubPages ? window.location.pathname.split('/')[1] : '';
    const loginPagePath = `${repositoryName}/index.html`;
    window.location.href = `${window.location.origin}/${loginPagePath}`;
    //window.location.href = '/index.html';
  });
}

if (logoutBButton) {
  logoutBButton.addEventListener('click', (event) => {
    event.preventDefault();
    logout();

    // Redirect the user to the login page after logout
    const isGitHubPages = window.location.hostname.includes('github.io');
    const repositoryName = isGitHubPages ? window.location.pathname.split('/')[1] : '';
    const loginPagePath = `${repositoryName}/index.html`;
    window.location.href = `${window.location.origin}/${loginPagePath}`;
    //window.location.href = '/index.html';
  });
}

export default logout;