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

const EveSearch = ({initialEvents, onSearch }) => {
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
    initialEvents.forEach((event) => {
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
        <div>
          <h3>Search Sports Venues</h3>
          <div className="form-group">
            {renderFilterOption("sportName", "Sport Name")}
            {renderFilterOption("venueName", "Venue Name")}
            {renderFilterOption("location", "Location")}
          </div>
        </div>
        <div>
          <h3>Search Sports Activities</h3>
          <div className="form-group">
            {renderFilterOption("activityName", "Activity Name")}
            {renderFilterOption("ageRange", "Age Range")}
            {renderFilterOption("cost", "Cost")}
            {renderFilterOption("activityLocation", "Location")}
          </div>
        </div>
        <div>
          <h3>Search Sports Players</h3>
          <div className="form-group">
            {renderFilterOption("playerSportActivity", "Sport/Activity Name")}
            {renderFilterOption("playerGender", "Gender")}
            {renderFilterOption("playerAgeRange", "Age Range")}
            {renderFilterOption("playerSkillLevel", "Skill Level")}
            {renderFilterOption("playerAvailability", "Availability")}
          </div>
        </div>
        <button type="submit">Search</button>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </form>
    </div>
  );
};

export default EveSearch;
