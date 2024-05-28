import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import CreateEvent from "./pages/CreateEvent/CreateEvent.js";
import EventList from "./pages/EventList/EventList.js";
import Login from "./pages/login/Login.js";
import EventDetails from "./pages/EventDetails/EventDetailsCopy.js";
import AvailabilityForm from "./pages/Availability/Avaiblity.js";
import Register from "./pages/Register/Register.js";
import CalendarPage from "./pages/slotbook/slotbook";
import BookingPage from "./pages/confirmpage/confirmpage";
import SuccessPage from "./pages/successpage/successpage";

import "./App.css";

function App() {
  return (
    // <div className="App">
    //   <CreateEvent />
    // </div>


    <Router>
      <div className="App">
        <Routes>
          
          <Route path="/Register" element={<Register />} />


          <Route path="/create" element={<CreateEvent />} />
            <Route path="/event_list" element={<EventList />} />
            <Route path="/events/:eventName" element={<EventDetails />} />
            <Route path="/" element={<Login />} />
            <Route path="/availability" element={<AvailabilityForm />} />
            <Route path="/booking/:eventName" element={<CalendarPage />} />
            <Route path="/book/:eventName/:slotDetails" element={<BookingPage />} />
            {/*<Route path="/success/:eventName" element={<SuccessPage />} />*/}
            <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
