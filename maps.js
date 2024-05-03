const mapContainer = document.getElementById('map-container');

const map = L.map(mapContainer).setView([20.5937, 78.9629], 4);  // Initial view (adjustable)

L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Example code for handling user input (latitude/longitude) and displaying marker (replace with your logic)
// This example assumes you have input elements with IDs 'latitudeInput' and 'longitudeInput'
const latitudeInput = document.getElementById('latitudeInput');
const longitudeInput = document.getElementById('longitudeInput');

const markerButton = document.querySelector("form button");

markerButton.addEventListener('click', (evt) => {
  const latitude = lat;// parseFloat(latitudeInput.value);
  const longitude = lon; //parseFloat(longitudeInput.value);

  if (isNaN(latitude) || isNaN(longitude)) {
    alert('Please enter valid latitude and longitude values.');
    return;
  }

  const marker = L.marker([latitude, longitude]).addTo(map);
  map.setView([latitude, longitude], 2);
  marker.bindPopup(`<b>Location:</b> [Lat: ${latitude}, Lng: ${longitude}]`).openPopup();
});