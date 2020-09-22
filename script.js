let today = moment().format("MMMM Do")
let tomorrow = moment().add(24, 'hours').format('ddd'); 
let dayTwo = moment().add(48, 'hours').format('ddd');
let dayThree = moment().add(72, 'hours').format('ddd');
let dayFour = moment().add(96, 'hours').format('ddd');
let dayFive = moment().add(120, 'hours').format('ddd');
let daySix = moment().add(144, 'hours').format('ddd');
let daySeven = moment().add(168, 'hours').format('ddd');


// On page load check for 
window.onload = function displayLastSearch() {
    if (localStorage.getItem('lastCity') === null) {
        let city = 'Ottawa'
        getWeather(city)
    }
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
        document.getElementById('searchError').textContent = ""
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
            ${city} (${today}) 
            <img src="https://openweathermap.org/img/wn/${weatherResults.current.weather[0].icon}.png" alt="${weatherResults.current.weather[0].description} weather icon.">`

            document.getElementById('currentTemp').innerHTML = `
            <strong>Temperature:</strong> ${Math.round(weatherResults.current.temp)} C`

            document.getElementById('currentHumidity').innerHTML = `
            <strong>Humidity:</strong> ${weatherResults.current.humidity}%`

            document.getElementById('currentWind').innerHTML = `
            <strong>Wind Speed:</strong> ${weatherResults.current.wind_speed} KMPH`

            document.getElementById('currentUV').innerHTML = `
            <strong>UV Index:</strong> ${weatherResults.current.uvi}`

            if (weatherResults.current.uvi < 3) {
                document.getElementById('currentUV').innerHTML = `
                <strong>UV Index:</strong> <button class="button is-small is-link is-success">${weatherResults.current.uvi}</button>`
            }
            else if (weatherResults.current.uvi >= 3 && weatherResults.current.uvi <= 6 ){
                document.getElementById('currentUV').innerHTML = `
                <strong>UV Index:</strong> <button class="button is-small is-link is-warning">${weatherResults.current.uvi}</button>`
            }
            else {
                document.getElementById('currentUV').innerHTML = `
                <strong>UV Index:</strong> <button class="button is-small is-link is-danger">${weatherResults.current.uvi}</button>`
            }

            //Tomorrow's weather
            document.getElementById('tomorrowIcon').innerHTML = `
            <img src="https://openweathermap.org/img/wn/${weatherResults.daily[0].weather[0].icon}.png" alt="${weatherResults.daily[0].weather[0].description} weather icon.">`

            document.getElementById('tomorrow').innerHTML = `<strong>${tomorrow}</strong>`

            document.getElementById('tomorrowTemp').innerHTML = `
            ${Math.round(weatherResults.daily[0].temp.max)} / ${Math.round(weatherResults.daily[0].temp.min)} C`

            document.getElementById('tomorrowHumidity').innerHTML = `
            Humidity: ${weatherResults.daily[0].humidity}%`

            // Day 2's weather
            document.getElementById('dayTwoIcon').innerHTML = `
            <img src="https://openweathermap.org/img/wn/${weatherResults.daily[1].weather[0].icon}.png" alt="${weatherResults.daily[1].weather[0].description} weather icon.">`

            document.getElementById('dayTwo').innerHTML = `<strong>${dayTwo}</strong>`

            document.getElementById('dayTwoTemp').innerHTML = `
            ${Math.round(weatherResults.daily[1].temp.max)} / ${Math.round(weatherResults.daily[1].temp.min)} C`

            document.getElementById('dayTwoHumidity').innerHTML = `
            Humidity: ${weatherResults.daily[1].humidity}%`

            // Day 3's weather
            document.getElementById('dayThreeIcon').innerHTML = `
            <img src="https://openweathermap.org/img/wn/${weatherResults.daily[2].weather[0].icon}.png" alt="${weatherResults.daily[2].weather[0].description} weather icon.">`
            
            document.getElementById('dayThree').innerHTML = `<strong>${dayThree}</strong>`

            document.getElementById('dayThreeTemp').innerHTML = `
            ${Math.round(weatherResults.daily[2].temp.max)} / ${Math.round(weatherResults.daily[2].temp.min)} C`

            document.getElementById('dayThreeHumidity').innerHTML = `
            Humidity: ${weatherResults.daily[2].humidity}%`

            // Day 4's weather
            document.getElementById('dayFourIcon').innerHTML = `
            <img src="https://openweathermap.org/img/wn/${weatherResults.daily[3].weather[0].icon}.png" alt="${weatherResults.daily[3].weather[0].description} weather icon.">`

            document.getElementById('dayFour').innerHTML = `<strong>${dayFour}</strong>`

            document.getElementById('dayFourTemp').innerHTML = `
            ${Math.round(weatherResults.daily[3].temp.max)} / ${Math.round(weatherResults.daily[3].temp.min)} C`

            document.getElementById('dayFourHumidity').innerHTML = `
            Humidity: ${weatherResults.daily[3].humidity}%`

            // Day 5's weather
            document.getElementById('dayFiveIcon').innerHTML = `
            <img src="https://openweathermap.org/img/wn/${weatherResults.daily[4].weather[0].icon}.png" alt="${weatherResults.daily[4].weather[0].description} weather icon.">`

            document.getElementById('dayFive').innerHTML = `<strong>${dayFive}</strong>`

            document.getElementById('dayFiveTemp').innerHTML = `
            ${Math.round(weatherResults.daily[4].temp.max)} / ${Math.round(weatherResults.daily[4].temp.day)} C`

            document.getElementById('dayFiveHumidity').innerHTML = `
            Humidity: ${weatherResults.daily[4].humidity}%`

            // Day 6's weather
            document.getElementById('daySixIcon').innerHTML = `
            <img src="https://openweathermap.org/img/wn/${weatherResults.daily[5].weather[0].icon}.png" alt="${weatherResults.daily[5].weather[0].description} weather icon.">`

            document.getElementById('daySix').innerHTML = `<strong>${daySix}</strong>`

            document.getElementById('daySixTemp').innerHTML = `
            ${Math.round(weatherResults.daily[5].temp.max)} / ${Math.round(weatherResults.daily[5].temp.min)}C`

            document.getElementById('daySixHumidity').innerHTML = `
            Humidity: ${weatherResults.daily[5].humidity}%`

            // Day 7's weather
            document.getElementById('daySevenIcon').innerHTML = `
            <img src="https://openweathermap.org/img/wn/${weatherResults.daily[6].weather[0].icon}.png" alt="${weatherResults.daily[6].weather[0].description} weather icon.">`

            document.getElementById('daySeven').innerHTML = `<strong>${daySeven}</strong>`

            document.getElementById('daySevenTemp').innerHTML = `
            ${Math.round(weatherResults.daily[6].temp.max)} / ${Math.round(weatherResults.daily[6].temp.min)} C`

            document.getElementById('daySevenHumidity').innerHTML = `
            Humidity: ${weatherResults.daily[6].humidity}%`

            })

        })
        .catch (function (error) {
            document.getElementById('searchError').textContent = "Invalid city name."
            localStorage.clear();
        })
}

