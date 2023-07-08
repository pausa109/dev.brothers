import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

function FilterOwners({ selectedOwners, setSelectedOwners }) {
  const handleOwnerClick = (clickedOwner) => {
    setSelectedOwners((prevOwners) =>
      prevOwners.map((owner) =>
        owner.url === clickedOwner.url
          ? { ...owner, selected: !owner.selected }
          : owner
      )
    );
  };

  return (
    <section className="filterByOwner">
      <h1>Owners</h1>
      <div className="ownersPhoto">
        {selectedOwners.map((owner, index) => (
          <div className="photoFrame">
            <div
              className="photoImage"
              style={{
                backgroundImage: `url(${owner.url}`,
                border: owner.selected ? '2.5px solid #7A74ED' : 'none',
              }}
              role="button"
              tabIndex={0}
              onKeyDown={() => handleOwnerClick(owner)}
              onClick={() => handleOwnerClick(owner)}
              aria-label={`Owner ${index + 1}`}
            />
          </div>
        ))}
      </div>
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
