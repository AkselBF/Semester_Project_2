// Get necessary elements by their IDs
const avatarWrapper = document.querySelector('#avatar_wrapper');
const avatarTooltip = document.querySelector('#avatar_tooltip');
const updateAvatarForm = document.querySelector('#update_avatar_form');
const updateClose = document.querySelector('#update_close');
const profileAvatar = document.querySelector('#profile_avatar');

// Function to open the update avatar form
function openUpdateAvatarForm() {
  updateAvatarForm.style.display = 'flex';
}

// Function to close the update avatar form
function closeUpdateAvatarForm() {
  updateAvatarForm.style.display = 'none';

  // Reset the form upon closing
  document.querySelector('#update_form').reset();
}

// Event listener to trigger opening the update avatar form
avatarWrapper.addEventListener('click', () => {
  openUpdateAvatarForm();
});

// Event listener to close the update avatar form
updateClose.addEventListener('click', () => {
  closeUpdateAvatarForm();
});

// Close the form if the user clicks outside the form
updateAvatarForm.addEventListener('click', (event) => {
  if (event.target === updateAvatarForm) {
    closeUpdateAvatarForm();
  }
});

// Prevent the form from closing when clicking inside the form
document.querySelector('#update_form').addEventListener('click', (event) => {
  event.stopPropagation();
});

// Event listener for submitting the update form (you can add your logic here)
document.querySelector('#update_form').addEventListener('submit', (event) => {
  event.preventDefault();

  // Fetch the updated image URL from the input field
  const updatedImageUrl = document.querySelector('#update_img').value;

  // Perform the necessary logic to update the avatar image with the new URL
  // For example, you can update the profileAvatar.src here
  profileAvatar.src = updatedImageUrl;

  // Close the form after updating the image (if needed)
  closeUpdateAvatarForm();
});