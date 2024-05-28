import React, { useState, useEffect, createContext, useContext } from 'react';
import { useParams } from 'react-router-dom';
import AvailabilityForm from '../Availability/AvaiblityCopy';
import { GraphQLClient } from 'graphql-request';
import { GET_EVENT_AND_AVAILABILITY, UPDATE_EVENT_DETAIL } from './query';
import './EventDetails.css';

// Create a context for sharing event data
const EventContext = createContext();

const graphqlClient = new GraphQLClient('http://localhost:8080/v1/graphql', {
  headers: {
    'x-hasura-admin-secret': '123',
  },
});

export const useEvent = () => useContext(EventContext);

const EventDetails = () => {
  const { eventName } = useParams();
  const [event, setEvent] = useState(null);
  const [editEvent, setEditEvent] = useState(null);
  const [availability, setAvailability] = useState({});
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAvailabilityForm, setShowAvailabilityForm] = useState(false);

  useEffect(() => {
    const fetchEventAndAvailability = async () => {
      try {
        const response = await graphqlClient.request(GET_EVENT_AND_AVAILABILITY, { eventName });
        setEvent(response.event);
        setEditEvent(response.event);
        const newAvailability = response.availability.reduce((acc, slot) => {
          if (!acc[slot.day]) {
            acc[slot.day] = [];
          }
          acc[slot.day].push({ selected: true, startTime: slot.start_time, endTime: slot.end_time });
          return acc;
        }, {});
        setAvailability(newAvailability);
      } catch (error) {
        console.error('Failed to fetch event and availability:', error);
      }
    };

    fetchEventAndAvailability();
  }, [eventName]);

  const handleEditChange = (e) => {
    setEditEvent({ ...editEvent, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await graphqlClient.request(UPDATE_EVENT_DETAIL, {
        eventName,
        data: {
          event_name: editEvent.event_name,
          duration: editEvent.duration,
          location_type: editEvent.location_type,
          location_detail: editEvent.location_detail,
        },
      });

      setEvent(response.update_kalenview_create_events_by_pk);
      setShowEditForm(false);
    } catch (error) {
      console.error('Failed to update event:', error);
    }
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <EventContext.Provider value={{ event, editEvent, availability, setAvailability, handleEditChange, handleEditSubmit }}>
      <div className="event-details-container">
        <div className="event-edit">
          <h2>Edit Event</h2>
          <button className="edit-button" onClick={() => setShowEditForm(!showEditForm)}>
            {showEditForm ? 'Hide Edit Form' : 'Edit Event Details'}
          </button>

          {showEditForm && (
            <form onSubmit={handleEditSubmit}>
              <label>
                Event Name:
                <input type="text" name="event_name" value={editEvent.event_name} readOnly />
              </label>
              <label>
                Duration (minutes):
                <input type="number" name="duration" value={editEvent.duration} onChange={handleEditChange} />
              </label>
              <label>
                Location Type:
                <input type="text" name="location_type" value={editEvent.location_type} onChange={handleEditChange} />
              </label>
              <label>
                Location Detail:
                <textarea name="location_detail" value={editEvent.location_detail} onChange={handleEditChange} />
              </label>
              <button type="submit">Save Changes</button>
            </form>
          )}

          <button className="edit-button" onClick={() => setShowAvailabilityForm(!showAvailabilityForm)}>
            {showAvailabilityForm ? 'Hide Availability Form' : 'Set Availability'}
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
    </EventContext.Provider>
  );
};

export default EventDetails;
