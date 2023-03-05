import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import Reservation from "./Components/reservation_history";
import UpReservation from "./Components/upcoming_reservation";
import FilterSearch from "./Components/Filter_Search";
import PaymentsPage from "./Components/PaymentPage";
import BookingPage from "./Components/booking_page";
import ConfirmationPage from "./Components/ConfirmationPage";
import Footer from "./footer";

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

  const data = [
    {
      venueName: 'Central Park Tennis Center',
      venueOwnerEmail: 'johndoe@example.com',
      location: 'New York, NY',
      sportName: 'Tennis',
      description: 'Tennis center in the heart of Central Park',
      image: 'https://via.placeholder.com/150',
      availableTimeSlots: [
        '10:00am - 11:00am',
        '1:00pm - 2:00pm',
        '3:00pm - 4:00pm',
        '5:00pm - 6:00pm',
      ],
      rating: 4.5,
      architecturalMapImage: 'https://via.placeholder.com/300',
      facilities: [
        'Indoor/Outdoor Courts',
        'Private Lessons',
        'Group Clinics',
        'Pro Shop',
        'Locker Rooms',
        'Cafe/Restaurant',
      ]
    },
    {
      venueName: 'Chelsea Piers Sports & Entertainment Complex',
      venueOwnerEmail: 'janedoe@example.com',
      location: 'New York, NY',
      sportName: 'Soccer',
      description: 'Indoor soccer fields in Chelsea Piers complex',
      image: 'https://via.placeholder.com/150',
      availableTimeSlots: [
        '10:00am - 11:00am',
        '1:00pm - 2:00pm',
        '3:00pm - 4:00pm',
        '5:00pm - 6:00pm',
      ],
      rating: 4.0,
      architecturalMapImage: 'https://via.placeholder.com/300',
      facilities: [
        'Indoor Soccer Fields',
        'Outdoor Soccer Fields',
        'Leagues & Tournaments',
        'Private Rentals',
        'Cafe/Restaurant',
      ]
    },
    {
      venueName: 'NYC Racquet Sports',
      venueOwnerEmail: 'johndoe@example.com',
      location: 'New York, NY',
      sportName: 'Racquetball',
      description: 'Racquetball courts in Midtown Manhattan',
      image: 'https://via.placeholder.com/150',
      availableTimeSlots: [
        '10:00am - 11:00am',
        '1:00pm - 2:00pm',
        '3:00pm - 4:00pm',
        '5:00pm - 6:00pm',
      ],
      rating: 3.8,
      architecturalMapImage: 'https://via.placeholder.com/300',
      facilities: [
        'Racquetball Courts',
        'Squash Courts',
        'Private Lessons',
        'Group Clinics',
        'Pro Shop',
        'Locker Rooms',
        'Cafe/Restaurant',
      ]
    },
    {
      venueName: 'Madison Square Garden',
      location: 'New York, NY',
      sportName: 'Basketball',
      description: 'Home of the New York Knicks and New York Rangers',
      image: 'https://via.placeholder.com/150',
      availableTimeSlots: [
        '12:00pm - 1:00pm',
        '3:00pm - 4:00pm',
        '6:00pm - 7:00pm',
        '9:00pm - 10:00pm',
      ],
      rating: 4.2,
      ownerEmail: 'msgevents@msg.com',
      architecturalMapData: 'https://via.placeholder.com/500x300',
      facilities: [
        'Concession stands',
        'Restrooms',
        'ATM',
        'Souvenir shops'
      ]
    },
    {
      activityName: 'Swimming Lessons',
      activityLocation: 'Los Angeles, CA',
      ageRange: '5-12 years',
      cost: '$50',
      description: 'Group swimming lessons for children',
      image: 'https://via.placeholder.com/150',
      maxCapacity: 10,
      rating: 4.2,
    },
    {
      activityName: 'Basketball Pickup Games',
      activityLocation: 'Chicago, IL',
      ageRange: '16+ years',
      cost: 'Free',
      description: 'Pickup games for adults of all skill levels',
      image: 'https://via.placeholder.com/150',
      maxCapacity: 20,
      rating: 3.8,
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
    },
    {
      playerGender: 'Female',
      playerAgeRange: '16-25 years',
      playerSkillLevel: 'Advanced',
      playerAvailability: 'Evenings',
      playerSportActivity: 'Soccer',
      description: 'Looking to join a competitive soccer team',
      emailId: 'janedoe@gmail.com',
      image: 'https://via.placeholder.com/150',
    },

  ];



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
          <Route path="/" element={<Home data={data} reservations={reservations}/>} />
          <Route
            path="/filter_search"
            element={<FilterSearch onSearch={handleFilterSearch} data={data} user={user} />} />
          <Route path="/book_venue/:venueIndex" element={<BookingPage data={data} />} />
          <Route
            path="/payments/:venueIndex"
            element={<PaymentsPage />}
          />
          <Route path="/confirmation/:venueIndex" element={<ConfirmationPage />} />
          <Route path="/my_reservations" element={<Reservation reservations={reservations}/>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}


function Home({data, reservations}) {
  return (
    <main>
      <section className="profile">
        <Reservation reservations={reservations}/>
        <UpReservation />
      </section>
    </main>
  );
}


export default App;