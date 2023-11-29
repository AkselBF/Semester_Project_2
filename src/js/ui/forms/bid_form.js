
// Get necessary elements by their IDs
const bidButton = document.querySelector('.bid_button');
const bidsForm = document.querySelector('#bids_form');
const closeBid = document.querySelector('#bid_close');

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
document.querySelector('#bid_form').addEventListener('submit', (event) => {
  event.preventDefault();

  const bidAmount = document.querySelector('#bid_amount').value;
});
