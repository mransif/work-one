import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext"; // Import AppContext
import Button from "./Button";
import StyledSplitButton from "./StyledSplitButton";

const Mocktest = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(1200);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [testResults, setTestResults] = useState(null);

  const { submitMockTestResult } = useContext(AppContext); // ✅ Use context function

  const subjects = [
    { name: "MATHEMATICS", image: "/images/maths.jpg" },
    { name: "PHYSICS", image: "/images/physics.png" },
    { name: "CHEMISTRY", image: "/images/chemistry.jpg" },
  ];

  const subjectQuestions = {
    MATHEMATICS: [
      { question: "If f(x) = x² + 3x + 2, find f(-1).", options: ["0", "2", "6", "-2"], correctAnswer: "0" },
      { question: "What is the derivative of sin(x)?", options: ["cos(x)", "-sin(x)", "-cos(x)", "sec²(x)"], correctAnswer: "cos(x)" },
    ],
    PHYSICS: [
      { question: "What is the SI unit of electric current?", options: ["Ampere", "Watt", "Volt", "Ohm"], correctAnswer: "Ampere" },
      { question: "What is the escape velocity on Earth?", options: ["11.2 km/s", "9.8 km/s", "12.5 km/s", "7.9 km/s"], correctAnswer: "11.2 km/s" },
    ],
    CHEMISTRY: [
      { question: "What is the pH of pure water at 25°C?", options: ["7", "6", "8", "5"], correctAnswer: "7" },
      { question: "The chemical formula of baking soda is:", options: ["NaHCO₃", "NaCl", "KOH", "CaCO₃"], correctAnswer: "NaHCO₃" },
    ],
  };

  const startTest = (subject) => {
    setSelectedSubject(subject);
    setQuestions(
      subjectQuestions[subject.name]
        .sort(() => 0.5 - Math.random())
        .slice(0, 5) // Using 5 questions for brevity
    );
    setSelectedAnswers({});
    setTimeLeft(1200); 
    setTestResults(null);
  };

  const handleOptionSelect = (questionIndex, option) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionIndex]: option }));
  };

  const evaluateAnswers = () => {
    let correctCount = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctCount++;
      }
    });

    const totalQuestions = questions.length;
    const percentScore = (correctCount / totalQuestions) * 100;

    setTestResults({
      subject: selectedSubject.name,
      totalQuestions,
      correctAnswers: correctCount,
      percentScore: percentScore.toFixed(2),
    });

    // ✅ Submit the result to the backend
    submitMockTestResult(selectedSubject.name, correctCount, totalQuestions);
    (console.log(selectedSubject.name, correctCount, totalQuestions))
  };

  useEffect(() => {
    if (selectedSubject && timeLeft > 0 && !testResults) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !testResults) {
      evaluateAnswers(); // Auto-submit when time runs out
    }
  }, [selectedSubject, timeLeft, testResults]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const closeTest = () => {
    setSelectedSubject(null);
    setTestResults(null);
  };

  return (
    <div className="min-h-screen bg-[#F4F8D3] bg-cover overflow-x-hidden flex flex-col items-center p-4"
      style={{ backgroundImage: "url(/images/mock-bg.png)" }}
    >
      <h1 className="text-4xl font-bold m-3 text-[#37474F]">MOCK-TEST</h1>

      {!selectedSubject && (
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
              />
            </div>
          ))}
        </div>
      )}

      {selectedSubject && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-40">
          <div className="bg-[#F4F8D3] w-full h-full p-6 overflow-y-auto flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-4">{selectedSubject.name}</h2>

            {!testResults ? (
              <>
                <p className="text-xl font-semibold text-[#37474F] mb-4">
                  Time Left: {formatTime(timeLeft)}
                </p>
                <div className="w-full max-w-2xl">
                  {questions.map((q, index) => (
                    <div key={index} className="mb-4 p-4 border rounded-lg shadow bg-white">
                      <p className="font-semibold">{q.question}</p>
                      <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                        {q.options.map((option, idx) => (
                          <button
                            key={idx}
                            className={`p-2 border rounded-lg ${
                              selectedAnswers[index] === option
                                ? "bg-blue-200 border-blue-500"
                                : "hover:bg-gray-100"
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
                <Button click={evaluateAnswers} text="Submit" className="mt-4"/>
              </>
            ) : (
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">Results</h3>
                <p>Subject: {testResults.subject}</p>
                <p>Score: {testResults.correctAnswers} / {testResults.totalQuestions}</p>
                <p>Percentage: {testResults.percentScore}%</p>
                <Button click={closeTest} text="Close" className="mt-4"/>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Mocktest;
