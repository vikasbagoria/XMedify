import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://meddata-backend.onrender.com/states")
      .then(response => setStates(response.data))
      .catch(error => console.error("Error fetching states:", error));
  }, []);

  useEffect(() => {
    if (selectedState) {
      axios.get(`https://meddata-backend.onrender.com/cities/${selectedState}`)
        .then(response => setCities(response.data))
        .catch(error => console.error("Error fetching cities:", error));
    }
  }, [selectedState]);

  const handleSearch = () => {
    if (selectedState && selectedCity) {
      navigate(`/search?state=${selectedState}&city=${selectedCity}`);
    }
  };

  return (
    <div>
      <h1>Find Medical Centers</h1>
      <div id="state">
        <label>State:</label>
        <select onChange={(e) => setSelectedState(e.target.value)} value={selectedState}>
          <option value="">Select a state</option>
          {states.map((state, index) => (
            <option key={index} value={state}>{state}</option>
          ))}
        </select>
      </div>

      <div id="city">
        <label>City:</label>
        <select onChange={(e) => setSelectedCity(e.target.value)} value={selectedCity} disabled={!selectedState}>
          <option value="">Select a city</option>
          {cities.map((city, index) => (
            <option key={index} value={city}>{city}</option>
          ))}
        </select>
      </div>

      <button type="submit" onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Home;
