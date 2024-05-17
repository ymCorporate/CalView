import React, { useState } from 'react';
import axios from "axios";

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

    const deleteTimeSlot = async (day, index) => {
        if (index > 0) { // Prevent deletion of the first time slot
            const slotToDelete = availability[day][index];
            // console.log(slotToDelete);
            // console.log(day);
            try {
                // Send a DELETE request to your Node.js backend
                const response = await axios.post('http://localhost:4321/events/delete', { day: day, startTime: slotToDelete.startTime });  // replace with your API endpoint
                console.log(response)
                if (response.data.success) {
                    console.log('Slot deleted successfully');
                } else {
                    console.error('Failed to delete slot');
                }
            } catch (e) {
                console.error('Error occurred while deleting slot', e);
            }

            const updatedDaySlots = [...availability[day]];
            updatedDaySlots.splice(index, 1);
            setAvailability({ ...availability, [day]: updatedDaySlots });
        }
    };
    // const deleteTimeSlot = (day, index) => {
    //     if (index > 0) { // Prevent deletion of the first time slot
    //         const updatedDaySlots = [...availability[day]];
    //         updatedDaySlots.splice(index, 1);
    //         setAvailability({ ...availability, [day]: updatedDaySlots });
    //     }
    // };

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     console.log('Availability: ', availability);
    //     try{
    //         //Send a POST request to your Node.js backend
    //         const response = await axios.post('http://localhost:4321/events/create', availability)  // replace with your API endpoint
    //         if (response.data.success) {
    //             alert('availability set successfully!');
    //         } else {
    //             alert('Failed to set availability');
    //         }
    //     }catch(e){
    //         console.log('error occurred', e);
    //     }
    //
    // };
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Filter out unselected days
        const filteredAvailability = Object.fromEntries(
            Object.entries(availability).filter(([day, slots]) => slots.some(slot => slot.selected))
        );

        console.log('Filtered Availability: ', filteredAvailability);
        try{
            // Send a POST request to your Node.js backend
            const response = await axios.post('http://localhost:4321/events/create', filteredAvailability)  // replace with your API endpoint
            if (response.data.success) {
                alert('availability set successfully!');
            } else {
                alert('Failed to set availability');
            }
        }catch(e){
            console.log('error occurred', e);
        }
    };



    const validateTime = (day, index) => {
        const slot = availability[day][index];
        return slot.startTime > slot.endTime;
    };

    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-1/2 mx-auto">
            <h1 className="text-4xl font-bold mb-4 text-left text-black-700">WEEKLY HOURS</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {daysOfWeek.map((day) => (
                    <div key={day} className="flex justify-between items-start">
                        <div className="w-3/4">
                            <h2 className={`font-medium ${availability[day][0].selected ? 'text-gray-700' : 'text-gray-400'}`}>{day}</h2>
                            {availability[day].map((slot, index) => (
                                <div key={index} className="flex items-center space-x-2 mb-4">
                                    <input type="checkbox" id={`${day}-${index}`} value={day} checked={slot.selected}
                                           onChange={handleDayChange(day, index)} className="mr-2"/>
                                    <TimeSelect disabled={!slot.selected} value={slot.startTime}
                                                onChange={handleTimeChange(day, index, 'startTime')}/>
                                    <TimeSelect disabled={!slot.selected} value={slot.endTime}
                                                onChange={handleTimeChange(day, index, 'endTime')}/>
                                    {slot.selected && validateTime(day, index) &&
                                        <p className="text-red-500">Choose a Start time which must be before end
                                            time</p>}
                                    {index > 0 && <button type="button" onClick={() => deleteTimeSlot(day, index)}
                                                          className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">X</button>}
                                </div>
                            ))}

                        </div>
                        <button type="button" onClick={() => addTimeSlot(day)} disabled={!availability[day][0].selected}
                                className={`mt-2 ${availability[day][0].selected ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-300'} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}>+
                        </button>
                    </div>
                ))}
                <button type="submit"
                        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit
                </button>
            </form>
        </div>
    );
};

export default AvailabilityForm;