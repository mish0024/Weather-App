import React from 'react';
import PropTypes from 'prop-types';
import "./LocationBar.css"
import LocationCard from './LocationCard';

function LocationBar({ locations, removeLoc, setSelectedLoc, selectedLoc }) {
  return (
    <div className="location-bar">
      {Array.isArray(locations) && locations.length > 0 ? (
        locations.map((location) => (
          // console.log(setSelectedLoc.id),
          // console.log(selectedLoc && location.id === selectedLoc.id),
          <LocationCard 
          key={location.id} 
          location={location} 
          removeLoc={removeLoc} 
          setSelectedLoc={setSelectedLoc} 
          isSelected={selectedLoc && location.id === selectedLoc.id} />
        ))
      ) : (
        <h3>No locations added yet.</h3>
      )}
    </div>
  );
}

LocationBar.propTypes = {
  locations: PropTypes.array.isRequired,
  removeLoc: PropTypes.func.isRequired,
  setSelectedLoc: PropTypes.func.isRequired,
};

export default LocationBar;
