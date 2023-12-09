//import { loadToken } from '../../storage/index.js';
import { load } from '../../storage/index.js';
import { baseUrl } from '../constants.js';

// Function to fetch listings for the logged-in user
async function fetchUserListings() {
  try {
    //const accessToken = loadToken();
    //const username = localStorage.getItem('name');
    const accessToken = load('accessToken');
    const username = load('name');

    const apiUrl = `${baseUrl}profiles/${username}/listings`;

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user listings');
    }

    const listings = await response.json();
    return listings; 
  } catch (error) {
    console.error('Error fetching user listings:', error);
    return []; 
  }
}

// Function to create a listing element
function createListingElement(listing) {
  const listingElement = document.createElement('div');
  listingElement.classList.add('listing-item');

  // Create image element for media
  const imageElement = document.createElement('img');
  imageElement.src = listing.media[0]; // Assuming media is an array with at least one image URL
  imageElement.alt = listing.title;

  const titleElement = document.createElement('h3');
  titleElement.textContent = listing.title;
  titleElement.classList.add('text-white', 'text-xl', 'font-semibold', 'my-1', 'px-5');

  const descriptionElement = document.createElement('p');
  descriptionElement.textContent = listing.description;
  descriptionElement.classList.add('text-white', 'my-1', 'px-5');

  // Append details to the listing element
  listingElement.appendChild(imageElement);
  listingElement.appendChild(titleElement);
  listingElement.appendChild(descriptionElement);

  return listingElement;
}

// Function to render fetched listings in the HTML
function renderListings(listings) {
  const winningListingsContainer = document.querySelector('#winning_listings');

  // Clear previous listings if needed
  winningListingsContainer.innerHTML = ``;

  // Create and append listing elements to the container
  listings.forEach((listing) => {
    const listingElement = createListingElement(listing);
    winningListingsContainer.appendChild(listingElement);
  });
}

// Call the function to fetch listings and handle the retrieved data
fetchUserListings()
  .then((userListings) => {
    renderListings(userListings);

    // Handle the fetched listings here
    console.log('User listings:', userListings);
  })
  .catch((error) => {
    // Handle any errors occurred during fetching
    console.error('Error fetching user listings:', error);
  });