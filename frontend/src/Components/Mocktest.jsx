import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import Button from "./Button";
import StyledSplitButton from "./StyledSplitButton";
import BarChart from "./bar-chart";

const Mocktest = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(1200);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [testResults, setTestResults] = useState(null);
  const [scoreHistorySubject, setScoreHistorySubject] = useState("ALL");

  const { submitMockTestResult, scores } = useContext(AppContext);

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

    submitMockTestResult(selectedSubject.name, correctCount, totalQuestions);
    console.log(selectedSubject.name, correctCount, totalQuestions);
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

  // Filter scores based on selected subject
  const filteredScores = scoreHistorySubject === "ALL"
    ? scores
    : scores.filter(score => score.setName === scoreHistorySubject);

  // Get subject color for bars
  const getSubjectColor = (subject) => {
    switch (subject) {
      case "MATHEMATICS": return "bg-blue-500";
      case "PHYSICS": return "bg-purple-500";
      case "CHEMISTRY": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  // Get light shade color for placeholder bars
  const getLightShadeColor = (subject) => {
    switch (subject) {
      case "MATHEMATICS": return "bg-blue-200";
      case "PHYSICS": return "bg-purple-200";
      case "CHEMISTRY": return "bg-green-200";
      default: return "bg-gray-200";
    }
  };

  // Create chart items with placeholders if needed
  const createChartItems = () => {
    const realItems = filteredScores.map((score) => ({
      className: `rounded-md ${getSubjectColor(score.setName)}`,
      label: score.setName,
      progress: ((score.score / score.questions) * 100).toFixed(2)
    }));

    // If we have fewer than 5 items, add placeholders
    if (realItems.length < 5) {
      const placeholderCount = 5 - realItems.length;
      const placeholderSubject = scoreHistorySubject === "ALL" ? "default" : scoreHistorySubject;

      const placeholders = Array(placeholderCount).fill(null).map((_, i) => ({
        className: `rounded-md ${getLightShadeColor(placeholderSubject)}`,
        label: `Future Test ${i + 1}`,
        progress: "0"
      }));

      return [...realItems, ...placeholders];
    }

    return realItems;
  };

  return (
    <div className="min-h-screen bg-[#F4F8D3] bg-cover overflow-x-hidden flex flex-col items-center p-4"
      style={{ backgroundImage: "url(/images/mock-bg.png)" }}
    >
      <h1 className="text-4xl font-bold m-3 text-[#37474F]">MOCK-TEST</h1>

      {!selectedSubject && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 w-full max-w-4xl mb-8">
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

          {/* Score History Section - Updated Styling */}
          {scores.length > 0 && (
            <div className="w-full max-w-4xl rounded-xl shadow-xl p-8 backdrop-blur-lg border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-1 h-8 bg-blue-500 rounded-full mr-3"></div>
                <h2 className="text-2xl font-bold bg-clip-text text-[#37474F]">Your Score History</h2>
              </div>

              {/* Subject Filter Dropdown - Updated */}
              <div className="mb-6">
                <label htmlFor="subject-filter" className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Subject:
                </label>
                <div className="relative">
                  <select
                    id="subject-filter "
                    value={scoreHistorySubject}
                    onChange={(e) => setScoreHistorySubject(e.target.value)}
                    className="w-54 md:w-64 px-4 py-3  bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent appearance-none"
                  >
                    <option value="ALL">All Subjects</option>
                    <option value="MATHEMATICS">Mathematics</option>
                    <option value="PHYSICS">Physics</option>
                    <option value="CHEMISTRY">Chemistry</option>
                  </select>
                </div>
              </div>

              {/* Score Cards - Updated */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {filteredScores.map((score, index) => {
                  const percentage = ((score.score / score.questions) * 100).toFixed(2);
                  let bgGradient, textColor;

                  switch (score.setName) {
                    case "MATHEMATICS":
                      bgGradient = "from-blue-50 to-blue-100";
                      textColor = "text-blue-700";
                      break;
                    case "PHYSICS":
                      bgGradient = "from-purple-50 to-purple-100";
                      textColor = "text-purple-700";
                      break;
                    case "CHEMISTRY":
                      bgGradient = "from-green-50 to-green-100";
                      textColor = "text-green-700";
                      break;
                    default:
                      bgGradient = "from-gray-50 to-gray-100";
                      textColor = "text-gray-700";
                  }

                  return (
                    <div key={index} className={`p-5 rounded-lg shadow-md border-l-4 ${getSubjectColor(score.setName).replace('bg-', 'border-')} bg-gradient-to-br ${bgGradient} hover:shadow-lg transition-shadow duration-300`}>
                      <h3 className={`font-bold text-lg mb-2 ${textColor}`}>{score.setName}</h3>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-gray-600 font-medium">Score:</span>
                        <div className="flex items-center">
                          <span className="font-bold text-lg">{score.score}</span>
                          <span className="text-gray-500 mx-1">/</span>
                          <span className="text-gray-500">{score.questions}</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 mb-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${getSubjectColor(score.setName)}`}
                          style={{
                            width: `${percentage}%`,
                            transition: 'width 1s ease-in-out'
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">Performance</span>
                        <span className={`text-right text-sm font-bold ${percentage >= 70 ? 'text-green-600' : percentage >= 40 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {percentage}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bar Chart with Placeholders - Updated */}
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <div className="flex items-center mb-4">
                  <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-800">Performance Chart</h3>
                </div>
                <div className="relative h-64 w-full">
                  <BarChart
                    height={230}
                    items={createChartItems()}
                  />
                </div>
                <div className="mt-4 text-xs text-gray-500 text-center">
                  Chart shows your test scores as percentage
                </div>
              </div>
            </div>
          )}
        </>
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
                            className={`p-2 border rounded-lg ${selectedAnswers[index] === option
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
                <Button click={evaluateAnswers} text="Submit" className="mt-4" />
              </>
            ) : (
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">Results</h3>
                <p>Subject: {testResults.subject}</p>
                <p>Score: {testResults.correctAnswers} / {testResults.totalQuestions}</p>
                <p>Percentage: {testResults.percentScore}%</p>
                <Button click={closeTest} text="Close" className="mt-4" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Mocktest;