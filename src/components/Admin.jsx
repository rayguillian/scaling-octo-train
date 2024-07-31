// Admin.js
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, updateDoc, doc, deleteDoc, onSnapshot } from 'firebase/firestore';
import CalendarComponent from './CalendarComponent';
import TimeSlot from './TimeSlot';
import darkModeLogo from '../assets/darkmodelogo.svg';
import lightModeLogo from '../assets/lightmodelogo.svg';

const Admin = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const timeSlots = [
    '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', 
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', 
    '16:00'
  ];

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'bookings'), (snapshot) => {
      setBookings(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }, (err) => {
      setError('Failed to fetch bookings');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleStatusChange = async (id, status) => {
    if (!window.confirm(`Are you sure you want to ${status.toLowerCase()} this booking?`)) {
      return;
    }

    try {
      const bookingRef = doc(db, 'bookings', id);
      if (status === 'Rejected') {
        await deleteDoc(bookingRef);
      } else {
        await updateDoc(bookingRef, { status });
      }
    } catch (error) {
      setError('Error updating booking status');
      console.error('Error updating document: ', error);
    }
  };

  const handleMarkUnavailable = async () => {
    if (!selectedDate || !selectedTime) return;

    try {
      const bookingData = {
        date: selectedDate.toDateString(),
        time: selectedTime,
        status: 'Unavailable'
      };
      await updateDoc(doc(db, 'bookings', `${selectedDate.toDateString()}-${selectedTime}`), bookingData);
    } catch (error) {
      setError('Error marking time slot as unavailable');
      console.error('Error marking time slot as unavailable: ', error);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-darkBg text-darkText' : 'bg-lightBg text-lightText'} p-8`}>
      <div className="max-w-3xl mx-auto p-6 rounded-lg shadow-lg bg-lightBg dark:bg-darkBg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <img
            src={darkMode ? lightModeLogo : darkModeLogo}
            alt="Toggle mode"
            className="w-10 h-10 cursor-pointer"
            onClick={toggleDarkMode}
          />
        </div>
        <CalendarComponent darkMode={darkMode} setSelectedDate={setSelectedDate} />
        {selectedDate && (
          <TimeSlot
            timeSlots={timeSlots}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            darkMode={darkMode}
            selectedDate={selectedDate}
          />
        )}
        {selectedDate && selectedTime && (
          <div className="mt-4">
            <button
              onClick={handleMarkUnavailable}
              className={`py-2 px-4 rounded ${darkMode ? 'bg-darkBg text-darkText border-darkText' : 'bg-lightBg text-[#910F29] border-lightText'} border focus:outline-none`}
            >
              Mark Unavailable
            </button>
          </div>
        )}
        {loading ? (
          <div className="mt-8 text-center">Loading...</div>
        ) : error ? (
          <div className="mt-8 text-center text-red-500">{error}</div>
        ) : (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Bookings</h2>
            <ul className="space-y-4">
              {bookings.map(booking => (
                <li key={booking.id} className={`p-4 rounded-lg shadow-md ${darkMode ? 'bg-[#333333]' : 'bg-[#eeeeee]'}`}>
                  <p className="mb-2">
                    <span className="font-bold">Name:</span> {booking.name}
                  </p>
                  <p className="mb-2">
                    <span className="font-bold">Email:</span> {booking.email}
                  </p>
                  <p className="mb-2">
                    <span className="font-bold">Phone:</span> {booking.phone}
                  </p>
                  <p className="mb-2">
                    <span className="font-bold">Description:</span> {booking.description}
                  </p>
                  <p className="mb-2">
                    <span className="font-bold">Date:</span> {booking.date}
                  </p>
                  <p className="mb-2">
                    <span className="font-bold">Time:</span> {booking.time}
                  </p>
                  <p className="mb-2">
                    <span className="font-bold">Status:</span> {booking.status}
                  </p>
                  <div className="mt-2 flex space-x-4">
                    <button
                      onClick={() => handleStatusChange(booking.id, 'Accepted')}
                      className={`py-1 px-3 rounded ${darkMode ? 'bg-darkBg text-darkText border-darkText' : 'bg-lightBg text-[#910F29] border-lightText'} border focus:outline-none`}
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleStatusChange(booking.id, 'Rejected')}
                      className={`py-1 px-3 rounded ${darkMode ? 'bg-darkBg text-darkText border-darkText' : 'bg-lightBg text-[#910F29] border-lightText'} border focus:outline-none`}
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleStatusChange(booking.id, 'Rescheduled')}
                      className={`py-1 px-3 rounded ${darkMode ? 'bg-darkBg text-darkText border-darkText' : 'bg-lightBg text-[#910F29] border-lightText'} border focus:outline-none`}
                    >
                      Reschedule
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
