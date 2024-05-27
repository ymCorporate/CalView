import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GraphQLClient } from 'graphql-request';
import { GET_AVAILABILITY, UPSERT_AVAILABILITY, DELETE_AVAILABILITY } from './graphqlQueries';
import './AvailabilityForm.css';

const graphqlClient = new GraphQLClient('http://localhost:8080/v1/graphql', {
    headers: {
        'x-hasura-admin-secret': '123',
    },
});

const TimeSelect = ({ disabled, onChange, value }) => {
    const times = [];
    for (let i = 0; i < 24; i++) {
        for (let j = 0; j < 60; j += 30) {
            const time = `${i.toString().padStart(2, '0')}:${j.toString().padStart(2, '0')}`;
            times.push(time);
        }
    }

    return (
        <select disabled={disabled} onChange={onChange} value={value} className="border border-gray-300 p-2 rounded-md">
            {times.map((time, index) => (
                <option key={index} value={time}>{time}</option>
            ))}
        </select>
    );
};

const AvailabilityForm = () => {
    const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
    const {eventName} = useParams();
    const [availability, setAvailability] = useState(
        daysOfWeek.reduce((acc, day) => ({...acc, [day]: [{selected: false, startTime: '', endTime: ''}]}), {})
    );
    const [isFormValid, setIsFormValid] = useState(true);

    useEffect(() => {
        const fetchAvailability = async () => {
            try {
                const response = await graphqlClient.request(GET_AVAILABILITY, {eventName});
                const fetchedAvailability = response.availability.reduce((acc, slot) => {
                    if (!acc[slot.day]) {
                        acc[slot.day] = [];
                    }
                    acc[slot.day].push({selected: true, startTime: slot.start_time, endTime: slot.end_time});
                    return acc;
                }, {});
                const newAvailability = {...availability};
                for (const day of daysOfWeek) {
                    if (fetchedAvailability[day]) {
                        newAvailability[day] = fetchedAvailability[day];
                    }
                }
                setAvailability(newAvailability);
            } catch (error) {
                console.error('Failed to fetch availability:', error);
            }
        };

        fetchAvailability();
    }, [eventName]);

    useEffect(() => {
        const validateForm = () => {
            for (const day in availability) {
                const slots = availability[day];
                for (let i = 0; i < slots.length; i++) {
                    const slot = slots[i];
                    if (slot.selected) {
                        if (slot.startTime >= slot.endTime) {
                            setIsFormValid(false);
                            return;
                        }
                        for (let j = 0; j < slots.length; j++) {
                            if (i !== j && slots[j].selected) {
                                if (
                                    (slot.startTime < slots[j].endTime && slot.endTime > slots[j].startTime) ||
                                    (slots[j].startTime < slot.endTime && slots[j].endTime > slot.startTime)
                                ) {
                                    setIsFormValid(false);
                                    return;
                                }
                            }
                        }
                    }
                }
            }
            setIsFormValid(true);
        };

        validateForm();
    }, [availability]);

    const handleDayChange = (day, index) => async (event) => {
        const updatedDaySlots = [...availability[day]];
        if (updatedDaySlots[index]) {
            updatedDaySlots[index].selected = event.target.checked;
            setAvailability({...availability, [day]: updatedDaySlots});

            if (!event.target.checked) {
                // Delete the slot if it's being deselected
                const slotToDelete = availability[day][index];
                try {
                    const response = await graphqlClient.request(DELETE_AVAILABILITY, {
                        day: day,
                        startTime: slotToDelete.startTime,
                        eventName: eventName,
                    });
                    if (response.delete_availability.affected_rows > 0) {
                        console.log('Slot deleted successfully');
                    } else {
                        console.error('Failed to delete slot');
                    }
                } catch (e) {
                    console.error('Error occurred while deleting slot', e);
                }
                updatedDaySlots.splice(index, 1);
                setAvailability({...availability, [day]: updatedDaySlots});
            }
        }
    };

    const handleTimeChange = (day, index, timeType) => (event) => {
        const updatedDaySlots = [...availability[day]];
        if (updatedDaySlots[index]) {
            updatedDaySlots[index][timeType] = event.target.value;
            setAvailability({...availability, [day]: updatedDaySlots});
        }
    };

    // const addTimeSlot = (day) => {
    //     setAvailability({
    //         ...availability,
    //         [day]: [...availability[day], {selected: false, startTime: '', endTime: ''}]
    //     });
    // };

    const deleteTimeSlot = async (day, index) => {
        const slotToDelete = availability[day][index];
        try {
            const response = await graphqlClient.request(DELETE_AVAILABILITY, {
                day: day,
                startTime: slotToDelete.startTime,
                eventName: eventName,
            });
            if (response.delete_availability.affected_rows > 0) {
                console.log('Slot deleted successfully');
            } else {
                console.error('Failed to delete slot');
            }
        } catch (e) {
            console.error('Error occurred while deleting slot', e);
        }

        const updatedDaySlots = [...availability[day]];
        updatedDaySlots.splice(index, 1);
        setAvailability({...availability, [day]: updatedDaySlots});
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const filteredAvailability = Object.fromEntries(
            Object.entries(availability).filter(([day, slots]) => slots.some(slot => slot.selected))
        );

        try {
            let flag=0;
            for (const [day, slots] of Object.entries(filteredAvailability)) {
                for (const slot of slots) {
                    if (slot.selected) {
                        const data = await graphqlClient.request(UPSERT_AVAILABILITY, {
                            day: day,
                            startTime: slot.startTime,
                            endTime: slot.endTime,
                            eventName: eventName,
                        });
                        console.log(data.insert_availability_one.event_name);

                        if(!(data.insert_availability_one.event_name==eventName)){
                            alert(`Availability will not set for Timeline:\n${day} ${slot.startTime}\nas it is already present in Event Name:\n${data.insert_availability_one.event_name}`);
                            flag+=1;
                        }

                    }
                }
            }
            if(flag!=1) {
                alert('Availability set successfully!');
            }
        } catch (e) {
            console.error('Error occurred while setting availability', e);
            alert('Failed to set availability');
        }
    };

    const addTimeSlot = (day) => {
        setAvailability({
            ...availability,
            [day]: [...availability[day], {selected: false, startTime: '', endTime: ''}]
        });
    };

    return (
        <div className="availability-form">
            <h1 className="title">WEEKLY HOURS</h1>
            <form onSubmit={handleSubmit} className="form">
                <div className="days-grid">
                    {daysOfWeek.map((day) => (
                        <div key={day} className="day">
                            <h2 className={`day-name ${availability[day][0]?.selected ? 'selected' : ''}`}>{day}</h2>
                            {availability[day].map((slot, index) => (
                                <div key={index} className="time-slot">
                                    <input type="checkbox" id={`${day}-${index}`} value={day} checked={slot.selected}
                                           onChange={handleDayChange(day, index)} className="mr-2"/>
                                    <TimeSelect disabled={!slot.selected} value={slot.startTime}
                                                onChange={handleTimeChange(day, index, 'startTime')}/>
                                    <TimeSelect disabled={!slot.selected} value={slot.endTime}
                                                onChange={handleTimeChange(day, index, 'endTime')}/>
                                    {slot.selected && slot.startTime >= slot.endTime &&
                                        <p className="text-red-500">Start time must be before end time</p>}
                                    {slot.selected && (
                                        <button type="button" onClick={() => deleteTimeSlot(day, index)}
                                                className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">X</button>
                                    )}
                                </div>
                            ))}
                            <button type="button" onClick={() => addTimeSlot(day)}
                                    className="add-slot-button">+
                            </button>
                        </div>
                    ))}
                </div>
                <button type="submit" className="submit-button" disabled={!isFormValid}>Submit</button>
            </form>
        </div>
    );
}

export default AvailabilityForm;









