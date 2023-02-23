import { useState } from "react";
import './App.css';
import './Header'
import Header from './Header';
import Reservation from './reservation_history';
import UpReservation from './upcoming_reservation';
import EveSearch from './event_search';
import Footer from './footer';

function App() {
  
  const [user, setUser] = useState({
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe',
    email: 'johndoe@example.com',
    mobileNumber: '1234567890',
    password: 'password123',
    location: 'New York, NY',
    photo: 'https://via.placeholder.com/150'
  });
  return (
    <div className="App">
      <body>
      <Header user={user} />
      <main>
        <section className="profile">
          <Reservation/>
          <UpReservation/>
        </section>
        
  </main>
  <Footer/>
</body>

    </div>
  );
}

export default App;
