// import React, {useEffect, useState} from "react";
// import { useParams } from 'react-router-dom';
// import axios from "axios";

// const EventDetails = ()=>{
//     const [event, setEvent] =useState(null);
//     const { eventName } = useParams();
//     useEffect(()=>{
//         const fetchEvent = async()=>{
//             try {
//                 const response = await axios.get(`http://localhost:6541/events/${eventName}`);
//                 console.log(response);
//                 setEvent(response.data);
//             } catch (error) {
//                 console.error('Failed to fetch event:', error);
//             }
//         };
//         fetchEvent();
    
//     }, [eventName]);

//     if (!event){
//         return <div>Loading...</div>
//     }

//     return (
//         <div>
//           <h2>{event.event_name}</h2>
//           <p>Duration: {event.duration} minutes</p>
//           <p>Location: {event.location_type}: {event.location_detail}</p>
//           {/* Add more event details here */}
//         </div>
//       );
    
// };

// export default EventDetails;



import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AvailabilityForm from '../Availability/Avaiblity';
import axios from 'axios';
import './EventDetails.css'; // Import the CSS file

const EventDetails = () => {
  const { eventName } = useParams();
  const [event, setEvent] = useState(null);
  const [editEvent, setEditEvent] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAvailabilityForm, setShowAvailabilityForm] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:6541/events/${eventName}`);
        setEvent(response.data);
        setEditEvent(response.data); // Initialize editEvent with the fetched event data
      } catch (error) {
        console.error('Failed to fetch event:', error);
      }
    };

    fetchEvent();
  }, [eventName]);

  const handleEditChange = (e) => {
    setEditEvent({ ...editEvent, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      // Update the event details in the database
      // You'll need to replace this with your actual API call
      console.log(`editEvent: ${editEvent[1]}`)
      await axios.put(`http://localhost:6541/events/${eventName}`, editEvent);

      // Update the event details in the state
      setEvent(editEvent);
      // Hide the event edit after submitting
      setShowEditForm(false);
    } catch (error) {
      console.error('Failed to update event:', error);
    }
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="event-details-container">
      <div className="event-edit">
        {/* <h2>Edit Event</h2> */}
        <button onClick={() => setShowEditForm(!showEditForm)}>
          {showEditForm ? 'Hide' : 'Edit Event Details'}
        </button>

        {showEditForm && (
        <form onSubmit={handleEditSubmit}>
          <label>
            Event Name:
            <input type="text" name="event_name" value={editEvent.event_name} onChange={handleEditChange} />
          </label>
          <label>
            Duration:
            <input type="text" name="duration" value={editEvent.duration} onChange={handleEditChange} />
          </label>
          <label>
            Location Type:
            <input type="text" name="location_type" value={editEvent.location_type} onChange={handleEditChange} />
          </label>
          <label>
            Location Detail:
            <input type="text" name="location_detail" value={editEvent.location_detail} onChange={handleEditChange} />
          </label>
          <button type="submit">Save Changes</button>
        </form>

        )}

        {/* <AvailabilityForm /> Add the AvailabilityForm component */}
        <button onClick={() => setShowAvailabilityForm(!showAvailabilityForm)}>
          {showAvailabilityForm ? 'Hide' : 'Set Availability'}
        </button>
        {showAvailabilityForm && <AvailabilityForm />}
      

      </div>
      <div className="event-details">
        <h2>{event.event_name}</h2>
        <p>Duration: {event.duration} minutes</p>
        <p>Location Type: {event.location_type}</p>
        <p>Description: {event.location_detail}</p>
      </div>
    </div>
  );
};

export default EventDetails;
