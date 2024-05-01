import React, { useState } from "react";
import axios from "axios";

const XWeatherApp = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "ef09a637d4c249d789d112307240105";

  const fetchWeatherData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      );
      setWeatherData(response.data);
      setError("");
    } catch (error) {
      alert("Failed to fetch weather data");
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  return (
    <div>
      <h2>XWeather App</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          required
        />
        <button type="submit">Search</button>
      </form>
      {loading && <p>Loading data...</p>}
      {error && <p>{error}</p>}
      {weatherData && (
        <div className="weather-cards">
          <div className="weather-card">
            <h3>Temperature: {weatherData.current.temp_c} °C</h3>
          </div>
          <div className="weather-card">
            <h3>Humidity: {weatherData.current.humidity}%</h3>
          </div>
          <div className="weather-card">
            <h3>Condition: {weatherData.current.condition.text}</h3>
          </div>
          <div className="weather-card">
            <h3>Wind Speed: {weatherData.current.wind_kph} km/h</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default XWeatherApp;
