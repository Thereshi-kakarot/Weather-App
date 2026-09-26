const cityName = document.getElementById("city-name");
const temperature = document.querySelector(".temperature");
const humidity = document.querySelector(".humidity");
const weatherCondition = document.querySelector(".weather-condition");
const precipitation = document.querySelector(".precipitation");



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

function renderWeatherData(data){
    
    const name = data.name;
    const temp = (data.main.temp - 273.15).toFixed(2);
    const humid = data.main.humidity;
    const rain = data.weather[0].main;
    const condition = data.weather[0].description;


    temperature.innerText = `${temp}C`;
    humidity.innerText = `${humid}%`;
    cityName.innerText = `${name}`;
    precipitation.innerText = `${rain}%`;
    weatherCondition.innerText = `${condition}`;

}




