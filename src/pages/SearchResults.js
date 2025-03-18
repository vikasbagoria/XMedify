import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const SearchResults = () => {
  const [centers, setCenters] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const state = queryParams.get("state");
  const city = queryParams.get("city");

  useEffect(() => {
    if (state && city) {
      axios.get(`https://meddata-backend.onrender.com/data?state=${state}&city=${city}`)
        .then(response => setCenters(response.data))
        .catch(error => console.error("Error fetching centers:", error));
    }
  }, [state, city]);

  const handleBookingRedirect = (hospital) => {
    navigate(`/book?name=${encodeURIComponent(hospital["Hospital Name"])}&state=${state}&city=${city}`);
  };

  return (
    <div>
      <h1>Medical Centers in {city}, {state}</h1>
      {centers.map((center, index) => (
        <div key={index}>
          <h3>{center["Hospital Name"]}</h3>
          <p>{center.Address}, {center.City}, {center.State} - {center["ZIP Code"]}</p>
          <p>Rating: {center["Overall Rating"]}</p>
          <button onClick={() => handleBookingRedirect(center)}>Book FREE Center Visit</button>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
