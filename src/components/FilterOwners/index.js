import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

function FilterOwners({ selectedOwners, setSelectedOwners }) {
  const handleOwnerClick = (clickedOwner) => {
    setSelectedOwners((prevOwners) =>
      prevOwners.map((owner) =>
        owner.name === clickedOwner.name
          ? { ...owner, selected: !owner.selected }
          : owner
      )
    );
  };

  return (
    <section className="filterByOwner">
      <h1>Owners</h1>
      {selectedOwners.map((owner, index) => (
        <div
          style={{
            backgroundImage: `url(${owner.url}`,
            border: owner.selected ? '2px solid blue' : 'none',
          }}
          role="button"
          tabIndex={0}
          onKeyDown={() => handleOwnerClick(owner)}
          onClick={() => handleOwnerClick(owner)}
          aria-label={`Owner ${index + 1}`}
        />
      ))}
    </section>
  );
}

FilterOwners.propTypes = {
  selectedOwners: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      selected: PropTypes.bool.isRequired,
    })
  ).isRequired,
  setSelectedOwners: PropTypes.func.isRequired,
};

export default FilterOwners;
