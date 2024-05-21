import React, { useState } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import './AvailabilityForm.css'; // Import the CSS file

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
    const { eventName } = useParams();
    const [availability, setAvailability] = useState(
        daysOfWeek.reduce((acc, day) => ({ ...acc, [day]: [{ selected: false, startTime: '', endTime: '' }] }), {})
    );
    //console.log(eventName);

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
            console.log(slotToDelete);
            console.log(day);
            console.log(eventName)
            try {
                // Send a DELETE request to your Node.js backend
                const response = await axios.post(`http://localhost:6541/events/availability/delete/${eventName}`, { day: day, startTime: slotToDelete.startTime});  // replace with your API endpoint
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
            const response = await axios.post(`http://localhost:6541/events/availability/create/${eventName}`, filteredAvailability) /// // replace with your API endpoint
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
        <div className="availability-form">
    <h1 className="title">WEEKLY HOURS</h1>
    <form onSubmit={handleSubmit} className="form">
      <div className="days-grid">
        {daysOfWeek.map((day) => (
          <div key={day} className="day">
            <h2 className={`day-name ${availability[day][0].selected ? 'selected' : ''}`}>{day}</h2>
            {availability[day].map((slot, index) => (
              <div key={index} className="time-slot">
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

<button type="button" onClick={() => addTimeSlot(day)} disabled={!availability[day][0].selected}
                    className="add-slot-button">+</button>
          </div>
                ))}
                </div>
      <button type="submit" className="submit-button">Submit</button>
    </form>
  </div>
    );
};

export default AvailabilityForm;