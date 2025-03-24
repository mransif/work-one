import React from 'react';

const Banner = () => {
  return (
    <div className='flex flex-col min-h-screen md:flex-row'>
      {/* Left Section - Heading & Text */}
      <div className='md:w-[50vw] md:h-screen bg-blue-50 pt-25 p-5 sm:h-[50vh] sm:w-screen'>
        <h1 className='md:text-4xl font-bold text-gray-900 sm:text-lg'>
          MUSALIAR COLLEGE OF ENGINEERING AND TECHNOLOGY
        </h1>
        <p className='md:pt-3 md:text-lg sm:pt-3 sm:p-5 text-sm'>
          Musaliar College of Engineering and Technology, located in Pathanamthitta, Kerala, is a prominent institution established in 2002 under the Musaliar Education Trust. The college is approved by AICTE and affiliated with APJ Abdul Kalam Technological University.
        </p>
      </div>

      {/* Right Section - Image (Fixed Remaining Height in Small Screens) */}
      <div className='md:w-[50vw] md:h-screen sm:flex-1'>
        <img 
          src='/images/bg-img.jpg' 
          className='w-full h-full object-cover'
        />
      </div>
    </div>
  );
};

export default Banner;
