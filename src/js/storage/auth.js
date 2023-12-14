import { load } from "./index.js";

// Function to check if the user is authenticated
export function isAuthenticated() {
  const token = load('accessToken');
  return !!token;
}

// Function to redirect unauthenticated users to the login page
export function redirectToLogin() {
  window.location.href = '/index.html';
}

// Function to check authentication and redirect if not authenticated
export function checkAuthentication() {
  if (!isAuthenticated()) {
    redirectToLogin();
  }
}