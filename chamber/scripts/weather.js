const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('#figcaption');
const forecastContainer = document.querySelector('#forecast-container');

const myLat = -37.826;
const myLong = 175.225;
const myKey = '02afb542f8c0889a2abcc36ab1944696';

const url = `//api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=imperial`;
const forecastUrl = `//api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=imperial`;

async function apiFetch() {
    console.log('Fetching weather data...');
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayResults(data);
        } else {
            throw new Error(await response.text());
        }
    }
    catch (error) {
        console.log('Error:', error);
    }
}

async function fetchForecast() {
    console.log('Fetching weather forecast...');
    try {
        const response = await fetch(forecastUrl);
        if (response.ok) {
            const data = await response.json();
            displayForecast(data);
        } else {
            throw new Error(await response.text());
        }
    }
    catch (error) {
        console.log('Error:', error);
    }
}

function displayResults(data) {
    currentTemp.innerHTML = `${data.main.temp}°C`;
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = `${desc}`;
}

function displayForecast(data) {
    forecastContainer.innerHTML = '';
    const days = ['Today', 'Tomorrow', ...Array(3).fill().map((_, i) => new Date(Date.now() + (i + 2) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'long' }))];
    data.list.slice(0, 3).forEach((forecast, index) => {
        const forecastItem = document.createElement('div');
        forecastItem.classList.add('forecast-item');
        forecastItem.innerHTML = `
            <p>${days[index]}: ${forecast.main.temp}°F</p>
        `;
        forecastContainer.appendChild(forecastItem);
    });
}

apiFetch();
fetchForecast();