import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GraphQLClient } from 'graphql-request';
import { BOOK_SLOT, GetOrganizerEventDetails } from './query';
import axios from 'axios'; 
import './confirmpage.css';


import Cookies from 'js-cookie';
const user_uuid = Cookies.get('uuid');



const graphqlClient = new GraphQLClient('http://localhost:8080/v1/graphql', {
    headers: {
        'x-hasura-admin-secret': '123', // Replace with your actual admin secret or use a more secure method for authentication
    },
});

function BookingPage() {
    const { eventName, slotDetails } = useParams();
    const [organizerName, setOrganizerName] = useState({});
    const [startTime, endTime, dayOfWeek,selectedDate,month, year] = slotDetails.split('-');
    const [event_details, SetEventDetails] = useState({});
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
                user_uuid,
                day: dayOfWeek,
                eventName,
                date: fulldate,
                startTime,
                endTime,
                name: formData.name,
                email: formData.email,
            };

            await graphqlClient.request(BOOK_SLOT, variables);
            // console.log("Event Details are: ",event_details.kalenview_create_events[0].location_type);
            // // const response = await axios.post('http://localhost:6541/event/mail', {
            // const response = await axios.post('http://localhost:8888/.netlify/functions/api/event/mail', {    
            //     eventType: event_details.kalenview_create_events[0].location_type,
            //     eventDetail: event_details.kalenview_create_events[0].location_detail,
            //     userEmail: formData.email, 
            //     userName: formData.name,
            //     day: dayOfWeek,
            //     eventName,
            //     date: fulldate,
            //     startTime,
            //     endTime,
            //  });
            // console.log(response);

            // if (response.status === 201) {
            //     console.log("Email sent")
            // } else {
            //     console.log(response.data.error);
            // }


            // navigate(`/success`);
        } catch (error) {
            console.error('Error booking slot:', error);
        }
    };

    useEffect(() => {
        const fetchEvents = async () => {
          try {
            // const response = await graphqlClient.request(OrganizerName);

            const response = await graphqlClient.request(GetOrganizerEventDetails, {eventName, user_uuid});
            console.log("event_details variable is here: ", response)
            SetEventDetails(response)

            // console.log(response.kalenview[0]);
            setOrganizerName(response.kalenview[0]);
          } catch (error){
            console.error('Failed to fetch Organizer Name:', error);
          }
        };
    
        fetchEvents();
      }, [])

    return (
        <div className="booking-container">
            <div className="organizer-info">
                <h3>Event Name</h3>
                <p>{eventName}</p>
                <h3>Organizer Name</h3>
                <p>{organizerName.first_name +" "+ organizerName.last_name}</p>
                <p><b>Duration:</b> 30 min</p>
                <p><b>Time: </b>{startTime} - {endTime}, {dayOfWeek}, {selectedDate}-{month}-{year}</p>
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
