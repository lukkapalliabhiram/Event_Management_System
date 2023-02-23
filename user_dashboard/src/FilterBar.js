import React from "react";

const FilterBar = ({ onSelectFilter, onResetFilter }) => {
  const handleFilterSelect = (event) => {
    onSelectFilter(event.target.value);
  };

  const handleFilterReset = () => {
    onResetFilter();
  };

  return (
    <div className="filter-bar">
      <h2>Filter Events</h2>
      <div className="filter-buttons">
        <button value="sportVenues" onClick={handleFilterSelect}>
          Search Sport Venues
        </button>
        <button value="activities" onClick={handleFilterSelect}>
          Search Activities
        </button>
        <button value="players" onClick={handleFilterSelect}>
          Search Players
        </button>
      </div>
      <button className="reset-filter" onClick={handleFilterReset}>
        Reset Filters
      </button>
    </div>
  );
};

export default FilterBar;
