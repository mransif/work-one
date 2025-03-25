import SplitText from "./SplitText/SplitText";

const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};

import React, { useContext } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { AppContext } from "../context/AppContext";
import Mocktest from "./Mocktest";


const Banner = () => {
  const { token } = useContext(AppContext);


  return (

    <>
            <div className="flex flex-col min-h-screen md:flex-row">
      <div className="bg-[url(/images/mcet-bg.jpg)] bg-cover bg-center md:w-screen md: h-screen pt-25 p-5 sm:h-screen sm:w-screen">
        <div className="m-2 ">
          <SplitText 
            text="MUSALIAR COLLEGE OF ENGINEERING AND TECHNOLOGY"
            className="md:text-5xl md:p-3 font-bold !text-[#6ee7b7] sm: text-xl"
            delay={20}
            animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
            animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
            easing="easeOutCubic"
            threshold={0.2}
            rootMargin="-50px"
            onLetterAnimationComplete={handleAnimationComplete}
          />
          <br/>
          <SplitText 
            text="Musaliar College of Engineering and Technology, located in Pathanamthitta, Kerala, is a prominent institution established in 2002 under the Musaliar Education Trust."
            className="!text-[#BF3131] md:pt-4 md:text-lg sm:pt-3 sm:p-5 text-sm"
            delay={5}
            animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
            animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
            easing="easeOutCubic"
            threshold={0.2}
            rootMargin="-50px"
            onLetterAnimationComplete={handleAnimationComplete}
            
          />
          <br/>
            <SplitText 
            text="The college is approved by AICTE and affiliated with APJ Abdul Kalam Technological University."
            className="!text-[#BF3131] md:pt-4 md:text-lg sm:pt-3 sm:p-5 text-sm"
            delay={5}
            animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
            animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
            easing="easeOutCubic"
            threshold={0.2}
            rootMargin="-50px"
            onLetterAnimationComplete={handleAnimationComplete}
            
          />
          
        </div>
      </div>
    </div>  
      {token &&

        <Mocktest />
      }
    </>
  );
};

export default Banner;
