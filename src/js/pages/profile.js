import { checkAuthentication } from '../storage/auth.js';
import { load } from '../storage/index.js';

const name = load("name");
const email = load("email");
const avatar = load("avatar");
const credits = load("credits");

// Check if user is logged in
const token = load("accessToken");


if (token && name && email && avatar) {
  document.querySelector("#profile_name").textContent = name;
  document.querySelector("#profile_email").textContent = email;
  document.querySelector("#profile_avatar").src = avatar;
  document.querySelector("#profile_credits").textContent = `Credits: ${credits}`;
} 
else {
  window.location.href = "/index.html"; 
} 

// Calls checkAuthentication
checkAuthentication();