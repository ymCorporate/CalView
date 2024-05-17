import React, { useState } from 'react';
import Select from 'react-select';
import './timeZone.css'

const timezones = [
    { value: 'IST', label: 'India Standard Time' },
    // Add other timezones here
];

const TimezoneSelector = () => {
    const [selectedTimezone, setSelectedTimezone] = useState(timezones[0]);

    const handleChange = (selectedOption) => {
        setSelectedTimezone(selectedOption);
    };

    return (
        <div className="timezone-selector">
            <Select
                value={selectedTimezone}
                onChange={handleChange}
                options={timezones}
            />
        </div>
    );
};

export default TimezoneSelector;
