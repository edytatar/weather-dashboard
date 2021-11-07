/*
- Link JS file to  html
- Get access to the input field
- Get access to button
- Create function to fetch api data when button is clicked
*/

var inputField = document.querySelector('#city');
var button = document.querySelector('#get-weather');

function fetchData(event) {
    event.preventDefault();
    // Creating variables
    var cityName = inputField.value;
    var apiKey = '4ed239c92c0b7e571ac6411f3723065a';
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + apiKey;

    // Fetching data - 1st API
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })

        .then(function (weatherData) {
            console.log(weatherData);
            // Creating variables for current weather header elements

            // Variable for city name span
            var dataCity = document.querySelector("#data-city");

            // Appending img tag to span of current icon span
            var currentIcon = document.querySelector("#current-icon-span");
            var iconImg = document.createElement("img");
            var iconCode = weatherData.weather[0].icon;
            iconImg.src = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";

            // Variable for today's date
            var dateSpan = document.querySelector("#date");
            var today = new Date();
            var todayDate = (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear();

            // Variable for temp
            var tempSpan = document.querySelector("#temp");
            var tempData = Math.floor(((((weatherData.main.temp - 273.15) * 9) / 5) + 32));

            // Variable for wind
            var windSpan = document.querySelector("#wind");
            var windDataMetric = weatherData.wind.speed;
            var windData = Math.floor(windDataMetric * 2.2369);

            // Variable for humidity
            var humiditySpan = document.querySelector("#humidity");
            var humidityData = weatherData.main.humidity;

            // Rendering data from API onto page
            dataCity.textContent = weatherData.name;
            currentIcon.appendChild(iconImg);
            dateSpan.textContent = todayDate;
            tempSpan.textContent = tempData + "˚ F";
            windSpan.textContent = windData + "mph";
            humiditySpan.textContent = humidityData + "%";

        })

}







button.addEventListener("click", fetchData)