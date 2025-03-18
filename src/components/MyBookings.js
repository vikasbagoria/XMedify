import React, { useState, useEffect } from "react";

const MyBookings = () => {
  const [search, setSearch] = useState("");
  const [bookings, setBookings] = useState([]);

  console.log("Component Rendered"); 
  useEffect(() => {
    console.log('HI');
    const savedBookings = localStorage.getItem("bookings");
    console.log("Raw LocalStorage Data:", savedBookings); // ✅ Log raw data before parsing

    if (savedBookings) {
      try {
        const parsedBookings = JSON.parse(savedBookings);
        console.log("Parsed Bookings:", parsedBookings); // ✅ Log parsed data

        setBookings(parsedBookings); // ✅ Update state
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
      }
    }
  }, []); // ✅ No duplicate useEffect

  return (
    <div className="my-bookings-container">
      <h1>My Bookings</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search By Hospital"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </div>

      <div className="bookings-list">
        {bookings.length === 0 ? (
          <p>No bookings available.</p>
        ) : (
          bookings.map((booking, index) => (
            <div key={index} className="booking-card">
              <h3>{booking["Hospital Name"]}</h3>
              <p>{booking.City}, {booking.State}</p>
              <p><strong>Date:</strong> {booking.bookingDate}</p>
              <p><strong>Time:</strong> {booking.bookingTime}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyBookings;
