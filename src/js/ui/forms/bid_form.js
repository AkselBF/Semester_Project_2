//import { placeBid } from "../../api/auth/bid.js";
//import { getSearchParams } from "../../router/searchParams.js";
import { baseUrl } from "../../api/constants.js";
//import { loadToken } from "../../storage/index.js";
import { load } from "../../storage/index.js";
import { selectedListing } from "../../pages/details.js";

// Get necessary elements by their IDs
const bidsForm = document.querySelector('#bids_form');
const bidForm = document.querySelector('#bid_form');
const closeBid = document.querySelector('#bid_close');
const bidButton = document.querySelector('.bid_button');

// Function to open the bids form modal
function openBidsForm() {
  bidsForm.style.display = 'flex';
}

// Function to close the bids form modal
function closeBidsForm() {
  bidsForm.style.display = 'none';

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

// Handling form submission
bidForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  console.log('API URL:', `${baseUrl}listings/${selectedListing.id}/bids`);

  
  // Extract the bid amount entered by the user
  const bidAmount = parseFloat(document.querySelector('#bid_amount').value);

  try {
    // Make a request to the API to add a bid to the listing
    //const accessToken = loadToken();
    const accessToken = load('accessToken');
    const response = await fetch(`${baseUrl}listings/${selectedListing.id}/bids`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ amount: bidAmount }),
    });

    if (!response.ok) {
      throw new Error('Failed to add a new bid');
    }

    // Close the bid form modal upon successful submission
    closeBidsForm();

    // Increment the bid count
    //selectedListing._count.bids++;

    // Update the displayed listings (assuming you have access to the function)
    //displayListings(listings);

  } catch (error) {
    console.error('Error adding a new bid:', error);
  }
});
