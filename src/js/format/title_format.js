export const titleFormat = (title, maxLength) => {
  return title.length > maxLength ? `${title.substring(0, maxLength)}...` : title;
};