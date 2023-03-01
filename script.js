//defined variables
var apikey = "111e380359abdd64a120cd538488815c"
//click event listener
document.querySelector(".main-search-btn-class").addEventListener("click", runSearch)
//https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
//API CALL
function runSearch() {
    var cityName = document.querySelector(".main-search-btn").value
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + apikey
    fetch(apiURL)
        .then(function (newFunction) {
            return newFunction.json()
        })
        .then(function (secondFunction) {
            console.log(secondFunction)
            displayOneDay(secondFunction)
            var lon = secondFunction.coord.lon
            var lat = secondFunction.coord.lat
            var apiURLtwo = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apikey
            console.log(apiURLtwo)
            fetch(apiURLtwo)
                .then(function (newFunction2) {
                    return newFunction2.json()
                })
                .then(function (thirdFunction) {
                    console.log(thirdFunction)
                    displayFiveDays(thirdFunction.list)
                })
        })
};
//select specific element in html and pass in correlating javascript data (current data)
function displayOneDay(data) {
    const oneDaycontainer = document.getElementById("oneDay")
    oneDaycontainer.innerHTML = `
    <p>Date:</p>
    <p class="currentDate">${data.dt}</p>
    <p>City Name:</p>
    <p class="city">${data.name}</p>
    <p>Wind Speed (mph):</p>
    <p class="wind">${data.wind.speed}</p>
    <p>Temperature (fahrenheit):</p>
    <p class="temperature">${data.main.temp}</p>
    <p>Humidity:</p>
    <p class="humidity">${data.main.humidity}</p>
    `

}

function displayFiveDays(data) {
    const fiveDaysDisplay = document.getElementById("fiveDaysDisplay")
    let html = ""
    for (let i = 0; i < data.length; i++) {
        if (data[i].dt_txt.includes("15:00:00")) {
            let icon = `<img src="http://openweathermap.org/img/wn/${data[i].weather[0].icon}@2x.png">`;
            html += `<div class="card">
            <div class="cardBody">
                
              <p class="dayOneIcon">${icon}</p>
              <p>Date:</p>
              <p class="dayOneDate">${new Date(data[i].dt_txt)}</p>
              <p>Humidity:</p>
              <p class="dayOneHumidity">${data[i].main.humidity}</p>
              <p>Temperature (fahrenheit):</p>
              <p class="dayOneTemperature">${data[i].main.temp}</p>
              <p>Wind Speed (mph):</p>
              <p class="dayOneWind">${data[i].wind.speed}</p>
            </div>
          </div>`
        }


    }
    console.log("fiveDaysDisplay")
    fiveDaysDisplay.innerHTML = html

}
//create a function to loop the data for the 5 day weather forecast


























