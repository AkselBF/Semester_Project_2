export const getSearchParams = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const params = {};

  for (const [key, value] of urlParams.entries()) {
    params[key] = value;
  }

  return params;
};