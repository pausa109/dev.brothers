import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import FilterOptions from '../FilterOptions';
import RoadMap from '../RoadMap';
import FilterOwners from '../FilterOwners';

function SideBar({
  selectedCategories,
  setSelectedCategories,
  categoryCount,
  selectedOwners,
  setSelectedOwners,
}) {
  return (
    <section className="sidebar">
      <header>
        <h1>Listify Web</h1>
        <h2>Task Board</h2>
      </header>
      <FilterOptions
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />
      <RoadMap categoryCount={categoryCount} />
      <FilterOwners
        selectedOwners={selectedOwners}
        setSelectedOwners={setSelectedOwners}
      />
    </section>
  );
}

SideBar.propTypes = {
  selectedCategories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      selected: PropTypes.bool.isRequired,
    })
  ).isRequired,
  categoryCount: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedOwners: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  setSelectedCategories: PropTypes.func.isRequired,
  setSelectedOwners: PropTypes.func.isRequired,
};

export default SideBar;
