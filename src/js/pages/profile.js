import { checkAuthentication } from '../storage/auth.js';

const name = localStorage.getItem("name");
const email = localStorage.getItem("email");
const avatar = localStorage.getItem("avatar");
const credits = localStorage.getItem("credits");

// Check if user is logged in
const token = localStorage.getItem("accessToken");

if (token && name && email && avatar) {
  document.querySelector("#profile_name").textContent = name;
  document.querySelector("#profile_email").textContent = email;
  document.querySelector("#profile_avatar").src = avatar;
  document.querySelector("#profile_credits").textContent = `Credits: ${credits}`;
} 
else {
  window.location.href = "/index.html"; 
} 

// Call checkAuthentication at the beginning of the profile page script
checkAuthentication();


/*
import { fetchUserProfile } from "../api/userApi";

// Function to update the profile page with user data
const updateProfile = (userData) => {
  // Update the DOM elements with the fetched user data
  // For instance:
  document.getElementById('profile_name').textContent = userData.name;
  document.getElementById('profile_email').textContent = userData.email;
  // Update other elements as needed
};

// Fetch user profile when the script runs (at the end of the body tag)
(async () => {
  try {
    const userData = await fetchUserProfile(); // Assuming fetchUserProfile retrieves user data
    updateProfile(userData);
  } catch (error) {
    console.error('Error fetching user data:', error);
    // Handle errors, such as displaying an error message on the page
  }
})();
*/