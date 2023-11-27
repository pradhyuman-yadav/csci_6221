/*
=================
 Global Variable 
=================
*/
let map;
var marker;
let zoomLvl = 0;

/*
=============
 Funtions 
=============
*/

function getWeather() {
    const latitude = document.getElementById("latitude").value;
    const longitude = document.getElementById("longitude").value;
    const date = document.getElementById("dateSelector").value;
    const option = document.getElementById("weatherSelect").value;

    console.log(date);
    console.log(option);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("latitude", latitude);
    urlencoded.append("longitude", longitude);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    if(option === 'currentWeather') {
    	fetch("http://localhost:3000/weather", requestOptions)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            displayAlert("Error fetching weather data.");
        });
    } else if(option === 'forecast'){
    	urlencoded.append("date", date);
    	fetch("http://localhost:3000/forecast", requestOptions)
        .then(response => response.json())
        .then(data => {
            displayForcast(data);
        })
        .catch(error => {
            displayAlert("Error fetching weather data.");
        });
    } else if(option === 'future'){
    	urlencoded.append("date", date);
    	fetch("http://localhost:3000/future", requestOptions)
        .then(response => response.json())
        .then(data => {
            displayFuture(data);
        })
        .catch(error => {
            displayAlert("Error fetching weather data.");
        });
    } else if(option === 'historic'){
    	urlencoded.append("date", date);
    	fetch("http://localhost:3000/history", requestOptions)
        .then(response => response.json())
        .then(data => {
            displayForcast(data);
        })
        .catch(error => {
            displayAlert("Error fetching weather data.");
        });
    } else if(option === 'marine'){
    	urlencoded.append("date", date);
    	fetch("http://localhost:3000/sail", requestOptions)
        .then(response => response.json())
        .then(data => {
            displayForcast(data);
        })
        .catch(error => {
            displayAlert("Error fetching weather data.");
        });
    }
    

    map.setView([latitude, longitude], 13);
}

function displayForcast(weatherData) {
    const leftPanel1 = document.getElementById("left-panel1");
    const rightPanel1 = document.getElementById("right-panel1");
    const leftPanel2 = document.getElementById("left-panel2");
    const rightPanel2 = document.getElementById("right-panel2");
    const leftPanel3 = document.getElementById("left-panel3");
    const rightPanel3 = document.getElementById("right-panel3");

    leftPanel1.innerHTML = `
    <h2>${weatherData.location.name}, ${weatherData.location.country}</h2>
    <p>Local Date & Time: ${weatherData.location.localtime}</p>
    <p>Max Temp: ${weatherData.forecast.forecastday[0].day.maxtemp_c} &deg;C Min Temp: ${weatherData.forecast.forecastday[0].day.mintemp_c} &deg;C</p>
    <p>Weather: ${weatherData.forecast.forecastday[0].day.condition.text}</p>
    <p>Ultravoilet: ${weatherData.forecast.forecastday[0].day.uv}</p>
  `;

    rightPanel1.innerHTML = `<div>
    <h2>Forecast: ${weatherData.forecast.forecastday[0].date}</h2>
    <img src="${weatherData.forecast.forecastday[0].day.condition.icon}" />
    </div>`;

    leftPanel2.innerHTML = `
    <h2>Rain & Snow</h2>
    <p>Will it Rain: ${weatherData.forecast.forecastday[0].day.daily_will_it_rain}</p>
    <p>Chances of rain: ${weatherData.forecast.forecastday[0].day.daily_chance_of_rain}</p>
    <p>Will it Snow: ${weatherData.forecast.forecastday[0].day.daily_will_it_snow}</p>
    <p>Chances it Snow: ${weatherData.forecast.forecastday[0].day.daily_chance_of_snow}</p>
    `;

    rightPanel2.innerHTML = `
    <h2>Astro</h2>
    <p>Sunrise: ${weatherData.forecast.forecastday[0].astro.sunrise}</p>
    <p>Sunset: ${weatherData.forecast.forecastday[0].astro.sunset}</p>
    <p>Moonrise: ${weatherData.forecast.forecastday[0].astro.moonrise}</p>
    <p>Moonset: ${weatherData.forecast.forecastday[0].astro.moonset}</p>
    <p>Moon Phase: ${weatherData.forecast.forecastday[0].astro.moon_phase}</p>
    <p>Moon Illumination: ${weatherData.forecast.forecastday[0].astro.moon_illumination}</p>
    `;
}

