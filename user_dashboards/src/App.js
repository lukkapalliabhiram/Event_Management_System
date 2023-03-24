import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import Reservation from "./Components/reservation_history";
import UpReservation from "./Components/upcoming_reservation";
import FilterSearch from "./Components/Filter_Search";
import PaymentsPage from "./Components/PaymentPage";
import BookingPage from "./Components/booking_page";
import ActivityDetails from "./Components/Activity_details";
import PlayerDetailsPage from "./Components/Player_details";
import ConfirmationPage from "./Components/ConfirmationPage";
import Footer from "./footer";
import { fetchVenues, fetchActivities, fetchPlayers } from "./api";


function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

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

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchVenues().then((venues) => setData(venues));
    fetchActivities().then((activities) => setData((prevData) => [...prevData, ...activities]));
    fetchPlayers().then((players) => setData((prevData) => [...prevData, ...players]));
  }, []);

  console.log(data)

  const reservations = [
    {
      venueName: 'Central Park Tennis Center',
      venueOwnerEmail: 'johndoe@example.com',
      location: 'New York, NY',
      sportName: 'Tennis',
      date: '2022-01-15',
      time: '10:00am - 11:00am',
      price: 50.00,
      vrating: 4.5
    },
    {
      venueName: 'Chelsea Piers Sports & Entertainment Complex',
      venueOwnerEmail: 'janedoe@example.com',
      location: 'New York, NY',
      sportName: 'Soccer',
      date: '2022-02-01',
      time: '1:00pm - 2:00pm',
      price: 100.00,
      vrating: 3.8
    },
    {
      activityName: 'Swimming Lessons',
      activityLocation: 'Los Angeles, CA',
      date: '2022-02-15',
      time: '3:00pm - 4:00pm',
      price: 25.00,
      arating: 4.2
    },
    {
      playerGender: 'Male',
      playerAgeRange: '18-30 years',
      playerSkillLevel: 'Intermediate',
      playerAvailability: 'Weekends',
      playerSportActivity: 'Basketball',
      description: 'Looking for a team to play pickup basketball with',
      emailId: 'johndoe@gmail.com',
      image: 'https://via.placeholder.com/150',
      date: '2022-03-15',
      time: '5:00pm - 6:00pm',
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
          <Route path="/" element={<Home data={data} reservations={reservations} />} />
          <Route
            path="/filter_search"
            element={<FilterSearch onSearch={handleFilterSearch} user={user} />} />
          <Route path="/book_venue/:venueIndex" element={<BookingPage data={data} />} />
          <Route path="/activity_details/:activityIndex" element={<ActivityDetails data={data} />} />
          <Route path="/player_details/:playerIndex" element={<PlayerDetailsPage data={data} />} />
          <Route
            path="/payments/:venueIndex"
            element={<PaymentsPage />}
          />
          <Route
            path="/payments/:activityIndex"
            element={<PaymentsPage />}
          />
          <Route
            path="/payments/:playerIndex"
            element={<PaymentsPage />}
          />
          <Route path="/confirmation/:venueIndex" element={<ConfirmationPage />} />
          <Route path="/my_reservations" element={<Reservation reservations={reservations} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}


function Home({ data, reservations }) {
  return (
    <main>
      <section className="profile">
        <Reservation reservations={reservations} />
        <UpReservation />
      </section>
    </main>
  );
}


export default App;