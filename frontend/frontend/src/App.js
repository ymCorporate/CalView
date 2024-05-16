import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CreateEvent from "./components/CreateEvent/CreateEvent.js";
import EventList from "./components/EventList/EventList.js";

import "./App.css"

function App() {
  return (
    // <div className="App">
    //   <CreateEvent />
    // </div>


    <Router>
      <div className="App">
        <Link to="/create" className="create-event-button">Create New Event</Link>
        <Routes>
          <Route path="/create" element={<CreateEvent />} />
          <Route path="/" element={<EventList />} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
