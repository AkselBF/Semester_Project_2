// Get necessary elements by their IDs
const addButton = document.querySelector('#add_listing_btn');
const addingForm = document.querySelector('#adding_form');
const closeAdd = document.querySelector('#add_close');

// Function to open the add form modal
function openAddingForm() {
  addingForm.style.display = 'flex';
}

// Function to close the add form modal
function closeAddingForm() {
  addingForm.style.display = 'none';

  document.querySelector('#add_form').reset();
}

// Event listeners to trigger opening and closing of the modal
addButton.addEventListener('click', openAddingForm);
closeAdd.addEventListener('click', closeAddingForm);

// Close modal if user clicks outside the form
addingForm.addEventListener('click', (event) => {
  if (event.target === addingForm) {
    closeAddingForm();
  }
});

// Prevent modal from closing when clicking inside the form
document.querySelector('#add_form').addEventListener('click', (event) => {
  event.stopPropagation();
});

// Handling form submission
document.querySelector('#add_form').addEventListener('submit', (event) => {
  event.preventDefault();

  const addTitle = document.querySelector('#add_title').value;
  const addDescription = document.querySelector('#add_description').value;
  const addImage = document.querySelector('#add_image').value;
  const addDate = document.querySelector('#add_date').value;
  
  //registerUser(registerName, registerEmail, registerPassword, registerAvatar);
});