import { headers } from "../../api/headers.js";
import { load } from "../../storage/index.js";
import { baseUrl } from "../../api/constants.js";
import { displayListings, fetchListings } from '../../pages/listings.js';

// Get necessary elements by their IDs
const addButton = document.querySelector('#add_listing_btn');
const addingForm = document.querySelector('#adding_form');
const closeAdd = document.querySelector('#add_close');

const addTitleInput = document.querySelector('#add_title');
const addDescriptionInput = document.querySelector('#add_description');
const addDateInput = document.querySelector('#add_date');

const addSubmit = document.querySelector('#submit_add');


// Function to open the add form modal
function openAddingForm() {
  addingForm.style.display = 'flex';

  addSubmit.disabled = true;
  addSubmit.style.opacity = '0.5';
}

// Function to close the add form modal
function closeAddingForm() {
  addingForm.style.display = 'none';

  addSubmit.disabled = true;
  addSubmit.style.opacity = '0.5';

  document.querySelector('#add_form').reset();

  resetImageInputBorders();
}

// Function to reset the border colors of image inputs
function resetImageInputBorders() {
  const imageInputs = document.querySelectorAll('#image_container input');
  imageInputs.forEach(input => {
    input.style.border = '';
  });
}

// If the user is logged in
function isLoggedIn() {
  const token = load('accessToken')
  return token !== null && token !== undefined && token !== '';
}

function toggleAddButtonVisibility() {
  if (isLoggedIn()) {
    addButton.style.display = 'block';
  } else {
    addButton.style.display = 'none';
  }
}

// Event listeners to trigger opening and closing of the modal
addButton.addEventListener('click', openAddingForm);
closeAdd.addEventListener('click', closeAddingForm);

toggleAddButtonVisibility();


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


// Get the container for the image inputs
const imageContainer = document.querySelector('#image_container');
const addInputButton = document.querySelector('#add_input_button');

// Keep track of the number of image inputs
let imageCount = 1;

// Function to add a new image input field
const addImageInput = () => {
  if (imageCount < 8) { // Limit to 8 image inputs
    const inputWrapper = document.createElement('div');
    inputWrapper.className = 'flex flex-row justify-center text-center';

    const newInput = document.createElement('input');
    newInput.type = 'url';
    newInput.placeholder = 'Image url';
    newInput.name = `image_${imageCount}`;
    newInput.className = 'w-11/12 md:w-[400px] rounded-l-md px-3 text-black';
  
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '-';
    deleteButton.className = 'bg-button_blue text-white text-2xl font-bold text-center align-middle px-3 rounded-r-md';

    // Add event listener to delete the input on button click
    deleteButton.addEventListener('click', () => {
      imageContainer.removeChild(inputWrapper);
      imageCount--;
    });

    inputWrapper.appendChild(newInput);
    inputWrapper.appendChild(deleteButton);

    imageContainer.appendChild(inputWrapper);
    imageCount++;
  }
};

// Event listener for the add button
addInputButton.addEventListener('click', addImageInput);


// Handling form submission
document.querySelector('#add_form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const addTitle = addTitleInput.value;
  const addDescription = addDescriptionInput.value;
  const addDate = addDateInput.value;
  const dateWithoutTime = `${addDate}`;

  // Get all image inputs
  const imageInputs = document.querySelectorAll('#image_container input');
  const media = [];

  imageInputs.forEach(input => {
    media.push(input.value);
  });
  
  // Create a new listing object
  const newListing = {
    title: addTitle,
    description: addDescription,
    media: media,
    endsAt: dateWithoutTime,
  };

  console.log(newListing);

  try {
    //const accessToken = load('accessToken');
    // Send a request to the api to add the new listing
    const response = await fetch(`${baseUrl}listings`, {
      method: 'POST',
      headers: headers('application/json'),
      body: JSON.stringify(newListing),
    });

    if (!response.ok) {
      throw new Error('Failed to add a new listing');
    }

    // Close the modal form upon successful submission
    closeAddingForm();

    // Fetch and display updated listings
    const updatedListings = await fetchListings();
    displayListings(updatedListings);

    window.location.reload();
  } 
  catch (error) {
    console.error('Error adding a new listing:', error);
  }
});

// Validate inputs
addTitleInput.addEventListener('input', () => {
  validateListing();
})

addDescriptionInput.addEventListener('input', () => {
  validateListing();
})

addDateInput.addEventListener('input', () => {
  validateListing();
})

// Function to validate image URLs
function isValidImageUrl(url) {
  const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;

  return url === '' || (urlPattern.test(url) && /\.(jpeg|jpg|gif|png|svg)$/.test(url));
}

// Function to validate all image inputs
function validateImageInputs() {
  const imageInputs = document.querySelectorAll('#image_container input');

  let valid = true;

  imageInputs.forEach(input => {
    if (!isValidImageUrl(input.value)) {
      input.style.border = '2px solid red';
      valid = false;
    } else {
      input.style.border = '';
    }
  });

  return valid;
}

function validateListing() {
  const titleValid = addTitleInput.value.trim().length >= 1;
  const descValid = addDescriptionInput.value.trim().length >= 1;
  const dateValid = addDateInput.value.trim().length >= 1;
  const imageInputsValid = validateImageInputs();

  if (titleValid && descValid && dateValid && imageInputsValid) {
    addSubmit.disabled = false;
    addSubmit.style.opacity = '1';
  } else {
    addSubmit.disabled = true;
    addSubmit.style.opacity = '0.5';
  }
}

imageContainer.addEventListener('input', validateListing);