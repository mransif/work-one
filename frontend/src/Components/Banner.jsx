import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SplitText from "./SplitText/SplitText";
import { AppContext } from "../context/AppContext";
import Mocktest from "./Mocktest";

const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};

const Banner = () => {
  const { token } = useContext(AppContext);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!token) {
  //     navigate("/auth");
  //   }
  // }, [token, navigate]);

  const textContent = [
    {
      text: "MUSALIAR COLLEGE OF ENGINEERING AND TECHNOLOGY",
      className: "text-3xl md:text-6xl font-bold !text-[#F4F8D3] text-center font-serif",
      delay: 20,
    },
    {
      text: "Musaliar College of Engineering and Technology, located in Pathanamthitta. Is a prominent institution established in 2002 under the Musaliar Education Trust.",
      className: "!text-[#73C7C7] font-bold md:text-2xl text-base text-center font-serif",
      delay: 5,
    },
    {
      text: "The college is approved by AICTE and affiliated with APJ Abdul Kalam Technological University.",
      className: "!text-[#73C7C7] font-bold md:text-2xl text-base text-center font-serif",
      delay: 5,
    },
  ];

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center p-5 sm:p-10 md:flex-row md:p-16" style={{ backgroundImage: "url(/images/mcet-bg.jpg)" }}>
        <div className="max-w-4xl w-full text-center">
          {textContent.map((item, index) => (
            <div key={index} className={item.className + " my-3"}>
              <SplitText
                text={item.text}
                delay={item.delay}
                animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                easing="easeOutCubic"
                threshold={0.2}
                rootMargin="-50px"
                onLetterAnimationComplete={handleAnimationComplete}
              />
            </div>
          ))}
        </div>
      </div>
      {
      // token && 
      
      <Mocktest />}
    </>
  );
};

export default Banner;
