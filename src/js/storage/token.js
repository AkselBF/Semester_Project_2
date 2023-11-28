// Save token to localStorage
export const saveToken = (token) => {
  localStorage.setItem('accessToken', token);
};

// Load token from localStorage
export const loadToken = () => {
  return localStorage.getItem('accessToken');
};

// Remove token from localStorage
export const removeToken = () => {
  localStorage.removeItem('accessToken');
};

/*
export const saveUserData = (userData) => {
  localStorage.setItem('name', userData.name || '');
  localStorage.setItem('email', userData.email || '');
  localStorage.setItem('avatar', userData.avatar || '');
  localStorage.setItem('credits', userData.credits || '');
};
*/