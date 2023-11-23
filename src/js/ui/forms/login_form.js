import { loginUser } from "../../api/auth/api.js";

// Get necessary elements by their IDs
const loginButton = document.querySelector('#login_button');
const loginForm = document.querySelector('#login_form');
const closeLogin = document.querySelector('#login_close');

// Function to open the registration form modal
function openLoginForm() {
  loginForm.style.display = 'flex';
}

// Function to close the registration form modal
function closeLoginForm() {
  loginForm.style.display = 'none';

  document.querySelector('#log_form').reset();
}

// Event listeners to trigger opening and closing of the modal
loginButton.addEventListener('click', openLoginForm);
closeLogin.addEventListener('click', closeLoginForm);

// Close modal if user clicks outside the form
loginForm.addEventListener('click', (event) => {
  if (event.target === loginForm) {
    closeLoginForm();
  }
});

// Prevent modal from closing when clicking inside the form
document.querySelector('#log_form').addEventListener('click', (event) => {
  event.stopPropagation();
});

// Handling form submission
document.querySelector('#log_form').addEventListener('submit', (event) => {
  event.preventDefault();

  const loginEmail = document.querySelector('#login_email').value;
  const loginPassword = document.querySelector('#login_password').value;

  loginUser(loginEmail, loginPassword);
});