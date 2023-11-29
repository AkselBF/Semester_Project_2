import { remove } from "../../storage/index.js";

// Function to clear the JWT token upon logout
export function logout() {
  remove('accessToken');
  remove('name');
  remove('email');
  remove('avatar');
  remove('credits');
}

// Event listener for the logout button
const logoutButton = document.querySelector('#logout');

if (logoutButton) {
  logoutButton.addEventListener('click', (event) => {
    event.preventDefault();
    logout();

    // Redirect the user to the login page after logout
    window.location.href = '/index.html';
  });
}

export default logout;


/*
//import { removeToken } from "../storage/token";

// Function to clear the JWT token upon logout
const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('name');
  localStorage.removeItem('email');
  localStorage.removeItem('avatar');
  localStorage.removeItem('credits');
};

// Event listener for the logout button
const logoutButton = document.querySelector('#logout');

if (logoutButton) {
  logoutButton.addEventListener('click', (event) => {
    event.preventDefault();
    logout();
    // Redirect the user to the login page after logout
    window.location.href = '../../../index.html';
  });
}
*/