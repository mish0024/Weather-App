import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import FeedbackBar from './components/FeedbackBar';
import LocationBar from './components/LocationBar';
import Weather from './components/Weather';

function App() {
  const [locations, setLocations] = useState([]);
  const [weatherData, setWeatherData] = useState({});
  const [errorMessage, setErrorMessage] = useState(''); // []
  const [selectedLocation, setSelectedLocation] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleError = (message) => {
    // setErrorMessage([...errorMessage, message])
    setErrorMessage(message);
  };

  const handleSetSelectedLocation = (location) => {
    setSelectedLocation(location);
    setWeatherData({});
    setIsLoading(true);
    fetchWeatherData(location.lat, location.lon);
  };

  const findLocation = (location) => {
    if (locations.length >= 5) {
      setErrorMessage('Maximum limit reached for locations.');
      return;
    }
    const locationExists = locations.some(loc => loc.name === location.name && loc.country === location.country);
    if (locationExists) {
      setErrorMessage('This location has already been added.');
      return;
    }
    setLocations(prevLocations => [...prevLocations, location]);
  };
  

  const removeLocation = (id) => {
    setLocations(locations.filter((loc) => loc.id !== id));
  };

  const fetchWeatherData = async (lat, lon) => {
    try {
      setIsLoading(true);

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=572e79d885750f1f818d6b41e32aad35&units=metric`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Invalid API data');
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      setErrorMessage('Invalid API data.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="App">
      <Header />
      <SearchBar findLocation={findLocation} fetchWeatherData={fetchWeatherData} handleError={handleError} />
      {errorMessage && <FeedbackBar message={errorMessage} clearMessage={() => setErrorMessage('')} />}
      <LocationBar locations={locations} removeLocation={removeLocation} setSelectedLocation={handleSetSelectedLocation} selectedLocation={selectedLocation} />
      <Weather weatherData={weatherData} selectedLocation={selectedLocation} isLoading={isLoading} />
    </div>
  );
}

export default App;


