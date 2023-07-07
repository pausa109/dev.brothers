import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import FilterOptions from '../FilterOptions';
import RoadMap from '../RoadMap';
import FilterOwners from '../FilterOwners';

function SideBar({ categoryList, categoryCount, ownerList }) {
  return (
    <section className="sidebar">
      <header>
        <h1>Listify Web</h1>
        <h2>Task Board</h2>
      </header>
      <FilterOptions categoryList={categoryList} />
      <RoadMap categoryCount={categoryCount} />
      <FilterOwners ownerList={ownerList} />
    </section>
  );
}

SideBar.propTypes = {
  categoryList: PropTypes.arrayOf(
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
  ownerList: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default SideBar;
