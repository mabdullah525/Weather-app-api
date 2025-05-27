const apiKey = "fb382d97a303702e873d8c53346002db";
const citySelect = document.getElementById("citySelect");
const result = document.getElementById("result");
const weatherImage = document.getElementById("weatherImage");
const weather = document.getElementById("weather");



import { getWeatherSuggestion } from "./suggestions.js"; // Make sure script type="module"


//  Load country list from API
async function loadCountries() {
    try {
        const res = await fetch("https://restcountries.com/v3.1/all");
        const countries = await res.json();

        countries.forEach(country => {
            if (!country.latlng) return; // Skip if location is missing

            const lat = country.latlng[0]; // Latitude
            const lon = country.latlng[1]; // Longitude
            const name = country.name.common; // Country name

            const option = document.createElement("option");
            option.value = `${lat},${lon}`;
            option.textContent = name;
            citySelect.appendChild(option);
        });
    } catch (error) {
        result.innerHTML = "Failed to load countries.";
        result.style.color = "red";
    }
}

//  Get weather when a country is selected
async function checkWeather() {
    const value = citySelect.value;

    if (!value) {
        result.innerHTML = "Please select a country.";
        weatherImage.style.display = "none";
        result.innerHTML = "";
        weather.innerHTML = "";
        return;
    }

    const [lat, lon] = value.split(",");

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        if (data.cod !== 200) {
            result.innerHTML = "Error: " + data.message;
            result.style.color = "red";
            weatherImage.style.display = "none";
            return;
        }
        const tempC = data.main.temp;
        const tempF = (tempC * 9 / 5 + 32).toFixed(1);
        const temp = data.main.temp;
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const countryName = citySelect.options[citySelect.selectedIndex].text;
        const suggestionData = getWeatherSuggestion(description);

        const heading = `<strong>${suggestionData.heading}</strong>`;
        const suggestion = `<p>${suggestionData.suggestion}</p>`;
        const measuresList = suggestionData.measures.map(item => `<li>${item}</li>`).join("");
        const measuresHTML = `<ul>${measuresList}</ul>`;


        result.innerHTML = `${countryName}: ${temp}°C / ${tempF}°F`;
        weather.innerHTML = `${suggestion}${heading}${measuresHTML}`;
        result.style.color = "black";
        weatherImage.src = `https://openweathermap.org/img/wn/${icon}@4x.png`;
        weatherImage.style.filter = "drop-shadow(0 0 5px #000)";
        weatherImage.style.display = "block";

    } catch (error) {
        result.innerHTML = "Failed to fetch weather data.";
        result.style.color = "red";
        weatherImage.style.display = "none";
    }
}

loadCountries();
window.checkWeather = checkWeather;