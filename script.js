const BASE_URL1 = "https://geocode.maps.co/search?q=";
const api = `api_key=${api_token}`;


const BASE_URL2 = "https://api.open-meteo.com/v1/forecast?"
// latitude=52.52&longitude=13.41&current=temperature_2m
const place = document.querySelector(".container input");

const btn = document.querySelector("form button");
const msg = document.querySelector(".msg");

//maps.js

const mapContainer = document.getElementById('map-container');

var map = L.map(mapContainer).setView([20.5937, 78.9629], 4);  // Initial view (adjustable)

L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Example code for handling user input (latitude/longitude) and displaying marker (replace with your logic)
// This example assumes you have input elements with IDs 'latitudeInput' and 'longitudeInput'
const latitudeInput = document.getElementById('latitudeInput');
const longitudeInput = document.getElementById('longitudeInput');

// const markerButton = document.querySelector("form button");

var lat = undefined;
var lon = undefined;
btn.addEventListener("click",async (evt) => {
    btn.disabled = true;
    msg.innerText = "Getting Temperature info...";
    evt.preventDefault();
    let loc = place.value;
    if(loc==="") {
        loc = "india";
    } else {
        loc = loc.toLowerCase();
    };
    console.log(loc);

    try {
        URL1 = `${BASE_URL1}${loc}&${api}`;
    console.log(URL1);
    let response = await fetch(URL1);
    let data = await response.json();

    console.log(data);

    lat = data[0]["lat"];
    lon = data[0]["lon"];

    console.log(lat,lon);

    weather(lat,lon,loc);

    } catch (error) {
        msg.innerText = `${loc} is not  valid location!`;
        btn.disabled = false;
    };
    
});

const weather = async (lat,lon,loc) => {
    map.off();
    map.remove();
    map = L.map(mapContainer).setView([20.5937, 78.9629], 4);
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
    

    try {
        URL2 = `${BASE_URL2}latitude=${lat}&longitude=${lon}&current=temperature_2m`
    console.log(URL2);
    let response = await fetch(URL2);
    let data = await response.json();
    let temp = data["current"]["temperature_2m"];
    
    loc = loc.toUpperCase();

    // merged
    const latitude = lat;// parseFloat(latitudeInput.value);
    const longitude = lon; //parseFloat(longitudeInput.value);
  
    if (isNaN(latitude) || isNaN(longitude)) {
      alert('Please enter valid latitude and longitude values.');
      return;
    }
  
    const marker = L.marker([latitude, longitude]).addTo(map);
    map.setView([latitude, longitude], 5);
    marker.bindPopup(`<b>Location:</b> ${loc} Temperature: ${temp}°C`).openPopup();

    msg.innerText = `The temperature in ${loc} is ${temp}°C`
    btn.disabled = false;
    } catch (error) {
        msg.innerText = `oops... ${error} occured!!!`
        btn.disabled = false;
    };
    
};

