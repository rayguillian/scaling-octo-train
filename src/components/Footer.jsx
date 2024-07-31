import React from 'react';
import darkModeLogo from '../assets/darkmodelogo.svg';
import lightModeLogo from '../assets/lightmodelogo.svg';
import adressLight from '../assets/adresslight.svg';
import adressDark from '../assets/adressdark.svg';

const Footer = ({ darkMode, toggleTheme }) => {
  return (
    <footer className={`w-full py-8 ${darkMode ? 'bg-darkBg text-white' : 'bg-lightBg text-black'}`}>
      <div className="flex flex-col items-center">
        <img
          src={darkMode ? darkModeLogo : lightModeLogo}
          alt="Toggle mode"
          className="w-10 h-10 cursor-pointer mb-4"
          onClick={toggleTheme}
        />
        <img
          src={darkMode ? adressDark : adressLight}
          alt="Address"
          className="w-40"
          onClick={toggleTheme}
        />
      </div>
    </footer>
  );
};

export default Footer;
