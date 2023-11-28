import { baseUrl } from '../api/constants.js';

// Function to fetch listings from the API
const fetchListings = async () => {
  try {
    const response = await fetch(`${baseUrl}listings`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch listings');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching listings:', error);
    return [];
  }
};

const displayListings = (listings) => {
  const section = document.querySelector('#listings_section');
  
  // Clear any existing content in the section
  section.innerHTML = '';

  // Loop through the listings and create HTML elements to display them
  listings.forEach(listing => {
    const listingElement = document.createElement('div');
    listingElement.classList.add('listing-item');
    
    // Construct the HTML for each listing item
    listingElement.innerHTML = `
      <div class="w-300 my-2">
        <div class="flex flex-col-reverse">
          <div class="flex flex-row bg-trans_black py-2 px-4 justify-between">
            <h3>${listing.title}</h3>
            <p>${listing.endsAt}</p>
          </div>
          <img src="${listing.media[0]}" alt="${listing.title}" 
          class="w-300 h-52 rounded-t-lg -mb-10">
        </div>
        <div class="bg-dark_gray px-4 rounded-b-lg pt-2 pb-6">
          <p class="mb-1">Number of bids:</p>
          <h3 class="font-semibold mb-8">${listing._count.bids}</h3>
          <div class="justify_content text-center mb-2">
            <a href="../../html/pages/details.html?id=${listing.id}" 
            class="font-semibold bg-listing_button mt-4 px-20 py-2 mx-auto 
            rounded-lg cursor-pointer">Details</a>
          </div>
        </div>
      </div>
    `;

    // Append each listing element to the section
    section.appendChild(listingElement);
  });
};

fetchListings()
  .then(listings => {
    console.log('Fetched Listings:', listings);
    displayListings(listings);
  })
  .catch(error => {
    console.error('Error fetching listings:', error);
  });