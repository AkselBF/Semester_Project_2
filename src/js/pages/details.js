import { getSearchParams } from '../router/searchParams.js';
import { load, save } from '../storage/index.js';
import { baseUrl } from '../api/constants.js';


const params = getSearchParams();
const listingId = params.id;

// Retrieve listings from localStorage
const listings = load('listingsData');

export const fetchListings = async () => {
  try {
    const response = await fetch(`${baseUrl}listings?_active=true&sort=created&_seller=true&_bids=true`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch listings');
    }

    const data = await response.json();

    save('listingsData', data);

    return data;
  } catch (error) {
    console.error('Error fetching listings:', error);
    return [];
  }
};

// Function to display seller information
const displaySellerInfo = (seller) => {
  // Seller avatar, if available
  if (seller.avatar) {
    const sellerAvatarElement = document.createElement('img');
    sellerAvatarElement.src = seller.avatar;
    sellerAvatarElement.alt = 'Seller Avatar';
    sellerAvatarElement.className = 'w-[50px] h-[50px] rounded-full bg-cover';
    document.querySelector('#seller-avatar').appendChild(sellerAvatarElement);
  } 
  else {
    const defaultAvatar = '../../images/no_avatar.png';
    
    const sellerAvatarElement = document.createElement('img');
    sellerAvatarElement.src = defaultAvatar;
    sellerAvatarElement.alt = 'Default Avatar';
    sellerAvatarElement.className = 'w-[50px] h-[50px] rounded-full bg-cover';
    document.querySelector('#seller-avatar').appendChild(sellerAvatarElement);
  }

  const sellerElement = document.createElement('div');
  sellerElement.textContent = `Seller: ${seller.name}`;
  document.querySelector('#seller-info').appendChild(sellerElement);

  const sellerEmailElement = document.createElement('div');
  sellerEmailElement.textContent = `Email: ${seller.email}`;
  document.querySelector('#seller-info').appendChild(sellerEmailElement);
};

const displaySelectedBid = (bid) => {
  console.log('Selected bid: ', bid);
}

// Function to display bidder information
const displayBidders = (bids) => {
  const biddersContainer = document.querySelector('#listing_bidders');
  const dropdown = document.createElement('select');
  
  
  biddersContainer.innerHTML = '';

  if (bids.length > 0) {
    const sortedBids = bids.sort((a, b) => b.amount - a.amount);

    const selectElement = document.createElement('select');
    selectElement.multiple = true;
    selectElement.size = Math.min(bids.length, 3);
    dropdown.style.backgroundColor = '#1E1E1E';
    dropdown.className = 'bidders-dropdown px-2 text-center sm:text-left';

    sortedBids.forEach(bid => {
      const option = document.createElement('option');
      option.textContent = `${bid.bidderName} - ${bid.amount} Credits`;
      option.value = JSON.stringify(bid);
      dropdown.appendChild(option);
    });

    dropdown.addEventListener('change', (event) => {
      const selectedBid = JSON.parse(event.target.value);
      displaySelectedBid(selectedBid);
    });

    biddersContainer.appendChild(dropdown);

    // Display details of the highest bid by default
    const highestBid = sortedBids[0];
    displaySelectedBid(highestBid);
  } 
  else {
    const noBidsElement = document.createElement('div');
    noBidsElement.textContent = 'No bids yet.';
    noBidsElement.className = 'no-bids font-semibold';
    biddersContainer.appendChild(noBidsElement);
  }

  const bidsCountElement = document.querySelector('.bids-count');

  if (bidsCountElement) {
    bidsCountElement.textContent = `Number of bids: ${bids.length}`;
    bidsCountElement.classList.add('mt-[20px]', 'text-center', 'md:mt-[0]', 'md:text-right');
  }
};

// Find the selected listing by its ID
const selectedListing = listings.find(listing => listing.id === listingId);

document.addEventListener('bidSubmitted', async () => {
  const updatedListings = await fetchListings();
  save('listingsData', updatedListings);

  // Update the displayed details for the selected listing
  const updatedListing = updatedListings.find(listing => listing.id === listingId);

  if (updatedListing) {
    displayBidders(updatedListing.bids); 
  }
});

