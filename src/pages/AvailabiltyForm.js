import React, { useState } from 'react';

const TimeSelect = ({ disabled, onChange }) => {
    const times = [];
    for(let i=0; i<24; i++) {
        for(let j=0; j<60; j+=30) {
            const time = `${i.toString().padStart(2, '0')}:${j.toString().padStart(2, '0')}`;
            times.push(time);
        }
    }

    return (
        <select disabled={disabled} onChange={onChange} className="border border-gray-300 p-2 rounded-md">
            {times.map((time, index) => (
                <option key={index} value={time}>{time}</option>
            ))}
        </select>
    );
};

const AvailabilityForm = () => {
    const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
    const [availability, setAvailability] = useState(
        daysOfWeek.reduce((acc, day) => ({ ...acc, [day]: [{ selected: false, startTime: '', endTime: '' }] }), {})
    );
    const [copyDays, setCopyDays] = useState(
        daysOfWeek.reduce((acc, day) => ({ ...acc, [day]: false }), {})
    );
    const [showCopyDays, setShowCopyDays] = useState(false);

    const handleDayChange = (day, index) => (event) => {
        const updatedDaySlots = [...availability[day]];
        updatedDaySlots[index].selected = event.target.checked;
        setAvailability({ ...availability, [day]: updatedDaySlots });
    };

    const handleTimeChange = (day, index, timeType) => (event) => {
        const updatedDaySlots = [...availability[day]];
        updatedDaySlots[index][timeType] = event.target.value;
        setAvailability({ ...availability, [day]: updatedDaySlots });
    };

    const addTimeSlot = (day) => {
        setAvailability({ ...availability, [day]: [...availability[day], { selected: false, startTime: '', endTime: '' }] });
    };

    const deleteTimeSlot = (day, index) => {
        if (index > 0) { // Prevent deletion of the first time slot
            const updatedDaySlots = [...availability[day]];
            updatedDaySlots.splice(index, 1);
            setAvailability({ ...availability, [day]: updatedDaySlots });
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Availability: ', availability);
    };

    const validateTime = (day, index) => {
        const slot = availability[day][index];
        return slot.startTime > slot.endTime;
    };

    const handleCopyDayChange = (day) => (event) => {
        setCopyDays({ ...copyDays, [day]: event.target.checked });
    };

    const copyTimeSlot = (day) => {
        setShowCopyDays(false);
    const selectedDays = Object.keys(copyDays).filter(d => copyDays[d] && d !== day);
    selectedDays.forEach(d => {
        setAvailability(prevAvailability => ({
            ...prevAvailability,
            [d]: [...prevAvailability[day]]
        }));
    });
};

return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-1/2 mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
            {daysOfWeek.map((day) => (
                <div key={day} className="flex justify-between items-start">
                    <div className="w-3/4">
                        <h2 className={`font-medium ${availability[day][0].selected ? 'text-gray-700' : 'text-gray-400'}`}>{day}</h2>
                        {availability[day].map((slot, index) => (
                            <div key={index} className="flex items-center space-x-2 mb-4">
                                <input type="checkbox" id={`${day}-${index}`} value={day} checked={slot.selected} onChange={handleDayChange(day, index)} className="mr-2" />
                                <TimeSelect disabled={!slot.selected} value={slot.startTime} onChange={handleTimeChange(day, index, 'startTime')} />
                                <TimeSelect disabled={!slot.selected} value={slot.endTime} onChange={handleTimeChange(day, index, 'endTime')} />
                                {validateTime(day, index) && <p className="text-red-500">Start time must be before end time</p>}
                                {index > 0 && <button type="button" onClick={() => deleteTimeSlot(day, index)} className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline">X</button>}
                            </div>
                        ))}
                    </div>
                    <div className="flex space-x-2">
                        <button type="button" onClick={() => addTimeSlot(day)} disabled={!availability[day][0].selected} className={`mt-2 ${availability[day][0].selected ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-300'} text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline`}>+</button>
                        <button type="button" onClick={() => setShowCopyDays(!showCopyDays)} disabled={!availability[day][0].selected} className={`mt-2 ${availability[day][0].selected ? 'bg-green-500 hover:bg-green-700' : 'bg-gray-300'} text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline`}>Copy</button>
                        {showCopyDays && availability[day][0].selected && (
                            <div className="mt-2 bg-white border border-gray-300 p-2 rounded-md">
                                {daysOfWeek.map((d) => (
                                    <div key={d}>
                                        <input type="checkbox" id={`copy-${d}`} value={d} checked={copyDays[d]} onChange={handleCopyDayChange(d)} className="mr-2" />
                                        <label htmlFor={`copy-${d}`}>{d}</label>
                                    </div>
                                ))}
                                <button type="button" onClick={() => copyTimeSlot(day)} className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline">Apply</button>
                            </div>
                        )}
                    </div>
                </div>
            ))}
            <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
        </form>
    </div>
);
};

export default AvailabilityForm;
