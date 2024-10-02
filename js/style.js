let cityArr = ['surat', 'Khambhat', 'london', 'newyork'];

cityArr.forEach((cityName) => {
    let cityApi = `https://api.weatherapi.com/v1/current.json?key=4954087548a64399ab854348240110&q=${encodeURIComponent(cityName)}`;

    fetch(cityApi)
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`); 
        }
        return response.json();
    })
    .then((value) => {
        let cityCondition = value.current.condition;
        let cityTemperature = value.current.temp_c;
        let cityWicon = cityCondition.icon;
 
        let cityData = `
            <div>
                <p>${cityCondition.text}</p>
            </div>
        `;

        let cityTemp = `
            <div>
                <p>${cityTemperature}°C</p>
            </div>
        `;

        let cityIcon = `http:${cityWicon}`;

        let cdata = document.getElementById(`${cityName}Data`);
        let ctempdata = document.getElementById(`${cityName}degree`);
        let cwicondata = document.getElementById(`${cityName}Wid`);

        if (cdata) {
            cdata.innerHTML = cityData;
        } else {
            console.error(`Element with id "${cityName}Data" not found in DOM`);
        }

        if (ctempdata) {
            ctempdata.innerHTML = cityTemp;
        } else {
            console.error(`Element with id "${cityName}degree" not found in DOM`);
        }

        if (cwicondata) {
            cwicondata.src = cityIcon;
        } else {
            console.error(`Element with id "${cityName}Wid" not found in DOM`);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

document.getElementById('search-btn').addEventListener('click', () => {
    let searchInput = document.getElementById('searchBar').value;
    let locationVariable = searchInput;

    const weatherApi = `https://api.weatherapi.com/v1/current.json?key=4954087548a64399ab854348240110&q=${locationVariable}`;
    const futureApi = `https://api.weatherapi.com/v1/forecast.json?key=4954087548a64399ab854348240110&q=${locationVariable}&days=7`;

    Promise.all([
        fetch(weatherApi).then((response) => {
            if (!response.ok) {
                throw new Error(`Weather API error! status: ${response.status}`);
            }
            return response.json();
        }),
        fetch(futureApi).then((response) => {
            if (!response.ok) {
                throw new Error(`Forecast API error! status: ${response.status}`);
            }
            return response.json();
        })
    ])
    .then(([data, futureData]) => {
        let weatherdata1 = data.location;
        let weatherdata2 = data.current;
        let weatherdata3 = data.current.condition;
        let weatherdata4 = weatherdata3.icon;
        let wfuturedata01 = futureData.forecast.forecastday;

        let wlocationdata = `<div><p>${weatherdata1.name}</p></div>`;
        let wtempraturedata = `<div><p>${weatherdata2.temp_c}°C</p></div>`;
        let wconditiondata = `<div><p>${weatherdata3.text}</p></div>`;
        let wclouddata = `<div><p>${weatherdata2.humidity}%</p></div>`;
        let whumiditydata = `<div><p>${weatherdata2.cloud}%</p></div>`;
        let wultraviletdata = `<div><p>${weatherdata2.uv}</p></div>`;
        let wwindspeeddata = `<div><p>${weatherdata2.wind_kph} kph</p></div>`;

        let isDay = weatherdata2.is_day === 1 ? 'Day' : 'Night';
        document.getElementById('dayornot').innerHTML = isDay;

        let daysArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let today = new Date();
        let currentdayindex = today.getDay();
        
        let wforcastdata = '';
        wfuturedata01.forEach((day, index) => {
            let dayIndex = (currentdayindex + index) % 7;
            wforcastdata += `<div class="card">
                <p class="day-temp">${day.day.avgtemp_c}°C</p>
                <p class="day-name">${daysArr[dayIndex]}</p>
            </div>`;
        });

        // Update DOM elements
        if (document.getElementById('locationName')) {
            document.getElementById('locationName').innerHTML = wlocationdata;
        }
        if (document.getElementById('carosolcityname')) {
            document.getElementById('carosolcityname').innerHTML = wlocationdata;
        }
        if (document.getElementById('carosolcitytemp')) {
            document.getElementById('carosolcitytemp').innerHTML = wtempraturedata;
        }
        if (document.getElementById('aboutday')) {
            document.getElementById('aboutday').innerHTML = wconditiondata;
        }
        if (document.getElementById('cityweathericon')) {
            document.getElementById('cityweathericon').src = `http:${weatherdata4}`;
        }
        if (document.getElementById('rainornot')) {
            document.getElementById('rainornot').innerHTML = wconditiondata;
        }
        if (document.getElementById('rainyicon')) {
            document.getElementById('rainyicon').src = `http:${weatherdata4}`;
        }
        if (document.getElementById('cloudornot')) {
            document.getElementById('cloudornot').innerHTML = wclouddata;
        }
        if (document.getElementById('humidityornot')) {
            document.getElementById('humidityornot').innerHTML = whumiditydata;
        }
        if (document.getElementById('ultravioletornot')) {
            document.getElementById('ultravioletornot').innerHTML = wultraviletdata;
        }
        if (document.getElementById('windspeed')) {
            document.getElementById('windspeed').innerHTML = wwindspeeddata;
        }
        if (document.getElementById('CardContainer')) {
            document.getElementById('CardContainer').innerHTML = wforcastdata;
        }
        if (document.getElementById('currentDay')) {
            document.getElementById('currentDay').innerHTML = daysArr[currentdayindex];
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
