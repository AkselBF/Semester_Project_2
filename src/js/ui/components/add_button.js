const addButton = document.querySelector('#add_listing_btn');
const buttonText = document.querySelector('#button_text');

addButton.addEventListener('mouseover', () => {
  buttonText.classList.remove('hidden');
  buttonText.classList.add('opacity-100');
});

addButton.addEventListener('mouseout', () => {
  buttonText.classList.remove('opacity-100');
  buttonText.classList.add('hidden');
});