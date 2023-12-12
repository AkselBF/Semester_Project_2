import { baseUrl } from '../api/constants.js';
import { save } from '../storage/index.js';
import { titleFormat } from '../format/title_format.js';
import { dateFormat } from '../format/date_format.js';

// Function to fetch listings from the API
export const fetchListings = async () => {
  try {
    //const response = await fetch(`${baseUrl}listings?_active=true&sort=created`);
    const response = await fetch(`${baseUrl}listings?_active=true&sort=created&_seller=true&_bids=true`);
    
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

export const displayListings = (listings) => {
  const section = document.querySelector('#listings_section');
  
  // Clear any existing content in the section
  section.innerHTML = '';

  // Image for empty arrays
  const placeholderImageUrl = '../../images/no_image.png';

  // Loop through the listings and create HTML elements to display them
  listings.forEach(listing => {
    const formattedTitle = titleFormat(listing.title, 12);
    const formattedDate = dateFormat(new Date(listing.endsAt));

    const listingElement = document.createElement('div');
    listingElement.classList.add('listing-item');

    // Either media image or no image
    const imageSrc = listing.media.length > 0 ? listing.media[0] : placeholderImageUrl;
    // <img src="${listing.media[0] ? listing.media[0] : ""}"
    
    // Construct the HTML for each listing item
    listingElement.innerHTML = `
      <div class="w-300 my-2">
        <div class="flex flex-col-reverse">
          <div class="flex flex-row bg-trans_black py-2 px-4 justify-between">
            <h2 class="listing_search">${formattedTitle}</h2>
            <p class="listing_date">${formattedDate}</p>
          </div>
          <img src="${imageSrc}" 
          alt="${listing.title}" class="w-300 h-52 rounded-t-lg -mb-10 object-cover">
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

    // Make the live countdown
    const countdownElement = listingElement.querySelector('.listing_date');
    //const endTime = new Date(listing.endsAt).getTime();

    if (countdownElement) {
      const endTime = new Date(listing.endsAt).getTime();

      // Function to update countdown
      const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = endTime - now;

        if (distance <= 0) {
          countdownElement.innerHTML = 'Expired'; // Display 'Expired' if the time is up
          return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      };

      // Initial call to update countdown
      updateCountdown();

      // Update countdown every second
      setInterval(updateCountdown, 1000);
    }

    // Append each listing element to the section
    section.appendChild(listingElement);
  });
};

fetchListings()
  .then(listings => {
    save('listingsData', listings)
    console.log('Fetched Listings:', listings);
    displayListings(listings);
  })
  .catch(error => {
    console.error('Error fetching listings:', error);
  });