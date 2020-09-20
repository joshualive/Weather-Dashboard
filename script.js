let searchedCities = []
let cityName = document.getElementById('cityName')
let currentTemp = document.getElementById('currentTemp')
let currentHumidity = document.getElementById('currentHumidity')
let currentWind = document.getElementById('currentWind')
let currentUV = document.getElementById('currentUV')


document
    .getElementById('search')
    .addEventListener('click', function (event) {
        event.preventDefault()
        
        let weatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=Ottawa&units=metric&appid=8f1123f07caa7464aa80ecc99167d3f0`

        fetch(weatherURL)
            .then(function (response) {
                return response.json()
            })
            .then(function (weatherResults) {
                console.log(weatherResults)

                // Get today's weather.
                cityName.innerHTML = `
                ${weatherResults.city.name} 
                <img src="https://openweathermap.org/img/wn/${weatherResults.list[0].weather[0].icon}.png" alt="${weatherResults.list[0].weather[0].description} weather icon.">`

                currentTemp.innerHTML = `
                <strong>Temperature:</strong> ${weatherResults.list[0].main.temp} C`

                currentHumidity.innerHTML = `
                <strong>Humidity:</strong> ${weatherResults.list[0].main.humidity}%`

                currentWind.innerHTML = `
                <strong>Wind Speed:</strong> ${weatherResults.list[0].wind.speed}`

                let uvURL = `https://api.openweathermap.org/data/2.5/uvi?appid=8f1123f07caa7464aa80ecc99167d3f0&lat=${weatherResults.city.coord.lat}&lon=${weatherResults.city.coord.lon}`

                // Get current UV index.
                fetch(uvURL)
                    .then(function (response) {
                        return response.json()
                })
                .then(function (uvResults) {
                    console.log(uvResults)
                    currentUV.innerHTML = `
                    <strong>UV Index:</strong> ${uvResults.value}`
                })

                
            })
    })