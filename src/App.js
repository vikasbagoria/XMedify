import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
// import SearchResults from "./pages/SearchResults";
import MyBookings from "./components/MyBookings";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";

function App() {
  return (
    <Router>
      <Navbar />      
      <Routes>
        
        <Route path="/search" element={<SearchBar />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/" element={<SearchBar />} />
      </Routes>
    </Router>
  );
}

export default App;
