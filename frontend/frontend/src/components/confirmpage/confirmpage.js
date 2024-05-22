import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GraphQLClient } from 'graphql-request';
import { BOOK_SLOT } from './query';
import './confirmpage.css';

const graphqlClient = new GraphQLClient('http://localhost:8080/v1/graphql', {
    headers: {
        'x-hasura-admin-secret': '123', // Replace with your actual admin secret or use a more secure method for authentication
    },
});

function BookingPage() {
    const { eventName, slotDetails } = useParams();
    const [startTime, endTime, dayOfWeek,selectedDate,month, year] = slotDetails.split('-');
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', email: '' });
    console.log(startTime,endTime,dayOfWeek,year,month,selectedDate);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const fulldate = year+'-'+month+'-'+selectedDate;
    console.log(fulldate);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const variables = {
                day: dayOfWeek,
                eventName,
                date: fulldate,
                startTime,
                endTime,
                name: formData.name,
                email: formData.email,
            };

            await graphqlClient.request(BOOK_SLOT, variables);
            navigate(`/success`);
        } catch (error) {
            console.error('Error booking slot:', error);
        }
    };

    return (
        <div className="booking-container">
            <div className="organizer-info">
                <h3>Organizer Name</h3>
                <p>{eventName}</p>
                <p>Duration: 30 min</p>
                <p>{startTime} - {endTime}, {dayOfWeek}, {selectedDate}-{month}-{year}</p>
            </div>
            <div className="form-container">
                <h3>Book your slot</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default BookingPage;
