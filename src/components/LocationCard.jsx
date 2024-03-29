import React from 'react';
import PropTypes from 'prop-types';
import "./LocationCard.css"

function LocationCard({ location, removeLoc, setSelectedLoc, isSelected }) {
  
  const handleRemove = (e) => {
    e.stopPropagation();
    removeLoc(location.id);
  };

  const cardClass = `location-card ${isSelected ? 'selected' : ''}`;

  return (
    <div className={cardClass} onClick={() => setSelectedLoc(location)}>
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
  removeLoc: PropTypes.func.isRequired,
  setSelectedLoc: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
};

export default LocationCard;
