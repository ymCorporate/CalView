import React from 'react';
import {useParams,Route, useNavigate} from 'react-router-dom';
//import BookingPage from "../confirmpage/confirmpage";
import './successpage.css'

function SuccessPage() {
    const navigate = useNavigate();
    //const {eventName} = useParams();
    const handleRedirect = () => {
        //navigate('/booking/:eventName');
        navigate('/booking');
    };

    return (
        <div className="success-container">
            <div className="success-card">
                <h2>Booking Successful!</h2>
                <p>Thank you for booking. You will receive a confirmation email shortly.</p>
                <button onClick={handleRedirect}>Go to Slot Booking Page</button>
            </div>
        </div>
    );
}

export default SuccessPage;

