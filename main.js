const weatherIcons = {
    "Clear": "clear",
    "Clouds": "clouds",
    "Rain": "rain",
    "Drizzle": "drizzle",
    "Thunderstorm": "thunderstorm",
    "Snow": "snow",
    "Mist": "atmosphere",
    "Smoke": "atmosphere",
    "Haze": "atmosphere",
    "Dust": "atmosphere",
    "Fog": "atmosphere",
    "Sand": "atmosphere",
    "Ash": "atmosphere",
    "Squall": "atmosphere",
    "Tornado": "atmosphere",
    "Overcast clouds": "clouds"
};

const cityName = document.querySelector(".city-name");
const temperature = document.querySelector(".temperature");
const humidity = document.querySelector(".additional-info-value-humidity");
const weatherCondition = document.querySelector(".weather-condition");
const windSpeed = document.querySelector(".additional-info-value-wind-speed");
const searchBtn = document.querySelector(".material-symbols-outlined");
const cityInput = document.getElementById("city-input");


function getWeatherData(city) {
    const API_KEY = CONFIG.API_KEY;
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
        .then(response => {
            if(!response.ok){
                throw new Error(`City not found: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
           renderWeatherData(data);

        })
}

function getForecastData(city) {
    const API_KEY = CONFIG.API_KEY;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
        .then(response => {
            if(!response.ok){
                throw new Error(`Forecast data not found: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
           renderForeCastData(data);

        })

}

function renderWeatherData(data){
    
   
    const temp = (data.main.temp - 273.15).toFixed(2);
    const humid = data.main.humidity;
    const rain = data.weather[0].main;
    const condition = data.weather[0].description;
    const wind = data.wind.speed;


    temperature.innerText = `${temp}°C`;
    humidity.innerText = `${humid}%`;
    weatherCondition.innerText = `${condition}`;
    cityName.innerText = `${cityInput.value}`;
    windSpeed.innerText = `${wind} m/s`;

   
     const iconName = weatherIcons[rain] || "clouds";
     document.getElementById("main-weather-icon-img").src = `assets/assets/weather/${iconName}.svg`;
}

searchBtn.addEventListener("click", ()=> {

    if(cityInput.value === ""){
        alert("Enter your city!");
        return;
    }
   
    getWeatherData(cityInput.value);
    getForecastData(cityInput.value);
    cityName.textContent = cityInput.value;
     
});


