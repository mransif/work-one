import React, { useState, useEffect } from "react";
import Button from "./Button";
import StyledSplitButton from "./StyledSplitButton";

const Mocktest = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(1200);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const subjects = [
    { name: "MATHEMATICS", image: "/images/maths.jpg" },
    { name: "PHYSICS", image: "/images/physics.png" },
    { name: "CHEMISTRY", image: "/images/chemistry.jpg" },
  ];

  const subjectQuestions = {
    MATHEMATICS: [
      { question: "What is 2 + 2?", options: ["3", "4", "5", "6"] },
      { question: "Solve: 5 x 6", options: ["30", "25", "20", "35"] },
      { question: "Solve: 10 / 2", options: ["5", "2", "10", "8"] },
      {
        question: "What is the square root of 144?",
        options: ["12", "14", "16", "10"],
      },
      { question: "What is 15% of 200?", options: ["30", "25", "35", "40"] },
    ],
    PHYSICS: [
      {
        question: "Speed of light in vacuum?",
        options: ["299,792 km/s", "150,000 km/s", "3,000 km/s", "30,000 km/s"],
      },
      {
        question: "Who discovered gravity?",
        options: ["Newton", "Einstein", "Tesla", "Edison"],
      },
      {
        question: "What is the SI unit of force?",
        options: ["Newton", "Joule", "Pascal", "Watt"],
      },
      {
        question: "Who developed the Theory of Relativity?",
        options: ["Einstein", "Newton", "Galileo", "Bohr"],
      },
      {
        question: "What is the acceleration due to gravity on Earth?",
        options: ["9.8 m/s²", "10 m/s²", "8.5 m/s²", "12 m/s²"],
      },
    ],
    CHEMISTRY: [
      {
        question: "Chemical symbol for Gold?",
        options: ["Au", "Ag", "Pb", "Fe"],
      },
      {
        question: "What is H2O?",
        options: ["Water", "Oxygen", "Hydrogen", "Helium"],
      },
      {
        question: "Which gas do plants absorb?",
        options: ["CO2", "O2", "N2", "H2"],
      },
      {
        question: "What is the chemical formula of methane?",
        options: ["CH4", "CO2", "H2O", "O2"],
      },
      {
        question: "What is the hardest natural substance?",
        options: ["Diamond", "Gold", "Iron", "Quartz"],
      },
    ],
  };

  const startTest = (subject) => {
    setSelectedSubject(subject);
    setQuestions(
      subjectQuestions[subject.name]
        .sort(() => 0.5 - Math.random())
        .slice(0, 20)
    );
    setSelectedAnswers({});
    setTimeLeft(10);
  };

  const handleOptionSelect = (questionIndex, option) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionIndex]: option }));
  };

  useEffect(() => {
    if (selectedSubject && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setSelectedSubject(null);
    }
  }, [selectedSubject, timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div
      className="min-h-screen bg-[#F4F8D3] bg-cover overflow-x-hidden flex flex-col items-center p-4 "
      style={{ backgroundImage: "url(/images/mock-bg.png)" }}
    >
      <h1 className="text-4xl font-bold m-3 text-[#37474F]">MOCK-TEST</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 w-full max-w-4xl">
        {subjects.map((subject, index) => (
          <div
            key={index}
            className="backdrop-blur-lg p-4 rounded-lg shadow-lg flex flex-col items-center md:p-6 md:w-[90%]"
          >
            <img
              src={subject.image}
              className="w-full h-48 md:h-56 object-cover rounded-lg shadow-md"
              alt={subject.name}
            />
            <h3 className="mt-2 text-xl font-semibold text-[#37474F]">
              {subject.name}
            </h3>
            <StyledSplitButton
              onClick={() => startTest(subject)}
              startTest={startTest}
              subject={subject}
              className="mt-3 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
            >
              Start Test
            </StyledSplitButton>
          </div>
        ))}
      </div>

      {selectedSubject && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-40">
          <div className="bg-[#F4F8D3] w-full h-full p-6 overflow-y-auto flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-4">{selectedSubject.name}</h2>
            <p className="text-xl font-semibold text-[#37474F]">
              Time Left: {formatTime(timeLeft)}
            </p>
            <div className="w-full max-w-2xl">
              {questions.map((q, index) => (
                <div key={index} className="mb-4 p-4 border rounded-lg shadow">
                  <p className="font-semibold">{q.question}</p>
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                    {q.options.map((option, idx) => (
                      <button
                        key={idx}
                        className={`p-2 border rounded-lg ${
                          selectedAnswers[index] === option
                            ? "bg-gray-300"
                            : "hover:bg-gray-200"
                        }`}
                        onClick={() => handleOptionSelect(index, option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex space-x-4">
              <button
                onClick={() => setSelectedSubject(null)}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
              >
                Close
              </button>
              <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mocktest;