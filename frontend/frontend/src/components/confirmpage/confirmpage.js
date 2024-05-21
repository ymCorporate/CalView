import React from 'react';
import { useParams } from 'react-router-dom';
import './confirmpage.css';

function BookingPage() {
    const { eventName, slotDetails } = useParams();
    const [startTime, endTime, dayOfWeek, selectedDate] = slotDetails.split('-');

    return (
        <div className="booking-container">
            <div className="organizer-info">
                <h3>Organizer Name</h3>
                <p>{eventName}</p>
                <p>Duration: 30 min</p>
                <p>{startTime} - {endTime}, {dayOfWeek}, {selectedDate}</p>
            </div>
            <div className="form-container">
                <h3>Book your slot</h3>
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default BookingPage;
