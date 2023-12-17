import { baseUrl } from "../../api/constants.js";
import { headers } from "../../api/headers.js";
import { save } from "../../storage/index.js";
import { selectedListing, fetchListings } from "../../pages/details.js";

// Get necessary elements by their IDs
const bidsForm = document.querySelector('#bids_form');
const bidForm = document.querySelector('#bid_form');
const closeBid = document.querySelector('#bid_close');
const bidButton = document.querySelector('.bid_button');

// For submitting bid
const bidAmountInput = document.querySelector('#bid_amount');
const submitButton = document.querySelector('#submit_bid');
const latestBidElement = document.querySelector('.bidder-amount');


// Function to open the bids form modal
function openBidsForm() {
  bidsForm.style.display = 'flex';
}

// Function to close the bids form modal
function closeBidsForm() {
  bidsForm.style.display = 'none';

  bidAmountInput.style.border = '';
  submitButton.disabled = true;
  submitButton.style.opacity = '0.5';

  document.querySelector('#bid_form').reset();
}

// Event listeners to trigger opening and closing of the modal
bidButton.addEventListener('click', openBidsForm);
closeBid.addEventListener('click', closeBidsForm);

// Close modal if user clicks outside the form
bidsForm.addEventListener('click', (event) => {
  if (event.target === bidsForm) {
    closeBidsForm();
  }
});

// Prevent modal from closing when clicking inside the form
document.querySelector('#bid_form').addEventListener('click', (event) => {
  event.stopPropagation();
});

// Initially disable the submit button and adjust opacity
submitButton.disabled = true;
submitButton.style.opacity = '0.5';

// Update border color as user types
bidAmountInput.addEventListener('input', () => {
  const userBidAmount = parseFloat(bidAmountInput.value);
  let latestBidAmount = 0;

  if (latestBidElement) {
    const latestBidText = latestBidElement.textContent;
    latestBidAmount = parseFloat(latestBidText.split('-')[1]);
  }

  if (userBidAmount > latestBidAmount) {
    // User bid is higher
    submitButton.disabled = false;
    submitButton.style.opacity = '1';
    bidAmountInput.style.border = '2px solid #0eff00';
  } else {
    // User bid is not higher
    submitButton.disabled = true;
    submitButton.style.opacity = '0.5';
    bidAmountInput.style.border = '2px solid red';
  }
});

// Handling form submission
bidForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  
  // Extract the bid amount entered by the user
  const bidAmount = parseFloat(document.querySelector('#bid_amount').value);

  try {
    const response = await fetch(`${baseUrl}listings/${selectedListing.id}/bids`, {
      method: 'POST',
      headers: headers('application/json'),
      body: JSON.stringify({ amount: bidAmount }),
    });

    if (!response.ok) {
      throw new Error('Failed to add a new bid');
    }

    // Update listing with fresh data after successful bid
    const updatedListings = await fetchListings();
    save('listingsData', updatedListings);

    // Trigger an event indicating a bid has been submitted
    const bidSubmittedEvent = new CustomEvent('bidSubmitted');
    document.dispatchEvent(bidSubmittedEvent);

    // Close the bid form modal upon successful submission
    closeBidsForm();
  } 
  catch (error) {
    console.error('Error adding a new bid:', error);
  }
});
