import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Contact from "./Contact";
import StyledButton from "./StyledButton";
import { IoClose } from "react-icons/io5";
import Mocktest from "./Mocktest";
import MainTest from "./MainTest";
import BlobCursor from "./BlobCursor/BlobCursor";
import LbsTest from "./LbsTest";
import Kmat24 from "./Kmat24";
import Kmat25 from "./Kmat25";


const Banner = () => {
  const { token } = useContext(AppContext);
  const navigate = useNavigate();
  const mockTestRef = useRef(null);
  const lbsTestRef = useRef(null);
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
      if (lbsTestRef.current) {
        lbsTestRef.current.scrollIntoView({ behavior: "smooth" });
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

  const openRulesModal = (e) => {
    e.preventDefault();
    setShowRulesModal(true);
  };

  return (
    <>
      <div
        name="home"
        className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-cover bg-center p-2 sm:p-4 md:p-8 lg:p-10"
        style={{ backgroundImage: "url(/images/mcet-bg.webp)" }}
      >
        <BlobCursor />
        {/* Main content container - adjusted for better small screen experience */}
        <div className="w-full lg:w-2/3 xl:w-1/2 min-h-[60vh] md:min-h-[50vh] lg:h-[75vh] pointer-events-none text-center p-3 sm:p-5 md:p-6 rounded-lg mb-4 md:mb-0 flex flex-col items-center justify-center  md:bg-transparent">
          <div className="relative my-2 sm:my-4 md:my-6 px-1 sm:px-2">
            {/* First line - optimized for all screen sizes */}
            <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#003631] font-serif relative overflow-hidden leading-tight">
              <span className="inline-block relative">
                {["K", "E", "A", "M & L", "B", "S"].map((letter, index) => (
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
                  "X",
                  "C",
                  "E",
                  "L",
                  "L",
                  "E",
                  "N",
                  "C",
                  "E",
                  " ",
                  "P",
                  "A",
                  "T",
                  "H",
                ].map((letter, index) => (
                  <span
                    key={index}
                    className=" w-autoinline-block transition-all duration-700"
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

            {/* Second line - better scaling across device sizes */}
            <h2 className="text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl font-bold text-[#003631] font-serif mt-1 sm:mt-2 md:mt-3">
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
                Unlock Your Dreams
                <br className="md:hidden" />
                <span className="hidden md:inline"> — </span>
                <span className="text-[#005249] italic">Where Aspirations Transform into Achievements</span>
              </span>
            </h2>

            {/* Animated underline - responsive width */}
            <div
              className="h-0.5 sm:h-1 bg-[#003631] mx-auto mt-2 sm:mt-3 md:mt-4 transition-all duration-1000"
              style={{
                width: animationStage >= 3 ? "80%" : "0%",
              }}
            ></div>
          </div>

          {/* Description text - improved readability across all screen sizes */}
          <p
            className="text-[#003631] z-10 mb-2 sm:mb-4 md:mb-6 transition-all duration-700 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg text-xs sm:text-sm md:text-base px-1 sm:px-2 md:px-4"
            style={{
              opacity: animationStage >= 3 ? 1 : 0,
              transform: animationStage >= 3 ? "scale(1)" : "scale(0.9)",
            }}
          >
            <span className="font-bold">📢 LBS 2025 Exam Date Announced! 📢</span> The official schedule for the LBS Entrance Exam has been released — now’s the time to focus your preparation!
            <span className="font-semibold italic hidden sm:inline"> Don’t wait until the last minute — </span>
            check the <span
              className="underline font-semibold cursor-pointer pointer-events-auto"
              onClick={openRulesModal}
            >Rules and Guidelines</span> section
            for important syllabus details help you stay ahead.
          </p>

          {/* Button and Anchors container - optimized for mobile and desktop */}
          <div
            className="transition-all duration-500 flex pointer-events-auto flex-col xs:flex-row items-center gap-2 xs:gap-3 sm:gap-4 md:gap-6 flex-wrap justify-center"
            style={{
              opacity: animationStage >= 3 ? 1 : 0,
              transform:
                animationStage >= 3 ? "translateY(0)" : "translateY(20px)",
            }}
          >
            <StyledButton text="Challenge Yourself: Mock Test" onClick={handleMockTestClick} />

            <div className="flex gap-2 sm:gap-4 mt-2 xs:mt-0">
              {/* Animated anchor for Rules & Regulations */}
              <a

                href="#"
                onClick={openRulesModal}
                className="text-[#003631] hover:text-[#00665f] font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 relative group whitespace-nowrap"
                style={{
                  opacity: animationStage >= 4 ? 1 : 0,
                  transform:
                    animationStage >= 4 ? "translateY(0)" : "translateY(20px)",
                  animationDelay: "200ms",
                }}
              >
                <span className="hidden xs:inline">Essential </span>Rules & Guidelines(LBS)
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#003631] transition-all duration-300 group-hover:w-full"></span>
              </a>

              {/* Animated anchor for Tips & Tricks */}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setShowTipsModal(true);
                }}
                className="text-[#003631] hover:text-[#00665f] font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 relative group whitespace-nowrap"
                style={{
                  opacity: animationStage >= 4 ? 1 : 0,
                  transform:
                    animationStage >= 4 ? "translateY(0)" : "translateY(20px)",
                  animationDelay: "400ms",
                }}
              >
                <span className="hidden xs:inline">Success </span>Strategies & Insights
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#003631] transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>
          </div>
        </div>

        {/* Right side - maintained for layout consistency */}
        <div className="hidden md:flex max-w-md w-full justify-center items-center"></div>
      </div>

      {/* Rules & Regulations Modal - improved for mobile */}
      {showRulesModal && (
        <div onWheel={(e) => e.stopPropagation()} data-lenis-prevent
          className="fixed inset-0 bg-[#08080844] backdrop-blur-lg bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4"
          onClick={(e) => handleCloseModal(e, setShowRulesModal)}
        >
          <div
            className="bg-[#FFEDD5] overflow-auto scrollbar-custom rounded-lg p-3 sm:p-4 md:p-6 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg w-full max-h-[85vh] md:max-h-[80vh] overflow-y-auto animate-modalFadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-2 sm:mb-4">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#003631] pr-2">
                Navigating Your Objective Test: Instructions for Candidates
              </h2>
              {/* Replace with your actual close button component */}
              <button
                onClick={() => setShowRulesModal(false)}
                className="text-gray-500 hover:text-gray-700 text-lg sm:text-xl flex-shrink-0"
              >
                {/* <IoClose /> */} X {/* Placeholder for close icon */}
              </button>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-base sm:text-lg font-semibold text-[#003631]">
                Exam Structure & Scoring Dynamics
              </h3>
              <ul className="list-disc pl-4 sm:pl-5 space-y-1 sm:space-y-2 text-sm sm:text-base">
                <li>
                  <span className="font-semibold">Assessment Format:</span> 120 objective multiple-choice questions over 120 minutes.
                </li>
                <li>
                  Each question has four options (A, B, C, D); choose the most appropriate.
                </li>
                <li>
                  <span className="font-semibold">Correct Answers:</span> Earn 1 mark per question.
                </li>
                <li>
                  <span className="font-semibold">No Deduction:</span> No marks deducted for incorrect or unanswered questions.
                </li>
                <li>
                  Invalid marking (multiple bubbles, erasing, overwriting, partial) counts as an incorrect answer.
                </li>
              </ul>

              <h3 className="text-base sm:text-lg font-semibold text-[#003631]">
                Exam Day Protocol
              </h3>
              <ul className="list-disc pl-4 sm:pl-5 space-y-1 sm:space-y-2 text-sm sm:text-base">
                <li>
                  Fill the OMR Sheet precisely; incorrectly filled sheets won't be evaluated.
                </li>
                <li>
                  Write your 8-digit Roll Number and the Booklet Version on the OMR sheet and booklet respectively.
                </li>
                <li>
                  Verify your booklet has 120 legible questions; report issues immediately to the Invigilator.
                </li>
                <li>
                  Use only black or blue ink ballpoint pens for marking the OMR sheet.
                </li>
                <li>
                  Use blank pages in the booklet for rough work and calculations.
                </li>
                <li>
                  Prohibited items include Watch, Calculator, Mobile phone, and any other Electronic instrument.
                </li>
                <li>
                  Return your OMR Sheet and Hall Ticket to the Invigilator; you can keep the booklet and OMR copy.
                </li>
              </ul>

              <h3 className="text-base sm:text-lg font-semibold text-[#003631]">
                Post-Exam Procedures & Integrity Guidelines
              </h3>
              <ul className="list-disc pl-4 sm:pl-5 space-y-1 sm:space-y-2 text-sm sm:text-base">
                <li>Answer keys will be published on www.lbscentre.kerala.gov.in post-exam.</li>
                <li>
                  Submit answer key complaints with supporting documents to ddc.lbs@kerala.gov.in within 3 calendar days (by 5:00 p.m.). Expert decisions are final.
                </li>
                <li>Answer sheets will not be valued if malpractice is detected.</li>
                <li>
                  Remain in the hall until the end time and hand over your OMR sheet to the Invigilator before leaving.
                </li>
              </ul>
            </div>
            <div className="mt-4 sm:mt-6 flex justify-end">
              <button
                onClick={() => setShowRulesModal(false)}
                className="px-3 py-1 sm:px-4 sm:py-2 bg-[#003631] text-white rounded hover:bg-[#00665f] transition-colors text-sm sm:text-base"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tips & Tricks Modal - improved for mobile */}
      {showTipsModal && (
        <div onWheel={(e) => e.stopPropagation()} data-lenis-prevent
          className="fixed inset-0 bg-[#08080844] backdrop-blur-lg z-50 flex items-center justify-center p-2 sm:p-4"
          onClick={(e) => handleCloseModal(e, setShowTipsModal)}
        >
          <div
            className="bg-[#FFEDD5] overflow-auto scrollbar-custom rounded-lg p-3 sm:p-4 md:p-6 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg w-full max-h-[85vh] md:max-h-[80vh] overflow-y-auto animate-modalFadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-2 sm:mb-4">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#003631] pr-2">
                LBS examination: Essential Strategies
              </h2>
              <button
                onClick={() => setShowTipsModal(false)}
                className="text-gray-500 hover:text-gray-700 text-lg sm:text-xl flex-shrink-0"
              >
                {/* Assuming IoClose is an icon component like react-icons/io5/IoClose */}
                <IoClose />
              </button>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-base sm:text-lg font-semibold text-[#003631]">
                Preparation Intelligence: Your Strategic Advantage
              </h3>
              <ul className="list-disc pl-4 sm:pl-5 space-y-1 sm:space-y-2 text-sm sm:text-base">
                <li>
                  Architect a precision study blueprint with dedicated focus blocks for each paper (Paper I & Paper II)
                </li>
                <li>
                  Utilize relevant textbooks and resources specific to the LBS SET syllabus for your chosen subject and Paper I
                </li>
                <li>
                  Create tactical summary notes of key concepts, facts, and theories for rapid recall
                </li>
                <li>
                  Analyze past LBS SET question papers to decode exam patterns and identify high-weightage areas
                </li>
                <li>
                  Leverage collective intelligence through strategic study groups for enhanced understanding and problem-solving
                </li>
              </ul>

              <h3 className="text-base sm:text-lg font-semibold text-[#003631]">
                Battlefield Strategies: Exam Day Mastery
              </h3>
              <ul className="list-disc pl-4 sm:pl-5 space-y-1 sm:space-y-2 text-sm sm:text-base">
                <li>
                  Secure early victories by tackling familiar questions first — momentum is critical
                </li>
                <li>
                  Deploy precision time management — allocate strategically to conquer all questions in both papers
                </li>
                <li>
                  When facing challenging questions, eliminate obvious incorrect options to optimize your selection odds
                </li>
                <li>
                  Implement the skip-and-return protocol for uncertain questions — maintain your flow
                </li>
                <li>
                  Avoid time sinks — if a question is consuming too much time, mark it and move on
                </li>
              </ul>

              <h3 className="text-base sm:text-lg font-semibold text-[#003631]">
                Subject Focus: Mastering Paper I and Your Specialization
              </h3>
              <ul className="list-disc pl-4 sm:pl-5 space-y-1 sm:space-y-2 text-sm sm:text-base">
                <li>
                  <strong>Paper I (General Knowledge & Teaching Aptitude):</strong> Focus on current affairs, Kerala-specific GK, educational psychology, and teaching methodologies. Regular practice with relevant mock tests is crucial.
                </li>
                <li>
                  <strong>Paper II (Your Chosen Subject):</strong> Deep dive into the core concepts and advanced topics of your postgraduate specialization based on the official syllabus. Refer to standard textbooks and previous year's question papers specific to your subject.
                </li>
                <li>
                  <strong>Interdisciplinary Awareness:</strong> For both papers, especially Paper I, maintain awareness of interconnected topics and current developments relevant to education and general knowledge.
                </li>
              </ul>

              <h3 className="text-base sm:text-lg font-semibold text-[#003631]">
                Peak Performance Protocol: Optimize Your Biological System
              </h3>
              <ul className="list-disc pl-4 sm:pl-5 space-y-1 sm:space-y-2 text-sm sm:text-base">
                <li>
                  Prioritize sleep optimization, especially in the days leading up to the exam
                </li>
                <li>Fuel your cognitive engine with strategic nutrition and constant hydration</li>
                <li>
                  Implement tactical breaks during intense study sessions to maintain peak mental acuity
                </li>
                <li>Practice mindfulness or relaxation techniques to manage anxiety and maintain focus during exams</li>
                <li>Cultivate unwavering self-confidence backed by your diligent preparation</li>
              </ul>
            </div>

            <div className="mt-4 sm:mt-6 flex justify-end">
              <button
                onClick={() => setShowTipsModal(false)}
                className="px-3 py-1 sm:px-4 sm:py-2 bg-[#003631] text-white rounded hover:bg-[#00665f] transition-colors text-sm sm:text-base"
              >
                Close
              </button>
            </div>
          </div>
        </div >
      )}

      {/* Only render the mock test section if user is logged in */}

      {
        token && (
          <div ref={lbsTestRef} name="lbstest">
            <LbsTest />
            <Kmat24 />
            <Kmat25 />
          </div>
        )
      }

      {
        token && (
          <div ref={mockTestRef} name="mocktest">
            <Mocktest />
          </div>
        )
      }

      {/* Only render the main test section if user is logged in */}
      {
        token && (
          <div name="maintest">
            <MainTest />
          </div>
        )
      }

      <div name="contact">
        <Contact />
      </div>

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
        
        /* Add xs breakpoint for very small devices */
        @media (min-width: 400px) {
          .xs\\:flex-row {
            flex-direction: row;
          }
          .xs\\:mt-0 {
            margin-top: 0;
          }
          .xs\\:gap-3 {
            gap: 0.75rem;
          }
          .xs\\:inline {
            display: inline;
          }
        }
        
        /* Fix scrollbar for both desktop and mobile */
        .scrollbar-custom::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-custom::-webkit-scrollbar-track {
          background: #F9FAFB;
        }
        .scrollbar-custom::-webkit-scrollbar-thumb {
          background-color: #003631;
          border-radius: 20px;
        }
      `}</style>
    </>
  );
};

export default Banner;