
// convert meters per second to miles per hour for wind speed
const metersPerSecondToMilesPerHour = 2.23694;

function convertMPStoMPH(metersPerSecond) {
    return Math.floor(metersPerSecond * metersPerSecondToMilesPerHour);
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
    var getGeoCode = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&units=imperial&appid=12f732d403aab6d939305ecbc4e4f1c3'

    const getLoc = await fetch(getGeoCode)
    const location = await getLoc.json()
    // console.log(location)

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
    document.querySelector('.temp.current').textContent = `Temperature: ${tempF} C`;
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


    // loop throiugh the days
    for (let i = 0; i < forecast.list.length; i += 8) {
        // get tghe date value 
        const currDate = forecast.list[i].dt_txt).format('M/D/YYYY')
        // get the weather icon 


        // get the temp 


        // get the humnidity

        // build the dom elements

        const newDomStuff = `
        <div class="column col-2 day-3"></div>
        <h3 class="cityDate five-day">${currDate}</h3>
        <h3 class="wxIcon"></h3>
        <h3 class="temp five-day"></h3>
        <h3 class="wind five-day"></h3>
        <h3 class="humid five-day"></h3>
        
        `

    }


    // Push formatted dates to the array
    const dates = [];
    // formattedDate.push(dayjs(forecast.list[i].dt_txt).format('M/D/YYYY')); 
    for (let i = 0; i < forecast.list.length; i += 8) {
        dates.push(dayjs(forecast.list[i].dt_txt).format('M/D/YYYY'))
    }
    console.log('Dates: ' + dates);

    // Push icons to the array
    const icons = [];
    const iconImages = [];
    const icon = `<img src= "https://openweathermap.org/img/wn/${wxIcon}@2x.png">`
    for (let i = 0; i < forecast.list.length; i += 8) {
        icons.push(forecast.list[i].weather[0].icon);
        iconImages.push(`<img src= "https://openweathermap.org/img/wn/${forecast.list[i].weather[0].icon}@2x.png">`) 
    }
    console.log('Icons: ' + icons);
    console.log('Icon images: ', iconImages)

    // Push temperatures to the array
    const temperatures = [];
    for (let i = 0; i < forecast.list.length; i += 8) {
        temperatures.push(Math.floor((forecast.list[i].main.temp - 273.15) * 9 / 5 + 32)); 
    }
    console.log('Temperatures: ' + temperatures);

    // Push wind speeds to the array
    const windSpeeds = [];
    for (let i = 0; i < forecast.list.length; i += 8) {
        windSpeeds.push(convertMPStoMPH(forecast.list[i].wind.speed)); 
    }
    console.log('Wind Speeds: ' + windSpeeds);
    
    // Push humidity values to the array
    const humidity = [];
    for (let i = 0; i < forecast.list.length; i += 8) {
        humidity.push(forecast.list[i].main.humidity); 
    }
    console.log('Humidity Readings: ' + humidity);
}
    



















































