import React, { useState, useEffect } from 'react';
import { useEvent } from '../EventDetails/EventDetailsCopy';
import { GraphQLClient } from 'graphql-request';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { UPSERT_AVAILABILITY, DELETE_AVAILABILITY } from './graphqlQueries';
import './AvailabilityFormCopy.css';


const jwt = Cookies.get('jwt');
const user_uuid = Cookies.get('uuid');

const graphqlClient = new GraphQLClient('http://localhost:8080/v1/graphql', {
  headers: {
    'x-hasura-admin-secret': '123',
    'Authorization': `Bearer ${jwt}`
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
  const { availability, setAvailability } = useEvent();
  const [isFormValid, setIsFormValid] = useState(true);

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
      setAvailability({ ...availability, [day]: updatedDaySlots });

      if (!event.target.checked) {
        // Delete the slot if it's being deselected
        const slotToDelete = availability[day][index];
        try {
          const response = await graphqlClient.request(DELETE_AVAILABILITY, {
            user_uuid,
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
        setAvailability({ ...availability, [day]: updatedDaySlots });
      }
    }
  };

  const handleTimeChange = (day, index, timeType) => (event) => {
    const updatedDaySlots = [...availability[day]];
    if (updatedDaySlots[index]) {
      updatedDaySlots[index][timeType] = event.target.value;
      setAvailability({ ...availability, [day]: updatedDaySlots });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const filteredAvailability = Object.fromEntries(
      Object.entries(availability).filter(([day, slots]) => slots.some(slot => slot.selected))
    );

    try {
      let flag = false;
      for (const [day, slots] of Object.entries(filteredAvailability)) {
        for (const slot of slots) {
          if (slot.selected) {
            const response = await graphqlClient.request(UPSERT_AVAILABILITY, {
              user_uuid,
              eventName,
              day,
              startTime: slot.startTime,
              endTime: slot.endTime,
            });
            if(!(response.insert_availability_one.event_name===eventName)){
              alert(`Availability will not set for Timeline:\n${day} ${slot.startTime}\nas it is already present in Event Name:\n${response.insert_availability_one.event_name}`);
              flag = true;
            }
          }
        }
      }
      if (!flag) {
        alert('Availability saved successfully.');
      } else {
        alert('Failed to save some slots.');
      }
    } catch (error) {
      console.error('Failed to save availability:', error);
    }
  };

  const addTimeSlot = (day) => {
    const updatedDaySlots = [...(availability[day] || [])];
    updatedDaySlots.push({ selected: true, startTime: '00:00', endTime: '00:00' });
    setAvailability({ ...availability, [day]: updatedDaySlots });
  };

  const deleteTimeSlot = (day, index) => async () => {
    const updatedDaySlots = [...availability[day]];
    const slotToDelete = updatedDaySlots[index];
    if (slotToDelete) {
      try {
        const response = await graphqlClient.request(DELETE_AVAILABILITY, {
          user_uuid,
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
      setAvailability({ ...availability, [day]: updatedDaySlots });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="availability-form">
      <div className="days-grid">
      {daysOfWeek.map((day) => (
        <div key={day} className="availability-day">
          <h3>{day}</h3>
          {availability[day]?.map((slot, index) => (
            <div key={index} className="availability-slot">
              <input
                type="checkbox"
                checked={slot.selected}
                onChange={handleDayChange(day, index)}
              />
              <TimeSelect
                disabled={!slot.selected}
                value={slot.startTime}
                onChange={handleTimeChange(day, index, 'startTime')}
              />
              <TimeSelect
                disabled={!slot.selected}
                value={slot.endTime}
                onChange={handleTimeChange(day, index, 'endTime')}
              />
              <button type="button" onClick={deleteTimeSlot(day, index)}>
                Delete
              </button>
            </div>
          ))}
          <button type="button" onClick={() => addTimeSlot(day)}>
            Add Time Slot
          </button>
        </div>
      ))}
      </div>
      <button type="submit" disabled={!isFormValid}>
        Save Availability
      </button>
    </form>
  );
};

export default AvailabilityForm;
