import { loginUser } from "../../api/auth/login.js";

// Get necessary elements by their IDs
const loginButton = document.querySelector('#login_button');
const loginForm = document.querySelector('#login_form');
const closeLogin = document.querySelector('#login_close');

const loginEmailInput = document.querySelector('#login_email');
const loginPasswordInput = document.querySelector('#login_password');

const loginEmailError = document.querySelector('#login_email_error');
const loginPasswordError = document.querySelector('#login_password_error');

const loginSubmit = document.querySelector('#submit_login');

// Function to open the registration form modal
function openLoginForm() {
  loginForm.style.display = 'flex';

  loginSubmit.disabled = true;
  loginSubmit.style.opacity = '0.5';
}

// Function to close the registration form modal
function closeLoginForm() {
  loginForm.style.display = 'none';

  loginEmailInput.style.border = '';
  loginPasswordInput.style.border = '';

  loginEmailError.textContent = '';
  loginPasswordError.textContent = '';

  loginSubmit.disabled = true;
  loginSubmit.style.opacity = '0.5';

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

/*
// Handling form submission
document.querySelector('#log_form').addEventListener('submit', (event) => {
  event.preventDefault();

  const loginEmail = document.querySelector('#login_email').value;
  const loginPassword = document.querySelector('#login_password').value;

  loginUser(loginEmail, loginPassword);
});*/

// Handling form submission
document.querySelector('#log_form').addEventListener('submit', (event) => {
  event.preventDefault();

  const loginEmail = loginEmailInput.value;
  const loginPassword = loginPasswordInput.value;

  loginUser(loginEmail, loginPassword);
});


/*
  For better form validation
*/
loginEmailInput.addEventListener('input', () => {
  validateForm();
})

loginPasswordInput.addEventListener('input', () => {
  validateForm();
})

// Function to validate the entire form and enable/disable submit button
function validateForm() {
  const emailValid = /^[a-zA-Z0-9._-]+@(noroff\.no|stud\.noroff\.no)$/.test(loginEmailInput.value.trim());
  const passwordValid = loginPasswordInput.value.trim().length >= 8;
  //const passwordValid = /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/.test(loginPasswordInput.value.trim());

  // Enable submit button only if all inputs are valid
  if (emailValid && passwordValid) {
    loginSubmit.disabled = false;
    loginSubmit.style.opacity = '1';
  } 
  else {
    loginSubmit.disabled = true;
    loginSubmit.style.opacity = '0.5';
  }
}

// Event listeners for input validation
loginEmailInput.addEventListener('input', validateForm);
loginPasswordInput.addEventListener('input', validateForm);

// Initial validation check on page load
validateForm();