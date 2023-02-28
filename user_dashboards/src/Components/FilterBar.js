import React from "react";

const FilterBar = ({ selectedFilter, onFilterSelect, onFilterReset }) => {
  const handleFilterSelect = (event) => {
    onFilterSelect(event.target.value);
  };

  const handleFilterReset = () => {
    onFilterReset();
  };

  return (
    <div className="filter-bar">
      <h2>Filter Events</h2>
      <div className="filter-buttons">
        <button
          value="sportVenues"
          onClick={handleFilterSelect}
          className={selectedFilter === "sportVenues" ? "selected" : ""}
        >
          Search Sport Venues
        </button>
        <button
          value="activities"
          onClick={handleFilterSelect}
          className={selectedFilter === "activities" ? "selected" : ""}
        >
          Search Activities
        </button>
        <button
          value="players"
          onClick={handleFilterSelect}
          className={selectedFilter === "players" ? "selected" : ""}
        >
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
