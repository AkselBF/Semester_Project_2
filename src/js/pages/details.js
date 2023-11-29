import { getSearchParams } from '../router/searchParams.js';
import { load } from '../storage/index.js';

// Retrieve listings from localStorage
const listings = load('listingsData');

const params = getSearchParams();
const listingId = params.id;

// Find the selected listing by its ID
const selectedListing = listings.find(listing => listing.id === listingId);

if (selectedListing) {
  // Title
  const titleElement = document.createElement('h2');
  titleElement.textContent = selectedListing.title;
  titleElement.className = 'text-3xl my-3 md:my-6 text-left font-semibold'; // Tailwind classes
  document.querySelector('#listing_title').appendChild(titleElement);

  // Media
  const mediaElement = document.createElement('img');
  mediaElement.src = selectedListing.media[0];
  mediaElement.alt = selectedListing.title;
  mediaElement.className = 'mx-auto w-300 max-h-[300px] rounded-t-lg'; // Tailwind classes
  document.querySelector('#listing_bid').appendChild(mediaElement);

  // Bids text
  const textElement = document.createElement('p');
  textElement.textContent = 'Number of bids';
  textElement.className = 'text-left mx-10 mt-5';
  document.querySelector('#listing_bid').appendChild(textElement);

  // Number of bids
  const bidsElement = document.createElement('p');
  bidsElement.textContent = `${selectedListing._count.bids}`;
  bidsElement.className = 'text-left mx-10 font-semibold';
  document.querySelector('#listing_bid').appendChild(bidsElement);

  // Bids Button
  const bidsButtonElement = document.createElement('button');
  bidsButtonElement.textContent = 'Place bid';
  bidsButtonElement.className = 'bid_button bg-listing_button font-semibold text-white mx-5 mt-4 mb-6 w-56 py-2 rounded-lg';
  document.querySelector('#listing_bid').appendChild(bidsButtonElement);

  // Description
  const descriptionElement = document.createElement('p');
  descriptionElement.textContent = selectedListing.description;
  descriptionElement.className = 'mt-4 md:mt-2 text-left';
  document.querySelector('#listing_desc').appendChild(descriptionElement);

  // Dates Section (Created, Updated, EndsAt)
  const datesSection = document.createElement('div');
  datesSection.className = 'mt-4 md:mt-12 text-left';

  // Individual Date Elements
  const createdDateElement = document.createElement('p');
  createdDateElement.textContent = `Created: ${selectedListing.created}`;
  datesSection.appendChild(createdDateElement);

  const updatedDateElement = document.createElement('p');
  updatedDateElement.textContent = `Updated: ${selectedListing.updated}`;
  datesSection.appendChild(updatedDateElement);

  const endsAtDateElement = document.createElement('p');
  endsAtDateElement.textContent = `Ends At: ${selectedListing.endsAt}`;
  datesSection.appendChild(endsAtDateElement);

  document.querySelector('#listing_dates').appendChild(datesSection);
}