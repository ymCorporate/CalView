import React from 'react';
import Calendar from '../calender/calendar'; // assuming Calendar is exported from Calendar.js
import './appointmentSections.css';
import ProfileSection from "../profileSection/profileSection";

const AppointmentSection = () => {
    return (
        <div className="appointment-section flex w-full h-screen">
            <ProfileSection />
            <div className="flex-grow">
                <Calendar />
                <TimeZoneSelector />
                <button>Continue</button>
            </div>
        </div>
    );
};


const TimeZoneSelector = () => {
    // Implement your timezone selector component here
};

export default AppointmentSection;
