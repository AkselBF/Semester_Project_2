import { loadToken } from "../../storage/index.js";
import { baseUrl } from "../constants.js";

export async function updateUserAvatar(avatarURL) {
  try {
    const token = loadToken();
    const username = localStorage.getItem('name');

    const response = await fetch(`${baseUrl}profiles/${username}/media`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ avatar: avatarURL }),
    });

    if (!response.ok) {
      throw new Error('Failed to update avatar');
    }

    const updatedData = await response.json();
    return updatedData.avatar;
  } 
  catch (error) {
    console.error('Error updating avatar:', error);
    throw error;
    // Handle error scenarios
  }
}

export function saveUpdatedAvatarToStorage(avatarURL) {
  // Implement your logic to save the updated avatar URL to local storage or any preferred storage method
  // For example:
  localStorage.setItem('avatar', avatarURL);
}