// CalendarComponent.js
import React, { useState } from 'react';
import './CalendarComponent.css';
import JuliSVG from '../assets/Juli.svg';
import AugustSVG from '../assets/August.svg';
import SeptemberSVG from '../assets/September.svg';
import OktoberSVG from '../assets/Oktober.svg';
import NovemberSVG from '../assets/November.svg';

const CalendarComponent = ({ darkMode, setSelectedDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDateState] = useState(null);

  const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'lør', 'søn'];

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const generateDates = (year, month) => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const dates = [];
    let week = new Array((firstDayOfMonth + 6) % 7).fill('');

    for (let date = 1; date <= daysInMonth; date++) {
      week.push(date);
      if (week.length === 7) {
        dates.push(week);
        week = [];
      }
    }

    if (week.length > 0) {
      while (week.length < 7) {
        week.push('');
      }
      dates.push(week);
    }

    return dates;
  };

  const isWeekend = (day) => day === 6 || day === 0; // Sunday (0) and Saturday (6)
  const isPast = (date, month, year) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const currentDate = new Date(year, month, date);
    return currentDate < today;
  };

  const dates = generateDates(currentYear, currentMonth);

  const handlePreviousMonth = () => {
    if (currentMonth > new Date().getMonth() || currentYear > new Date().getFullYear()) {
      setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
      if (currentMonth === 0) {
        setCurrentYear((prevYear) => prevYear - 1);
      }
    }
  };

  const handleNextMonth = () => {
    const maxMonth = new Date().getMonth() + 2;
    if (currentMonth < maxMonth || currentYear < new Date().getFullYear()) {
      setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
      if (currentMonth === 11) {
        setCurrentYear((prevYear) => prevYear + 1);
      }
    }
  };

  const monthSVGs = [JuliSVG, AugustSVG, SeptemberSVG, OktoberSVG, NovemberSVG];

  const handleDateClick = (date) => {
    const fullDate = new Date(currentYear, currentMonth, date);
    const weekendCheck = isWeekend((new Date(currentYear, currentMonth, date)).getDay());
    const pastCheck = isPast(date, currentMonth, currentYear);

    console.log("Date clicked:", fullDate);
    console.log("isWeekend:", weekendCheck);
    console.log("isPast:", pastCheck);

    if (date && !weekendCheck && !pastCheck) {
      setSelectedDateState(date);
      setSelectedDate(fullDate);
      console.log("Selected Date set to:", fullDate);
    }
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button className="nav-button" onClick={handlePreviousMonth} disabled={currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear()}>{'<'}</button>
        <img src={monthSVGs[currentMonth - 6]} alt="Current month" className="month-svg" />
        <button className="nav-button" onClick={handleNextMonth}>{'>'}</button>
      </div>
      <div className="calendar-grid">
        {daysOfWeek.map((day, index) => (
          <div key={`day-${index}`} className="day-label">{day}</div>
        ))}
        {dates.flat().map((date, index) => (
          <div
            key={`date-${date}-${index}`}
            className={`date-box ${date ? 'available' : 'empty'} ${isWeekend((new Date(currentYear, currentMonth, date)).getDay()) || !date || isPast(date, currentMonth, currentYear) ? 'unavailable' : ''} ${selectedDate === date ? 'selected' : ''}`}
            onClick={() => date && handleDateClick(date)}
          >
            <span className={isWeekend((new Date(currentYear, currentMonth, date)).getDay()) ? 'weekend-number' : 'weekday-number'}>{date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarComponent;
