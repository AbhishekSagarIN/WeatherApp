const ow_api = '584801e90d77ece91216aeddf8d3005e';

const getWeatherData = (city) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?q='
    const fullURL = `${url}${city}&appid=${ow_api}&units=metric`;
    return fetch(fullURL)
    .then((response) => {
        if(!response.ok){
            throw new Error(`Http Error! Status: ${response.status}`)
        }
        return response.json()
    })
}

const searchCity = () => {
    const city = document.querySelector('.city-name').value;
    getWeatherData(city)
    .then(response => {
        showWeatherData(response);
        fetchCityImage(city);
	document.querySelector(".city-name").value = "";
    }).catch(error => {
        console.log(error)
    })
}

document.querySelector(".city-name").addEventListener("keypress", function(e) {
	if(e.key === "Enter"){
		e.preventDefault();
		document.querySelector(".search").click();
	}
});

const showWeatherData = (weatherData) => {
    document.querySelector('.location').innerHTML = weatherData.name;
    document.querySelector('.temp').innerHTML = `${Math.floor(weatherData.main.temp)}<span>&deg;C</span>`;
    document.querySelector('.weather-type').innerHTML = weatherData.weather[0].main;
    document.querySelector('.wind-speed').innerHTML = `<strong>Wind</strong>:<br>${weatherData.wind.speed}km/hr`;
    document.querySelector('.min-temp').innerHTML = `${weatherData.main.temp_min}&deg;C`;
    document.querySelector('.max-temp').innerHTML = `${weatherData.main.temp_max}&deg;C`;
    document.querySelector('.humidity').innerHTML = `<strong>Humidity</strong>:<br>${weatherData.main.humidity}%`;
    console.log(weatherData.weather[0].icon)
    switch(weatherData.weather[0].icon){
        case '01d':
            document.querySelector('.weather-icon').innerHTML = `<img src='icon/sun.svg' alt='clear sky' >`;
            break;
        case '01n':
            document.querySelector('.weather-icon').innerHTML = `<img src='icon/moon.svg' alt='clear sky' >`;
            break;
        case '02d':
            document.querySelector('.weather-icon').innerHTML = `<img src='icon/few_clouds_day.svg' alt='few clouds' >`;
            break;
        case '02n':
            document.querySelector('.weather-icon').innerHTML = `<img src='icon/few_clouds_night.svg' alt='few clouds' >`;
            break;
        case '03d':
            document.querySelector('.weather-icon').innerHTML = `<img src='icon/scattered_clouds.svg' alt='scattered clouds' >`;
            break;
        case '03n':
            document.querySelector('.weather-icon').innerHTML = `<img src='icon/scattered_clouds.svg' alt='scattered clouds' >`;
            break;
        case '04d':
            document.querySelector('.weather-icon').innerHTML = `<img src='icon/broken_clouds.svg' alt='broken clouds' >`;
            break;
        case '04n':
            document.querySelector('.weather-icon').innerHTML = `<img src='icon/broken_clouds.svg' alt='broken clouds' >`;
            break;
        case '09d':
            document.querySelector('.weather-icon').innerHTML = `<img src='icon/shower_rain.svg' alt='shower rain' >`;
            break;
        case '09n':
            document.querySelector('.weather-icon').innerHTML = `<img src='icon/shower_rain.svg' alt='shower rain' >`;
            break;
        case '10d':
            document.querySelector('.weather-icon').innerHTML = `<img src='icon/day_rain.svg' alt='rain' >`;
            break;
        case '10n':
            document.querySelector('.weather-icon').innerHTML = `<img src='icon/night_rain.svg' alt='rain' >`;
            break;
        case '11d':
            document.querySelector('.weather-icon').innerHTML = `<img src='icon/thunderstorm.svg' alt='thunderstorm' >`;
            break;
        case '11n':
            document.querySelector('.weather-icon').innerHTML = `<img src='icon/thunderstorm.svg' alt='thunderstorm' >`;
            break;
        case '13d':
            document.querySelector('.weather-icon').innerHTML = `<img src='icon/snow.svg' alt='snow' >`;
            break;
        case '13n':
                document.querySelector('.weather-icon').innerHTML = `<img src='icon/snow.svg' alt='snow' >`;
                break;
        case '50d':
            document.querySelector('.weather-icon').innerHTML = `<img src='icon/mist.svg' alt='mist' >`;
            break;
        case '50n':
            document.querySelector('.weather-icon').innerHTML = `<img src='icon/mist.svg' alt='mist' >`;
            break;
        default:
            console.log('some error')
            break;
    }
}

const pexels_api = 'FS80nbWtSd2GVjaPm1WCLgmzv04zDczmpq3Bj1GKUtmS1TLZs5DOKaNX';

const fetchCityImage = (city) => {
    const url = `https://api.pexels.com/v1/search?orientation=landscape&size=small&per_page=7&query=${city}`;
    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `${pexels_api}`
        }
    }).then(response => {
        if(!response.ok){
            throw new Error(`Http Error! Status: ${response.status}`)
        }

       return response.json();
    }).then(data => {
        if(data.photos && data.photos.length>0){
            const imageIndex = Math.floor(Math.random() * 7);
            const imageURL = data.photos[imageIndex].src.original;
            document.querySelector('.main').style.backgroundImage = `url(${imageURL})`;
            document.querySelector('.about-image>span').innerHTML = data.photos[imageIndex].alt;
        }
    })
}

