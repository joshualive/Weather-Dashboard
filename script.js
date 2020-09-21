let searchedCities = []
let cityName = document.getElementById('cityName')

document
    .getElementById('search')
    .addEventListener('click', function (event) {
        event.preventDefault()
        let city = document.getElementById('city').value
        
        let longlatURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&cnt=1&appid=8f1123f07caa7464aa80ecc99167d3f0`

        fetch(longlatURL)
            .then(function (response) {
                return response.json()
            })
            .then(function (longlatResults) {
                console.log(longlatResults)
                let lon = longlatResults.city.coord.lon
                let lat = longlatResults.city.coord.lat

                let weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly&appid=8f1123f07caa7464aa80ecc99167d3f0`

                fetch(weatherURL)
                    .then(function (response) {
                        return response.json()
                    })
                    .then(function (weatherResults) {
                        console.log(weatherResults)

                        // Today's weather.
                        cityName.innerHTML = `
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
                        <strong>Temperature:</strong> ${weatherResults.daily[0].temp.day} C`

                        document.getElementById('tomorrowHumidity').innerHTML = `
                        <strong>Humidity:</strong> ${weatherResults.daily[0].humidity}%`

                        // Day 2's weather
                        document.getElementById('dayTwoIcon').innerHTML = `
                        <img src="https://openweathermap.org/img/wn/${weatherResults.daily[1].weather[0].icon}.png" alt="${weatherResults.daily[1].weather[0].description} weather icon.">`

                        document.getElementById('dayTwoTemp').innerHTML = `
                        <strong>Temperature:</strong> ${weatherResults.daily[1].temp.day} C`

                        document.getElementById('dayTwoHumidity').innerHTML = `
                        <strong>Humidity:</strong> ${weatherResults.daily[1].humidity}%`

                        // Day 3's weather
                        document.getElementById('dayThreeIcon').innerHTML = `
                        <img src="https://openweathermap.org/img/wn/${weatherResults.daily[2].weather[0].icon}.png" alt="${weatherResults.daily[2].weather[0].description} weather icon.">`

                        document.getElementById('dayThreeTemp').innerHTML = `
                        <strong>Temperature:</strong> ${weatherResults.daily[2].temp.day} C`

                        document.getElementById('dayThreeHumidity').innerHTML = `
                        <strong>Humidity:</strong> ${weatherResults.daily[2].humidity}%`

                        // Day 4's weather
                        document.getElementById('dayFourIcon').innerHTML = `
                        <img src="https://openweathermap.org/img/wn/${weatherResults.daily[3].weather[0].icon}.png" alt="${weatherResults.daily[3].weather[0].description} weather icon.">`

                        document.getElementById('dayFourTemp').innerHTML = `
                        <strong>Temperature:</strong> ${weatherResults.daily[3].temp.day} C`

                        document.getElementById('dayFourHumidity').innerHTML = `
                        <strong>Humidity:</strong> ${weatherResults.daily[3].humidity}%`

                        // Day 5's weather
                        document.getElementById('dayFiveIcon').innerHTML = `
                        <img src="https://openweathermap.org/img/wn/${weatherResults.daily[4].weather[0].icon}.png" alt="${weatherResults.daily[4].weather[0].description} weather icon.">`

                        document.getElementById('dayFiveTemp').innerHTML = `
                        <strong>Temperature:</strong> ${weatherResults.daily[4].temp.day} C`

                        document.getElementById('dayFiveHumidity').innerHTML = `
                        <strong>Humidity:</strong> ${weatherResults.daily[4].humidity}%`

                    })

            })

    })