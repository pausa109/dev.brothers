import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

function FilterOwners({ ownerList }) {
  return (
    <section className="filterByOwner">
      <h1>Owners</h1>
      {ownerList.map((owner) => (
        <div
          style={{
            backgroundImage: `url(${owner.url}`,
          }}
        />
      ))}
    </section>
  );
}

FilterOwners.propTypes = {
  ownerList: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default FilterOwners;
