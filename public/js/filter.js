const allCards = document.querySelectorAll(".card-container");
const filterCheckboxes = document.querySelectorAll(".filter-checkbox");

function filterCards() {
  const selectedCategories = Array.from(filterCheckboxes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);

  allCards.forEach(card => {
    const cardCategory = card.getAttribute("data-category");
    if(selectedCategories.length === 0 || selectedCategories.includes(cardCategory)) {
      card.classList.remove("hidden-card");
    } else {
      card.classList.add("hidden-card");
    }
  });
}

filterCheckboxes.forEach(checkbox => {
  checkbox.addEventListener("change",filterCards);
});


filterCards();