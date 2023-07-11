var apiKey = "824a1aea75ec0ff3ddd7d57c9424a9c7";
window.onload = function() {
    var storedSearchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    for (i=0; i<storedSearchHistory.length; i++){
        $("#searchHerstory").append(new Option(storedSearchHistory[i],storedSearchHistory[i]));  
    }
 };

    function showPrevsearch(){
        var yermom = $("#searchHerstory").val();
        $("#CityInput").val(yermom); 
        startSearch(yermom);
    }

function startSearch(defaultCity){
    $('#modal-invalid').hide();

    var city = defaultCity || document.getElementById('CityInput').value   
    console.log(city);
    var coordsUrl="https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + apiKey;
    fetch(coordsUrl)
    .then(function(response) {            
        if (response.status !== 200) {
            alert(JSON.stringify(response));
            return;
        }
        return response.json();
    })
    .then(function(cityInfo) {
        if (cityInfo.length === 0) {
            $('#modal-invalid').show();
            return;
        }
        console.log(cityInfo)
        var lat = cityInfo[0].lat;
        var lon = cityInfo[0].lon; 
        $("#cityTitle").text(cityInfo[0].name);

        var storedSearchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
        var FUCKING=cityInfo[0].name+", "+cityInfo[0].state;
        storedSearchHistory.push(FUCKING); 
        localStorage.setItem('searchHistory', JSON.stringify(storedSearchHistory));
            $("#searchHerstory").append(new Option(FUCKING, FUCKING));  
        
        getForecast (lat, lon);
    })
    .catch(error => {
        console.log("Error fetching weather data:" + error);
        alert("Error fetching:" + error)
    });


}

function getForecast(lat, lon) {
    // 5 day forecast for chosen city (in 3 hr increments)
    var urlForecast = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;
    fetch(urlForecast)
    .then (function (response) {
            return response.json();
    })
    .then(function (forecast) {
            console.log('--forecast data--')
            console.log(forecast) // console logs the retrieved data to be used to display on page
            displayWeather(forecast.list);
    })
    .catch(error => {
        console.log("Error fetching weather data:" + error);
        alert("Error fetching:" + error)
    });
}
function displayWeather(forecast) {
   
    var dayNum = 1;
    for (i=0;i < forecast.length && i<=35;i+=7){
        var thisOne = forecast[i];
        var dayDiv = $("#"+i);
        $("#day"+dayNum+"date").text(thisOne.dt_txt.substring(0, 10));
        $("#day"+dayNum+"Temp").text(thisOne.main.temp);
        $("#day"+dayNum+"Wind").text(thisOne.wind.speed);
        $("#day"+dayNum+"Humid").text(thisOne.main.humidity);
        var picture= getWeatherIcon(thisOne.main.temp); 
        
        var weatherArt= "<img src='" + picture + "'>" 
        dayDiv.children(".weather-icon").html(weatherArt) 
        
        dayNum++;

    }
}
// adding parameters for temp icons
function getWeatherIcon(tempValue) {
    if (tempValue < 30)
        return "images/snowflake.png"; // SNOWFLAKE  
    else if (tempValue >= 30 && tempValue < 65)
        return "images/cloud.webp"; // CLOUD
    else if (tempValue >= 65 && tempValue < 90)
        return "images/sun.png"; // SUN
    else if (tempValue >= 90)
        return "images/fire.jpg"; // FIRE
} 
