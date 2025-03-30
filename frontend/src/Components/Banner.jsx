import React, { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SplitText from "./SplitText/SplitText";
import { AppContext } from "../context/AppContext";
import Mocktest from "./Mocktest";
import Contact from "./Contact";
import StyledButton from "./StyledButton";

const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};



const Banner = () => {
  const { token } = useContext(AppContext);
  const navigate = useNavigate();
  const mockTestRef = useRef(null);  

  useEffect(() => {
    if (!token) {
      navigate("/auth");
    }
  }, [token, navigate]);

  const scrollToMocktest = () => {
    if (mockTestRef.current) {
      mockTestRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const textContent = [
    {
      text: "MUSALIAR COLLEGE OF ENGINEERING AND TECHNOLOGY",
      className: "text-3xl md:text-5xl font-bold !text-[#F4F8D3] text-center font-serif",
      delay: 20,
    },
  ];

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-cover bg-center p-5 sm:p-10 md:p-16" style={{ backgroundImage: "url(/images/mcet-bg.jpg)" }}>
      {/* Left side - your existing content */}
      <div className=" w-full h-[75vh] text-center bg-[#ffffff3b] p-6 rounded-lg md:mr-8 mb-8 md:mb-0 backdrop-blur-md flex flex-col items-center justify-center">
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
        <p className="text-zinc-200 mb-3">Musaliar College of Engineering and Technology is a NAAC (National Assessment and Accreditation Council). Accredited Engineering & Management Institution under the renowned Musaliar Education Trust.</p>
        <StyledButton
          text="Attend Mock Test"
          onClick={scrollToMocktest}  
        />
      </div>
      
      {/* Right side - new animated component */}
      <div className="max-w-md w-full flex justify-center items-center">
        
      </div>
    </div>

      {
        token && (
          <div ref={mockTestRef}> 
            <Mocktest />
          </div>
        )
      }

      <Contact />
    </>
  );
};

export default Banner;
