import React, { useState } from 'react';
import { db } from '../firebase'; // Make sure your Firebase is correctly initialized
import { collection, addDoc } from 'firebase/firestore';
import bliveringedeopdark from '../assets/bliveringedeopdark.svg';
import bliveringedeoplight from '../assets/bliveringedeoplight.svg';

const CallMeForm = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'callMeRequests'), {
        ...formData,
        timestamp: new Date()
      });
      setMessage('Din forespørgsel er blevet sendt!');
      setFormData({ name: '', email: '', phone: '' });
    } catch (error) {
      console.error('Error adding document: ', error);
      setMessage('Der opstod en fejl. Prøv igen.');
    }
  };

  return (
    <div className={`w-full max-w-xs mx-auto p-4 rounded-lg ${darkMode ? 'bg-darkBg text-darkText' : 'bg-lightBg text-lightText'}`}>
      <div className="flex justify-center mb-4">
        <img src={darkMode ? bliveringedeopdark : bliveringedeoplight} alt="Bliv ringede op!" />
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative transform translate-x-4">
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            placeholder="navn" 
            className={`p-2 rounded border w-full ${darkMode ? 'bg-darkBg text-darkText border-darkText placeholder-darkText' : 'bg-lightBg text-red-600 border-lightText placeholder-[#910F29]'} focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-opacity-50 lowercase`}
          />
        </div>
        <div className="relative transform translate-x-4">
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            placeholder="email" 
            className={`p-2 rounded border w-full ${darkMode ? 'bg-darkBg text-darkText border-darkText placeholder-darkText' : 'bg-lightBg text-red-600 border-lightText placeholder-[#910F29]'} focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-opacity-50 lowercase`}
          />
        </div>
        <div className="relative transform translate-x-4">
          <input 
            type="text" 
            id="phone" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
            placeholder="telefon" 
            className={`p-2 rounded border w-full ${darkMode ? 'bg-darkBg text-darkText border-darkText placeholder-darkText' : 'bg-lightBg text-red-600 border-lightText placeholder-[#910F29]'} focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-opacity-50 lowercase`}
          />
        </div>
        <div className="relative transform translate-x-4">
          <button type="submit" className={`w-full py-2 rounded ${darkMode ? 'bg-darkBg text-darkText border-darkText' : 'bg-lightBg text-[#910F29] border-lightText'} border focus:outline-none`}>
            Indsend
          </button>
        </div>
      </form>
      {message && <p className="mt-4 text-center opacity-75">{message}</p>}
    </div>
  );
};

export default CallMeForm;
