import React, { useReducer, useState } from "react";
import "./Filter_Search.css";

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

const FilterSearch = ({ onSearch, data, user }) => {
  const [searchValues, setSearchValues] = useState(initialSearchValues);
  const [searchCategory, setSearchCategory] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleSearchChange = (event) => {
    const { name, value } = event.target;
    setSearchValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const filteredResults = getFilteredData(); // Rename the local variable to avoid conflicts
    setFilteredData(filteredResults); // Update the state variable with the filtered data
  };


  const handleReset = () => {
    setSearchValues(initialSearchValues);
    setSearchCategory("");
    setFilteredData([]);
    onSearch(initialSearchValues, "");
  };

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setSearchCategory(value);
    setSearchValues(initialSearchValues);
    setFilteredData([]);
    onSearch(initialSearchValues, value);
  };

  // Modify the getFilteredData function to filter the data based on the selected search category and search values
  const getFilteredData = () => {
    console.log("searchValues", searchValues);
    console.log("searchCategory", searchCategory);
    const filteredData = data.filter((item) => {
      switch (searchCategory) {
        case "venues":
          return (
            (!searchValues.sportName || item.sportName === searchValues.sportName) &&
            (!searchValues.venueName || item.venueName === searchValues.venueName) &&
            (!searchValues.location || item.location === searchValues.location)
          );
        case "activities":
          return (
            (!searchValues.activityName || item.activityName === searchValues.activityName) &&
            (!searchValues.ageRange || item.ageRange === searchValues.ageRange) &&
            (!searchValues.cost || item.cost === searchValues.cost) &&
            (!searchValues.activityLocation || item.activityLocation === searchValues.activityLocation)
          );
        case "players":
          return (
            (!searchValues.playerSportActivity || item.playerSportActivity === searchValues.playerSportActivity) &&
            (!searchValues.playerGender || item.playerGender === searchValues.playerGender) &&
            (!searchValues.playerAgeRange || item.playerAgeRange === searchValues.playerAgeRange) &&
            (!searchValues.playerSkillLevel || item.playerSkillLevel === searchValues.playerSkillLevel) &&
            (!searchValues.playerAvailability || item.playerAvailability === searchValues.playerAvailability)
          );
        default:
          return true;
      }
    });
    console.log("filteredData", filteredData);
    return filteredData;
  };




  const renderFilterOption = (filter, label) => {
    const counts = getFilterCounts(filter);
    const options = Object.keys(counts).map((value, index) => (
      <div key={`${filter}-${index}`}>
        <label>
          <input
            type="radio"
            name={filter}
            value={value}
            checked={searchValues[filter] === value}
            onChange={handleSearchChange}
          />
          {value} ({counts[value]})
        </label>
      </div>
    ));
    return (
      <div key={`search-group-${filter}`} className="search-group">
        <h3>Search {label}</h3>
        <div className="form-group">{options}</div>
      </div>
    );
  };

  const getFilterCounts = (filter) => {
    const counts = {};
    data
      .filter((item) => {
        switch (searchCategory) {
          case "venues":
            return (
              (!searchValues.sportName || item.sportName === searchValues.sportName) &&
              (!searchValues.venueName || item.venueName === searchValues.venueName) &&
              (!searchValues.location || item.location === searchValues.location)
            );
          case "activities":
            return (
              (!searchValues.activityName || item.activityName === searchValues.activityName) &&
              (!searchValues.ageRange || item.ageRange === searchValues.ageRange) &&
              (!searchValues.cost || item.cost === searchValues.cost) &&
              (!searchValues.activityLocation || item.activityLocation === searchValues.activityLocation)
            );
          case "players":
            return (
              (!searchValues.playerSportActivity || item.playerSportActivity === searchValues.playerSportActivity) &&
              (!searchValues.playerGender || item.playerGender === searchValues.playerGender) &&
              (!searchValues.playerAgeRange || item.playerAgeRange === searchValues.playerAgeRange) &&
              (!searchValues.playerSkillLevel || item.playerSkillLevel === searchValues.playerSkillLevel) &&
              (!searchValues.playerAvailability || item.playerAvailability === searchValues.playerAvailability)
            );
          default:
            return true;
        }
      })
      .forEach((item) => {
        const value = item[filter];
        if (value) {
          if (counts[value]) {
            const count = counts[value];
            counts[value] = count + 1;
          } else {
            counts[value] = 1;
          }
        }
      });
    return counts;
  };


  const renderFilters = () => {
    switch (searchCategory) {
      case "venues":
        return (
          <>
            {renderFilterOption("sportName", "Sports Venues")}
            {renderFilterOption("venueName", "Venue Names")}
            {renderFilterOption("location", "Locations")}
          </>
        );
      case "activities":
        return (
          <>
            {renderFilterOption("activityName", "Activity Names")}
            {renderFilterOption("ageRange", "Age Ranges")}
            {renderFilterOption("cost", "Costs")}
            {renderFilterOption("activityLocation", "Activity Locations")}
          </>
        );
      case "players":
        return (
          <>
            {renderFilterOption("playerSportActivity", "Sport/Activity")}
            {renderFilterOption("playerGender", "Gender")}
            {renderFilterOption("playerAgeRange", "Age Range")}
            {renderFilterOption("playerSkillLevel", "Skill Level")}
            {renderFilterOption("playerAvailability", "Availability")}
          </>
        );
      default:
        return null;
    }
  };


  const handleSendMail = (playerEmail) => {
    const currentUser = user;
    const message = `Hi ${playerEmail},\n\nI'm interested in playing ${currentUser.playerSportActivity} with you. Here are my details:\nName: ${currentUser.name}\nEmail: ${currentUser.email}\nAvailability: ${currentUser.playerAvailability}\nSkill Level: ${currentUser.playerSkillLevel}\n\nLet me know if you're interested in playing together!\n\nBest,\n${currentUser.name}`
    window.location.href = `mailto:${playerEmail}?subject=Interested in playing together!&body=${encodeURIComponent(message)}`;
  }

  return (
    <div className="filter-search">
      <h2>Filter Search</h2>
      <div>
        <label>
          <input
            type="radio"
            name="searchCategory"
            value="venues"
            checked={searchCategory === "venues"}
            onChange={handleCategoryChange}
          />
          Search for sports venues
        </label>
        <label>
          <input
            type="radio"
            name="searchCategory"
            value="activities"
            checked={searchCategory === "activities"}
            onChange={handleCategoryChange}
          />
          Search for sports activities
        </label>
        <label>
          <input
            type="radio"
            name="searchCategory"
            value="players"
            checked={searchCategory === "players"}
            onChange={handleCategoryChange}
          />
          Search for sports players
        </label>
      </div>
      {searchCategory && (
        <form onSubmit={handleSearchSubmit} className="Buttons">
          {renderFilters()}
          <button type="submit">Search</button>
          <button type="button" onClick={handleReset}>
            Reset
          </button>
        </form>
      )}
      {filteredData.length > 0 && (
        <div className="search-results">
          <h2>Search Results</h2>
          <ul>
            {filteredData.map((item, index) => (
              <li key={index}>
                {searchCategory === 'venues' && (
                  <>
                    <div><strong>Venue Name:</strong> {item.venueName}</div>
                    <div><strong>Location:</strong> {item.location}</div>
                    <div><strong>Sport:</strong> {item.sportName}</div>
                    <div><strong>Description:</strong> {item.description}</div>
                    <div> <img className="circle-img" src={item.image} alt={item.venueName} /></div>
                    <button className="btn-book-online">Book Online</button>
                  </>
                )}
                {searchCategory === 'activities' && (
                  <>
                    <div><strong>Activity Name:</strong> {item.activityName}</div>
                    <div><strong>Location:</strong> {item.activityLocation}</div>
                    <div><strong>Age Range:</strong> {item.ageRange}</div>
                    <div><strong>Cost:</strong> {item.cost}</div>
                    <div><strong>Description:</strong> {item.description}</div>
                    <div> <img className="circle-img" src={item.image} alt={item.activityName} /></div>
                    <button className="btn-book-online">Book Online</button>
                  </>
                )}
                {searchCategory === 'players' && (
                  <>
                    <div><strong>Player Gender:</strong> {item.playerGender}</div>
                    <div><strong>Age Range:</strong> {item.playerAgeRange}</div>
                    <div><strong>Skill Level:</strong> {item.playerSkillLevel}</div>
                    <div><strong>Availability:</strong> {item.playerAvailability}</div>
                    <div><strong>Sport:</strong> {item.playerSportActivity}</div>
                    <div><strong>Description:</strong> {item.description}</div>
                    <div><strong>Email:</strong> {item.emailId}</div>
                    <div> <img className="circle-img" src={item.image} alt={item.playerSportActivity} /></div>
                    <button className="btn-send-mail" onClick={() => handleSendMail(item)}>Send Mail</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}


    </div>
  );
};

export default FilterSearch;