import { baseUrl } from "./constants.js";

export const fetchListingDetails = async (listingId) => {
  try {
    const response = await fetch(`${baseUrl}listings/${listingId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch listing details');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching listing details:', error);
    throw error;
  }
};