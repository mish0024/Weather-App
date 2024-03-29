import React from 'react';
import Loading from './Loading';
import "./Weather.css"

function Weather({ weatherData, selectedLoc, isLoading }) {
  if (!selectedLoc) {
    return <div className="weather">No location selected</div>;
  };

  if (isLoading) {
    return <Loading />;
  };

  if (!weatherData) {
    return <div className="weather">Weather data is not available</div>;
  };

  const iconUrl = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`;

  return (
    <div className="weather">
      <h3>Weather for {selectedLoc.name}</h3>
      <div className="weather-wrap">
        <div className="weather-icon">
          <img src={iconUrl} alt="Weather Icon" style={{ width: '36px', height: '36px' }} />
        </div>
        <div className="weather-data">
          <p>{weatherData.weather[0].description}</p>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Feels like: {weatherData.main.feels_like}°C</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          <p>Humidity: {weatherData.main.humidity} %</p>
        </div>
      </div>
    </div>
  );
}

export default Weather;
