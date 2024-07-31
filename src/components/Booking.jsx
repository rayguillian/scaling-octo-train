// Booking.js
import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import lightModeTitle from '../assets/Hvordan kan vi hjælpe dig.svg';
import darkModeTitle from '../assets/Hvordan kan vi hjælpe dig dark.svg';
import navn from '../assets/navn.svg';
import email from '../assets/email.svg';
import telefon from '../assets/telefon.svg';
import projektbeskrivelse from '../assets/projektbeskrivelse.svg';
import indsendButton from '../assets/indsendbutton.svg';
import indsendText from '../assets/indsend.svg';
import takLightMode from '../assets/taklightmode.svg';
import takDarkMode from '../assets/takdarkmode.svg';
import './CalendarComponent.css';

const Booking = ({ selectedDate, selectedTime, darkMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    description: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [highlightEmptyFields, setHighlightEmptyFields] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, description } = formData;

    if (!name || !email || !phone || !description) {
      setHighlightEmptyFields(true);
      return;
    }

    try {
      const bookingData = {
        ...formData,
        date: selectedDate.toDateString(),
        time: selectedTime,
        status: 'Pending'
      };
      await addDoc(collection(db, 'bookings'), bookingData);
      setIsSubmitted(true);
    } catch (error) {
      setError('Error adding document: ' + error.message);
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div className={`booking-container ${darkMode ? 'bg-darkBg' : 'bg-lightBg'}`}>
      <img src={darkMode ? darkModeTitle : lightModeTitle} alt="Hvordan kan vi hjælpe dig?" className="title-svg" />
      <form className="booking-form" onSubmit={handleSubmit}>
        <div className={`form-group ${highlightEmptyFields && !formData.name ? 'highlight' : ''}`}>
          <img src={navn} alt="Navn" className={`form-label ${formData.name ? 'hidden' : ''}`} />
          <input 
            type="text" 
            name="name"
            className="form-input" 
            value={formData.name}
            onFocus={(e) => e.target.previousElementSibling.classList.add('hidden')}
            onBlur={(e) => !e.target.value && e.target.previousElementSibling.classList.remove('hidden')}
            onChange={handleChange}
          />
        </div>
        <div className={`form-group ${highlightEmptyFields && !formData.email ? 'highlight' : ''}`}>
          <img src={email} alt="Email" className={`form-label ${formData.email ? 'hidden' : ''}`} />
          <input 
            type="email" 
            name="email"
            className="form-input" 
            value={formData.email}
            onFocus={(e) => e.target.previousElementSibling.classList.add('hidden')}
            onBlur={(e) => !e.target.value && e.target.previousElementSibling.classList.remove('hidden')}
            onChange={handleChange}
          />
        </div>
        <div className={`form-group ${highlightEmptyFields && !formData.phone ? 'highlight' : ''}`}>
          <img src={telefon} alt="Telefon" className={`form-label ${formData.phone ? 'hidden' : ''}`} />
          <input 
            type="tel" 
            name="phone"
            className="form-input" 
            value={formData.phone}
            onFocus={(e) => e.target.previousElementSibling.classList.add('hidden')}
            onBlur={(e) => !e.target.value && e.target.previousElementSibling.classList.remove('hidden')}
            onChange={handleChange}
          />
        </div>
        <div className={`form-group ${highlightEmptyFields && !formData.description ? 'highlight' : ''}`}>
          <img src={projektbeskrivelse} alt="Projektbeskrivelse" className={`form-label ${formData.description ? 'hidden' : ''}`} />
          <textarea 
            name="description"
            className="form-input" 
            value={formData.description}
            onFocus={(e) => e.target.previousElementSibling.classList.add('hidden')}
            onBlur={(e) => !e.target.value && e.target.previousElementSibling.classList.remove('hidden')}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="button-container">
          <button type="submit" className="submit-button">
            <img src={indsendButton} alt="Indsend Button" className="button-background" />
            <img src={indsendText} alt="Indsend Text" className="button-text" />
          </button>
        </div>
      </form>
      {error && <p className="error-message">{error}</p>}
      {isSubmitted && (
        <div className="thank-you-message">
          <img src={darkMode ? takDarkMode : takLightMode} alt="Thank you message" />
        </div>
      )}
    </div>
  );
};

export default Booking;
