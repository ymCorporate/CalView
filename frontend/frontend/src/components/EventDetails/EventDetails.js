import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AvailabilityForm from '../Availability/Avaiblity';
import { GraphQLClient } from 'graphql-request';
import { GET_EVENT_DETAIL, UPDATE_EVENT_DETAIL } from './query';
import './EventDetails.css'; // Import the CSS file

const graphqlClient = new GraphQLClient('http://localhost:8080/v1/graphql', {
  headers: {
    'x-hasura-admin-secret': '123', // Replace with your actual admin secret or use a more secure method for authentication
  },
});

const EventDetails = () => {
  const { eventName } = useParams();
  const [event, setEvent] = useState(null);
  const [editEvent, setEditEvent] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAvailabilityForm, setShowAvailabilityForm] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await graphqlClient.request(GET_EVENT_DETAIL, { eventName });
        setEvent(response.kalenview_create_events_by_pk);
        setEditEvent(response.kalenview_create_events_by_pk); // Initialize editEvent with the fetched event data
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
      const response = await graphqlClient.request(UPDATE_EVENT_DETAIL, {
        eventName,
        data: {
          event_name: editEvent.event_name,
          duration: editEvent.duration,
          location_type: editEvent.location_type,
          location_detail: editEvent.location_detail,
        },
      });

      // Update the event details in the state
      setEvent(response.update_kalenview_create_events_by_pk);
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
          <button onClick={() => setShowEditForm(!showEditForm)}>
            {showEditForm ? 'Hide' : 'Edit Event Details'}
          </button>

          {showEditForm && (
              <form onSubmit={handleEditSubmit}>
                <label>
                  Event Name:
                  <input type="text" name="event_name" value={editEvent.event_name} readOnly />
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
