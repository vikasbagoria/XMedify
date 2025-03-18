import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SearchBar.css";
import HospitalsList from "./HospitalList";

const SearchBar = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [hospitals, setHospitals] = useState([]);
  const [stateDropdownOpen, setStateDropdownOpen] = useState(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);

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
          <div id="state" className="dropdown" onClick={() => setStateDropdownOpen(!stateDropdownOpen)}>
            {selectedState || "Select State"}
            {stateDropdownOpen && (
              <ul className="dropdown-menu">
                {states.map((state) => (
                  <li key={state} onClick={() => { setSelectedState(state); setStateDropdownOpen(false); }}>
                    {state}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* City Dropdown */}
          <div id="city" className="dropdown" onClick={() => setCityDropdownOpen(!cityDropdownOpen)}>
            {selectedCity || "Select City"}
            {cityDropdownOpen && (
              <ul className="dropdown-menu">
                {cities.map((city) => (
                  <li key={city} onClick={() => { setSelectedCity(city); setCityDropdownOpen(false); }}>
                    {city}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Search Button */}
          <button type="submit" className="search-btn" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      {hospitals.length > 0 && (
        <h1>{hospitals.length} medical centers available in {selectedCity.toLowerCase()}</h1>
      )}

      <HospitalsList hospitals={hospitals} />
    </>
  );
};

export default SearchBar;
