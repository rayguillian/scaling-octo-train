// App.js
import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import darkModeLogo from './assets/darkmodelogo.svg';
import lightModeLogo from './assets/lightmodelogo.svg';
import textLogo from './assets/textlogo.svg';
import LinkSection from './components/LinkSection';
import ServicesSection from './components/ServicesSection.jsx';
import CalendarComponent from './components/CalendarComponent';
import TimeSlot from './components/TimeSlot';
import Booking from './components/Booking';
import kontaktTitleLight from './assets/Kontakttitlelight.svg';
import kontaktTitleDark from './assets/Kontakttitledark.svg';
import bookEnModeLight from './assets/Book en møde.svg';
import bookEnModeDark from './assets/Book en møde dark.svg';
import CallMeForm from './components/CallMeForm';
import Footer from './components/Footer';
import './index.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Admin from './components/Admin';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import OmOsSection from './components/OmOsSection'; // Import the new component

const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const timeSlotRef = useRef(null);
  const bookingRef = useRef(null);
  const [user, authLoading] = useAuthState(auth);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const timeSlots = [
    '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', 
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', 
    '16:00'
  ];

  useEffect(() => {
    if (selectedDate && timeSlotRef.current) {
      timeSlotRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedDate]);

  useEffect(() => {
    if (selectedTime && bookingRef.current) {
      bookingRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedTime]);

  if (authLoading) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          <div className={`${darkMode ? 'bg-darkBg text-darkText' : 'bg-lightBg text-lightText'}`}>
            <div className="flex flex-col justify-between items-center min-h-screen">
              <div className="flex flex-col justify-center items-center flex-1">
                <img 
                  src={darkMode ? darkModeLogo : lightModeLogo} 
                  alt="Logo" 
                  className="cursor-pointer" 
                  onClick={toggleTheme} 
                />
                <img 
                  src={textLogo} 
                  alt="Text Logo" 
                  className="my-4 cursor-pointer"
                  onClick={toggleTheme} 
                />
              </div>
              <LinkSection darkMode={darkMode} />
            </div>

            <OmOsSection darkMode={darkMode} /> {/* Use the new component */}

            <ServicesSection darkMode={darkMode} />

            <div id="contact-section" className="min-h-screen w-full flex flex-col justify-center items-center py-8">
              <img src={darkMode ? kontaktTitleDark : kontaktTitleLight} alt="Kontakt" className="mx-auto mb-4" />
              <img src={darkMode ? bookEnModeDark : bookEnModeLight} alt="Book en møde" className="mx-auto mb-4 spaced-element" />
              <div className="calendar-callme-container w-full">
                <CalendarComponent darkMode={darkMode} setSelectedDate={setSelectedDate} />
                <div className="call-me-form-container"><CallMeForm darkMode={darkMode} /></div>
              </div>
            </div>

            {selectedDate && (
              <div id="time-slot-section" ref={timeSlotRef} className="w-full flex flex-col justify-center items-center py-8">
                <TimeSlot
                  timeSlots={timeSlots}
                  selectedTime={selectedTime}
                  setSelectedTime={setSelectedTime}
                  darkMode={darkMode}
                />
              </div>
            )}

            {selectedTime && (
              <div id="booking-section" ref={bookingRef} className="w-full flex flex-col justify-center items-center py-8">
                <Booking
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  darkMode={darkMode}
                />
              </div>
            )}
            <Footer darkMode={darkMode} toggleTheme={toggleTheme} /> {/* Add Footer component */}
          </div>
        } />
        
        {/* Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Admin Route */}
        <Route path="/admin" element={
          <PrivateRoute>
            <Admin />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
};

export default App;
