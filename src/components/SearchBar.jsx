import React, { useState } from 'react';
import "./SearchBar.css";
import searchicon from "../assets/search.svg";

function SearchBar({ findLocation, fetchWeatherData, handleError }) {
  const [inputValue, setInputValue] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=1&appid=572e79d885750f1f818d6b41e32aad35`);
      if (response.ok) {
        const data = await response.json();
        if (data.length === 0) {
          throw new Error('Location not found. Please enter a valid location.');
        }
        const { lat, lon, country, name } = data[0];
        const location = {
          id: Math.random().toString(36).substr(2, 9),
          lat,
          lon,
          country,
          name,
        };
        findLocation(location);
        fetchWeatherData(lat, lon);
      } else {
        throw new Error('Failed to retrieve location data.');
      }
    } catch (error) {
      handleError(error.message); //pass this message to the error message (feedback.jsx) and update component with that
    }

    setInputValue('');
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <div className="text-wrap">
          <img className="icon" src={searchicon} alt="" />
          <input
            className="inputtext"
            type="text"
            id="location"
            placeholder="Enter your location to check the weather."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <button className="Button" type="submit">Find Location</button>
      </form>
    </div>
  );
}

export default SearchBar;
