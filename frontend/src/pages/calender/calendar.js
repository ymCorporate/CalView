import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './calender.css'

const MyCalendar = () => {
    const [date, setDate] = useState(new Date());

    const onChange = (date) => {
        setDate(date);
    };

    return (
        <div className="calendar">
            <Calendar
                onChange={onChange}
                value={date}
            />
        </div>
    );
};

export default MyCalendar;
