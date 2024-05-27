import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { GraphQLClient } from 'graphql-request';
import { useParams, useNavigate } from 'react-router-dom';
import { GET_SLOTS, GET_Duration, OrganizerName } from './query';
import 'react-calendar/dist/Calendar.css';
import './slotBook.css';

const graphqlClient = new GraphQLClient('http://localhost:8080/v1/graphql', {
    headers: {
        'x-hasura-admin-secret': '123', // Replace with your actual admin secret or use a more secure method for authentication
    },
});

function CalendarPage() {
    const { eventName } = useParams();
    const navigate = useNavigate();
    const [date, setDate] = useState(new Date());
    const [organizerName, setOrganizerName] = useState({});
    const [duration, setDuration] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedDayOfWeek, setSelectedDayOfWeek] = useState('');
    const [availableSlots, setAvailableSlots] = useState([]);
    const [bookedSlots, setBookedSlots] = useState([]);

    // const selectedDateSetter = (value) => {
    //     const options = { weekday: 'short' };
    //     const dayOfWeek = value.toLocaleDateString('en-US', options).toUpperCase();
    //     const formattedDate = value.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
    //     setSelectedDate(formattedDate);
    //     setSelectedDayOfWeek(dayOfWeek);
    //     fetchSlots(dayOfWeek, formattedDate);
    // };
    const selectedDateSetter = (value) => {
        // Normalize the date to UTC to avoid timezone issues
        const utcDate = new Date(Date.UTC(value.getFullYear(), value.getMonth(), value.getDate()));

        const options = { weekday: 'short', timeZone: 'UTC' }; // Ensure we use UTC for consistent results
        const dayOfWeek = utcDate.toLocaleDateString('en-US', options).toUpperCase();
        const formattedDate = utcDate.toISOString().split('T')[0]; // Format date as YYYY-MM-DD

        setSelectedDate(formattedDate);
        setSelectedDayOfWeek(dayOfWeek);
        fetchSlots(dayOfWeek, formattedDate);
    };


    const fetchSlots = async (dayOfWeek, formattedDate) => {
        try {
            const response = await graphqlClient.request(GET_SLOTS, {
                day: dayOfWeek,
                eventName,
                date: formattedDate,
                // day:"MON",
                // eventName:"gagan",
                // date:"2024-05-26"
            });

            // Get the available slots and booked slots
            const { availability, bookedslots } = response;
            console.log('Availability:', availability);
            console.log('Booked Slots:', bookedslots);
            setAvailableSlots(availability);
            setBookedSlots(bookedslots);
        } catch (error) {
            console.error('Error fetching slots:', error);
            setAvailableSlots([]);
            setBookedSlots([]);
        }
    };

    useEffect(() => {
        const fetchEvents = async () => {
          try {
            const response = await graphqlClient.request(GET_Duration, {eventName});
            // console.log(typeof(response.kalenview_create_events[0].duration));
            setDuration(response.kalenview_create_events[0].duration);
          } catch (error){
            console.error('Failed to fetch Duration:', error);
          }
        };
    
        fetchEvents();
      }, [])

    useEffect(() => {
        const fetchEvents = async () => {
          try {
            const response = await graphqlClient.request(OrganizerName);
            // console.log(response.kalenview[0]);
            setOrganizerName(response.kalenview[0]);
          } catch (error){
            console.error('Failed to fetch Organizer Name:', error);
          }
        };
    
        fetchEvents();
      }, [])

    // const theDuration = duration;
    // console.log(`Duration is ${theDuration}`);

    const handleSlotClick = (startTime, endTime) => {
        const [year, month, day] = selectedDate.split('-');
        const formattedDisplayDate = `${day}-${month}-${year}`; // Format for display: DD-MM-YYYY
        const slotDetails = `${startTime}-${endTime}-${selectedDayOfWeek}-${formattedDisplayDate}`;
        navigate(`/book/${eventName}/${slotDetails}`);
    };

    const generateTimeSlots = (slot) => {
        const start = new Date(`1970-01-01T${slot.start_time}`);
        const end = new Date(`1970-01-01T${slot.end_time}`);
        const timeSlots = [];

        const toMinutes = (time) => {
            const [hours, minutes] = time.split(':').map(Number);
            return hours * 60 + minutes;
        };

        while (start < end) {
            const endSlot = new Date(start.getTime() + duration * 60000);
            if (endSlot <= end) {
                const slotStart = toMinutes(start.toTimeString().substr(0, 5));
                const slotEnd = toMinutes(endSlot.toTimeString().substr(0, 5));
                const isOverlapping = bookedSlots.some((bookedSlot) => {
                    const bookedStart = toMinutes(bookedSlot.start_time);
                    const bookedEnd = toMinutes(bookedSlot.end_time);
                    return (bookedStart >= slotStart && bookedStart < slotEnd) ||
                        (bookedEnd > slotStart && bookedEnd <= slotEnd) ||
                        (bookedStart <= slotStart && bookedEnd >= slotEnd);
                });

                if (!isOverlapping) {
                    timeSlots.push({
                        start_time: start.toTimeString().substr(0, 5),
                        end_time: endSlot.toTimeString().substr(0, 5),
                    });
                }
            }
            start.setMinutes(start.getMinutes() + 30);
        }

        return timeSlots;
    };

    return (
        <div className="card-container">
            <div className="card">
                <h2>Select a Date & Time</h2>
                <div className="content-container">
                    <div className="organizer-info">
                        <h2>Event Name:</h2>
                        <p>{eventName}</p>
                        <h3>Organizer Name:</h3>
                        <p>{organizerName.first_name +" "+ organizerName.last_name}</p>
                        <h3>Duration:</h3>
                        <p>{duration}</p>

                    </div>
                    <div className="calendar-container">
                        <Calendar
                            onChange={selectedDateSetter}
                            value={date}
                            minDate={new Date()}
                            formatShortWeekday={(locale, date) => date.toLocaleDateString(locale, { weekday: 'short' })}
                        />
                    </div>
                    {selectedDate && (
                        <div className="slot-booking-page">
                            <h2>Available slots for {selectedDate.split('-').reverse().join('-')} ({selectedDayOfWeek}):</h2>
                            {availableSlots.length > 0 ? (
                                availableSlots.flatMap(generateTimeSlots).map((slot, index) => (
                                    <div key={index} className="slot-box">
                                        <div className="slot-half">{slot.start_time}</div>
                                        <div
                                            className="slot-half next-half"
                                            id="half-next"
                                            onClick={() => handleSlotClick(slot.start_time, slot.end_time)}
                                        >
                                            <b>Next</b>
                                        </div>
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

export default CalendarPage;

// import React, { useState } from 'react';
// import Calendar from 'react-calendar';
// import { GraphQLClient } from 'graphql-request';
// import { useParams, useNavigate } from 'react-router-dom';
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
// function CalendarPage() {
//     const { eventName } = useParams();
//     const navigate = useNavigate();
//     const [date, setDate] = useState(new Date());
//     const [selectedDate, setSelectedDate] = useState('');
//     const [selectedDayOfWeek, setSelectedDayOfWeek] = useState('');
//     const [availableSlots, setAvailableSlots] = useState([]);
//     const [bookedSlots, setBookedSlots] = useState([]);
//
//     const selectedDateSetter = (value) => {
//         const options = { weekday: 'short' };
//         const dayOfWeek = value.toLocaleDateString('en-US', options).toUpperCase();
//         const formattedDate = value.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
//         setSelectedDate(formattedDate);
//         setSelectedDayOfWeek(dayOfWeek);
//         fetchSlots(dayOfWeek, formattedDate);
//     };
//
//     const fetchSlots = async (dayOfWeek, formattedDate) => {
//         try {
//             const response = await graphqlClient.request(GET_SLOTS, {
//                 // day: dayOfWeek.toUpperCase(),
//                 // eventName,
//                 // date: formattedDate, // Ensure this is a full date string
//                 day:"MON",
//                  eventName:"abc",
//                  date:"2024-05-27"
//             });
//
//             // Get the available slots and booked slots
//             const { availability, bookedslots } = response;
//             console.log(bookedslots);
//             setAvailableSlots(availability);
//             setBookedSlots(bookedslots);
//         } catch (error) {
//             console.error('Error fetching slots:', error);
//             setAvailableSlots([]);
//             setBookedSlots([]);
//         }
//     };
//
//     const handleSlotClick = (startTime, endTime) => {
//         const slotDetails = `${startTime}-${endTime}-${selectedDayOfWeek}-${selectedDate}`;
//         navigate(`/book/${eventName}/${slotDetails}`);
//     };
//
//     const generateTimeSlots = (slot) => {
//         const start = new Date(`1970-01-01T${slot.start_time}`);
//         const end = new Date(`1970-01-01T${slot.end_time}`);
//         const timeSlots = [];
//
//         const toMinutes = (time) => {
//             const [hours, minutes] = time.split(':').map(Number);
//             return hours * 60 + minutes;
//         };
//
//         while (start < end) {
//             const endSlot = new Date(start.getTime() + 30 * 60000);
//             if (endSlot <= end) {
//                 const slotStart = toMinutes(start.toTimeString().substr(0, 5));
//                 const slotEnd = toMinutes(endSlot.toTimeString().substr(0, 5));
//                 const isOverlapping = bookedSlots.some((bookedSlot) => {
//                     const bookedStart = toMinutes(bookedSlot.start_time);
//                     //console.log(bookedStart);
//                     const bookedEnd = toMinutes(bookedSlot.end_time);
//                     return (bookedStart >= slotStart && bookedStart < slotEnd) ||
//                         (bookedEnd > slotStart && bookedEnd <= slotEnd) ||
//                         (bookedStart <= slotStart && bookedEnd >= slotEnd);
//                 });
//
//                 if (!isOverlapping) {
//                     timeSlots.push({
//                         start_time: start.toTimeString().substr(0, 5),
//                         end_time: endSlot.toTimeString().substr(0, 5),
//                     });
//                 }
//             }
//             start.setMinutes(start.getMinutes() + 30);
//         }
//
//         return timeSlots;
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
//                             minDate={new Date()}
//                             formatShortWeekday={(locale, date) => date.toLocaleDateString(locale, { weekday: 'short' })}
//                         />
//                     </div>
//                     {selectedDate && (
//                         <div className="slot-booking-page">
//                             <h2>Available slots for {selectedDate} ({selectedDayOfWeek}):</h2>
//                             {availableSlots.length > 0 ? (
//                                 availableSlots.flatMap(generateTimeSlots).map((slot, index) => (
//                                     <div key={index} className="slot-box">
//                                         <div className="slot-half">{slot.start_time}</div>
//                                         <div
//                                             className="slot-half next-half"
//                                             onClick={() => handleSlotClick(slot.start_time, slot.end_time)}
//                                         >
//                                             Next
//                                         </div>
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
// export default CalendarPage;
//
