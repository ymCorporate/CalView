import React, { useState } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css'; // Import the CSS for react-calendar
import './slotBook.css';

function CalendarReact({ time }) {
    const { eventName } = useParams(); // Get the event name from the URL
    const [date, setDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedDayOfWeek, setSelectedDayOfWeek] = useState('');
    const [availableSlots, setAvailableSlots] = useState([]);

    const fetchSlots = async (dayOfWeek) => {
        try {
            console.log(dayOfWeek, eventName);
            const response = await axios.get(`http://localhost:6541/events/slots/${dayOfWeek}/${eventName}`);
            setAvailableSlots(response.data);
        } catch (error) {
            console.error('Error fetching slots:', error);
            setAvailableSlots([]);
        }
    };

    const selectedDateSetter = (value) => {
        const options = { weekday: 'short' }; // Options for toLocaleDateString
        const selectedDay = value.getDate(); // Get the day of the month
        const dayOfWeek = value.toLocaleDateString('en-US', options); // Get the day of the week
        setSelectedDate(selectedDay.toString()); // Set the selected day as a string
        setSelectedDayOfWeek(dayOfWeek); // Set the selected day of the week
        fetchSlots(dayOfWeek); // Fetch available slots for the selected day of the week
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
                                        <p>{slot.start_time} - {slot.end_time}</p>
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
