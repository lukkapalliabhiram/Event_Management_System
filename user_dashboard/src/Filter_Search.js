import React, { useState } from "react";
import Header from "./Header";
import FilterBar from "./FilterBar";
import EventList from "./EventList";
import EveSearch from "./EveSearch";

const initialEvents = [
  {
    id: 1,
    title: "Soccer Game",
    description: "Come watch our local soccer team play!",
    location: "SRSC",
    date: "2023-02-25",
    time: "16:00",
    sport: "Soccer",
    cost: "Free",
    ageRange: "All Ages",
    skillLevel: "All Levels",
    gender: "All Genders"
  },
  {
    id: 2,
    title: "Yoga Class",
    description: "Join us for a relaxing yoga class.",
    location: "WIC",
    date: "2023-02-26",
    time: "09:00",
    sport: "Yoga",
    cost: "Chargeable",
    ageRange: "18+",
    skillLevel: "Beginner",
    gender: "All Genders"
  },
  {
    id: 3,
    title: "Tennis Match",
    description: "Watch our local tennis team compete!",
    location: "SRSC",
    date: "2023-02-28",
    time: "14:00",
    sport: "Tennis",
    cost: "Free",
    ageRange: "All Ages",
    skillLevel: "Intermediate",
    gender: "All Genders"
  }
];

const FilterSearch = () => {
  const [events, setEvents] = useState(initialEvents);
  const [selectedFilter, setSelectedFilter] = useState("");

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
  };

  const handleFilterReset = () => {
    setSelectedFilter("");
  };

  const handleEventSearch = (searchValues) => {
    // Filter events based on search values
    const filteredEvents = initialEvents.filter((event) => {
      if (searchValues.sportName && event.sport !== searchValues.sportName) {
        return false;
      }
      if (
        searchValues.venueName &&
        event.location !== searchValues.venueName
      ) {
        return false;
      }
      if (searchValues.location && event.location !== searchValues.location) {
        return false;
      }
      if (
        searchValues.activityName &&
        event.sport !== searchValues.activityName
      ) {
        return false;
      }
      if (searchValues.ageRange && event.ageRange !== searchValues.ageRange) {
        return false;
      }
      if (searchValues.cost && event.cost !== searchValues.cost) {
        return false;
      }
      if (
        searchValues.activityLocation &&
        event.location !== searchValues.activityLocation
      ) {
        return false;
      }
      if (
        searchValues.playerSportActivity &&
        event.sport !== searchValues.playerSportActivity
      ) {
        return false;
      }
      if (searchValues.playerGender && event.gender !== searchValues.playerGender) {
        return false;
      }
      if (
        searchValues.playerAgeRange &&
        event.ageRange !== searchValues.playerAgeRange
      ) {
        return false;
      }
      if (
        searchValues.playerSkillLevel &&
        event.skillLevel !== searchValues.playerSkillLevel
      ) {
        return false;
      }
      if (
        searchValues.playerAvailability &&
        event.availability !== searchValues.playerAvailability
      ) {
        return false;
      }
      return true;
    });
setEvents(filteredEvents);
};

return (
<div className="app">
<Header />
<div className="main">
<FilterBar
       selectedFilter={selectedFilter}
       onFilterSelect={handleFilterSelect}
       onFilterReset={handleFilterReset}
     />
<div className="event-container">
<EveSearch onSearch={handleEventSearch} />
<EventList events={events} />
</div>
</div>
</div>
);
};

export default FilterSearch;




   
