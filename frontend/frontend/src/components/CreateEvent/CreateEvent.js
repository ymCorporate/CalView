import React, { useState, useEffect } from 'react';
import { FaPhone, FaVideo, FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import './CreateEvent.css';

const CreateEvent = () => {
  const [eventName, setEventName] = useState('');
  const [duration, setDuration] = useState('');
  const [locationType, setLocationType] = useState('');
  const [locationDetail, setLocationDetail] = useState('');
  const [JWTverify, setJWTverify] = useState(false);
  const navigate = useNavigate();

  const handleLocationTypeChange = (newLocationType)=>{
    setLocationType(newLocationType);
    setLocationDetail('');
    
  }


  const handleSubmit = async(event)=>{
    event.preventDefault();

    try {
        const response = await axios.post('http://localhost:8888/.netlify/functions/api/events/create', {
        eventName,
        duration,
        locationType,
        locationDetail
      });

    //   console.log(response);

      if (response.data.success) {
        alert('Event created successfully!');
        navigate('/event_list');
      } else {
        alert('Failed to create event.');
      }
    } catch (error) {
        console.error('Failed to create event:', error);
    }
  }

  useEffect(()=>{
    const JWTVERIFY = async()=>{
      const jwt = Cookies.get('jwt');
      const data ={};
      try {
        const verification = await axios.post('http://localhost:8888/.netlify/functions/api/verify',data,{
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



  if(JWTverify){
    return (
      <form className="event-container" onSubmit={handleSubmit}>
        <div className="form-container">
          <h2>Create Event</h2>
          <label>
            Event Name:
            <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} />
          </label>
          <label>
            Duration:
            <select className="select-css" value={duration} onChange={(e) => setDuration(e.target.value)}>
              <option value="">Select duration</option>
              <option value="30">30 minutes</option>
              <option value="60">60 minutes</option>
              <option value="90">90 minutes</option>
              <option value="120">120 minutes</option>
            
            </select>
          </label>
          <label>
            Location:
            <div className="location-options">

              <div onClick={() => handleLocationTypeChange('Call')}>
                  <FaPhone size={30} color={locationType === 'Call'  ? 'blue' : 'black'} /> Call
              </div>

              <div onClick={() => handleLocationTypeChange('Video Meeting')}>
              <FaVideo size={30} color={locationType === 'Video Meeting' ? 'blue' : 'black'} /> Video Meeting
              </div>

              <div onClick={() => handleLocationTypeChange('Physical Location')}>
              <FaMapMarkerAlt size={30} color={locationType === 'Physical Location' ? 'blue' : 'black'} /> Physical Location
            </div>

            </div>

            {locationType && (
            <label>
              {locationType === 'Call' && 'Phone Number'}
              {locationType === 'Video Meeting' && 'Meeting Link'}
              {locationType === 'Physical Location' && 'Address'}
              <input type="text" value={locationDetail} onChange={(e) => setLocationDetail(e.target.value)} />
              </label>
          )}
          </label>
        </div>
        {/*test*/}

        <div className="display-container">
          <h2>Event Details</h2>
          <p><strong>Event Name:</strong> {eventName}</p>
          <p><strong>Duration:</strong> {duration} minutes</p>
          {locationType && <p><strong>Location ({locationType}):</strong> {locationDetail}</p>}
          <button type="submit" className="submit-button">Create Event</button>
        </div>
      </form>
      
    )
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

export default CreateEvent;