if (selectedListing) {
  // Title
  const titleElement = document.createElement('h3');
  titleElement.textContent = selectedListing.title;
  titleElement.className = 'text-3xl mt-3 md:my-3 text-center font-semibold underline';
  document.querySelector('#listing_title').appendChild(titleElement);

  // Media
  const mediaElement = document.createElement('img');
  mediaElement.src = selectedListing.media[0];
  mediaElement.alt = selectedListing.title;
  mediaElement.className = 'mx-auto w-full h-[300px] max-h-[300px] object-cover rounded-t-lg';
  document.querySelector('#bid_main').appendChild(mediaElement);

  // All images
  const remainingImages = selectedListing.media.slice(0);

  // Container for the thumbnail images
  const carouselContainer = document.querySelector('#bid_carousel');

  // Create and append thumbnail elements
  remainingImages.forEach(imageUrl => {
    const thumbnailElement = document.createElement('img');
    thumbnailElement.src = imageUrl;
    thumbnailElement.alt = selectedListing.title;
    thumbnailElement.className = 'mx-2 my-5 cursor-pointer w-[80px] min-w-[80px] max-w-[80px] h-[60px] min-h-[60px] max-h-[60px] object-cover rounded-lg';
  
    // Click on image to change main image
    thumbnailElement.addEventListener('click', () => {
      mediaElement.src = imageUrl;
    });
  
    carouselContainer.appendChild(thumbnailElement);
  });

  // If there is no image
  const placeholderImageUrl = '../../images/no_image.png';
  
  // Use the first image from the listing's media if available
  if (selectedListing.media.length > 0) {
    mediaElement.src = selectedListing.media[0];
    mediaElement.alt = selectedListing.title;
  } 
  else {
    mediaElement.src = placeholderImageUrl;
    mediaElement.alt = 'No Image Available';
  }


  // Number of bids
  const bidsElement = document.createElement('p');
  bidsElement.textContent = `Number of bids: ${selectedListing._count.bids}`;
  bidsElement.className = 'bids-count text-left font-semibold';
  document.querySelector('#listing_number').appendChild(bidsElement);

  // Bids Button
  const bidsButtonElement = document.createElement('button');
  bidsButtonElement.textContent = 'Place bid';
  bidsButtonElement.className = 'bid_button bg-listing_button font-semibold text-white my-10 mb-6 w-56 py-2 rounded-lg';

  // Button cannot be clicked without accessToken
  const accessToken = load('accessToken');
  if (!accessToken) {
    bidsButtonElement.disabled = true;
    bidsButtonElement.style.opacity = '0.5';
    bidsButtonElement.style.cursor = 'not-allowed';
  }

  document.querySelector('#listing_add_bid').appendChild(bidsButtonElement);

  // Description
  const descriptionElement = document.createElement('p');
  descriptionElement.textContent = selectedListing.description;
  descriptionElement.className = 'mt-3 mb-6 md:mt-2 text-left';
  document.querySelector('#listing_desc').appendChild(descriptionElement);

  // Dates Section (Created, Updated, EndsAt)
  const datesSection = document.createElement('div');
  datesSection.className = 'md:mt-12 text-left';

  // Replace the EndsAt Date with Live Countdown
  const endsAtDateElement = document.createElement('h2');
  endsAtDateElement.className = 'endsAtCountdown';

  document.querySelector('#listing_dates').appendChild(endsAtDateElement);

  // Get the EndsAt timestamp from the selectedListing
  const endsAtTimestamp = new Date(selectedListing.endsAt).getTime();

  // Function to update the countdown every second
  const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = endsAtTimestamp - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update the content with the countdown
    endsAtDateElement.textContent = `Ends in: ${days}d ${hours}h ${minutes}m ${seconds}s`;
    endsAtDateElement.className = 'text-2xl font-semibold';

    // Stops the countdown when time runs out
    if (distance < 0) {
      endsAtDateElement.textContent = "Auction has ended";
      clearInterval(countdownInterval);
    }
  };

  updateCountdown();

  // Set up an interval to update the countdown every second
  const countdownInterval = setInterval(updateCountdown, 1000);

  displaySellerInfo(selectedListing.seller);
  displayBidders(selectedListing.bids);
}

console.log('Selected Listing:', selectedListing);
export { selectedListing };