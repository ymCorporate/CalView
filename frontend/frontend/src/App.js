import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateEvent from "./components/CreateEvent/CreateEvent.js";
import EventList from "./components/EventList/EventList.js";
import Login from "./components/login/Login.js";
import EventDetails from "./components/EventDetails/EventDetails.js";
import AvailabilityForm from "./components/Availability/Avaiblity.js";
import CalendarPage from "./components/slotbook/slotbook";
import BookingPage from "./components/confirmpage/confirmpage";
import "./App.css";

function App() {
  return (
      <Router>
        <div className="App">
          <Routes>
            <Route path="/create" element={<CreateEvent />} />
            <Route path="/event_list" element={<EventList />} />
            <Route path="/events/:eventName" element={<EventDetails />} />
            <Route path="/" element={<Login />} />
            <Route path="/availability" element={<AvailabilityForm />} />
            <Route path="/booking/:eventName" element={<CalendarPage />} />
            <Route path="/book/:eventName/:slotDetails" element={<BookingPage />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;