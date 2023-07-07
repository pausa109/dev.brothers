import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

function RoadMap({ categoryCount }) {
  return (
    <section className="roadMap">
      <h1>Roadmap</h1>
      <div>
        {categoryCount.map((category) => (
          <div>
            <div>
              <div
                className="circle"
                style={{ backgroundColor: category.color }}
              />
              <h2>{category.category}</h2>
            </div>
            <h3>{category.count}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

RoadMap.propTypes = {
  categoryCount: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default RoadMap;
