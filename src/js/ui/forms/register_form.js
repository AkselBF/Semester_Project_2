import { registerUser } from "../../api/auth/register.js";

// Get necessary elements by their IDs
const registerButton = document.querySelector('#register_button');
const registrationForm = document.querySelector('#registration_form');
const closeRegister = document.querySelector('#register_close');

const registerNameInput = document.querySelector('#register_name');
const registerEmailInput = document.querySelector('#register_email');
const registerPasswordInput = document.querySelector('#register_password');
const registerAvatarInput = document.querySelector('#register_avatar');

// Get references to error message elements
const emailError = document.querySelector('#email_error');
const passwordError = document.querySelector('#password_error');
const avatarError = document.querySelector('#avatar_error');

// Submit form data
const registerSubmit = document.querySelector('#submit_registration');


// Function to open the registration form modal
function openRegistrationForm() {
  registrationForm.style.display = 'flex';

  registerSubmit.disabled = true;
  registerSubmit.style.opacity = '0.5';
}

// Function to close the registration form modal
function closeRegistrationForm() {
  registrationForm.style.display = 'none';

  registerNameInput.style.border = '';
  registerEmailInput.style.border = '';
  registerPasswordInput.style.border = '';
  registerAvatarInput.style.border = '';

  emailError.textContent = '';
  passwordError.textContent = '';
  avatarError.textContent = '';

  registerSubmit.disabled = true;
  registerSubmit.style.opacity = '0.5';

  document.querySelector('#register_form').reset();
}

// Event listeners to trigger opening and closing of the modal
registerButton.addEventListener('click', openRegistrationForm);
closeRegister.addEventListener('click', closeRegistrationForm);

// Close modal if user clicks outside the form
registrationForm.addEventListener('click', (event) => {
  if (event.target === registrationForm) {
    closeRegistrationForm();
  }
});

// Prevent modal from closing when clicking inside the form
document.querySelector('#register_form').addEventListener('click', (event) => {
  event.stopPropagation();
});

// Handling form submission
document.querySelector('#register_form').addEventListener('submit', (event) => {
  event.preventDefault();

  const registerName = registerNameInput.value;
  const registerEmail = registerEmailInput.value;
  const registerPassword = registerPasswordInput.value;
  const registerAvatar = registerAvatarInput.value;
  
  registerUser(registerName, registerEmail, registerPassword, registerAvatar);
  closeRegistrationForm();
});

// For better form validation
// Name input
registerNameInput.addEventListener('input', () => {
  validateForm();
})

// Email input
registerEmailInput.addEventListener('input', () => {
  const email = registerEmailInput.value.trim();
  const emailPattern = /^(?=.*[@])(?=.*\.)(?=.*\bstud\.noroff\.no$).+/i;
  //const emailPattern = /^(?=.*[@])(?=.*\.(?=.{2,}))(?=.*\b(?:noroff\.no|stud\.noroff\.no)$).+/i;

  if (email === '') {
    emailError.textContent = '';
    registerEmailInput.style.border = '';
    return;
  }

  if (!emailPattern.test(email)) {
    registerEmailInput.style.border = '2px solid red';
    emailError.textContent = 'Invalid email format';
    emailError.style.display = 'block';
  } 
  else {
    registerEmailInput.style.border = '2px solid #0eff00';
    emailError.textContent = '';
    emailError.style.display = 'none';
  }

  validateForm();
})

// Password input
registerPasswordInput.addEventListener('input', () => {
  validateForm();
})

// Validate if the avatar is valid if needed
registerAvatarInput.addEventListener('input', () => {
  const avatarUrl = registerAvatarInput.value.trim();
  const avatarRegex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;

  if (avatarUrl === '') {
    avatarError.textContent = '';
    registerAvatarInput.style.border = '';
    registerSubmit.disabled = false;
    return;
  } 
  else if (avatarRegex.test(avatarUrl)) {
    registerAvatarInput.style.border = '2px solid #0eff00';
    avatarError.textContent = '';
    registerSubmit.disabled = false;
  } 
  else {
    registerAvatarInput.style.border = '2px solid red';
    avatarError.textContent = 'Please enter a valid image URL';
    registerSubmit.disabled = true;
  }
});

// Function to validate the entire form and enable/disable submit button
function validateForm() {
  const nameValid = registerNameInput.value.trim().length >= 1;
  const emailValid = /^[a-zA-Z0-9._-]+@(noroff\.no|stud\.noroff\.no)$/.test(registerEmailInput.value.trim());
  const passwordValid = registerPasswordInput.value.trim().length >= 8;

  const avatarUrl = registerAvatarInput.value.trim();
  const avatarRegex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;
  const avatarValid = avatarUrl === '' || avatarRegex.test(avatarUrl);

  // Enable submit button only if all inputs are valid
  if (nameValid && emailValid && passwordValid && avatarValid) {
    registerSubmit.disabled = false;
    registerSubmit.style.opacity = '1';
  } 
  else {
    registerSubmit.disabled = true;
    registerSubmit.style.opacity = '0.5';
  }
}

// Event listeners for input validation
registerNameInput.addEventListener('input', validateForm);
registerEmailInput.addEventListener('input', validateForm);
registerPasswordInput.addEventListener('input', validateForm);
registerAvatarInput.addEventListener('input', validateForm);

validateForm();