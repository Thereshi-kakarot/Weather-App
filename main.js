const cityName = document.querySelector(".city-name");
const temperature = document.querySelector(".temperature");
const humidity = document.querySelector(".additional-info-value-humidity");
const weatherCondition = document.querySelector(".weather-condition");
const precipitation = document.querySelector(".additional-info-value-precipitation");
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

function renderWeatherData(data){
    
   
    const temp = (data.main.temp - 273.15).toFixed(2);
    const humid = data.main.humidity;
    const rain = data.weather[0].main;
    const condition = data.weather[0].description;
   


    temperature.innerText = `${temp}°C`;
    humidity.innerText = `${humid}%`;
    precipitation.innerText = `${rain}%`;
    weatherCondition.innerText = `${condition}`;
    cityName.innerText = `${cityInput.value}`;
}

searchBtn.addEventListener("click", ()=> {

    if(cityInput.value === ""){
        alert("Enter your city!");
        return;
    }
   
    getWeatherData(cityInput.value);
    cityName.textContent = cityInput.value;
});


