import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './slotbook.css';

function CalendarReact({ time }) {
    const [date, setDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState('');
    const [availableSlots, setAvailableSlots] = useState([]);
    //const { eventName } = useParams(); // Get the event name from the URL
    const selectedDateSetter = (value) => {
        const selectedDay = value.getDate(); // Get the day of the month
        setSelectedDate(selectedDay.toString()); // Use the day value directly
    };

    return (
        <div className="card-container">
            <div className="card">
                <h2>Select a Date & Time</h2>
                <div className="content-container">
                    <div className="organizer-info">
                        <h3>Organizer Name</h3>
                        <p>Event Name</p>
                        <p>Duration</p>
                    </div>
                    <div className="calendar-container">
                        <Calendar
                            onChange={selectedDateSetter}
                            value={date}
                            minDate={new Date()} // Disable past dates
                        />
                    </div>
                    {selectedDate && (
                        <div className="slot-booking-page">
                            <h2>Available slots for {selectedDate}:</h2>
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
