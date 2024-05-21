import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { GraphQLClient } from 'graphql-request';
import { useParams } from 'react-router-dom';
import { GET_SLOTS } from './query';
import 'react-calendar/dist/Calendar.css';
import './slotBook.css';

const graphqlClient = new GraphQLClient('http://localhost:8080/v1/graphql', {
    headers: {
        'x-hasura-admin-secret': '123', // Replace with your actual admin secret or use a more secure method for authentication
    },
});

const splitInto30MinSlots = (startTime, endTime) => {
    const slots = [];
    let start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);

    while (start < end) {
        let endSlot = new Date(start);
        endSlot.setMinutes(start.getMinutes() + 30);
        if (endSlot > end) {
            endSlot = end;
        }
        slots.push({
            start: start.toTimeString().substring(0, 5),
            end: endSlot.toTimeString().substring(0, 5),
        });
        start = endSlot;
    }

    return slots;
};

function CalendarReact({ time }) {
    const { eventName } = useParams(); // Get the event name from the URL
    const [date, setDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedDayOfWeek, setSelectedDayOfWeek] = useState('');
    const [availableSlots, setAvailableSlots] = useState([]);

    const fetchSlots = async (dayOfWeek) => {
        try {
            const response = await graphqlClient.request(GET_SLOTS, {
                day: dayOfWeek.toUpperCase(),
                eventName,
            });
            const slots = response.availability.flatMap(slot =>
                splitInto30MinSlots(slot.start_time, slot.end_time)
            );
            setAvailableSlots(slots);
        } catch (error) {
            console.error('Error fetching slots:', error);
            setAvailableSlots([]);
        }
    };

    const selectedDateSetter = (value) => {
        const options = { weekday: 'short' };
        const selectedDay = value.getDate();
        const dayOfWeek = value.toLocaleDateString('en-US', options).toUpperCase(); // Get the day of the week in uppercase
        setSelectedDate(selectedDay.toString());
        setSelectedDayOfWeek(dayOfWeek);
        fetchSlots(dayOfWeek);
    };

    return (
        <div className="card-container">
            <div className="card">
                <h2>Select a Date & Time</h2>
                <div className="content-container">
                    <div className="organizer-info">
                        <h3>Organizer Name</h3>
                        <p>{eventName}</p>
                        <p>Duration</p>
                    </div>
                    <div className="calendar-container">
                        <Calendar
                            onChange={selectedDateSetter}
                            value={date}
                            minDate={new Date()} // Disable past dates
                            formatShortWeekday={(locale, date) => date.toLocaleDateString(locale, { weekday: 'short' })} // Format for day names
                        />
                    </div>
                    {selectedDate && (
                        <div className="slot-booking-page">
                            <h2>Available slots for {selectedDate} ({selectedDayOfWeek}):</h2>
                            {availableSlots.length > 0 ? (
                                availableSlots.map((slot, index) => (
                                    <div key={index} className="slot-box">
                                        <p>{slot.start} - {slot.end}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No slots available.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CalendarReact;

// import React, { useState } from 'react';
// import Calendar from 'react-calendar';
// import { GraphQLClient } from 'graphql-request';
// import { useParams } from 'react-router-dom';
// import { GET_SLOTS } from './query';
// import 'react-calendar/dist/Calendar.css';
// import './slotBook.css';
//
// const graphqlClient = new GraphQLClient('http://localhost:8080/v1/graphql', {
//     headers: {
//         'x-hasura-admin-secret': '123', // Replace with your actual admin secret or use a more secure method for authentication
//     },
// });
//
// function CalendarReact({ time }) {
//     const { eventName } = useParams(); // Get the event name from the URL
//     const [date, setDate] = useState(new Date());
//     const [selectedDate, setSelectedDate] = useState('');
//     const [selectedDayOfWeek, setSelectedDayOfWeek] = useState('');
//     const [availableSlots, setAvailableSlots] = useState([]);
//
//     const fetchSlots = async (dayOfWeek) => {
//         try {
//             const response = await graphqlClient.request(GET_SLOTS, {
//                 day: dayOfWeek.toUpperCase(),
//                 eventName,
//             });
//             setAvailableSlots(response.availability);
//         } catch (error) {
//             console.error('Error fetching slots:', error);
//             setAvailableSlots([]);
//         }
//     };
//
//     const selectedDateSetter = (value) => {
//         const options = { weekday: 'short' };
//         const selectedDay = value.getDate();
//         const dayOfWeek = value.toLocaleDateString('en-US', options).toUpperCase(); // Get the day of the week in uppercase
//         setSelectedDate(selectedDay.toString());
//         setSelectedDayOfWeek(dayOfWeek);
//         fetchSlots(dayOfWeek);
//     };
//
//     return (
//         <div className="card-container">
//             <div className="card">
//                 <h2>Select a Date & Time</h2>
//                 <div className="content-container">
//                     <div className="organizer-info">
//                         <h3>Organizer Name</h3>
//                         <p>{eventName}</p>
//                         <p>Duration</p>
//                     </div>
//                     <div className="calendar-container">
//                         <Calendar
//                             onChange={selectedDateSetter}
//                             value={date}
//                             minDate={new Date()} // Disable past dates
//                             formatShortWeekday={(locale, date) => date.toLocaleDateString(locale, { weekday: 'short' })} // Format for day names
//                         />
//                     </div>
//                     {selectedDate && (
//                         <div className="slot-booking-page">
//                             <h2>Available slots for {selectedDate} ({selectedDayOfWeek}):</h2>
//                             {availableSlots.length > 0 ? (
//                                 availableSlots.map((slot, index) => (
//                                     <div key={index} className="slot-box">
//                                         <p>{slot.start_time} - {slot.end_time}</p>
//                                     </div>
//                                 ))
//                             ) : (
//                                 <p>No slots available.</p>
//                             )}
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }
//
// export default CalendarReact;
