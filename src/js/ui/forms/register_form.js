import { registerUser } from "../../api/auth/api.js";

// Get necessary elements by their IDs
const registerButton = document.querySelector('#register_button');
const registrationForm = document.querySelector('#registration_form');
const closeRegister = document.querySelector('#register_close');

// Function to open the registration form modal
function openRegistrationForm() {
  registrationForm.style.display = 'flex';
}

// Function to close the registration form modal
function closeRegistrationForm() {
  registrationForm.style.display = 'none';

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

  const registerName = document.querySelector('#register_name').value;
  const registerEmail = document.querySelector('#register_email').value;
  const registerPassword = document.querySelector('#register_password').value;
  const registerAvatar = document.querySelector('#register_avatar').value;
  
  registerUser(registerName, registerEmail, registerPassword, registerAvatar);
});