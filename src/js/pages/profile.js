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
  console.log(avatar);
} 
else {
  window.location.href = "../../../index.html"; 
} 

// Call checkAuthentication at the beginning of the profile page script
checkAuthentication();