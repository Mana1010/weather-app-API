import sunny from "./images/clear-sky.png";
import cloudy from "./images/cloudy.png";
import rain from "./images/rainy-day.png";
import mist from "./images/mist.png";
import morning from "./images/sun.png";
import afternoon from "./images/afternoon.png";
import evening from "./images/moon.png";
import lostperson from "./images/decision.png";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { VscChromeClose } from "react-icons/vsc";
import { createContext } from "react";
import MainPage from "./MainPage";

export const ThemeContext = createContext();
function Home() {
  let [weather, setWeather] = useState({
    country: "",
    city: "",
    status: "",
    humidity: "",
    celsius: "",
    speed: "",
    pressure: "",
    description: "",
    img: "",
  });
  let [invalid, isInvalid] = useState({
    name: "",
    reason: "",
    icon: "",
    isRender: false,
  });
  let [searchCountry, isSearchingCountry] = useState("");
  let [rendering, forRendering] = useState(true);
  let [stopNum, setStopNum] = useState(0);
  function searchingCountry(e) {
    e.preventDefault();
  }
  useEffect(() => {
    async function fetchingData() {
      let apiKey = "de164284338308bc3d91f3dc726b625e";
      try {
        const url = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${searchCountry}&appid=${apiKey}&&units=metric`
        );
        const response = await url.json();
        function images() {
          if (response.weather[0].main === "Clear") {
            return sunny;
          } else if (response.weather[0].main === "Rain") {
            return rain;
          } else if (response.weather[0].main === "Clouds") {
            return cloudy;
          } else if (
            response.weather[0].main === "Mist" ||
            response.weather[0].main === "Haze"
          ) {
            return mist;
          }
        }
        setWeather({
          country: response.sys.country,
          city: response.name,
          status: response.weather[0].main,
          humidity: response.main.humidity,
          celsius: response.main.temp,
          speed: response.wind.speed,
          seaLevel: response.main.sea_level,
          pressure: response.main.pressure,
          description: response.weather[0].description,
          img: images(),
        });
        console.log(response.weather[0].description)
        isInvalid({
          name: "",
          reason: "",
          icon: "",
        });
        console.log(response);
        isInvalid({
          ...invalid,
          isRender: false,
        });
        setStopNum(2);
      } catch (err) {
        isInvalid({
          name: "Invalid City Name",
          reason: "Nowhere to be Found",
          icon: lostperson,
          isRender: true,
        });
        setStopNum(stopNum + 1);
      }
    }
    fetchingData();
  }, [rendering]);
  function generateCountry() {
    forRendering(!rendering);
  }
  let dates = new Date();
  return (
    <div>
      <div className="card">
        <header className="header">
          <div className="icons">
            <img
              src={
                dates.getHours() < 12
                  ? morning
                  : dates.getHours() < 18
                  ? afternoon
                  : evening
              }
            />
            <h3>
              {dates.getHours() < 12
                ? "Good Morning"
                : dates.getHours() < 18
                ? "Good Afternoon"
                : "Good Evening"}
            </h3>
          </div>
        </header>
        <div className="main-page">
          <form onSubmit={searchingCountry} className="form">
            <div className="searchbox">
              <button className="find" onClick={generateCountry}>
                <FaSearch />
              </button>
              <input
                placeholder="Enter a city"
                value={searchCountry}
                onChange={(e) => isSearchingCountry(e.target.value)}
                type="text"
              />
              {searchCountry && (
                <button
                  className="close"
                  onClick={() => isSearchingCountry("")}
                >
                  <VscChromeClose />
                </button>
              )}
            </div>
          </form>
        </div>
        <ThemeContext.Provider
          value={[weather, searchCountry, invalid, stopNum]}
        >
          <MainPage />
        </ThemeContext.Provider>
      </div>
    </div>
  );
}

export default Home;
