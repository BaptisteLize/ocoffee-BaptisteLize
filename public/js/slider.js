const slider = document.querySelector(".news-slider");
const cards = document.querySelectorAll(".card-container");
const totalCards = cards.length;
let cardWidth = cards[0].offsetWidth + 16; 
let currentIndex = 0;

  
window.addEventListener("resize", () => {
  cardWidth = cards[0].offsetWidth + 16;
});

const nextSlide = () => {
  if (currentIndex < totalCards - 1) {
    currentIndex++;
    slider.scrollTo({ left: currentIndex * cardWidth, behavior: "smooth" });
  }
};

const prevSlide = () => {
  if (currentIndex > 0) {
    currentIndex--;
    slider.scrollTo({ left: currentIndex * cardWidth, behavior: "smooth" });
  }
};

  
document.getElementById("prev-btn").addEventListener("click", prevSlide);
document.getElementById("next-btn").addEventListener("click", nextSlide);
