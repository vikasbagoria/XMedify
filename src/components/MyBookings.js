import React, { useState, useEffect } from "react";

const MyBookings = () => {
  const [search, setSearch] = useState("");
  const [bookings, setBookings] = useState([]);

  // Load bookings from localStorage
  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(savedBookings);
  }, []);

  return (
    <div className="my-bookings-container">
      {/* Header */}
      <h1>My Bookings</h1>

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search By Hospital"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </div>

      {/* Bookings List */}
      <div className="bookings-list">
        {bookings.length === 0 ? (
          <p>No bookings available.</p>
        ) : (
          bookings.map((booking, index) => (
            <div key={index} className="booking-card">
              <h3>{booking.hospitalName}</h3>
              <p>{booking.city}, {booking.state}</p>
              <p>{booking.hospitalType}</p>

              {/* Time Slots */}
              <div className="time-slots">
                <p>Today</p>
                <p>Morning | Afternoon | Evening</p>
              </div>

              {/* Book Button */}
              <button className="book-btn">Book FREE Center Visit</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyBookings;
