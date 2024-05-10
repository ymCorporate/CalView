import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { EventsQuery } from './events.mjs';

const event_query = new EventsQuery();

const localizer = momentLocalizer(moment);

const App = props => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    event_query.readEvent().then(events => setEvents(events));
  }, []);

  // const events = [
  //   {
  //     title: 'TEST 1111',
  //     start: new Date('2024-05-09T08:00:00+00:00'),
  //     end: new Date('2024-05-09T10:30:00+00:00'),
  //     venue: 'V TEST',
  //     description: 'D TEST'
  //   },
  //   {
  //     title: 'TEST 1111',
  //     start: new Date('2024-05-09T14:00:00+00:00'),
  //     end: new Date('2024-05-09T15:30:00+00:00'),
  //     venue: 'V TEST',
  //     description: 'D TEST'
  //   },
  //   {
  //     title: 'TEST 1111',
  //     start: new Date('2024-05-10T08:00:00+00:00'),
  //     end: new Date('2024-05-10T08:30:00+00:00'),
  //     venue: 'V TEST',
  //     description: 'D TEST'
  //   },
  //   {
  //     title: 'TEST 1111',
  //     start: new Date('2024-05-10T08:00:00+00:00'),
  //     end: new Date('2024-05-10T08:30:00+00:00'),
  //     venue: 'V TEST',
  //     description: 'D TEST'
  //   }
  // ];

  const handleSelect = ({ start, end }) => {
    setSelectedDate(start);
    setShowModal(true);
  };

  // const saveEvent = (time, duration, purpose, venue, description) => {
  //   // Save the event here. This could involve calling an API or updating your state.
  //   // Then close the modal.
  //   setShowModal(false);
  // };


  const handleSelectEvent = (event) => {
    alert(`Title: ${event.title}\nStart: ${event.start}\nEnd: ${event.end}\nVenue: ${event.venue}\nDescription: ${event.description}`);
  };

  const saveEvent = async (time, duration, purpose, venue, description) => {
    // Convert the duration to minutes
    const durationInMinutes = parseInt(duration, 10);
    
    // Calculate the end time
    const endTime = new Date(time.getTime() + durationInMinutes * 60000);
  
    // Format the start and end times as strings in ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ)
    const formattedStartTime = time.toISOString();
    const formattedEndTime = endTime.toISOString();
  
    try {
      // Call the insertEvent method to save the event
      await event_query.insertEvent(formattedStartTime, formattedEndTime, purpose, venue, description);
      
      // Close the modal
      setShowModal(false);
      
      // Refresh the events
      const updatedEvents = await event_query.readEvent();
      setEvents(updatedEvents);

      window.location.reload();
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };
  

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable={true}
        onSelectSlot={handleSelect}
        onSelectEvent={handleSelectEvent}
        style={{ height: "75vh" }}
      />

      {showModal && (
        <div>
          <h2>Add New Event</h2>
          <form onSubmit={e => {
            e.preventDefault();
            const eventDate = selectedDate;
            const eventTime = e.target.time.value;
            const eventDateTime = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate(), eventTime.split(':')[0], eventTime.split(':')[1]);
            saveEvent(eventDateTime, e.target.duration.value, e.target.purpose.value, e.target.venue.value, e.target.description.value);
          }}>
            <label>
              Date:
              <input type="text" value={selectedDate.toDateString()} readOnly />
            </label>
            <label>
              Time:
              <input type="time" name="time" required />
            </label>
            <label>
              Duration:
              <select name="duration" required>
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">1 hour</option>
                <option value="75">1 hour 15 minutes</option>
                <option value="90">1 hour 30 minutes</option>
                <option value="105">1 hour 45 minutes</option>
                <option value="120">2 hours</option>
              </select>
            </label>
            <label>
              Purpose:
              <input type="text" name="purpose" required />
            </label>
            <label>
              Venue:
              <input type="text" name="venue" required />
            </label>
            <label>
              Description:
              <textarea name="description" required />
            </label>
            <button type="submit">Save</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default App;
