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
                                    {index > 0 && <button type="button" onClick={() => deleteTimeSlot(day, index)} className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">X</button>}
                                </div>
                            ))}
                        </div>
                        <button type="button" onClick={() => addTimeSlot(day)} disabled={!availability[day][0].selected} className={`mt-2 ${availability[day][0].selected ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-300'} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}>+</button>
                    </div>
                ))}
                <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
            </form>
        </div>
    );
};

export default AvailabilityForm;
