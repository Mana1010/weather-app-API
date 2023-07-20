import { useContext, useEffect, useState, useRef } from "react";
import { ThemeContext } from "./Home";
import search from "./images/search.png";
import location from "./images/pin.png";
import humidity from "./images/humidity.png";
import speed from "./images/storm.png";
import pressure from "./images/atmospheric.png";
function MainPage() {
  let [weather, searchCountry, invalid, stopNum] = useContext(ThemeContext);
  let km = <span style={{color: 'white', fontSize: '8px'}}>km/h</span>
  let weatherList =[
    {
     img: humidity,
     name: "Humidity",
     status: weather.humidity,
     km: null,
    },
    {
     img: speed,
     name: "Wind Speed",
     status: weather.speed,
     km: "km/h"
    },
    {
     img: pressure,
     name: "Wind Pressure",
     status: weather.pressure,
     km: null,
    },
]
  return (
    <div>
      <div
        className="welcome"
        style={{
          display:
            Object.values(weather)[2].length === 0 && stopNum === 1
              ? null
              : "none",
        }}
      >
        <img src={search} />
        <h1>Search for Weather</h1>
      </div>
      <div
        className="invalid-page"
        style={{ display: stopNum > 1 && invalid.isRender ? null : "none" }}
      >
        <img src={invalid.icon} />
        <h1>{invalid.name}</h1>
        <h3>{invalid.reason}</h3>
      </div>
      <div className="weather-page" style={{display: Object.values(weather)[2].toString().length > 0 && !invalid.isRender ? null : 'none'}}>
        <div className="location">
        <img src={location}/>
        <h3>{weather.city}<span>,{weather.country}</span></h3>
        </div>
        <div className="weather-icon">
        <img src={weather.img}/>
        <p>{weather.description}</p>
        <h2>{weather.celsius}<sup>o</sup>C</h2>
        </div>
        <div className="weather-update">
          {weatherList.map((list, index) => (
            <div key={index} className="weatherlist">
              <h3>{list.name}</h3>
              <img src={list.img}/>
              <h5>{list.status}<span style={{fontSize: '13px'}}>{list.km}</span></h5>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
