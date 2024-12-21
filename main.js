const API_KEY = '44f8288eb3166c77d29125656f5b045f';

document.getElementById('searchButton').addEventListener('click', async () => {
    const city = document.getElementById('cityInput').value.trim();
    const errorMessage = document.getElementById('errorMessage');
    const cityName = document.getElementById('cityName');
    const temperature = document.getElementById('temperature');
    const tempRange = document.getElementById('tempRange');
    const humidity = document.getElementById('humidity');
    const wind = document.getElementById('wind');
    const weatherIcon = document.getElementById('weatherIcon');
    const currentDate = document.getElementById('currentDate');

    errorMessage.classList.add('hidden');

    if (!city) {
        errorMessage.textContent = 'Please enter a city name!';
        errorMessage.classList.remove('hidden');
        return;
    }

    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );

    if (response.ok) {
        const data = await response.json();

        cityName.textContent = data.name;
        temperature.textContent = `${Math.round(data.main.temp)}°`;
        tempRange.textContent = `Max: ${Math.round(data.main.temp_max)}° Min: ${Math.round(data.main.temp_min)}°`;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
        wind.textContent = `Wind: ${data.wind.speed} m/s`;
        weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        const date = new Date();
        currentDate.textContent = date.toLocaleDateString();
    } else {
        errorMessage.textContent = 'City not found. Please try again!';
        errorMessage.classList.remove('hidden');
    }
});