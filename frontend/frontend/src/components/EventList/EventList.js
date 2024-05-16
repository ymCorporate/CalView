import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import './EventList.css';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [JWTverify, setJWTverify] = useState(false);
   const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:6541/events');
        // console.log(response.data);
        setEvents(response.data);
      } catch (error)      {
        console.error('Failed to fetch events:', error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(()=>{
    const JWTVERIFY = async()=>{
      const jwt = Cookies.get('jwt');
      const data ={};
      try {
        const verification = await axios.post('http://localhost:6541/verify',data,{
          headers: {
            Authorization: `${jwt}`
          }
        });
        // console.log(verification)
        if(verification.data.success === true){
          return setJWTverify(true);
        }
        else{
          return setJWTverify(false);
        }
      } catch (error) {
        console.error('Failed to verify JWT:', error);
      }
    };

    JWTVERIFY()
  },[]);


  // console.log(`JWTverify: ${JWTverify}`);
  if(JWTverify){

      return (
        <div>
          <div className='div-create-event-button'>
          <Link to="/create" className="create-event-button">Create New Event</Link>
          </div>
        
          <div className="event-list">
            
                    
              {events.map((event) => (
                  <Link key={event.event_name} to={`/events/${event.event_name}`} className="event-box">
                  <h2 className='EventName'>{event.event_name}</h2>
                  <p className='Duration'><strong>Duration:</strong> {event.duration} minutes</p>
                  <p className='Location'><strong>Location:</strong> {event.location_type}: {event.location_detail}</p>                </Link>
              ))}
              
          </div>
        </div>
      );

    }
    else {
      return (
        <div>
          <h2>You are not authenticated. Please log in.</h2>
          {navigate('/')}
        </div>
      );
    }
};

export default EventList;
