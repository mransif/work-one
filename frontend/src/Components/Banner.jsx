import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Mocktest from "./Mocktest";
import Contact from "./Contact";
import StyledButton from "./StyledButton";
import MainTest from "./MainTest";

const Banner = () => {
  const { token } = useContext(AppContext);
  const navigate = useNavigate();
  const mockTestRef = useRef(null);
  const [animationStage, setAnimationStage] = useState(0);

  useEffect(() => {
    if (!token) {
      navigate("/auth");
    }
  }, [token, navigate]);

  useEffect(() => {
    // Start animation sequence
    setAnimationStage(1);
    
    const timer2 = setTimeout(() => setAnimationStage(2), 800);
    const timer3 = setTimeout(() => setAnimationStage(3), 1600);
    
    return () => {
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const scrollToMocktest = () => {
    if (mockTestRef.current) {
      mockTestRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div 
        name="home" 
        className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-cover bg-center p-3 sm:p-6 md:p-10" 
        style={{ backgroundImage: "url(/images/mcet-bg.jpg)" }}
      >
        {/* Main content container - improved padding for small devices */}
        <div className="w-full md:w-1/2 min-h-[50vh] md:h-[75vh] text-center p-4 sm:p-6 rounded-lg md:mr-4 mb-6 md:mb-0  flex flex-col items-center justify-center md:backdrop-blur-none md:bg-[#fff0]">
          <div className="relative my-4 sm:my-6 px-2">
            {/* First line - optimized for small screens */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#003631] font-serif relative overflow-hidden leading-tight">
              <span className="inline-block relative">
                {["M", "U", "S", "A", "L", "I", "A", "R"].map((letter, index) => (
                  <span 
                    key={index}
                    className="inline-block transition-all duration-700"
                    style={{
                      transform: animationStage >= 1 ? 'translateY(0)' : 'translateY(-100px)',
                      opacity: animationStage >= 1 ? 1 : 0,
                      transitionDelay: `${index * 60}ms`,
                    }}
                  >
                    {letter}
                  </span>
                ))}
                <span className="inline-block mx-1 sm:mx-2"></span>
                {["C", "O", "L", "L", "E", "G", "E"].map((letter, index) => (
                  <span 
                    key={index}
                    className="inline-block transition-all duration-700"
                    style={{
                      transform: animationStage >= 1 ? 'translateY(0)' : 'translateY(-100px)',
                      opacity: animationStage >= 1 ? 1 : 0,
                      transitionDelay: `${(index + 8) * 60}ms`,
                    }}
                  >
                    {letter}
                  </span>
                ))}
              </span>
            </h1>
            
            {/* Second line - smaller font on mobile */}
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#003631] font-serif mt-2 sm:mt-3">
              <span 
                className="inline-block transition-all duration-700 leading-tight"
                style={{
                  transform: animationStage >= 2 ? 'translateX(0)' : 'translateX(-100px)',
                  opacity: animationStage >= 2 ? 1 : 0,
                }}
              >
                OF ENGINEERING AND TECHNOLOGY
              </span>
            </h2>
            
            {/* Animated underline - responsive width */}
            <div 
              className="h-1 bg-[#003631] mx-auto mt-3 sm:mt-4 transition-all duration-1000"
              style={{
                width: animationStage >= 3 ? '80%' : '0%',
              }}
            ></div>
          </div>
          
          {/* Description text - improved readability on small screens */}
          <p 
            className="text-[#003631] z-10 mb-5 sm:mb-6 transition-all duration-700 max-w-lg text-sm sm:text-base px-2 sm:px-4"
            style={{
              opacity: animationStage >= 3 ? 1 : 0,
              transform: animationStage >= 3 ? 'scale(1)' : 'scale(0.9)',
            }}
          >
            Musaliar College of Engineering and Technology is a NAAC (National Assessment and Accreditation Council). Accredited Engineering & Management Institution under the renowned Musaliar Education Trust.
          </p>
          
          {/* Button container */}
          <div 
            className="transition-all duration-500"
            style={{
              opacity: animationStage >= 3 ? 1 : 0,
              transform: animationStage >= 3 ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            <StyledButton
              text="Attend Mock Test"
              onClick={scrollToMocktest}
            />
          </div>
        </div>

        {/* Right side - maintained for layout consistency */}
        <div className="max-w-md w-full flex justify-center items-center">
        </div>
      </div>

      {token && (
        <div ref={mockTestRef} name="mocktest">
          <Mocktest />
          <MainTest />
        </div>
      )}
      
      <div name="contact">
        <Contact />
      </div>
    </>
  );
};

export default Banner;