// On page load check for 
window.onload = function displayLastSearch() {
    if (localStorage.getItem('lastCity') === null) {}
    else {
        let city = localStorage.getItem('lastCity') 
        getWeather(city)
    }
}

//When search button is pressed display that citys weather, and store the value to load storage.
document
    .getElementById('search')
    .addEventListener('click', function (event) {
        event.preventDefault()
        let city = document.getElementById('city').value
        let savedCities = document.getElementById('savedCities')
        getWeather(city)
        savedCities.insertAdjacentHTML("afterbegin", `<button type="button" class="button is-fullwidth mb-1" cityName="${city}" onclick="pushCity(this)">${city}</button>`)
        localStorage.setItem('lastCity', city)
    })

// When a saved city is pressed, display weather for that city.
function pushCity(button) {
    let city = button.getAttribute('cityName')
    getWeather(city)
}

function getWeather (city) {
    let longlatURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&cnt=1&appid=8f1123f07caa7464aa80ecc99167d3f0`

    return fetch(longlatURL)
        .then(function (response) {
            return response.json()
        })
        .then(function (longlatResults) {
            console.log(longlatResults)
            let lon = longlatResults.city.coord.lon
            let lat = longlatResults.city.coord.lat

            let weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly&appid=8f1123f07caa7464aa80ecc99167d3f0`

            return fetch(weatherURL)
        .then(function (response) {
            return response.json()
        })
        .then(function (weatherResults) {
            console.log(weatherResults)

            // Today's weather.
            document.getElementById('cityName').innerHTML = `
            ${city} 
            <img src="https://openweathermap.org/img/wn/${weatherResults.current.weather[0].icon}.png" alt="${weatherResults.current.weather[0].description} weather icon.">`

            document.getElementById('currentTemp').innerHTML = `
            <strong>Temperature:</strong> ${weatherResults.current.temp} C`

            document.getElementById('currentHumidity').innerHTML = `
            <strong>Humidity:</strong> ${weatherResults.current.humidity}%`

            document.getElementById('currentWind').innerHTML = `
            <strong>Wind Speed:</strong> ${weatherResults.current.wind_speed} KMPH`

            document.getElementById('currentUV').innerHTML = `
            <strong>UV Index:</strong> ${weatherResults.current.uvi}`

            //Tomorrow's weather
            document.getElementById('tomorrowIcon').innerHTML = `
            <img src="https://openweathermap.org/img/wn/${weatherResults.daily[0].weather[0].icon}.png" alt="${weatherResults.daily[0].weather[0].description} weather icon.">`

            document.getElementById('tomorrowTemp').innerHTML = `
            Temperature: ${weatherResults.daily[0].temp.day} C`

            document.getElementById('tomorrowHumidity').innerHTML = `
            Humidity: ${weatherResults.daily[0].humidity}%`

            // Day 2's weather
            document.getElementById('dayTwoIcon').innerHTML = `
            <img src="https://openweathermap.org/img/wn/${weatherResults.daily[1].weather[0].icon}.png" alt="${weatherResults.daily[1].weather[0].description} weather icon.">`

            document.getElementById('dayTwoTemp').innerHTML = `
            Temperature: ${weatherResults.daily[1].temp.day} C`

            document.getElementById('dayTwoHumidity').innerHTML = `
            Humidity: ${weatherResults.daily[1].humidity}%`

            // Day 3's weather
            document.getElementById('dayThreeIcon').innerHTML = `
            <img src="https://openweathermap.org/img/wn/${weatherResults.daily[2].weather[0].icon}.png" alt="${weatherResults.daily[2].weather[0].description} weather icon.">`

            document.getElementById('dayThreeTemp').innerHTML = `
            Temperature: ${weatherResults.daily[2].temp.day} C`

            document.getElementById('dayThreeHumidity').innerHTML = `
            Humidity: ${weatherResults.daily[2].humidity}%`

            // Day 4's weather
            document.getElementById('dayFourIcon').innerHTML = `
            <img src="https://openweathermap.org/img/wn/${weatherResults.daily[3].weather[0].icon}.png" alt="${weatherResults.daily[3].weather[0].description} weather icon.">`

            document.getElementById('dayFourTemp').innerHTML = `
            Temperature: ${weatherResults.daily[3].temp.day} C`

            document.getElementById('dayFourHumidity').innerHTML = `
            Humidity: ${weatherResults.daily[3].humidity}%`

            // Day 5's weather
            document.getElementById('dayFiveIcon').innerHTML = `
            <img src="https://openweathermap.org/img/wn/${weatherResults.daily[4].weather[0].icon}.png" alt="${weatherResults.daily[4].weather[0].description} weather icon.">`

            document.getElementById('dayFiveTemp').innerHTML = `
            Temperature: ${weatherResults.daily[4].temp.day} C`

            document.getElementById('dayFiveHumidity').innerHTML = `
            Humidity: ${weatherResults.daily[4].humidity}%`

            })

        })
        .catch (function (error) {
            document.getElementById('searchError').textContent = "Invalid city name."
            localStorage.clear();
        })
}