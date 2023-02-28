import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import Reservation from "./Components/reservation_history";
import UpReservation from "./Components/upcoming_reservation";
import EveSearch from "./Components/event_search";
import FilterSearch from "./Components/Filter_Search";
import Footer from "./footer";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [user, setUser] = useState({
    firstName: "John",
    lastName: "Doe",
    username: "johndoe",
    email: "johndoe@example.com",
    mobileNumber: "1234567890",
    password: "password123",
    location: "New York, NY",
    photo: "https://via.placeholder.com/150"
  });

  const data = [
    {
      sportName: "Soccer",
      venueName: "SRSC",
      location: "Bloomington, IN",
      name: "Sport Arena",
      description: "Large indoor soccer arena with multiple fields and locker rooms",
      image: "https://example.com/sport-arena.jpg"
    },
    {
      sportName: "Tennis",
      venueName: "WIC",
      location: "Bloomington, IN",
      name: "Tennis Club",
      description: "Outdoor tennis club with clay and hard courts, pro shop, and lessons",
      image: "https://example.com/tennis-club.jpg"
    },
    {
      sportName: "Basketball",
      venueName: "SRSC",
      location: "Bloomington, IN",
      name: "Hoosier Gym",
      description: "Indoor basketball gym with full court and scoreboard",
      image: "https://example.com/hoosier-gym.jpg"
    },
    {
      activityName: "Yoga",
      ageRange: "18-30",
      cost: "Free",
      activityLocation: "Bloomington, IN",
      name: "Yoga Studio",
      description: "Large yoga studio with multiple rooms, variety of classes, and experienced instructors",
      image: "https://example.com/yoga-studio.jpg"
    },
    {
      activityName: "Dance",
      ageRange: "18-30",
      cost: "Chargeable",
      activityLocation: "Bloomington, IN",
      name: "Dance Academy",
      description: "Professional dance academy with wide range of styles, performances, and competitions",
      image: "https://example.com/dance-academy.jpg"
    },
    {
      playerSportActivity: "Soccer",
      playerGender: "Male",
      playerAgeRange: "18-30",
      playerSkillLevel: "Intermediate",
      playerAvailability: "Weekdays",
      description: "Experienced soccer player with strong ball control and teamwork skills",
      emailId: "john.doe@example.com",
      image: "https://example.com/john-doe.jpg"
    },
    {
      playerSportActivity: "Tennis",
      playerGender: "Female",
      playerAgeRange: "30-40",
      playerSkillLevel: "Advanced",
      playerAvailability: "Weekends",
      description: "Highly skilled tennis player with powerful serve and consistent ground strokes",
      emailId: "jane.doe@example.com",
      image: "https://example.com/jane-doe.jpg"
    },
    {
      playerSportActivity: "Basketball",
      playerGender: "Male",
      playerAgeRange: "25-35",
      playerSkillLevel: "Intermediate",
      playerAvailability: "Evenings",
      description: "Athletic basketball player with strong rebounding and defensive skills",
      emailId: "jim.smith@example.com",
      image: "https://example.com/jim-smith.jpg"
    },
    {
      playerSportActivity: "Soccer",
      playerGender: "Female",
      playerAgeRange: "18-25",
      playerSkillLevel: "Beginner",
      playerAvailability: "Weekdays",
      description: "Novice soccer player with enthusiasm and willingness to learn",
      emailId: "jessica.green@example.com",
      image: "https://example.com/jessica-green.jpg"
    },
    { name: "Bloomington Sports Center", sportName: "Basketball", venueName: "BSC", location: "Bloomington, IN", description: "The Bloomington Sports Center is the premier basketball venue in Bloomington, with six full-size courts available for play.", image: "https://example.com/images/bsc.jpg" },
    { name: "Soccerplex", sportName: "Soccer", venueName: "SP", location: "Columbus, OH", description: "Soccerplex is a state-of-the-art indoor soccer facility, featuring three full-size turf fields and the latest training equipment.", image: "https://example.com/images/sp.jpg" },
    { name: "Tennis Club of Indiana", sportName: "Tennis", venueName: "TCI", location: "Indianapolis, IN", description: "The Tennis Club of Indiana is the premier tennis club in the Midwest, featuring 12 outdoor courts and 8 indoor courts.", image: "https://example.com/images/tci.jpg" },
    { name: "YMCA Aquatic Center", sportName: "Swimming", venueName: "YAC", location: "Orlando, FL", description: "The YMCA Aquatic Center is the largest indoor swimming facility in the United States, with two 50-meter pools, a diving well, and a fitness center.", image: "https://example.com/images/yac.jpg" },
    { name: "Ice Castle", sportName: "Ice Hockey", venueName: "IC", location: "Minneapolis, MN", description: "The Ice Castle is a premier ice hockey facility in Minneapolis, featuring three full-size ice rinks and a pro shop.", image: "https://example.com/images/ic.jpg" },
    { name: "Sky Zone", sportName: "Trampoline", venueName: "SZ", location: "Chicago, IL", description: "Sky Zone is a trampoline park featuring dozens of trampolines, foam pits, and a ninja warrior course.", image: "https://example.com/images/sz.jpg" },
    { name: "Gymnastics World", sportName: "Gymnastics", venueName: "GW", location: "Louisville, KY", description: "Gymnastics World is a state-of-the-art gymnastics facility, featuring multiple gymnastics mats, trampolines, and foam pits.", image: "https://example.com/images/gw.jpg" },
    { name: "Indoor Rock Climbing", sportName: "Rock Climbing", venueName: "IRC", location: "Denver, CO", description: "Indoor Rock Climbing is a premier rock climbing facility, featuring dozens of climbing walls, a bouldering cave, and a pro shop.", image: "https://example.com/images/irc.jpg" },
    { name: "Beach Volleyball Club", sportName: "Beach Volleyball", venueName: "BVC", location: "San Diego, CA", description: "The Beach Volleyball Club is the premier beach volleyball facility in San Diego, with multiple sand courts available for play.", image: "https://example.com/images/bvc.jpg" },
    { name: "Basketball Arena", sportName: "Basketball", venueName: "BA", location: "Los Angeles, CA", description: "The Basketball Arena is a state-of-the-art basketball facility, featuring multiple courts, training equipment, and a pro shop.", image: "https://example.com/images/ba.jpg" },
    {
      name: "Yoga for Beginners",
      activityName: "Yoga",
      ageRange: "18-60",
      cost: "Free",
      activityLocation: "Indianapolis, IN",
      description: "This yoga class is designed for beginners and focuses on building a strong foundation in basic yoga poses and breathing techniques.",
      image: "https://example.com/images/yoga.jpg"
      },
      {
      name: "Zumba Fitness",
      activityName: "Zumba",
      ageRange: "18-50",
      cost: "$10 per class",
      activityLocation: "Chicago, IL",
      description: "A fun and high-energy fitness class that combines Latin music and dance moves for a full-body workout.",
      image: "https://example.com/images/zumba.jpg"
      },
      {
      name: "Tai Chi for Seniors",
      activityName: "Tai Chi",
      ageRange: "60+",
      cost: "Free",
      activityLocation: "Cincinnati, OH",
      description: "A low-impact exercise that combines gentle movements, meditation, and breathing techniques to improve balance, flexibility, and overall health.",
      image: "https://example.com/images/tai-chi.jpg"
      },
      {
      name: "Basketball Pickup Games",
      activityName: "Basketball",
      ageRange: "18-40",
      cost: "Free",
      activityLocation: "Louisville, KY",
      description: "Come join our pickup games for a fun and competitive basketball experience with other players in the community.",
      image: "https://example.com/images/basketball.jpg"
      },
      {
      name: "Running Club",
      activityName: "Running",
      ageRange: "18-60",
      cost: "Free",
      activityLocation: "Nashville, TN",
      description: "Join our running club to improve your running skills, meet new people, and participate in local races.",
      image: "https://example.com/images/running.jpg"
      },
      {
        playerSportActivity: "Soccer",
        playerGender: "Male",
        playerAgeRange: "20-30",
        playerSkillLevel: "Advanced",
        playerAvailability: "Weekends",
        description:
          "I have been playing soccer since I was a child and have played at both high school and college levels. Looking for a competitive team to play with on weekends.",
        emailId: "john.smith@gmail.com",
        image: "john.jpg",
      },
      {
        playerSportActivity: "Tennis",
        playerGender: "Female",
        playerAgeRange: "30-50",
        playerSkillLevel: "Intermediate",
        playerAvailability: "Weekdays",
        description:
          "I love playing tennis and have been playing for a few years now. Looking for a partner to play with on weekdays.",
        emailId: "lisa.wong@yahoo.com",
        image: "lisa.jpg",
      },
      {
        playerSportActivity: "Volleyball",
        playerGender: "Male",
        playerAgeRange: "18-25",
        playerSkillLevel: "Beginner",
        playerAvailability: "Evenings",
        description:
          "I'm new to volleyball but eager to learn and improve. Looking for a friendly team to play with in the evenings.",
        emailId: "tom.harris@hotmail.com",
        image: "tom.jpg",
      },
      {
        playerSportActivity: "Basketball",
        playerGender: "Female",
        playerAgeRange: "20-35",
        playerSkillLevel: "Advanced",
        playerAvailability: "Weekends",
        description:
          "I have been playing basketball since I was a kid and have played at both high school and college levels. Looking for a competitive team to play with on weekends.",
        emailId: "kelly.green@gmail.com",
        image: "kelly.jpg",
      },
      {
        playerSportActivity: "Football",
        playerGender: "Male",
        playerAgeRange: "25-45",
        playerSkillLevel: "Intermediate",
        playerAvailability: "Weekends",
        description:
          "I enjoy playing football and have played for a few years now. Looking for a friendly team to play with on weekends.",
        emailId: "akukkapa@iu.edu",
        image: "",
      },
      {
        name: "Beach Volleyball Club",
        sportName: "Beach Volleyball",
        venueName: "BVC",
        location: "San Diego, CA",
        description:
          "The Beach Volleyball Club is the premier beach volleyball facility in San Diego, with multiple sand courts available for play.",
        image: "https://example.com/images/bvc.jpg",
      },
      {
        name: "Sporty's Gym",
        sportName: "Weightlifting",
        venueName: "Sporty's",
        location: "New York, NY",
        description:
          "Sporty's Gym is a premier weightlifting gym in New York City, with top-of-the-line equipment and experienced trainers available to help you achieve your fitness goals.",
        image: "https://example.com/images/sportys.jpg",
      },

  ];

  const handleFilterSearch = (searchValues, category) => {
    const filteredData = data.filter((item) => {
      switch (category) {
        case "venues":
          return (
            item.sportName === searchValues.sportName &&
            item.venueName === searchValues.venueName &&
            item.location === searchValues.location
          );
        case "activities":
          return (
            item.activityName === searchValues.activityName &&
            item.ageRange === searchValues.ageRange &&
            item.cost === searchValues.cost &&
            item.activityLocation === searchValues.activityLocation
          );
        case "players":
          return (
            item.playerSportActivity === searchValues.playerSportActivity &&
            item.playerGender === searchValues.playerGender &&
            item.playerAgeRange === searchValues.playerAgeRange &&
            item.playerSkillLevel === searchValues.playerSkillLevel &&
            item.playerAvailability === searchValues.playerAvailability
          );
        default:
          return true;
      }
    });
    setSearchResults(filteredData);
  };

  return (
    <Router>
      <div className="App">
        <Header user={user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/filter_search"
            element={<FilterSearch onSearch={handleFilterSearch} data={data} user={user}/>}
          />
          <Route path="/my_reservations" element={<Reservation />} />
        </Routes>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}


function Home() {
  return (
    <main>
      <section className="profile">
        <Reservation />
        <UpReservation />
      </section>
    </main>
  );
}

function MyReservations() {
  return <Reservation />;
}

export default App;