var APIKey = "824a1aea75ec0ff3ddd7d57c9424a9c7";


function showWeather() {
    var city = document.getElementById('city input').value; 
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    fetch(queryURL)
    .then(response => response.json())
    .then (data => {
        //process the weather forecast data 
        
        var forecast = {
            city: data.location.name,
            forecast: "sample forecast for" + data.location.name
        }
        localStorage.setItem("selectedCity", city); 
        displayWeather(forecast);

    })

    .catch(error => {
        console.log("Error fetching weather data:", error);
    });
    

}
   

function displayWeather(forecast) {
    var weatherContainer = document.getElementById('weatherContainer'); 

    //create and populate the forecast HTML
    var forecastHTML = "<h2>Weather forecast for " + forecast.city + "</h2>";
    forecastHTML += "<p>" + forecast.forecast + "</p>";
    
    weatherContainer.innerHTML = forecastHTML; 
}

//window.onload = function() {
   // var storedCity = localStorage.getItem('selectedCity');
  //  if (storedCity) {
     // document.getElementById('cityInput').value = storedCity;
 //     showWeather();
  //  }
 // };