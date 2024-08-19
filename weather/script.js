async function getWeather() {
    const apiKey = '3199d71325b44b2179264262e420d0de'; // Replace with your OpenWeather API key
    const city = document.getElementById('city').value.trim();

    if (!city) return alert('Please enter a city');

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        if (data.cod === '404') {
            document.getElementById('weather-info').innerHTML = `<p>${data.message}</p>`;
        } else {
            displayWeather(data);
        }
    } catch (error) {
        console.error('Error:', error);
        alert(`Error fetching weather data: ${error.message}`);
    }
}

function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const humidityWindDiv = document.getElementById('humidity-wind');
    const weatherIcon = document.getElementById('weather-icon');

    const cityName = data.name;
    const temperature = Math.round(data.main.temp - 273.15); // Convert from Kelvin to Celsius
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

    const weatherHtml = `
        <p>${cityName}</p>
        <p>${temperature}°C</p>
        <p>${description.charAt(0).toUpperCase() + description.slice(1)}</p>
    `;

    const humidityWindHtml = `
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
    `;

    tempDivInfo.innerHTML = weatherHtml;
    humidityWindDiv.innerHTML = humidityWindHtml;
    weatherIcon.src = iconUrl;
    weatherIcon.alt = description;
    weatherIcon.style.display = 'block';
}
