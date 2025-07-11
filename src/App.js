import React, { useState } from "react";
import "./App.css";

const apiKey = "dd68a4d13bdd13b9e9e1b74558ca2be4";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const getWeather = async (e) => {
    e.preventDefault();
    setError("");
    setWeather(null);

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      if (!response.ok) throw new Error("City not found");
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError("City not found. Please try again!");
    }
  };

  return (
    <div className="container">
      <h1>Weather App</h1>
      <form onSubmit={getWeather}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <input type="submit" value="Get Weather" />
      </form>

      {weather && (
        <div className="weather-data">
          <div className="icon">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              alt="Weather Icon"
            />
          </div>
          <div className="temp">{Math.floor(weather.main.temp)}°C</div>
          <div className="desc">{weather.weather[0].description}</div>
          <div className="details">
            <div>Feels Like: <span className="feels-like">{Math.floor(weather.main.feels_like)}°C</span></div>
            <div>Humidity: <span className="humidity">{weather.main.humidity}%</span></div>
            <div>Wind Speed: <span className="wind-speed">{weather.wind.speed} m/s</span></div>
          </div>
        </div>
      )}

      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default App;

