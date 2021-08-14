import React, { useState } from 'react';

const api = {
  key: "5a93a15537b1225b055c36b1f01aa980",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key == "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["Januar", "Februar", "Mart", "April", "Maj", "Juni", "Juli", "August", "Septembar", "Oktobar", "Novembar", "Decembar"]
    let days = ["nedjelja", "ponedjeljak", "utorak", "srijeda", "četvrtak", "petak", "subota"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day}, ${date} ${month} ${year}`
  }
  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16)
      ? 'app'
      : 'app cloud')
      : 'app'}>

      <main>
        <div className="search-box">
          <input type="text" className="search-bar" placeholder="City"
            onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search} />
        </div>

        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)} &#8451;
              </div>
              <div className="temp-feels">
                <p className="text">Feels Like</p>
                {Math.round(weather.main.feels_like)} &#8451;
              </div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>

        ) : ('')}
      </main>
    </div>
  );
}

export default App;
