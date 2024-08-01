// components/OmOsSection.jsx
import React from 'react';
import omOsTitleLight from '../assets/Om Ostitle1.svg';
import omOsTitleDark from '../assets/Om Ostitle.svg';
import p1Hvid from '../assets/p1 hvid.svg';
import p2Rød from '../assets/p2 rød.svg';
import p2Hvid from '../assets/p2 hvid.svg';
import p1Rød from '../assets/p1 rød.svg';
import Lottie from 'lottie-react';
import animationSukaza from '../assets/animationSukaza.json';

const OmOsSection = ({ darkMode }) => {
  return (
    <div id="om-os-section" className="flex flex-col justify-center items-center min-h-screen w-full px-4 py-8 text-center sm:px-8 md:px-12 lg:px-16 relative">
      <img src={darkMode ? omOsTitleLight : omOsTitleDark} alt="Om Os Title" className="om-os-title mx-auto mb-8" />
      <img src={darkMode ? p1Hvid : p1Rød} alt="p1" className="mx-auto mb-4 w-4/5 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg relative z-10" />
      
      {/* Lottie Animation */}
      <div className="w-full flex justify-center mt-[-50px] relative z-0">
        <Lottie
          animationData={animationSukaza}
          loop={true}
          style={{ height: '300px', width: '300px' }}
        />
      </div>

      <img src={darkMode ? p2Hvid : p2Rød} alt="p2" className="mx-auto mt-[-50px] w-4/5 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg relative z-10" />

      {/* "Lære Mere" Button */}
      <div className="mt-8">
        <a
          href="https://www.sustainablewebmanifesto.com/"
          target="_blank"
          rel="noopener noreferrer"
          className={`py-2 px-4 rounded border-2 ${darkMode ? 'border-darkText text-darkText' : 'border-[#910F29] text-[#910F29]'} focus:outline-none`}
        >
          Lære Mere
        </a>
      </div>
    </div>
  );
};

export default OmOsSection;
