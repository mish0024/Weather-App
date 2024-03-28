import React from 'react';
import PropTypes from 'prop-types';
import "./LocationCard.css"

function LocationCard({ location, removeLocation, setSelectedLocation, isSelected }) {
  
  const handleRemove = (e) => {
    e.stopPropagation();
    removeLocation(location.id);
  };

  const cardClass = `location-card ${isSelected ? 'selected' : ''}`;

  return (
    <div className={cardClass} onClick={() => setSelectedLocation(location)}>
      <div>
        <h3>{location.name}</h3>
        <p>{location.country}</p>
      </div>
      <button onClick={handleRemove}>Remove</button>
    </div>
  );
}

LocationCard.propTypes = {
  location: PropTypes.object.isRequired,
  removeLocation: PropTypes.func.isRequired,
  setSelectedLocation: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
};

export default LocationCard;
