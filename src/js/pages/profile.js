import { checkAuthentication } from '../storage/auth.js';
import { load } from '../storage/index.js';

const name = load("name");
const email = load("email");
const avatar = load("avatar");
const credits = load("credits");

const defaultAvatar = '../../images/no_avatar.png';

// Check if user is logged in
const token = load("accessToken");

if (!token || (token && name && email)) {
  document.querySelector("#profile_name").textContent = name;
  document.querySelector("#profile_email").textContent = email;
  const avatarSrc = avatar ? avatar : defaultAvatar;
  document.querySelector("#profile_avatar").src = avatarSrc;
  document.querySelector("#profile_credits").textContent = `Credits: ${credits}`;
} 
else {
  const isGitHubPages = window.location.hostname.includes('github.io');
  const repositoryName = isGitHubPages ? window.location.pathname.split('/')[1] : '';
  const loginPagePath = `${repositoryName}/index.html`;
  window.location.href = `${window.location.origin}/${loginPagePath}`;
  //window.location.href = "../../index.html"; 
} 

// Calls checkAuthentication
checkAuthentication();