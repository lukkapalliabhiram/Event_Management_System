function Reservation () {

    return(
      <div className="reservation-history">
            <h2>Reservation History</h2>
            <table>
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Event Name</td>
                  <td>01/01/2023</td>
                  <td>10:00am - 12:00pm</td>
                  <td>New York, NY</td>
                </tr>
                <tr>
                  <td>Event Name</td>
                  <td>02/01/2023</td>
                  <td>2:00pm - 4:00pm</td>
                  <td>Los Angeles, CA</td>
                </tr>
                <tr>
                  <td>Event Name</td>
                  <td>03/01/2023</td>
                  <td>6:00pm - 8:00pm</td>
                  <td>Chicago, IL</td>
                </tr>
              </tbody>
            </table>
          </div>
          
    );
}

export default Reservation;
