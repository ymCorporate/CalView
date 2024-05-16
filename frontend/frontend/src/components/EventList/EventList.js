import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './EventList.css';

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:6541/events');
        console.log(response.data);
        setEvents(response.data);
      } catch (error)      {
        console.error('Failed to fetch events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="event-list">
               
        {events.map((event) => (
            <Link key={event.event_name} to={`/events/${event.event_name}`} className="event-box">
            <h2 className='EventName'>{event.event_name}</h2>
            <p className='Duration'><strong>Duration:</strong> {event.duration} minutes</p>
            <p className='Location'><strong>Location:</strong> {event.location_type}: {event.location_detail}</p>                </Link>
        ))}
        
    </div>
  );
};

export default EventList;
