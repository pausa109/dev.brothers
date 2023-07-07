import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

function FilterOptions({ categoryList }) {
  return (
    <section className="filterOptions">
      {categoryList.map((category) => (
        <span className={category.selected ? 'option selected' : 'option'}>
          {category.name}
        </span>
      ))}
    </section>
  );
}

FilterOptions.propTypes = {
  categoryList: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      selected: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default FilterOptions;
