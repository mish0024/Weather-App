import React from 'react';
import PropTypes from 'prop-types';
import "./LocationBar.css"
import LocationCard from './LocationCard';

function LocationBar({ locations, removeLocation, setSelectedLocation, selectedLocation }) {
  return (
    <div className="location-bar">
      {Array.isArray(locations) && locations.length > 0 ? (
        locations.map((location) => (
          // console.log(setSelectedLocation.id),
          // console.log(selectedLocation && location.id === selectedLocation.id),
          <LocationCard 
          key={location.id} 
          location={location} 
          removeLocation={removeLocation} 
          setSelectedLocation={setSelectedLocation} 
          isSelected={selectedLocation && location.id === selectedLocation.id} />
        ))
      ) : (
        <h3>No locations added yet.</h3>
      )}
    </div>
  );
}

LocationBar.propTypes = {
  locations: PropTypes.array.isRequired,
  removeLocation: PropTypes.func.isRequired,
  setSelectedLocation: PropTypes.func.isRequired,
};

export default LocationBar;
