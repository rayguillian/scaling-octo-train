// src/components/Login.js
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');  // Clear previous error messages
    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = '/admin';
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-lightBg flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-darkBg rounded-lg shadow-lg">
        <h1 className="text-lightText text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full p-2 rounded border border-gray-300 bg-darkBg text-lightText"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full p-2 rounded border border-gray-300 bg-darkBg text-lightText"
          />
          <button
            type="submit"
            className="w-full py-2 rounded bg-lightText text-darkBg font-semibold"
          >
            Login
          </button>
          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
