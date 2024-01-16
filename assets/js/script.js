
// convert meters per second to miles per hour for wind speed
const metersPerSecondToMilesPerHour = 2.23694;

function convertMPStoMPH(metersPerSecond) {
   return metersPerSecond * metersPerSecondToMilesPerHour;
}

// build search button and event listener, not sure what to put in 2nd part of event listener
const searchButton = document.getElementById('searchButton');

searchButton.addEventListener('click', getLocApi)

//need to save searches to local storage and display most recent first and so on

const searchThisCity = document.getElementById("cityName")
// var getGeoCode = 'http://api.openweathermap.org/geo/1.0/direct?q=' +searchThisCity + '&limit=1&units=imperial&appid=12f732d403aab6d939305ecbc4e4f1c3'

// function that uses the api call to get lat and long from city name
async function getLocApi() {
    var cityName = searchThisCity.value
    // console.log(cityName)
    var getGeoCode = 'https://api.openweathermap.org/geo/1.0/direct?q=' +cityName + '&limit=1&units=imperial&appid=12f732d403aab6d939305ecbc4e4f1c3'

    const getLoc = await fetch(getGeoCode)
    const location = await getLoc.json()
    // console.log(location)
    
    var latitude = location[0].lat;
    // console.log(latitude)
    
    var longitude = location[0].lon;
    // console.log(longitude)

    var latlongWxUrl='https://api.openweathermap.org/data/2.5/forecast?lat=' +latitude + '&lon=' +longitude + '&appid=12f732d403aab6d939305ecbc4e4f1c3'
    getWx(latlongWxUrl)
}

// function to get weather data from lat and long
async function getWx(latlongWxUrl) {
    const getForecast = await fetch(latlongWxUrl)
    const forecast = await getForecast.json()
    console.log(forecast)
    currentWx(forecast)
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
    const tempF = (temp -273.15) *9/5 + 32;
    console.log(tempF + 'F')
    const humid = forecast.list[0].main.humidity;
    console.log('Humidity ' + humid + '%')
    const today = dayjs().format('M/DD/YYYY');
    console.log('Today: ' + today)
    const wind = forecast.list[0].wind.speed;
    const windMPH = convertMPStoMPH(wind);
    console.log('Wind meters per second: ' + wind)
    console.log('Wind miles per hour: ' + windMPH)

    // try using template literals  
    document.querySelector('.cityDate.current').textContent = `${city} (${today}) ${wxIcon}`;
    document.querySelector('.temp.current').textContent = `${tempF} C`;
    document.querySelector('.wind.current').textContent = `${windMPH} MPH`;
    document.querySelector('.humidity.current').textContent = `${humid}%`;

    }

























































