import { load } from "../../storage/index.js";
import { baseUrl } from "../constants.js";

export async function updateUserAvatar(avatarURL) {
  try {
    const token = load('accessToken');
    const username = load('name');

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
  }
}

export function saveUpdatedAvatarToStorage(avatarURL) {
  localStorage.setItem('avatar', avatarURL);
}