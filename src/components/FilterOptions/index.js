import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

function FilterOptions({ selectedCategories, setSelectedCategories }) {
  const handleOptionClick = (clickedCategory) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.map((category) => {
        if (category.name === clickedCategory.name) {
          return { ...category, selected: !category.selected };
        }
        if (clickedCategory.name === 'All') {
          return { ...category, selected: false };
        }
        if (category.name === 'All') {
          return { ...category, selected: false };
        }
        return category;
      })
    );
  };

  return (
    <section className="filterOptions">
      {selectedCategories.map((category) => (
        <span
          key={category.name}
          className={category.selected ? 'option selected' : 'option'}
          role="button"
          onKeyDown={() => handleOptionClick(category)}
          onClick={() => handleOptionClick(category)}
          tabIndex={0}
        >
          {category.name}
        </span>
      ))}
    </section>
  );
}

FilterOptions.propTypes = {
  selectedCategories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      selected: PropTypes.bool.isRequired,
    })
  ).isRequired,
  setSelectedCategories: PropTypes.func.isRequired,
};

export default FilterOptions;
