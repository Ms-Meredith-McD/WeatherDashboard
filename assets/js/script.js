
// convert meters per second to miles per hour for wind speed
const metersPerSecondToMilesPerHour = 2.23694;

function convertMPStoMPH(metersPerSecond) {
   return metersPerSecond * metersPerSecondToMilesPerHour;
}

// build search button and event listener, not sure what to put in 2nd part of event listener
const searchButton = document.getElementById('searchButton');

searchButton.addEventListener('click', getLocApi)

//need to save searches to local storage and display most recent first and so on

// MY OFFICE HOURS QUESTIONS:
// Why can't I get the city entered into the input box to input into the getGeoCode variable?
// I'm not sure what I should write in the 2nd half of my event listener after "click"?
// How can I better figure out where the data I want is buried in the API arrays?

// get city name from input box and add it to the api address that gets lat and long from the city name
const searchThisCity = document.getElementById("cityName")
// var getGeoCode = 'http://api.openweathermap.org/geo/1.0/direct?q=' +searchThisCity + '&limit=1&units=imperial&appid=12f732d403aab6d939305ecbc4e4f1c3'

// function that uses the api call to get lat and long from city name
async function getLocApi() {
    var cityName = searchThisCity.value
    console.log(cityName)
    var getGeoCode = 'https://api.openweathermap.org/geo/1.0/direct?q=' +cityName + '&limit=1&units=imperial&appid=12f732d403aab6d939305ecbc4e4f1c3'

    const getLoc = await fetch(getGeoCode)
    const location = await getLoc.json()
    console.log(location)
    
    var latitude = location[0].lat;
    console.log(latitude)
    
    var longitude = location[0].lon;
    console.log(longitude)

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

// function that displays data from the api call for weather data to the web page, but my traversing the array isn't working (I think that's the issue)
function currentWx(forecast) {
    const city = forecast.city.name;
    // const date = forecast.list[2].dt_txt;
    // const formattedDate = dayjs(date).format('M/D/YYYY');
    // const wxIcon = forecast.list[2].weather[0].main;
    // const temp = forecast.list[2].main.temp;
    // const humid = forecast.list[2].main.humidity;
    // const today = dayjs().format('M/DD/YYY');
    // const wind = forecast.list[2].wind.speed;
    // const windMPH = convertMPStoMPH(wind);
    // console.log(city);
    // console.log(date);
    // console.log(formattedDate);
    // console.log(wxIcon);
    // console.log(temp)
    // console.log(humid);
    // console.log(today);
    // console.log(wind);
    // console.log(windMPH)

    // document.querySelector('#cityDate').textContent=city + ' ' + '(' + today + ')' + ' ' + wxIcon;
    // document.querySelector('#temp').textContent='Temp: ' + temp;
    // document.querySelector('#wind').textContent='Wind: ' + windMPH;
    // document.querySelector('#humidity').textContent=humid + '%';
    }

























































