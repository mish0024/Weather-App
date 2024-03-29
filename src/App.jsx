import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import FeedbackBar from './components/FeedbackBar';
import LocationBar from './components/LocationBar';
import Weather from './components/Weather';

function App() {
  const [locations, setLoc] = useState([]);
  const [weatherData, setWeatherData] = useState({});
  const [errMessage, setErrMessage] = useState(''); 
  const [selectedLoc, setSelectedLoc] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleError = (message) => {
    setErrMessage(message);
  };

  const handleSetSelectedLoc = (location) => {
    setSelectedLoc(location);
    setWeatherData({});
    setIsLoading(true);
    fetchWeatherData(location.lat, location.lon);
  };

  const findLocation = (location) => {
    if (locations.length >= 5) {
      setErrMessage('Maximum limit reached for locations.');
      return;
    }
    const locationExists = locations.some(loc => loc.name === location.name && loc.country === location.country);
    if (locationExists) {
      setErrMessage('This location has already been added.');
      return;
    }
    setLoc(prevLocations => [...prevLocations, location]);
  };
  

  const removeLoc = (id) => {
    setLoc(locations.filter((loc) => loc.id !== id));
  };

  const fetchWeatherData = (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=572e79d885750f1f818d6b41e32aad35&units=metric`;

    setIsLoading(true);

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Invalid API data');
        }

        return response.json();
      })
      .then((data) => {
        setWeatherData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setErrMessage('Invalid API data.');
        setIsLoading(false);
      });
  };
  
  return (
    <div className="App">
      <Header />
      <SearchBar findLocation={findLocation} fetchWeatherData={fetchWeatherData} handleError={handleError} />
      {errMessage && <FeedbackBar message={errMessage} clearMessage={() => setErrMessage('')} />}
      <LocationBar locations={locations} removeLoc={removeLoc} setSelectedLoc={handleSetSelectedLoc} selectedLoc={selectedLoc} />
      <Weather weatherData={weatherData} selectedLoc={selectedLoc} isLoading={isLoading} />
    </div>
  );
}

export default App;


