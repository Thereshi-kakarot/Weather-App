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




