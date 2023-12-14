import * as storage from '../storage/index.js'

export const headers = (contentType) => {
  const accessToken = storage.load("accessToken");
  const headers = {}

  if (contentType) {
    headers["Content-Type"] = contentType;
  }

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }
  
  return headers;
}