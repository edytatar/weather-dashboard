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

            // Creating variable needed for 2nd API
            var latitude = weatherData.coord.lat;
            var longitude = weatherData.coord.lon;
            requestUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=hourly&appid=" + apiKey;




            // Fetching data - 2nd API

            fetch(requestUrl)
                .then(function (response) {
                    return response.json();
                })

                .then(function (weatherDataTwo) {
                    console.log(weatherDataTwo);
                    // Creating variables for current weather header elements

                    // Variable for uv index
                    var uvSpan = document.querySelector("#uv-index");
                    var uvData = weatherDataTwo.current.uvi;

                    // Rendering onto page
                    uvSpan.textContent = uvData;

                    //  Creating loop for uv span color
                    if (uvData < 3) {
                        uvSpan.setAttribute("class", "uvGreen");
                    } else if (uvData >= 3 && uvData < 6) {
                        uvSpan.setAttribute("class", "uvYellow");
                    } else {
                        uvSpan.setAttribute("class", "uvRed");
                    }


                    // 5 Day forecast loop
                    for (var i = 1; i < 6; i++) {

                        // Creating elements of 5 Day Forecast
                        var forecastCard = document.createElement("div");
                        var forecastDate = document.createElement("span");
                        var forecastIcon = document.createElement("img");
                        var forecastTemp = document.createElement("h4");
                        var forecastWind = document.createElement("h4");
                        var forecastHumidity = document.createElement("h4");

                        // Getting data for elements
                        var forecastDateNew = new Date()
                        var forecastDateData = (forecastDateNew.getMonth() + 1) + "/" + (forecastDateNew.getDate() + i) + "/" + forecastDateNew.getFullYear();
                        var forecastIconData = weatherDataTwo.daily[i].weather[0].icon;
                        var forecastTempData = Math.floor(((((weatherDataTwo.daily[i].temp.day - 273.15) * 9) / 5) + 32));
                        var forecastWindDataMetric = weatherDataTwo.daily[i].wind_speed;
                        var forecastWindData = Math.floor(forecastWindDataMetric * 2.2369)
                        var forecastHumidityData = weatherDataTwo.daily[i].humidity;

                        // Adding data to elements
                        forecastDate.textContent = forecastDateData;
                        forecastIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + forecastIconData + "@2x.png");
                        forecastIcon.setAttribute("alt", "Weather icon.");
                        forecastTemp.textContent = "Temp: " + forecastTempData;
                        forecastWind.textContent = "Wind: " + forecastWindData + "mph";
                        forecastHumidity.textContent = "Humidity: " + forecastHumidityData;

                        // Setting attributes for elements so they have correct style
                        forecastCard.setAttribute("class", "card");
                        forecastDate.setAttribute("class", "currently-forecast-h3");
                        forecastTemp.setAttribute("class", "forecast-h4");
                        forecastWind.setAttribute("class", "forecast-h4");
                        forecastHumidity.setAttribute("class", "forecast-h4");

                        // Creating element for cards section so we can append div cards to it
                        var cardSection = document.querySelector(".cards");

                        // Appending all elements to forecastCard 
                        forecastCard.append(forecastDate);
                        forecastCard.append(forecastIcon);
                        forecastCard.append(forecastTemp);
                        forecastCard.append(forecastWind);
                        forecastCard.append(forecastHumidity);
                        // Appending forecastCard to the card section
                        cardSection.append(forecastCard);
                    }

                })

        })

}







button.addEventListener("click", fetchData)