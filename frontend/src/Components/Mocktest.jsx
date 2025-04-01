import React, { useState, useEffect } from "react";

const Mocktest = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(1200);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [hoveredSubject, setHoveredSubject] = useState(null);

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
    setTimeLeft(1200);
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
      className="min-h-screen bg-gradient-to-br from-[#F4F8D3] to-[#E6F2E6] 
        bg-cover overflow-x-hidden flex flex-col items-center p-4 
        relative"
    >
      {/* Background Blur Effect */}
      {hoveredSubject && (
        <div
          className="fixed inset-0 bg-white/30 backdrop-blur-sm z-10 
            animate-fade-in pointer-events-none"
        />
      )}

      <h1 className="text-4xl font-bold m-6 text-[#37474F] drop-shadow-lg tracking-wider z-30 relative">
        MOCK TEST
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl z-20">
        {subjects.map((subject, index) => (
          <div
            key={index}
            className={`
              relative overflow-hidden rounded-2xl shadow-2xl 
              transition-all duration-500 ease-in-out
              transform hover:scale-105 hover:shadow-3xl
              ${
                hoveredSubject === subject.name
                  ? "scale-105 shadow-3xl"
                  : "scale-100"
              }
            `}
            onMouseEnter={() => setHoveredSubject(subject.name)}
            onMouseLeave={() => setHoveredSubject(null)}
          >
            {/* Subject Card */}
            <div className="relative">
              {/* Glowing Overlay */}
              <div
                className={`
                  absolute inset-0 bg-gradient-to-br 
                  ${
                    hoveredSubject === subject.name
                      ? "from-purple-500/30 to-blue-500/30"
                      : "opacity-0"
                  }
                  transition-all duration-500 ease-in-out
                `}
              />

              <img
                src={subject.image}
                className="w-full h-48 md:h-56 object-cover"
                alt={subject.name}
              />

              <div className="p-4 bg-white/80 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-[#37474F] text-center mb-2">
                  {subject.name}
                </h3>
                <button
                  onClick={() => startTest(subject)}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 
                    text-white py-2 px-4 rounded-lg 
                    hover:from-blue-600 hover:to-purple-700 
                    transition-all duration-300 
                    transform hover:scale-105 active:scale-95"
                >
                  Start Test
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full Screen Modal for Test Questions */}
      {selectedSubject && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="w-full h-full bg-white flex flex-col">
            {/* Header */}
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-600 
              text-white p-4 flex justify-between items-center"
            >
              <h2 className="text-2xl font-bold">{selectedSubject.name}</h2>
              <p className="text-xl font-semibold">
                Time Left: {formatTime(timeLeft)}
              </p>
            </div>

            {/* Questions Container */}
            <div className="flex-grow overflow-y-auto p-6">
              {questions.map((q, index) => (
                <div
                  key={index}
                  className="mb-4 p-4 bg-gray-100 rounded-lg 
                    hover:bg-gray-200 transition-colors"
                >
                  <p className="font-semibold mb-3">{q.question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {q.options.map((option, idx) => (
                      <button
                        key={idx}
                        className={`
                          p-3 rounded-lg text-left 
                          transition-all duration-300
                          ${
                            selectedAnswers[index] === option
                              ? "bg-blue-500 text-white"
                              : "bg-white hover:bg-blue-100 text-gray-700"
                          }
                        `}
                        onClick={() => handleOptionSelect(index, option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Buttons */}
            <div className="bg-gray-100 p-4 flex justify-end space-x-4">
              <button
                onClick={() => setSelectedSubject(null)}
                className="bg-red-500 text-white py-2 px-6 rounded-lg 
                  hover:bg-red-600 transition-colors"
              >
                Close
              </button>
              <button
                className="bg-green-500 text-white py-2 px-6 rounded-lg 
                  hover:bg-green-600 transition-colors"
              >
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
