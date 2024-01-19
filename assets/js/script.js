
// convert meters per second to miles per hour for wind speed
const metersPerSecondToMilesPerHour = 2.23694;

function convertMPStoMPH(metersPerSecond) {
    return Math.floor(metersPerSecond * metersPerSecondToMilesPerHour);
}

// build search button and event listener, not sure what to put in 2nd part of event listener
const searchButton = document.getElementById('searchButton');
const searchThisCity = document.getElementById("cityName")
const future = document.querySelector('.future');

searchButton.addEventListener('click', searchSave)

function searchSave() {
    getLocApi()
    let savedCities = JSON.parse(localStorage.getItem('cities'))
    if (!savedCities) {
        savedCities = [searchThisCity.value]
        localStorage.setItem('cities', JSON.stringify(savedCities))
    } else {
        newCity = searchThisCity.value
        savedCities.push(newCity)
        localStorage.setItem('cities', JSON.stringify(savedCities))
    }
    future.innerHTML = '';
    searchThisCity.value = '';
}
//display searched cities as buttons and when clicked display the forecasts for those cities
function displaySaved() {
    let savedCities = JSON.parse(localStorage.getItem('cities'))
    for (let i = 0; i < savedCities.length; i++) {
        const savedButton = document.createElement('button')
        document.querySelector('.saved-button').appendChild(savedButton)
        savedButton.textContent = savedCities[i];
        savedButton.addEventListener('click', function (event) {
            searchThisCity.value = event.target.textContent
            getLocApi()

        })
    }
}

// function that uses the api call to get lat and long from city name
async function getLocApi() {
    var cityName = searchThisCity.value
    // console.log(cityName)
    var getGeoCode = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&units=imperial&appid=12f732d403aab6d939305ecbc4e4f1c3'

    const getLoc = await fetch(getGeoCode)
    const location = await getLoc.json()
    // console.log(location)
    future.innerHTML = '';
    searchThisCity.value = '';
    var latitude = location[0].lat;
    // console.log(latitude)

    var longitude = location[0].lon;
    // console.log(longitude)

    var latlongWxUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&appid=12f732d403aab6d939305ecbc4e4f1c3'
    getWx(latlongWxUrl)
}

// function to get weather data from lat and long
async function getWx(latlongWxUrl) {
    const getForecast = await fetch(latlongWxUrl);
    const forecast = await getForecast.json();
    console.log(forecast);
    currentWx(forecast);
    fiveDay(forecast);
    displaySaved();
}

// console log a cityName search and see the results of the "list" array, then I can see the data that I want to pull for the variables
function currentWx(forecast) {
    const city = forecast.city.name;
    console.log('City: ' + city)
    const date = forecast.list[0].dt_txt
    console.log('Date: ' + date)
    const formattedDate = dayjs(date).format('M/D/YYYY');
    console.log('Formatted Date: ' + formattedDate)
    const wxIcon = forecast.list[0].weather[0].icon;
    console.log('Icon: ' + wxIcon)
    const temp = forecast.list[0].main.temp;
    console.log(temp + "K")
    const tempF = Math.floor((temp - 273.15) * 9 / 5 + 32);
    console.log(tempF + 'F')
    const humid = forecast.list[0].main.humidity;
    console.log('Humidity ' + humid + '%')
    const today = dayjs().format('M/DD/YYYY');
    console.log('Today: ' + today)
    const wind = forecast.list[0].wind.speed;
    const windMPH = convertMPStoMPH(wind);
    console.log('Wind meters per second: ' + wind)
    console.log('Wind miles per hour: ' + windMPH)

    // CURRENT FORECAST
    // try using template literals  

    const icon = `<img src= "https://openweathermap.org/img/wn/${wxIcon}@2x.png">`
    document.querySelector('.cityDate.current').innerHTML = `${city} (${today}) ${icon}`;
    document.querySelector('.temp.current').textContent = `Temperature: ${tempF} F`;
    document.querySelector('.wind.current').textContent = `Wind Speed: ${windMPH} MPH`;
    document.querySelector('.humidity.current').textContent = `Humdity: ${humid}%`;
}

// 5-DAY FORECAST
function fiveDay(forecast) {
    const date = forecast.list[0].dt_txt;
    const formattedDate = dayjs(date).format('M/D/YYYY');
    const wxIcon = forecast.list[0].weather[0].icon;
    const temp = forecast.list[0].main.temp;
    const humid = forecast.list[0].main.humidity;
    const wind = forecast.list[0].wind.speed;
    const windMPH = convertMPStoMPH(wind);
    const future = document.querySelector('.future');


    // loop through the days
    for (let i = 0; i < forecast.list.length; i += 8) {

        // get the date values
        const currDate = dayjs(forecast.list[i].dt_txt).format('M/D/YYYY');
        console.log(currDate);

        // get the weather icons
        const iconImages = `<img src= "https://openweathermap.org/img/wn/${forecast.list[i].weather[0].icon}@2x.png">`
        console.log(iconImages)

        // get the temps
        const temperatures = Math.floor((forecast.list[i].main.temp - 273.15) * 9 / 5 + 32);
        console.log(temperatures, 'F')

        // get the wind speeds
        const windSpeeds = convertMPStoMPH(forecast.list[i].wind.speed);
        console.log(windSpeeds, 'MPH');

        // get the humnidity readings
        const humidity = forecast.list[i].main.humidity;
        console.log(humidity);

        // build the forecast elements

        const forecastContent = `
        <div class="column col-2">
        <h3 class="cityDate five-day">${currDate}</h3>
        <h3 class="wxIcon">${iconImages}</h3>
        <h3 class="temp five-day">Temp: ${temperatures} F</h3>
        <h3 class="wind five-day">Wind: ${windSpeeds} MPH</h3>
        <h3 class="humid five-day">Humidity: ${humidity}%</h3>
        </div>
        `
        // set the forecast content to the forecast container element
        future.innerHTML += forecastContent;

    }
}





















































