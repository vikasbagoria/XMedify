import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
// import SearchResults from "./pages/SearchResults";
import MyBookingsPage from "./pages/MyBookingPage";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";

function App() {
  return (
    <Router>
      <Navbar />      
      <Routes>
        {/* <Route path="/booking" element={<Home />} /> */}
        <Route path="/search" element={<SearchBar />} />
        <Route path="/my-bookings" element={<MyBookingsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
