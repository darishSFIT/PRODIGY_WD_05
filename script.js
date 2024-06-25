const apiKey = 'c3f5e6f5edf51bdced28c955b35dfec8'; // Replace with your OpenWeatherMap API key
const geocodingApiKey = 'c3f5e6f5edf51bdced28c955b35dfec8'; // Replace with your OpenWeatherMap API key for Geocoding API

async function fetchWeatherByLocation() {
    const location = document.getElementById('locationInput').value;
    if (location) {
        const coordinates = await fetchCoordinates(location);
        if (coordinates) {
            const { lat, lon } = coordinates;
            fetchWeather(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        } else {
            alert('Location not found');
        }
    } else {
        alert('Please enter a location');
    }
}

async function fetchWeatherByCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            fetchWeather(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
        }, () => {
            alert('Unable to retrieve your location');
        });
    } else {
        alert('Geolocation is not supported by your browser');
    }
}

async function fetchCoordinates(location) {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${geocodingApiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.length > 0) {
            return data[0];
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        return null;
    }
}

async function fetchWeather(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.cod === 200) {
            displayWeather(data);
        } else {
            alert('Location not found');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayWeather(data) {
    const cityName = document.getElementById('cityName');
    const description = document.getElementById('description');
    const temperature = document.getElementById('temperature');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('windSpeed');
    const weatherInfo = document.querySelector('.weather-info');

    cityName.textContent = `Location: ${data.name}`;
    description.textContent = `Weather: ${data.weather[0].description}`;
    temperature.textContent = `Temperature: ${data.main.temp} °C`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;

    weatherInfo.style.display = 'block';

    setWeatherBackground(data.weather[0].description);
}

function setWeatherBackground(condition) {
    const body = document.body;
    switch (condition) {
        case 'clear':
            body.style.backgroundImage = "url('https://c.tenor.com/L4rosl2oeG4AAAAd/tenor.gif')"; // Replace with actual URL
            break;
        case 'overcast clouds':
            body.style.backgroundImage = "url('https://i.pinimg.com/originals/c8/ba/30/c8ba30ee61944cc26dbde4022a0a4b72.gif')"; // Replace with actual URL
            break;
        case 'heavy rain':
            body.style.backgroundImage = "url('https://i.pinimg.com/originals/cf/04/e9/cf04e9530f25312133dc7f93586591ff.gif')')"; // Replace with actual URL
            break;
        case 'snow':
            body.style.backgroundImage = "url('https://sanjuanheadwaters.org/wp-content/uploads/2023/02/snow-falling-gif.gif')"; // Replace with actual URL
            break;
        case 'thunderstorm':
            body.style.backgroundImage = "url('https://i.pinimg.com/originals/4f/4a/64/4f4a64d07fccdea2d963b85d38fef915.gif')"; // Replace with actual URL
            break;
        case 'mist':
            body.style.backgroundImage = "url('https://cdn.pixabay.com/animation/2023/03/05/12/05/12-05-54-62_512.gif')";
            break;
        default:
            body.style.backgroundImage = "url('http://www.freeppt.net/background/april-weather-backgrounds-for-powerpoint.jpg')"; // Replace with actual URL
    }
}