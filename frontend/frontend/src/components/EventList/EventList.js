import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { GraphQLClient } from 'graphql-request';
import { useNavigate } from 'react-router-dom';
import { get_all_events } from './EventListQuries';
import './EventList.css';

const jwt = Cookies.get('jwt');

const graphqlClient = new GraphQLClient('http://localhost:8080/v1/graphql', {
    headers: {
        // 'x-hasura-admin-secret': '123',
        'Authorization': `Bearer ${jwt}`
    },
});

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [JWTverify, setJWTverify] = useState(false);
   const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await graphqlClient.request(get_all_events, {});
        // console.log(response.kalenview_create_events);
        setEvents(response.kalenview_create_events);
      } catch (error){
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


  console.log(`JWTverify: ${JWTverify}`);


      return (
        <div>
          <div className='div-create-event-button'>
          <Link to="/create" className="create-event-button">Create New Event</Link>
          </div>
        
          <div className="event-list">

            {events.map((event) => (
                <div key={event.event_name} className="event-box">
                  <Link to={`/events/${event.event_name}`}>
                    <h2 className='EventName'>{event.event_name}</h2>
                    <p className='Duration'><strong>Duration:</strong> {event.duration} minutes</p>
                    <p className='Location'><strong>Location:</strong> {event.location_type}: {event.location_detail}</p>
                  </Link>
                  <Link to={`/booking/${event.event_name}`} className="booking-link">View Booking Page</Link>
                </div>
            ))}
          </div>
        </div>
      );

    

};

export default EventList;
