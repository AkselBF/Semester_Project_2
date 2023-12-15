import { load } from "./index.js";

// Function to check if the user is authenticated
export function isAuthenticated() {
  const token = load('accessToken');
  return !!token;
}

// Function to redirect unauthenticated users to the login page
export function redirectToLogin() {
  //window.location.href = './index.html';
  //window.location.href = '../../index.html';
  const isGitHubPages = window.location.hostname.includes('github.io');
  const repositoryName = isGitHubPages ? window.location.pathname.split('/')[1] : '';
  const loginPagePath = `${repositoryName}/index.html`;
  window.location.href = `${window.location.origin}/${loginPagePath}`;
}

// Function to check authentication and redirect if not authenticated
export function checkAuthentication() {
  if (!isAuthenticated()) {
    redirectToLogin();
  }
}

/*
// Function to get the repository name from the URL
function getRepositoryName() {
  const currentUrl = window.location.href;
  const parts = currentUrl.split('/');
  const repoIndex = parts.indexOf("github.io") + 1;
  return parts[repoIndex];
}

// Use the extracted repository name in your redirect functions
export function redirectToLogin() {
  const repoName = getRepositoryName();
  window.location.href = `/${repoName}/index.html`;
}

export function redirectToProfile() {
  const repoName = getRepositoryName();
  window.location.href = `/${repoName}/src/html/pages/profile.html`;
}

// Function to check authentication and redirect if not authenticated
export function checkAuthentication() {
  if (!isAuthenticated()) {
    redirectToLogin();
    redirectToProfile();
  }
}
*/