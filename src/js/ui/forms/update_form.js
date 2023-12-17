import { updateUserAvatar, saveUpdatedAvatarToStorage } from '../../api/auth/update_avatar.js';

// Get necessary elements by their IDs
const avatarWrapper = document.querySelector('#avatar_wrapper');
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

// Event listener for submitting the update form
document.querySelector('#update_form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const updatedImageUrl = document.querySelector('#update_img').value;

  try {
    const updatedAvatar = await updateUserAvatar(updatedImageUrl);
    profileAvatar.src = updatedAvatar;

    closeUpdateAvatarForm();
    saveUpdatedAvatarToStorage(updatedAvatar);
  } 
  catch (error) {
    console.error('Error updating avatar:', error);
  }

  profileAvatar.src = updatedImageUrl;
  localStorage.setItem('avatar', updatedImageUrl);

  closeUpdateAvatarForm();
});