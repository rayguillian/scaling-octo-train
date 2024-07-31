import React from 'react';
import { Link } from 'react-scroll';
import omOsDark from '../assets/Om Os.svg';
import omOsLight from '../assets/Om Os (1).svg';
import servicesDark from '../assets/Services.svg';
import servicesLight from '../assets/Services (1).svg';
import kontaktDark from '../assets/Kontakt.svg';
import kontaktLight from '../assets/Kontakt(1).svg';

const LinkSection = ({ darkMode }) => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center w-full p-4 space-y-4 md:space-y-0 md:space-x-20">
      <Link to="om-os-section" smooth={true} duration={500} className="flex justify-center items-center cursor-pointer w-full md:w-auto">
        <img src={darkMode ? omOsDark : omOsLight} alt="Om Os" className="mx-auto md:mr-2" />
      </Link>
      <Link to="services-section" smooth={true} duration={500} className="flex justify-center items-center cursor-pointer w-full md:w-auto">
        <img src={darkMode ? servicesDark : servicesLight} alt="Services" className="mx-auto md:mr-2" />
      </Link>
      <Link to="contact-section" smooth={true} duration={500} className="flex justify-center items-center cursor-pointer w-full md:w-auto">
        <img src={darkMode ? kontaktDark : kontaktLight} alt="Kontakt" className="mx-auto md:mr-2" />
      </Link>
    </div>
  );
};

export default LinkSection;
