import React, { useState } from 'react';
import Calendar from 'react-calendar';
//import { useHistory } from 'react-router-dom';
import './slotbook.css';

function CalendarReact({ time }) {
    const [date, setDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState('');
    const [availableSlots, setAvailableSlots] = useState([]);
    //const history = useHistory();

    const selectedDateSetter = (value) => {
        let path = `/user/15min/date`;
        //history.push(path);
        setSelectedDate(value.toDateString()); // Use the date value directly
        // Fetch available slots from Hasura backend here
        // Update the availableSlots state with the fetched data
    };

    const tileDisabled = ({date, view}) => {
        // Disable tiles in month view and past dates
        return view === 'month' && date < new Date().setHours(0, 0, 0, 0);
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
                            tileDisabled={tileDisabled}
                        />
                    </div>
                    {selectedDate && (
                        <div className="slot-booking-page">
                            <h2>Available slots for {selectedDate}:</h2>
                            {availableSlots.length > 0 ? (
                                availableSlots.map((slot, index) => (
                                    <p key={index}>{slot}</p>
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
