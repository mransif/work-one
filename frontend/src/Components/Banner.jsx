import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Contact from "./Contact";
import StyledButton from "./StyledButton";
import { IoClose } from "react-icons/io5";
import Mocktest from "./Mocktest";
import MainTest from "./MainTest";

const Banner = () => {
  const { token } = useContext(AppContext);
  const navigate = useNavigate();
  const mockTestRef = useRef(null);
  const [animationStage, setAnimationStage] = useState(0);
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [showTipsModal, setShowTipsModal] = useState(false);

  useEffect(() => {
    // Start animation sequence
    setAnimationStage(1);

    const timer2 = setTimeout(() => setAnimationStage(2), 800);
    const timer3 = setTimeout(() => setAnimationStage(3), 1600);
    const timer4 = setTimeout(() => setAnimationStage(4), 2200);

    return () => {
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  const handleMockTestClick = () => {
    if (token) {
      // If user is logged in, scroll to mock test section
      if (mockTestRef.current) {
        mockTestRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // If user is not logged in, redirect to auth page
      navigate("/auth");
    }
  };

  // Close modal if user clicks outside
  const handleCloseModal = (e, setter) => {
    if (e.target === e.currentTarget) {
      setter(false);
    }
  };

  return (
    <>
      <div
        name="home"
        className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-cover bg-center p-3 sm:p-6 md:p-10"
        style={{ backgroundImage: "url(/images/mcet-bg.webp)" }}
      >
        {/* Main content container - improved padding for small devices */}
        <div className="w-full md:w-1/2 min-h-[50vh] md:h-[75vh] pointer-events-none text-center p-4 sm:p-6 rounded-lg md:mr-4 mb-6 md:mb-0 flex flex-col items-center justify-center md:backdrop-blur-none md:bg-[#fff0]">
          <div className="relative my-4 sm:my-6 px-2">
            {/* Institution Code - with only MCK highlighted */}
            {/* <h3 className="text-lg sm:text-xl md:text-2xl font-serif mb-3 sm:mb-4">
              <span
                className="inline-block font-sans transition-all text-xl duration-500 text-[#003631]"
                style={{
                  transform:
                    animationStage >= 2
                      ? "translateY(0)"
                      : "translateY(-100px)",
                  opacity: animationStage >= 2 ? 1 : 0,
                }}
              >
                INSTITUTION CODE -{" "}
                <span className="font-bold text-2xl text-[#003631] px-2 py-1 rounded">
                  MCK
                </span>
              </span>
            </h3> */}

            {/* First line - optimized for small screens */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#003631] font-serif relative overflow-hidden leading-tight">
              <span className="inline-block relative">
                {["K", "E", "A", "M"].map((letter, index) => (
                  <span
                    key={index}
                    className="inline-block transition-all duration-700"
                    style={{
                      transform:
                        animationStage >= 1
                          ? "translateY(0)"
                          : "translateY(-100px)",
                      opacity: animationStage >= 1 ? 1 : 0,
                      transitionDelay: `${index * 60}ms`,
                    }}
                  >
                    {letter}
                  </span>
                ))}
                <span className="inline-block mx-1 sm:mx-2"></span>
                {[
                  "E",
                  "N",
                  "T",
                  "R",
                  "A",
                  "N",
                  "C",
                  "E",
                  " ",
                  "E",
                  "X",
                  "A",
                  "M",
                ].map((letter, index) => (
                  <span
                    key={index}
                    className="inline-block transition-all duration-700"
                    style={{
                      transform:
                        animationStage >= 1
                          ? "translateY(0)"
                          : "translateY(-100px)",
                      opacity: animationStage >= 1 ? 1 : 0,
                      transitionDelay: `${(index + 8) * 60}ms`,
                    }}
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </span>
                ))}
              </span>
            </h1>

            {/* Second line - smaller font on mobile */}
            <h2 className="text-sm sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#003631] font-serif mt-2 sm:mt-3">
              <span
                className="inline-block transition-all duration-700 leading-tight"
                style={{
                  transform:
                    animationStage >= 2
                      ? "translateX(0)"
                      : "translateX(-100px)",
                  opacity: animationStage >= 2 ? 1 : 0,
                }}
              >
                Gear up for success with KEAM! <br /> Master the exam with
                precision and secure a bright future—invest in your potential
                today.
              </span>
            </h2>

            {/* Animated underline - responsive width */}
            <div
              className="h-1 bg-[#003631] mx-auto mt-3 sm:mt-4 transition-all duration-1000"
              style={{
                width: animationStage >= 3 ? "80%" : "0%",
              }}
            ></div>
          </div>

          {/* Description text - improved readability on small screens */}
          <p
            className="text-[#003631] z-10 mb-3 sm:mb-6 transition-all duration-700 max-w-lg text-sm sm:text-base px-1 sm:px-4"
            style={{
              opacity: animationStage >= 3 ? 1 : 0,
              transform: animationStage >= 3 ? "scale(1)" : "scale(0.9)",
            }}
          >
            Big news for KEAM 2025! 🚨 The exam regulations have been updated,
            bringing some key changes you need to know. Stay ahead of the
            game—check the <span>Rules and Regulations</span> tab for all the details and make
            sure you're fully prepared! ✅
          </p>

          {/* Button and Anchors container */}
          <div
            className="transition-all duration-500 flex pointer-events-auto flex-col sm:flex-row items-center gap-4 sm:gap-6"
            style={{
              opacity: animationStage >= 3 ? 1 : 0,
              transform:
                animationStage >= 3 ? "translateY(0)" : "translateY(20px)",
            }}
          >
            <StyledButton text="Attend Mock Test" onClick={handleMockTestClick} />

            {/* Animated anchor for Rules & Regulations */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setShowRulesModal(true);
              }}
              className="text-[#003631] hover:text-[#00665f] font-semibold text-sm sm:text-base transition-all duration-300 relative group"
              style={{
                opacity: animationStage >= 4 ? 1 : 0,
                transform:
                  animationStage >= 4 ? "translateY(0)" : "translateY(20px)",
                animationDelay: "200ms",
              }}
            >
              Rules & Regulations
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#003631] transition-all duration-300 group-hover:w-full"></span>
            </a>

            {/* Animated anchor for Tips & Tricks */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setShowTipsModal(true);
              }}
              className="text-[#003631] hover:text-[#00665f] font-semibold text-sm sm:text-base transition-all duration-300 relative group"
              style={{
                opacity: animationStage >= 4 ? 1 : 0,
                transform:
                  animationStage >= 4 ? "translateY(0)" : "translateY(20px)",
                animationDelay: "400ms",
              }}
            >
              Tips & Tricks
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#003631] transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>
        </div>

        {/* Right side - maintained for layout consistency */}
        <div className="max-w-md w-full flex justify-center items-center"></div>
      </div>

      {/* Rules & Regulations Modal */}
      {showRulesModal && (
        <div
          className="fixed inset-0 bg-[#08080844] backdrop-blur-lg bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={(e) => handleCloseModal(e, setShowRulesModal)}
        >
          <div
            className="bg-[#FFEDD5] overflow-auto scrollbar-custom rounded-lg p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto animate-modalFadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-[#003631]">
                KEAM Examination: Rules & Regulations
              </h2>
              <button
                onClick={() => setShowRulesModal(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                <IoClose />
              </button>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#003631]">
                Examination Pattern
              </h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Engineering Courses (B.Tech): The exam consists of 150
                  questions: 75 in Mathematics, 45 in Physics, and 30 in
                  Chemistry, to be completed in 180 minutes. ​
                </li>
                <li>
                  Each correct answer awards +4 marks; each incorrect answer
                  results in a -1 mark.{" "}
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-[#003631]">
                Examination Day Guidelines
              </h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Carry your valid Admit Card and a government-issued photo ID
                </li>
                <li>
                  Reach the examination center at least 30 minutes before the
                  exam
                </li>
                <li>
                  Electronic devices including calculators, mobile phones, and
                  smartwatches are strictly prohibited
                </li>
                <li>
                  Only black/blue ballpoint pen is allowed for marking answers
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-[#003631]">
                Eligibility Criteria
              </h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Candidates must have passed or be appearing for the 12th
                  standard examination
                </li>
                <li>
                  Minimum of 50% marks in Physics, Chemistry, and Mathematics
                  combined
                </li>
                <li>
                  Age: Candidates must be at least 17 years old as of December
                  31st of the admission year
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-[#003631]">
                Important Notes
              </h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Any form of malpractice will lead to disqualification</li>
                <li>
                  The decision of the Commissioner for Entrance Examinations
                  regarding the eligibility of candidates is final
                </li>
                <li>
                  Candidates are advised to regularly check the official CEE
                  Kerala website for updates
                </li>
              </ul>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowRulesModal(false)}
                className="px-4 py-2 bg-[#003631] text-white rounded hover:bg-[#00665f] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tips & Tricks Modal */}
      {showTipsModal && (
        <div
          className="fixed inset-0  bg-[#08080844] backdrop-blur-lg z-50 flex items-center justify-center p-4"
          onClick={(e) => handleCloseModal(e, setShowTipsModal)}
        >
          <div
            className="bg-[#FFEDD5] overflow-auto scrollbar-custom rounded-lg p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto animate-modalFadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-[#003631]">
                KEAM Success: Tips & Tricks
              </h2>
              <button
                onClick={() => setShowTipsModal(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                <IoClose />
              </button>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#003631]">
                Study Strategies
              </h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Create a structured study plan with dedicated time for each
                  subject
                </li>
                <li>
                  Focus on NCERT textbooks as they cover most of the syllabus
                </li>
                <li>
                  Make concise notes of important formulas, reactions, and
                  theorems
                </li>
                <li>
                  Practice with previous years' question papers to understand
                  the exam pattern
                </li>
                <li>
                  Join study groups for collaborative learning and
                  problem-solving
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-[#003631]">
                Exam Day Tactics
              </h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Attempt questions you're confident about first to build
                  momentum
                </li>
                <li>
                  Allocate your time wisely - aim to answer all questions within
                  the given time
                </li>
                <li>
                  For difficult questions, eliminate obviously wrong choices to
                  improve guessing odds
                </li>
                <li>
                  Skip questions you're unsure about and return to them later if
                  time permits
                </li>
                <li>
                  Don't spend too much time on a single question - move on if
                  stuck
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-[#003631]">
                Subject-Specific Tips
              </h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Mathematics:</strong> Practice is key. Focus on
                  Calculus, Coordinate Geometry, and Algebra
                </li>
                <li>
                  <strong>Physics:</strong> Understand concepts thoroughly and
                  memorize important formulas
                </li>
                <li>
                  <strong>Chemistry:</strong> Focus on Organic Chemistry
                  reactions and Inorganic Chemistry facts
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-[#003631]">
                Health & Wellbeing
              </h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Get adequate sleep, especially in the week leading up to the
                  exam
                </li>
                <li>Maintain a balanced diet and stay hydrated</li>
                <li>
                  Take short breaks during study sessions to maintain mental
                  freshness
                </li>
                <li>Practice relaxation techniques to manage exam anxiety</li>
                <li>Stay positive and believe in your preparation</li>
              </ul>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowTipsModal(false)}
                className="px-4 py-2 bg-[#003631] text-white rounded hover:bg-[#00665f] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Only render the mock test section if user is logged in */}
      {token && (
        <div ref={mockTestRef} name="mocktest">
          <Mocktest />

        </div>
      )}

      {/* Only render the main test section if user is logged in */}
      {token && (
        <div name="maintest">
          <MainTest />
        </div>
      )}

      <div name="contact">
        <Contact />
      </div>

      {/* Add animation keyframes to your CSS or in a style tag */}
      <style jsx>{`
        @keyframes modalFadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-modalFadeIn {
          animation: modalFadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default Banner;
