const initialCoordinate = [50.338819, 2.308797];
const initialZoom = 15;
const map = L.map('map').setView(initialCoordinate, initialZoom);
const marker = L.marker(initialCoordinate).addTo(map);
const resetPosition = document.getElementById("map-btn");

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

marker.bindPopup(`&#x2615; Nous sommes ici ! &#x2615;`).openPopup();

resetPosition.addEventListener("click", () => {
  map.setView(initialCoordinate, initialZoom);
});