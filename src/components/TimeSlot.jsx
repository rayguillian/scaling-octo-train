// TimeSlot.js
import React from 'react';
import './CalendarComponent.css';
import lightModeTitle from '../assets/Vælg et tidsrum.svg';
import darkModeTitle from '../assets/Vælg et tidsrum dark.svg';

const TimeSlot = ({ timeSlots, selectedTime, setSelectedTime, darkMode }) => {
  return (
    <div className={`time-slot-container ${darkMode ? 'bg-darkBg' : 'bg-lightBg'}`}>
      <img src={darkMode ? darkModeTitle : lightModeTitle} alt="Vælg et tidsrum" className="title-svg" />
      <div className="time-slot-grid">
        {timeSlots.map((time, index) => (
          <div
            key={index}
            className={`time-slot-box ${selectedTime === time ? 'selected' : ''}`}
            onClick={() => setSelectedTime(time)}
          >
            {time}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeSlot;
