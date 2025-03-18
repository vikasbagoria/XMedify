import { useState, useEffect } from "react";

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(savedBookings);
  }, []);

  return (
    <div>
      <h1>My Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        bookings.map((booking, index) => (
          <div key={index}>
            <h3>{booking.hospitalName}</h3>
            <p>{booking.date}, {booking.time}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default MyBookingsPage;
