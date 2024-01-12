const metersPerSecondToMilesPerHour = 2.23694;

function convertMPStoMPH(metersPerSecond) {
   return metersPerSecond * metersPerSecondToMilesPerHour;
}
//need inputfield and search button with click event listener
// need function to give name of city to getGeoCode variable to replace "Minneapolis"
//need to save searches to local storage and display most recent first and so on

var getGeoCode = 'http://api.openweathermap.org/geo/1.0/direct?q=Minneapolis&limit=1&units=imperial&appid=12f732d403aab6d939305ecbc4e4f1c3'


async function getLocApi(requestUrl) {
    const getLoc = await fetch(requestUrl)
    const location = await getLoc.json()
    console.log(location)
    
    var latitude = location[0].lat;
    console.log(latitude)
    
    var longitude = location[0].lon;
    console.log(longitude)

    var latlongWxUrl='api.openweathermap.org/data/2.5/forecast?lat=' +latitude + '&lon=' +longitude + '&appid=12f732d403aab6d939305ecbc4e4f1c3'
    getWx(latlongWxUrl)
}

async function getWx(latlongWxUrl) {
    const getForecast = await fetch(latlongWxUrl)
    const forecast = await getForecast.json()
    console.log(forecast)
    currentWx(forecast)
}

function currentWx(forecast) {
    const city = forecast.list.city.name;
    const date = forecast.list[2].dt_txt;
    const formattedDate = dayjs(date).format('M/D/YYYY');
    const wxIcon = forecast.list[2].weather[0].main;
    const temp = forecast.list[2].main.temp;
    const humid = forecast.list[2].main.humidity;
    const today = dayjs().format('M/DD/YYY');
    const wind = forecast.list[2].wind.speed;
    const windMPH = convertMPStoMPH(wind);
    console.log(city);
    console.log(date);
    console.log(formattedDate);
    console.log(wxIcon);
    console.log(temp)
    console.log(humid);
    console.log(today);
    console.log(wind);
    console.log(windMPH)

    document.querySelector('#cityDate').textContent=city + ' ' + '(' + today + ')' + ' ' + wxIcon;
    document.querySelector('#temp').textContent='Temp: ' + temp;
    document.querySelector('#wind').textContent='Wind: ' + windMPH;
    document.querySelector('#humidity').textContent=humid + '%';
    
}


getLocApi(getGeoCode)
console.log(getGeoCode)





















































