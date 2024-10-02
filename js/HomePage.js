let cityArr = ['surat', 'Khambhat', 'london', 'newyork'];

cityArr.forEach((cityName) => {
    let cityApi = `http://api.weatherapi.com/v1/current.json?key=4954087548a64399ab854348240110&q=${encodeURIComponent(cityName)}`;

    fetch(cityApi)
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.statusText); 
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



let locationVariable;
document.getElementById('search-btn').addEventListener('click', () => {
    let searchInput = document.getElementById('searchBar').value;
    locationVariable = searchInput;

    const weatherApi = `http://api.weatherapi.com/v1/current.json?key=4954087548a64399ab854348240110&q=${locationVariable}`;
    const futureApi = `http://api.weatherapi.com/v1/forecast.json?key=4954087548a64399ab854348240110&q=${locationVariable}&days=7`;
    // const futureApi = `http://api.weatherapi.com/v1/forecast.json?key=4954087548a64399ab854348240110&q=&days=7`;
   

    // fetch(`http://api.weatherapi.com/v1/current.json?key=4954087548a64399ab854348240110&q=${locationVariable}`)
    // fetch('http://api.weatherapi.com/v1/forecast.json?key=4954087548a64399ab854348240110&q=LOCATION&days=7')

    Promise.all([
        
        fetch(weatherApi).then((response) => response.json()),
        fetch(futureApi).then((response) => response.json())

    ])
        .then(([data, futureData]) => {
            let weatherdata1 = data.location;
            let weatherdata2 = data.current;
            let weatherdata3 = data.current.condition;
            let weatherdata4 = weatherdata3.icon;
            let wfuturedata01 = futureData.forecast.forecastday;

            let wlocationdata = '';
            let wtempraturedata = '';
            let wconditiondata = '';
            let wclouddata = '';
            let whumiditydata = '';
            let wultraviletdata = '';
            let wwindspeeddata = '';
            let wdayornotdata = '';
            let wforcastdata = '';


            wlocationdata += `
        <div>
            
            <p>${weatherdata1.name}</p>
            
        </div>
        `
            wtempraturedata += `
        <div>
            <p>${weatherdata2.temp_c}°C</p>
        </div>
        `
            wconditiondata += `
        <div>
            <p>${weatherdata3.text}</p>
        </div>
        `
            wclouddata += `
        <div>
            <p>${weatherdata2.humidity}</p>
        </div>
        `
            whumiditydata += `
        <div>
            <p>${weatherdata2.cloud}%</p>
        </div>
        `
            wultraviletdata += `
        <div>
            <p>${weatherdata2.uv}</p>
        </div>
        `
            wwindspeeddata += `
        <div>
            <p>${weatherdata2.wind_kph}kph</p>
        </div>
        `
            wdayornotdata += `
        <div>
            <p>${weatherdata2.is_day}</p>
        </div>
        `


            if (weatherdata2.is_day === 1) {
                document.getElementById('dayornot').innerHTML = 'Day';
            }
            else {
                document.getElementById('dayornot').innerHTML = 'Night';
            }

            let daysArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            let today = new Date();
            let currentdayindex = today.getDay();
            console.log(currentdayindex);
            wfuturedata01.forEach((day, daynumber, dayindex) => {
                
                let forcastdayindex = (currentdayindex + dayindex)%7;
                dayname = daysArr[forcastdayindex]
                if(daynumber === 0){
                    paddingClass = 'first-card';
                }
                wforcastdata += `<div class="card">
                 <p class="day-temp">${day.day.avgtemp_c}°C</p>
                    <p class="day-name">${daysArr[daynumber]}</p>
                </div>`
                
            })
            
            document.getElementById('locationName').innerHTML = wlocationdata;
            document.getElementById('carosolcityname').innerHTML = wlocationdata;
            document.getElementById('carosolcitytemp').innerHTML = wtempraturedata;
            document.getElementById('aboutday').innerHTML = wconditiondata;
            document.getElementById('cityweathericon').src = `http:${weatherdata4}`;
            document.getElementById('rainornot').innerHTML = wconditiondata;
            document.getElementById('rainyicon').src = `http:${weatherdata4}`;
            document.getElementById('cloudornot').innerHTML = wclouddata;
            document.getElementById('humidityornot').innerHTML = whumiditydata;
            document.getElementById('ultravioletornot').innerHTML = wultraviletdata;
            document.getElementById('windspeed').innerHTML = wwindspeeddata;
            document.getElementById('CardContainer').innerHTML = wforcastdata;
            document.getElementById('currentDay').innerHTML = daysArr[currentdayindex];


        })
        .catch(error => {
            console.error('Error:', error); // Handle the error correctly
        });

});




