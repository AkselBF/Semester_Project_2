const searchInput = document.querySelector("#search_input");
searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();

  // Get all post elements
  const listingElements = document.querySelectorAll(".listing-item");

  // Loop through post elements and hide/show based on search term
  listingElements.forEach(listingElement => {
    const listingTitle = listingElement.querySelector(".listing_search").textContent.toLowerCase();
    if (listingTitle.includes(searchTerm)) {
      listingElement.style.display = "block";
    } 
    else {
      listingElement.style.display = "none";
    }
  });
});