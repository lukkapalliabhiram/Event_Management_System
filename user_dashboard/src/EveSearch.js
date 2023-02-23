import React, { useState } from "react";

const initialSearchValues = {
  sportName: "",
  venueName: "",
  location: "",
  activityName: "",
  ageRange: "",
  cost: "",
  activityLocation: "",
  playerSportActivity: "",
  playerGender: "",
  playerAgeRange: "",
  playerSkillLevel: "",
  playerAvailability: "",
};

const EveSearch = ({ events, onSearch }) => {
  const [searchValues, setSearchValues] = useState(initialSearchValues);

  const handleSearchChange = (event) => {
    const { name, value } = event.target;
    setSearchValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    onSearch(searchValues);
  };

  const handleReset = () => {
    setSearchValues(initialSearchValues);
    onSearch(initialSearchValues);
  };

  const getFilterCounts = (filter) => {
    const counts = {};
    events.forEach((event) => {
      const value = event[filter];
      if (value) {
        if (counts[value]) {
          counts[value]++;
        } else {
          counts[value] = 1;
        }
      }
    });
    return counts;
  };

  const renderFilterOption = (filter, label) => {
    const counts = getFilterCounts(filter);
    const options = Object.keys(counts).map((value) => (
      <label key={value}>
        <input
          type="radio"
          name={filter}
          value={value}
          checked={searchValues[filter] === value}
          onChange={handleSearchChange}
        />
        {value} ({counts[value]})
      </label>
    ));
    return (
      <div key={filter} className="search-group">
        <h3>Search {label}</h3>
        <div className="form-group">{options}</div>
      </div>
    );
  };

  return (
    <div className="event-search">
      <h2>Event Search</h2>
      <form onSubmit={handleSearchSubmit}>
        {renderFilterOption("sport", "Sports Venues")}
        {renderFilterOption("activity", "Activities")}
        {renderFilterOption("location", "Players")}
        <button type="submit">Search</button>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </form>
    </div>
  );
};

export default EveSearch;
