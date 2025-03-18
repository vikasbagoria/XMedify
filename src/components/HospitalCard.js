import React, { useState } from "react";
import "./HospitalCard.css";

const HospitalCard = ({ hospital }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleBooking = () => {
    const newBooking = {
      "Hospital Name": hospital["Hospital Name"],
      "City": hospital.City,
      "State": hospital.State,
      "Hospital Type": hospital["Hospital Type"],
      "Hospital overall rating": hospital["Hospital overall rating"],
      bookingDate: "2024-12-15", // Placeholder for now
      bookingTime: "10:00 AM",
    };

    // Get existing bookings
    const existingBookings = JSON.parse(localStorage.getItem("bookings")) || [];

    // Save new booking
    localStorage.setItem("bookings", JSON.stringify([...existingBookings, newBooking]));

    setIsOpen(!isOpen); // Open the accordion
  };

  return (
    <div className="hospital-card">
      {/* Hospital Icon */}
      <div className="hospital-icon">
        <img src="/hospital-icon.png" alt="Hospital Icon" />
      </div>

      {/* Hospital Details */}
      <div className="hospital-details">
        <h2 className="hospital-name">{hospital["Hospital Name"]}</h2>
        <p className="location">
          <strong>{hospital.City}, {hospital.State}</strong>
        </p>
        <p className="specialty">{hospital["Hospital Type"]}</p>

        {/* Consultation Fee */}
        <div className="consultation-fee">
          <span className="free">FREE</span>
          <span className="original-price">₹500</span>
          <span className="fee-text">Consultation fee at clinic</span>
        </div>

        {/* Availability */}
        {hospital.available && (
          <p className="availability">✅ Available Today</p>
        )}
      </div>

      {/* Booking Button & Likes */}
      <div className="action-section">
        <button className="book-button" onClick={handleBooking}>Book FREE Center Visit</button>
        <div className="likes">👍 5</div>
      </div>

      {/* Accordion Section */}
      {isOpen && (
        <div className="accordion">
          <h4>Available Slots</h4>
          <div className="slots">
            <p>Today</p>
            <p>Morning</p>
            <button>11:30 AM</button>
            <p>Afternoon</p>
            <button>12:00 PM</button>
            <button>12:30 PM</button>
            <button>01:30 PM</button>
            <p>Evening</p>
            <button>06:00 PM</button>
            <button>07:00 PM</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HospitalCard;
