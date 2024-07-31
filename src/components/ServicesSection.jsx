
import React from 'react';
import servicesTitleDark from '../assets/Servicestitle1.svg';
import servicesTitleLight from '../assets/Servicestitle.svg';
import darkModeCard from '../assets/lightmodecard.svg';
import lightModeCard from '../assets/darkmodecard.svg';
import udviklingDark from '../assets/Udvikling (1).svg';
import udviklingLight from '../assets/Udvikling.svg';
import optimeringDark from '../assets/Optimering (1).svg';
import optimeringLight from '../assets/Optimering.svg';
import marketingDark from '../assets/Marketing (1).svg';
import marketingLight from '../assets/Marketing.svg';

const ServicesSection = ({ darkMode }) => {
  return (
    <div id="services-section" className="min-h-screen w-full px-4 py-8 text-center sm:px-8 md:px-12 lg:px-16">
      <img src={darkMode ? servicesTitleDark : servicesTitleLight} alt="Services Title" className="mx-auto mb-12" />
      <div className="flex flex-wrap justify-center gap-8">
        <div className="relative w-full max-w-xs md:w-1/3">
          <img src={darkMode ? darkModeCard : lightModeCard} alt="Card Background" className="w-full h-auto" />
          <div className="absolute inset-0 flex flex-col items-center justify-start pt-12 px-4">
            <img src={darkMode ? udviklingDark : udviklingLight} alt="Udvikling" className="mb-4" />
            <p className={`leading-7 ${darkMode ? 'text-[#DDDDDD]' : 'text-[#910F29]'} mx-auto text-center`}>
              Vi tilbyder professionelle digitale løsninger, der er skabt med omtanke - både for dig og miljøet
            </p>
          </div>
        </div>
        <div className="relative w-full max-w-xs md:w-1/3">
          <img src={darkMode ? darkModeCard : lightModeCard} alt="Card Background" className="w-full h-auto" />
          <div className="absolute inset-0 flex flex-col items-center justify-start pt-12 px-4">
            <img src={darkMode ? optimeringDark : optimeringLight} alt="Optimering" className="mb-4" />
            <p className={`leading-7 ${darkMode ? 'text-[#DDDDDD]' : 'text-[#910F29]'} mx-auto text-center`}>
              Vi optimerer din nuværende løsning og sørger for, at den møder industriens bæredygtighedsstandard
            </p>
          </div>
        </div>
        <div className="relative w-full max-w-xs md:w-1/3">
          <img src={darkMode ? darkModeCard : lightModeCard} alt="Card Background" className="w-full h-auto" />
          <div className="absolute inset-0 flex flex-col items-center justify-start pt-12 px-4">
            <img src={darkMode ? marketingDark : marketingLight} alt="Marketing" className="mb-4" />
            <p className={`leading-7 ${darkMode ? 'text-[#DDDDDD]' : 'text-[#910F29]'} mx-auto text-center`}>
              Vi tilbyder professionel marketing, der hjælper dig med at nå dine mål på en bæredygtig måde
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
