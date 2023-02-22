import logo from './logo.svg';
import './App.css';
import './Header'
import Header from './Header';
import Reservation from './reservation_history';
import UpReservation from './upcoming_reservation';
import EveSearch from './event_search';
import Footer from './footer';

function App() {
  return (
    <div className="App">
      <body>
      <Header/>
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
