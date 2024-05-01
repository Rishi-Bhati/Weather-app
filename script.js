const BASE_URL1 = "https://geocode.maps.co/search?q=";
const api = `api_key=${api_token}`;


const BASE_URL2 = "https://api.open-meteo.com/v1/forecast?"
// latitude=52.52&longitude=13.41&current=temperature_2m
const place = document.querySelector(".container input");

const btn = document.querySelector("form button");
const msg = document.querySelector(".msg");

btn.addEventListener("click",async (evt) => {
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

    let lat = data[0]["lat"];
    let lon = data[0]["lon"];

    console.log(lat,lon);

    weather(lat,lon,loc);

    } catch (error) {
        msg.innerText = `${loc} is not  valid location!`;
    };
    
});

const weather = async (lat,lon,loc) => {

    // let d = new Date();

    // let year = d.getFullYear();
    // let month = d.getUTCMonth();
    // let day = d.getUTCDate();

    // if(Math.floor(month/10) === 0) {
    //     month = eval(month+'+1');
    //     month = `0${month}`
    // };
    // if(Math.floor(day/10) === 0) {
    //     day = `0${day}`
    // };
    // let date = `${year}-${month}-${day}`
    // let h = d.getHours();
    // let m = d.getMinutes();
    // let s = d.getSeconds();

    // if(Math.floor(m/10) === 0) {
    //     h = `0${h}`
    // };
    // if(Math.floor(m/10) === 0) {
    //     m = `0${m}`
    // };
    // if(Math.floor(m/10) === 0) {
    //     m = `0${m}`
    // };
    try {
        URL2 = `${BASE_URL2}latitude=${lat}&longitude=${lon}&current=temperature_2m`
    console.log(URL2);
    let response = await fetch(URL2);
    let data = await response.json();
    let temp = data["current"]["temperature_2m"];
    
    loc = loc.toUpperCase();

    msg.innerText = `The temperature in ${loc} is ${temp}°C`
    } catch (error) {
        msg.innerText = `oops... ${error} occured!!!`
    };
    
};

