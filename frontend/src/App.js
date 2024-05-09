import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
// import { EventsQuery } from './events.mjs';

// const event_query = new EventsQuery();

const localizer = momentLocalizer(moment);

const App = props => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  // const events = [
  //   {
  //                 title: 'All Day Event',
  //                 allDay: false,
  //                 start: new Date(2024, 4, 10),
  //                 end: new Date(2024, 4, 12),
  //               },
  //               {
  //                 title: 'Long Event',
  //                 start: new Date(2024, 4, 7),
  //                 end: new Date(2024, 4, 10),
  //               },
  //               {
  //                 title: 'Team Meeting',
  //                 start: new Date(2024,4,9,13,30), // May 1, 2024 at 10:00 AM
  //                 end: new Date(2024,4,9,14), // May 1, 2024 at 11:00 AM
  //                 allDay: false,
  //                 resource: {
  //                   description: 'Monthly team meeting to discuss project updates and tasks.',
  //                   location: 'Conference Room 1',
  //                 },
  //               },
  // ];

  // const event_log = event_query.readEvent();





  // const events = event_query.readEvent();
  // console.log(events);

  // const convertedEvents = events.map(event => ({
  //   ...event,
  //   startDate: new Date(event.start),
  //   endDate: new Date(event.end)
  // }));
  // console.log(convertedEvents);




  const events = [
    {
      title: 'TEST 1111',
      start: new Date('2024-05-09T08:00:00+00:00'),
      end: new Date('2024-05-09T10:30:00+00:00'),
      venue: 'V TEST',
      description: 'D TEST'
    },
    {
      title: 'TEST 1111',
      start: new Date('2024-05-09T14:00:00+00:00'),
      end: new Date('2024-05-09T15:30:00+00:00'),
      venue: 'V TEST',
      description: 'D TEST'
    },
    {
      title: 'TEST 1111',
      start: new Date('2024-05-10T08:00:00+00:00'),
      end: new Date('2024-05-10T08:30:00+00:00'),
      venue: 'V TEST',
      description: 'D TEST'
    },
    {
      title: 'TEST 1111',
      start: new Date('2024-05-10T08:00:00+00:00'),
      end: new Date('2024-05-10T08:30:00+00:00'),
      venue: 'V TEST',
      description: 'D TEST'
    }
  ];
  



  const handleSelect = ({ start, end }) => {
    setSelectedDate(start);
    setShowModal(true);
  };

  const saveEvent = (time, duration, purpose, venue, description) => {
    // Save the event here. This could involve calling an API or updating your state.
    // Then close the modal.
    setShowModal(false);
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        // events = {convertedEvents}
        startAccessor="start"
        endAccessor="end"
        selectable={true}
        onSelectSlot={handleSelect}
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

