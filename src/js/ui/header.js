import { load } from "../storage/index.js";

const initMenu = () => {
  // For appearance and animation of burger menu
  const hamburgerBtn = document.querySelector('#hamburger-button');
  const mobileMenu = document.querySelector('#mobile-menu');

  const loginLink = document.querySelector('#login');
  const loginBLink = document.querySelector('#b_login');
  const logoutLink = document.querySelector('#logout');
  const logoutBLink = document.querySelector('#b_logout');
  const profileLink = document.querySelector('#profile');
  const profileBLink = document.querySelector('#b_profile');

  const toggleMenu = () => {
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('flex');
    hamburgerBtn.classList.toggle('toggle-btn');
  }

  hamburgerBtn.addEventListener('click', toggleMenu);
  mobileMenu.addEventListener('click', toggleMenu);

  // Check for accessToken existence to toggle between Login and Logout
  const accessToken = load('accessToken');

  if (accessToken) {
    // User is logged in, show logout and hide login
    logoutLink.style.display = 'block';
    logoutBLink.style.display = 'block';
    loginLink.style.display = 'none';
    loginBLink.style.display = 'none';
    profileLink.style.display = 'block';
    profileBLink.style.display = 'block';
  } else {
    // User is logged out, show login and hide logout
    logoutLink.style.display = 'none';
    logoutBLink.style.display = 'none';
    loginLink.style.display = 'block';
    loginBLink.style.display = 'block';
    profileLink.style.display = 'none';
    profileBLink.style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', initMenu);