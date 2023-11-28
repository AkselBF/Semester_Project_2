import { getSearchParams } from '../router/searchParams.js';
import { baseUrl } from '../api/constants.js';

async function fetchListingDetails(listingId) {
  try {
    const response = await fetch(`${baseUrl}/listings/${listingId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      displayListingDetails(data);
      console.log(data);
    } 
    else {
      console.log('Failed to fetch post details');
    }
  } 
  catch (error) {
    console.error('Error fetching post details:', error);
  }
}

const populateListingDetails = (listing) => {
  const detailsContainer = document.querySelector('#listing_details');

  // Left side on larger screens, top on smaller screens
  const leftSideHTML = `
    <div class="lg:w-1/2">
      <h2 class="text-3xl font-bold mb-4 lg:mb-8">${listing.title}</h2>
      <p class="mb-4 lg:mb-8">${listing.description}</p>
      <div class="mb-4 lg:mb-8">${listing.created}, ${listing.updated}, ${listing.endsAt}</div>
    </div>
  `;

  // Right side on larger screens, bottom on smaller screens
  const rightSideHTML = `
    <div class="lg:w-1/2">
      <img src="${listing.media}" alt="Media" class="mb-4 lg:mb-8">
      <p class="mb-4 lg:mb-8">${listing.bids}</p>
      <button class="bg-blue-500 text-white px-4 py-2 rounded-lg">Button</button>
    </div>
  `;

  // Display details based on screen size
  if (window.innerWidth >= 1024) {
    detailsContainer.innerHTML = `<div class="flex flex-col lg:flex-row lg:space-x-8">${leftSideHTML}${rightSideHTML}</div>`;
  } else {
    detailsContainer.innerHTML = `${leftSideHTML}${rightSideHTML}`;
  }
};

// Call the function to get URL parameters
const params = getSearchParams();
const listingId = params.id;

// Find the selected listing by its ID
const selectedListing = listings.find(listing => listing.id === listingId);

if (selectedListing) {
  fetchListingDetails(selectedListing);
  populateListingDetails(selectedListing);
}