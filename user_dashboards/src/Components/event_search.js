import { useState } from "react";
// import "./eveSearch.css";

const initialBufferValues = {
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
  playerAvailability: ""
};

const EveSearch = () => {
  const [bufferValues, setBufferValues] = useState(initialBufferValues);
  const [isSportsVenuesOpen, setIsSportsVenuesOpen] = useState(false);
  const [isActivitiesOpen, setIsActivitiesOpen] = useState(false);
  const [isPlayersOpen, setIsPlayersOpen] = useState(false);

  const handleCheckboxChange = (event) => {
    const { name, value, checked } = event.target;
    setBufferValues((prevValues) => ({
      ...prevValues,
      [name]: checked ? value : ""
    }));
  };

  const handleOpen = (event) => {
    const { name } = event.target;
    switch (name) {
      case "sportsVenues":
        setIsSportsVenuesOpen(true);
        setIsActivitiesOpen(false);
        setIsPlayersOpen(false);
        break;
      case "activities":
        setIsSportsVenuesOpen(false);
        setIsActivitiesOpen(true);
        setIsPlayersOpen(false);
        break;
      case "players":
        setIsSportsVenuesOpen(false);
        setIsActivitiesOpen(false);
        setIsPlayersOpen(true);
        break;
      default:
        setIsSportsVenuesOpen(false);
        setIsActivitiesOpen(false);
        setIsPlayersOpen(false);
        break;
    }
  };

  const handleReset = () => {
    setBufferValues(initialBufferValues);
  };

  return (
    <section className="event-search">
      <h2>Event Search</h2>
      <div className="checkbox-container">
        <div className="checkbox-item">
          <input
            type="checkbox"
            id="sports-venues-checkbox"
            name="sportsVenues"
            value="sportsVenues"
            checked={isSportsVenuesOpen}
            onChange={handleOpen}
          />
          <label htmlFor="sports-venues-checkbox">Search Sports Venues</label>
        </div>
        <div className="checkbox-item">
          <input
            type="checkbox"
            id="activities-checkbox"
            name="activities"
            value="activities"
            checked={isActivitiesOpen}
            onChange={handleOpen}
          />
          <label htmlFor="activities-checkbox">Search Activities</label>
        </div>
        <div className="checkbox-item">
          <input
            type="checkbox"
            id="players-checkbox"
            name="players"
            value="players"
            checked={isPlayersOpen}
            onChange={handleOpen}
          />
          <label htmlFor="players-checkbox">Search Players</label>
        </div>
      </div>
      {isSportsVenuesOpen && (
        <div className="search-container">
          <h3>Search Sports Venues</h3>
          <div className="search-item">
            <label htmlFor="sport-name">Sport Name:</label>
            <input
              type="text"
              id="sport-name"
              name="sportName"
              value={bufferValues.sportName}
              onChange={handleCheckboxChange}
            />
          </div>
          <div className="search-item">
            <label htmlFor="venue-name">Venue Name:</label>
            <input
              type="text"
              id="venue-name"
              name="venueName"
              value={          bufferValues.venueName
        }
        onChange={handleCheckboxChange}
      />
      </div>
      <div className="search-item">
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={bufferValues.location}
          onChange={handleCheckboxChange}
        />
      </div>
      <div className="search-button-container">
        <button className="search-button" onClick={handleReset}>
          Reset
        </button>
        <button className="search-button" onClick={() => console.log(bufferValues)}>
          Search
        </button>
      </div>
    </div>
  )}
  {isActivitiesOpen && (
    <div className="search-container">
      <h3>Search Activities</h3>
      <div className="search-item">
        <label htmlFor="activity-name">Activity Name:</label>
        <input
          type="text"
          id="activity-name"
          name="activityName"
          value={bufferValues.activityName}
          onChange={handleCheckboxChange}
        />
      </div>
      <div className="search-item">
        <label htmlFor="age-range">Age Range:</label>
        <input
          type="text"
          id="age-range"
          name="ageRange"
          value={bufferValues.ageRange}
          onChange={handleCheckboxChange}
        />
      </div>
      <div className="search-item">
        <label htmlFor="cost">Cost:</label>
        <input
          type="text"
          id="cost"
          name="cost"
          value={bufferValues.cost}
          onChange={handleCheckboxChange}
        />
      </div>
      <div className="search-item">
        <label htmlFor="activity-location">Location:</label>
        <input
          type="text"
          id="activity-location"
          name="activityLocation"
          value={bufferValues.activityLocation}
          onChange={handleCheckboxChange}
        />
      </div>
      <div className="search-button-container">
        <button className="search-button" onClick={handleReset}>
          Reset
        </button>
        <button className="search-button" onClick={() => console.log(bufferValues)}>
          Search
        </button>
      </div>
    </div>
  )}
  {isPlayersOpen && (
    <div className="search-container">
      <h3>Search Players</h3>
      <div className="search-item">
        <label htmlFor="player-sport-activity">Sport/Activity Name:</label>
        <input
          type="text"
          id="player-sport-activity"
          name="playerSportActivity"
          value={bufferValues.playerSportActivity}
          onChange={handleCheckboxChange}
        />
      </div>
      <div className="search-item">
        <label htmlFor="player-gender">Gender:</label>
        <input
          type="text"
          id="player-gender"
          name="playerGender"
          value={bufferValues.playerGender}
          onChange={handleCheckboxChange}
        />
      </div>
      <div className="search-item">
        <label htmlFor="player-age-range">Age Range:</label>
        <input
          type="text"
          id="player-age-range"
          name="playerAgeRange"
          value={bufferValues.playerAgeRange}
          onChange={handleCheckboxChange}
        />
      </div>
      <div className="search-item">
        <label htmlFor="player-skill-level">Skill Level:</label>
        <input
          type="text"
          id="player-skill-level"
          name="playerSkillLevel"
          value={bufferValues.playerSkillLevel}
          onChange={handleCheckboxChange}
          />
          </div>
          <div className="search-item">
            <label htmlFor="player-availability">Availability:</label>
            <input
              type="text"
              id="player-availability"
              name="playerAvailability"
              value={bufferValues.playerAvailability}
              onChange={handleCheckboxChange}
            />
          </div>
          <div className="search-button-container">
            <button className="search-button" onClick={handleReset}>
              Reset
            </button>
            <button className="search-button" onClick={() => console.log(bufferValues)}>
              Search
            </button>
          </div>
        </div>
        )}

        </section>
          );
        };
        export default EveSearch;