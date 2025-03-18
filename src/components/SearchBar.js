import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SearchBar.css";
import HospitalsList from "./HospitalList";

const SearchBar = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [hospitals,setHospitals] = useState([]);

  // Fetch States
  useEffect(() => {
    axios
      .get("https://meddata-backend.onrender.com/states")
      .then((response) => {
        console.log(response.data);
        setStates(response.data);
      })
      .catch((error) => {
        console.error("Error fetching states:", error);
      });
  }, []);

  // Fetch Cities when State changes
  useEffect(() => {
    if (selectedState) {
      axios
        .get(`https://meddata-backend.onrender.com/cities/${selectedState}`)
        .then((response) => {
          setCities(response.data);
        })
        .catch((error) => {
          console.error("Error fetching cities:", error);
        });
    }
  }, [selectedState]);

  const handleSearch = () => {
    if (!selectedState || !selectedCity) {
      alert("Please select both state and city.");
      return;
    }

    const url = `https://meddata-backend.onrender.com/data?state=${selectedState}&city=${selectedCity}`;
    
    axios.get(url)
      .then(response => setHospitals(response.data))
      .catch(error => console.error("Error fetching hospitals:", error));
  };

  return (
    <>
    <div className="search-container">
      <div className="dropdown-container">
        {/* State Dropdown */}
        <div id="state">
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
        >
        
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        </div>
        {/* City Dropdown */}
        <div id="city">
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          disabled={!selectedState}
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        </div>
        {/* Search Button */}
        <button type="submit" className="search-btn" onClick={handleSearch}>Search</button>        
      </div>      
    </div>
    <HospitalsList hospitals={hospitals} />
    </>
  );
};

export default SearchBar;
