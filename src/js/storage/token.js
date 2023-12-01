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