function displayFuture(weatherData) {
	const leftPanel1 = document.getElementById("left-panel1");
    const rightPanel1 = document.getElementById("right-panel1");
    const leftPanel2 = document.getElementById("left-panel2");
    const rightPanel2 = document.getElementById("right-panel2");
    const leftPanel3 = document.getElementById("left-panel3");
    const rightPanel3 = document.getElementById("right-panel3");

    leftPanel1.innerHTML = `
    <h2>${weatherData.location.name}, ${weatherData.location.country}</h2>
    <p>Local Date & Time: ${weatherData.location.localtime}</p>
    <p>Max Temp: ${weatherData.forecast.forecastday[0].day.maxtemp_c} &deg;C Min Temp: ${weatherData.forecast.forecastday[0].day.mintemp_c} &deg;C</p>
    <p>Weather: ${weatherData.forecast.forecastday[0].day.condition.text}</p>
    <p>Ultravoilet: ${weatherData.forecast.forecastday[0].day.uv}</p>
  `;

    rightPanel1.innerHTML = `<div>
    <h2>Future: ${weatherData.forecast.forecastday[0].date}</h2>
    <img src="${weatherData.forecast.forecastday[0].day.condition.icon}" />
    </div>`;

    leftPanel2.innerHTML = `
    <h2>Wind, Precipitation & Visibilty</h2>
    <p>Wind: ${weatherData.forecast.forecastday[0].day.maxwind_kph} kph / ${weatherData.forecast.forecastday[0].day.maxwind_mph} mph</p>
    <p>Precipitation: ${weatherData.forecast.forecastday[0].day.totalprecip_mm} mm / ${weatherData.forecast.forecastday[0].day.totalprecip_in} in</p>
    <p>Visibilty: ${weatherData.forecast.forecastday[0].day.avgvis_km} KM / ${weatherData.forecast.forecastday[0].day.avgvis_miles} mil</p>
    <p>Humidity: ${weatherData.forecast.forecastday[0].day.avghumidity}</p>
    `;

    rightPanel2.innerHTML = `
    <h2>Astro</h2>
    <p>Sunrise: ${weatherData.forecast.forecastday[0].astro.sunrise}</p>
    <p>Sunset: ${weatherData.forecast.forecastday[0].astro.sunset}</p>
    <p>Moonrise: ${weatherData.forecast.forecastday[0].astro.moonrise}</p>
    <p>Moonset: ${weatherData.forecast.forecastday[0].astro.moonset}</p>
    <p>Moon Phase: ${weatherData.forecast.forecastday[0].astro.moon_phase}</p>
    <p>Moon Illumination: ${weatherData.forecast.forecastday[0].astro.moon_illumination}</p>
    `;
}

