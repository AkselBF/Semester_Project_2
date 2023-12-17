import { load } from "./index.js";

// Function to check if the user is authenticated
export function isAuthenticated() {
  const token = load('accessToken');
  return !!token;
}

// Function to redirect unauthenticated user to the login page
export function redirectToLogin() {
  const isGitHubPages = window.location.hostname.includes('github.io');
  const repositoryName = isGitHubPages ? window.location.pathname.split('/')[1] : '';
  const loginPagePath = `${repositoryName}/index.html`;
  window.location.href = `${window.location.origin}/${loginPagePath}`;
  //window.location.href = '../../index.html';
}

// Function to redirect user
export function checkAuthentication() {
  if (!isAuthenticated()) {
    redirectToLogin();
  }
}