function displayHistoric(weatherData) {
	const leftPanel1 = document.getElementById("left-panel1");
    const rightPanel1 = document.getElementById("right-panel1");
    const leftPanel2 = document.getElementById("left-panel2");
    const rightPanel2 = document.getElementById("right-panel2");
    const leftPanel3 = document.getElementById("left-panel3");
    const rightPanel3 = document.getElementById("right-panel3");

    leftPanel1.innerHTML = `
    <h2>${weatherData.location.name}, ${weatherData.location.country}</h2>
    <p>Local Date & Time: ${weatherData.location.localtime}</p>
    <p>Max Temp: ${weatherData.forecast.forecastday[0].day.maxtemp_c} &deg;C Min Temp: ${weatherData.forecast.forecastday[0].day.mintemp_c} &deg;C</p>
    <p>Weather: ${weatherData.forecast.forecastday[0].day.condition.text}</p>
    <p>Ultravoilet: ${weatherData.forecast.forecastday[0].day.uv}</p>
  `;

    rightPanel1.innerHTML = `<div>
    <h2>Future: ${weatherData.forecast.forecastday[0].date}</h2>
    <img src="${weatherData.forecast.forecastday[0].day.condition.icon}" />
    </div>`;

    leftPanel2.innerHTML = `
    <h2>Wind, Precipitation & Visibilty</h2>
    <p>Wind: ${weatherData.forecast.forecastday[0].day.maxwind_kph} kph / ${weatherData.forecast.forecastday[0].day.maxwind_mph} mph</p>
    <p>Precipitation: ${weatherData.forecast.forecastday[0].day.totalprecip_mm} mm / ${weatherData.forecast.forecastday[0].day.totalprecip_in} in</p>
    <p>Visibilty: ${weatherData.forecast.forecastday[0].day.avgvis_km} KM / ${weatherData.forecast.forecastday[0].day.avgvis_miles} mil</p>
    <p>Humidity: ${weatherData.forecast.forecastday[0].day.avghumidity}</p>
    `;

    rightPanel2.innerHTML = `
    <h2>Astro</h2>
    <p>Sunrise: ${weatherData.forecast.forecastday[0].astro.sunrise}</p>
    <p>Sunset: ${weatherData.forecast.forecastday[0].astro.sunset}</p>
    <p>Moonrise: ${weatherData.forecast.forecastday[0].astro.moonrise}</p>
    <p>Moonset: ${weatherData.forecast.forecastday[0].astro.moonset}</p>
    <p>Moon Phase: ${weatherData.forecast.forecastday[0].astro.moon_phase}</p>
    <p>Moon Illumination: ${weatherData.forecast.forecastday[0].astro.moon_illumination}</p>
    `;
}

function displayMarine(weatherData) {

}

function displayWeather(weatherData) {
    const leftPanel1 = document.getElementById("left-panel1");
    const rightPanel1 = document.getElementById("right-panel1");
    const leftPanel2 = document.getElementById("left-panel2");
    const rightPanel2 = document.getElementById("right-panel2");
    const leftPanel3 = document.getElementById("left-panel3");
    const rightPanel3 = document.getElementById("right-panel3");


    leftPanel1.innerHTML = `
    <h2>${weatherData.location.name}, ${weatherData.location.country}</h2>
    <p>Local Date & Time: ${weatherData.location.localtime}</p>
    <p>Temperature: ${weatherData.current.temp_c} &deg;C / ${weatherData.current.temp_f} &deg;F</p>
    <p>Weather: ${weatherData.current.condition.text}</p>
  `;


    rightPanel1.innerHTML = `<div>
    <h2>Current</h2>
    <img src="${weatherData.current.condition.icon}" />
    </div>
    `;


    leftPanel2.innerHTML = `
      <h3>Wind</h3>
      <p>Speed: ${weatherData.current.wind_kph} kph OR ${weatherData.current.wind_mph} mph</p>
      <p>Direction: ${weatherData.current.wind_degree} ${weatherData.current.wind_dir}</p>
      <p>Cloud Cover: ${weatherData.current.cloud}</p>
    `;


    rightPanel2.innerHTML = `
    <h3>Other Information</h3>
    <p>Feels Like: ${weatherData.current.feelslike_c} &deg;C / ${weatherData.current.feelslike_f} &deg;F</p>
    <p>Humidity: ${weatherData.current.humidity}</p>
    <p>UV: ${weatherData.current.uv}</p>
    <p>Visibilty: ${weatherData.current.vis_km} KM OR ${weatherData.current.vis_miles} M</p>
    `;



}

function displayAlert(message) {
    const alertContainer = document.getElementById("alert-container");
    alertContainer.innerHTML = message;
}

function initMap() {
    map = L.map('map').setView([38.881622, -77.090981], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'by Pradhyuman',
        className: 'map-tiles'
    }).addTo(map);

    map.on('click', function(e) {
        if (marker != null) map.removeLayer(marker)
        const lat = e.latlng.lat;
        const lon = e.latlng.lng;
        marker = new L.Marker(e.latlng, { draggable: true });
        map.addLayer(marker);
        document.getElementById("latitude").value = lat;
        document.getElementById("longitude").value = lon;
    });
}

// Call initMap() when the document is ready
document.addEventListener('DOMContentLoaded', function() {
    initMap();
});

function darkModeToggle() {
    var element = document.body;
    element.classList.toggle("dark-mode");
    var mapDark = document.getElementById("map");
    mapDark.classList.toggle("map-tilesDark");
}