import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import Button from "./Button";
import StyledSplitButton from "./StyledSplitButton";
import BarChart from "./bar-chart";

const Mocktest = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [testResults, setTestResults] = useState(null);
  const [scoreHistorySubject, setScoreHistorySubject] = useState("ALL");
  const [isTimeLow, setIsTimeLow] = useState(false);
  // Simplified state for tracking question status - easier to understand at a glance
  const [questionStatus, setQuestionStatus] = useState([]);
  // Current question index
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  // Review mode
  const [isReviewMode, setIsReviewMode] = useState(false);
  // Confirmation dialog state
  const [showConfirmation, setShowConfirmation] = useState(false);

  const { submitMockTestResult, scores } = useContext(AppContext);

  const subjects = [
    { name: "MATHEMATICS", image: "/images/maths.jpg" },
    { name: "PHYSICS", image: "/images/physics.png" },
    { name: "CHEMISTRY", image: "/images/chemistry.jpg" },
  ];

  const subjectQuestions = {
    MATHEMATICS: [
      {
        question: "If f(x) = x² + 3x + 2, find f(-1).",
        options: ["0", "2", "6", "-2"],
        correctAnswer: "0",
      },
      {
        question: "What is the derivative of sin(x)?",
        options: ["cos(x)", "-sin(x)", "-cos(x)", "sec²(x)"],
        correctAnswer: "cos(x)",
      },
    ],
    PHYSICS: [
      {
        question: "What is the SI unit of electric current?",
        options: ["Ampere", "Watt", "Volt", "Ohm"],
        correctAnswer: "Ampere",
      },
      {
        question: "What is the escape velocity on Earth?",
        options: ["11.2 km/s", "9.8 km/s", "12.5 km/s", "7.9 km/s"],
        correctAnswer: "11.2 km/s",
      },
    ],
    CHEMISTRY: [
      {
        question: "What is the pH of pure water at 25°C?",
        options: ["7", "6", "8", "5"],
        correctAnswer: "7",
      },
      {
        question: "The chemical formula of baking soda is:",
        options: ["NaHCO₃", "NaCl", "KOH", "CaCO₃"],
        correctAnswer: "NaHCO₃",
      },
    ],
  };

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const startTest = (subject) => {
    const selectedQuestions = shuffleArray(
      subjectQuestions[subject.name]
    ).slice(0, 20);
    const questionsWithShuffledOptions = selectedQuestions.map((q) => {
      const shuffledOptions = shuffleArray(q.options);
      return {
        ...q,
        options: shuffledOptions,
      };
    });

    // Initialize question status for all questions as an array
    const initialStatus = Array(questionsWithShuffledOptions.length).fill(
      "not-visited"
    );

    setSelectedSubject(subject);
    setQuestions(questionsWithShuffledOptions);
    setSelectedAnswers({});
    setQuestionStatus(initialStatus);
    setCurrentQuestionIdx(0);
    setTimeLeft(1200); // Reset timer to 20 minutes
    setTestResults(null);
    setIsTimeLow(false);
    setIsReviewMode(false);
  };

  const handleOptionSelect = (questionIndex, option) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionIndex]: option }));

    // Update question status to "answered"
    setQuestionStatus((prev) => {
      const newStatus = [...prev];
      // If it was marked, keep it marked, otherwise set to answered
      newStatus[questionIndex] =
        prev[questionIndex] === "marked" ? "answered-marked" : "answered";
      return newStatus;
    });
  };

  // Mark current question as visited when displayed
  useEffect(() => {
    if (
      questions.length > 0 &&
      !isReviewMode &&
      questionStatus[currentQuestionIdx] === "not-visited"
    ) {
      setQuestionStatus((prev) => {
        const newStatus = [...prev];
        newStatus[currentQuestionIdx] = "visited";
        return newStatus;
      });
    }
  }, [currentQuestionIdx, questions.length, isReviewMode, questionStatus]);

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
      answers: questions.map((question, index) => ({
        question: question.question,
        userAnswer: selectedAnswers[index] || "Not answered",
        correctAnswer: question.correctAnswer,
        isCorrect: selectedAnswers[index] === question.correctAnswer,
      })),
    });

    submitMockTestResult(selectedSubject.name, correctCount, totalQuestions);
  };

  useEffect(() => {
    if (selectedSubject && timeLeft > 0 && !testResults) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      // Set time low flag when less than 2 minutes remaining
      if (timeLeft <= 120 && !isTimeLow) {
        setIsTimeLow(true);
      }

      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !testResults) {
      evaluateAnswers(); // Auto-submit when time runs out
    }
  }, [selectedSubject, timeLeft, testResults, isTimeLow]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const closeTest = () => {
    setSelectedSubject(null);
    setTestResults(null);
  };

  // Toggle mark for review status
  const toggleMarkForReview = (questionIndex) => {
    setQuestionStatus((prev) => {
      const newStatus = [...prev];
      // Simple toggle logic based on current status
      if (newStatus[questionIndex] === "answered") {
        newStatus[questionIndex] = "answered-marked";
      } else if (newStatus[questionIndex] === "answered-marked") {
        newStatus[questionIndex] = "answered";
      } else if (
        newStatus[questionIndex] === "visited" ||
        newStatus[questionIndex] === "not-visited"
      ) {
        newStatus[questionIndex] = "marked";
      } else if (newStatus[questionIndex] === "marked") {
        newStatus[questionIndex] = "visited";
      }
      return newStatus;
    });
  };

  // Navigation functions
  const goToNextQuestion = () => {
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    }
  };

  const goToPrevQuestion = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(currentQuestionIdx - 1);
    }
  };

  const goToQuestion = (index) => {
    setCurrentQuestionIdx(index);
    setIsReviewMode(false);
  };

  // Open confirmation dialog
  const handleSubmitClick = () => {
    setShowConfirmation(true);
  };

  // Cancel submission
  const cancelSubmit = () => {
    setShowConfirmation(false);
  };

  // Confirm submission
  const confirmSubmit = () => {
    setShowConfirmation(false);
    evaluateAnswers();
  };

  // Filter scores based on selected subject
  const filteredScores =
    scoreHistorySubject === "ALL"
      ? scores
      : scores.filter((score) => score.setName === scoreHistorySubject);

  // Get subject color for bars
  const getSubjectColor = (subject) => {
    switch (subject) {
      case "MATHEMATICS":
        return "bg-blue-500";
      case "PHYSICS":
        return "bg-purple-500";
      case "CHEMISTRY":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  // Get light shade color for placeholder bars
  const getLightShadeColor = (subject) => {
    switch (subject) {
      case "MATHEMATICS":
        return "bg-blue-200";
      case "PHYSICS":
        return "bg-purple-200";
      case "CHEMISTRY":
        return "bg-green-200";
      default:
        return "bg-gray-200";
    }
  };

  // Create chart items with placeholders if needed
  const createChartItems = () => {
    const realItems = filteredScores.map((score) => ({
      className: `rounded-md ${getSubjectColor(score.setName)}`,
      label: score.setName,
      progress: ((score.score / score.questions) * 100).toFixed(2),
    }));

    // If we have fewer than 5 items, add placeholders
    if (realItems.length < 5) {
      const placeholderCount = 5 - realItems.length;
      const placeholderSubject =
        scoreHistorySubject === "ALL" ? "default" : scoreHistorySubject;

      const placeholders = Array(placeholderCount)
        .fill(null)
        .map((_, i) => ({
          className: `rounded-md ${getLightShadeColor(placeholderSubject)}`,
          label: `Future Test ${i + 1}`,
          progress: "0",
        }));

      return [...realItems, ...placeholders];
    }

    return realItems;
  };

  // Calculate progress percentage
  const calculateProgress = () => {
    const answeredQuestions = Object.keys(selectedAnswers).length;
    return (answeredQuestions / questions.length) * 100;
  };

  // Get count of questions by status
  const getQuestionCounts = () => {
    const counts = {
      answered: 0,
      notAnswered: 0,
      notVisited: 0,
      marked: 0,
      answeredMarked: 0,
    };

    questionStatus.forEach((status) => {
      if (status === "answered") {
        counts.answered++;
      } else if (status === "visited") {
        counts.notAnswered++;
      } else if (status === "not-visited") {
        counts.notVisited++;
      } else if (status === "marked") {
        counts.marked++;
      } else if (status === "answered-marked") {
        counts.answeredMarked++;
      }
    });

    return counts;
  };

  // Get unanswered count
  const getUnansweredCount = () => {
    return questions.length - Object.keys(selectedAnswers).length;
  };

  // Group questions into sections (for right panel display)
  const getQuestionSections = () => {
    // This is just an example - you can adjust for your actual subject structure
    const questionCount = questions.length;
    const sectionSize = 30; // Assuming 30 questions per section
    
    const sections = [];
    for (let i = 0; i < questionCount; i += sectionSize) {
      sections.push({
        name: selectedSubject.name,
        questions: questions.slice(i, Math.min(i + sectionSize, questionCount)),
        startIndex: i
      });
    }
    
    return sections;
  };

  // Get status color class for question button
  const getStatusColorClass = (status) => {
    switch (status) {
      case "answered":
        return "bg-green-500 text-white";
      case "answered-marked":
        return "bg-green-500 text-white border-2 border-yellow-400";
      case "marked":
        return "bg-yellow-100 border border-yellow-400";
      case "visited":
        return "bg-red-100";
      case "not-visited":
      default:
        return "bg-gray-200";
    }
  };

  return (
    <div
      className="min-h-screen bg-[#F4F8D3] bg-cover overflow-x-hidden flex flex-col items-center p-4"
      style={{ backgroundImage: "url(/images/mock-bg.png)" }}
    >
      <h1 className="text-4xl font-bold m-3 text-[#37474F]">MOCK-TEST</h1>

      {!selectedSubject && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 w-full max-w-4xl mb-8">
            {subjects.map((subject, index) => (
              <div
                key={index}
                className="backdrop-blur-lg border border-gray-100 p-4 rounded-lg shadow-lg flex flex-col items-center md:p-6 md:w-[90%]"
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

          {/* Score History Section */}
          {scores.length > 0 && (
            <div className="w-full max-w-4xl rounded-xl shadow-xl p-8 backdrop-blur-lg border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-1 h-8 bg-blue-500 rounded-full mr-3"></div>
                <h2 className="text-2xl font-bold bg-clip-text text-[#37474F]">
                  Your Score History
                </h2>
              </div>

              {/* Subject Filter Dropdown */}
              <div className="mb-6">
                <label
                  htmlFor="subject-filter"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Filter by Subject:
                </label>
                <div className="relative">
                  <select
                    id="subject-filter"
                    value={scoreHistorySubject}
                    onChange={(e) => setScoreHistorySubject(e.target.value)}
                    className="w-54 md:w-64 px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent appearance-none"
                  >
                    <option value="ALL">All Subjects</option>
                    <option value="MATHEMATICS">Mathematics</option>
                    <option value="PHYSICS">Physics</option>
                    <option value="CHEMISTRY">Chemistry</option>
                  </select>
                </div>
              </div>

              {/* Score Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {filteredScores.map((score, index) => {
                  const percentage = (
                    (score.score / score.questions) *
                    100
                  ).toFixed(2);
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
                    <div
                      key={index}
                      className={`p-5 rounded-lg shadow-md border-l-4 ${getSubjectColor(
                        score.setName
                      ).replace(
                        "bg-",
                        "border-"
                      )} bg-gradient-to-br ${bgGradient} hover:shadow-lg transition-shadow duration-300`}
                    >
                      <h3 className={`font-bold text-lg mb-2 ${textColor}`}>
                        {score.setName}
                      </h3>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-gray-600 font-medium">
                          Score:
                        </span>
                        <div className="flex items-center">
                          <span className="font-bold text-lg">
                            {score.score}
                          </span>
                          <span className="text-gray-500 mx-1">/</span>
                          <span className="text-gray-500">
                            {score.questions}
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 mb-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${getSubjectColor(
                            score.setName
                          )}`}
                          style={{
                            width: `${percentage}%`,
                            transition: "width 1s ease-in-out",
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">
                          Performance
                        </span>
                        <span
                          className={`text-right text-sm font-bold ${
                            percentage >= 70
                              ? "text-green-600"
                              : percentage >= 40
                              ? "text-yellow-600"
                              : "text-red-600"
                          }`}
                        >
                          {percentage}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bar Chart with Placeholders */}
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <div className="flex items-center mb-4">
                  <svg
                    className="w-5 h-5 text-blue-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Performance Chart
                  </h3>
                </div>
                <div className="relative h-64 w-full">
                  <BarChart height={230} items={createChartItems()} />
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
          <div className="bg-white w-full h-full flex overflow-hidden">
            {!testResults ? (
              // New layout with question on left and status panel on right
              <div className="flex flex-row w-full h-full">
                {/* Main question area (left side) */}
                <div className="flex-1 p-4 overflow-y-auto flex flex-col">
                  {/* Header with timer */}
                  <div className="w-full flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">
                      {selectedSubject.name}
                    </h2>
                    <div className="flex items-center gap-4">
                      <div 
                        className={`bg-blue-50 border border-blue-100 px-4 py-2 rounded-lg ${
                          isTimeLow ? "animate-pulse border-red-300 bg-red-50" : ""
                        }`}
                      >
                        <p className={`font-semibold ${isTimeLow ? "text-red-600" : ""}`}>
                          Time: {formatTime(timeLeft)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Current question */}
                  <div className="flex-1 mb-6 p-6 border rounded-lg shadow-md bg-white">
                    <h3 className="font-semibold text-xl mb-6">
                      {selectedSubject.name} Question {currentQuestionIdx + 1}
                      : {questions[currentQuestionIdx]?.question}
                    </h3>

                    <div className="space-y-3">
                      {questions[currentQuestionIdx]?.options.map(
                        (option, idx) => (
                          <button
                            key={idx}
                            className={`w-full p-4 border rounded-lg text-left flex items-center ${
                              selectedAnswers[currentQuestionIdx] === option
                                ? "bg-blue-50 border-blue-500"
                                : "hover:bg-gray-50"
                            }`}
                            onClick={() =>
                              handleOptionSelect(currentQuestionIdx, option)
                            }
                          >
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 mr-3">
                              {String.fromCharCode(65 + idx)}
                            </span>
                            {option}
                          </button>
                        )
                      )}
                    </div>

                    {/* Navigation buttons */}
                    <div className="flex justify-between mt-8">
                      <button
                        onClick={goToPrevQuestion}
                        className={`px-4 py-2 rounded-lg ${
                          currentQuestionIdx > 0
                            ? "bg-gray-200 hover:bg-gray-300"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        }`}
                        disabled={currentQuestionIdx === 0}
                      >
                        Previous
                      </button>

                      <button
                        onClick={() =>
                          toggleMarkForReview(currentQuestionIdx)
                        }
                        className="px-4 py-2 bg-yellow-100 hover:bg-yellow-200 rounded-lg text-yellow-800"
                      >
                        Mark for Review
                      </button>

                      <button
                        onClick={goToNextQuestion}
                        className={`px-4 py-2 rounded-lg ${
                          currentQuestionIdx < questions.length - 1
                            ? "bg-blue-500 text-white hover:bg-blue-600"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        }`}
                        disabled={currentQuestionIdx === questions.length - 1}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>

                {/* Question status panel (right side) */}
                <div className="w-64 bg-gray-50 border-l border-gray-200 p-4 overflow-y-auto">
                  {/* Subject headers and question grid */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2 text-center">
                      Question Status
                    </h3>
                    
                    {/* Progress stats */}
                    <div className="mb-4 text-sm text-center">
                      <p className="mb-1">
                        Answered: {Object.keys(selectedAnswers).length}/{questions.length}
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full"
                          style={{width: `${calculateProgress()}%`}}
                        ></div>
                      </div>
                    </div>

                    {/* Color legend */}
                    <div className="mb-4 bg-white p-3 rounded-md shadow-sm">
                      <p className="text-xs font-semibold mb-2">Legend:</p>
                      <div className="flex flex-col gap-2 text-xs">
                        <div className="flex items-center">
                          <span className="inline-block w-3 h-3 bg-green-500 rounded-sm mr-2"></span>
                          <span>Answered</span>
                        </div>
                        <div className="flex items-center">
                          <span className="inline-block w-3 h-3 bg-red-100 rounded-sm mr-2"></span>
                          <span>Visited but not answered</span>
                        </div>
                        <div className="flex items-center">
                          <span className="inline-block w-3 h-3 bg-yellow-100 border border-yellow-400 rounded-sm mr-2"></span>
                          <span>Marked for review</span>
                        </div>
                        <div className="flex items-center">
                          <span className="inline-block w-3 h-3 bg-gray-200 rounded-sm mr-2"></span>
                          <span>Not visited</span>
                        </div>
                      </div>
                    </div>

                    {/* Question grid */}
                    {getQuestionSections().map((section, sectionIndex) => (
                      <div key={sectionIndex} className="mb-4">
                        <h4 className="text-sm font-medium px-2 py-1 bg-blue-50 rounded-md text-blue-700 mb-2">
                          {section.name} ({section.questions.length}/30)
                        </h4>
                        
                        <div className="grid grid-cols-5 gap-2">
                          {Array.from({length: section.questions.length}).map((_, i) => {
                            const questionIndex = section.startIndex + i;
                            return (
                              <button
                                key={questionIndex}
                                onClick={() => goToQuestion(questionIndex)}
                                className={`w-full h-8 flex items-center justify-center rounded-md text-sm ${
                                  getStatusColorClass(questionStatus[questionIndex])
                                } ${
                                  questionIndex === currentQuestionIdx
                                    ? "ring-2 ring-blue-500"
                                    : ""
                                }`}
                              >
                                {questionIndex + 1}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Submit Test button */}
                  <div className="mt-auto">
                    <button 
                      onClick={handleSubmitClick}
                      className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-md transition-colors"
                    >
                      Submit Test
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // Test Results - Redesigned to match Image 3
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full mx-auto my-auto overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold">Test Results</h3>
                  <Button
                    click={closeTest}
                    text="Close"
                    className="bg-gray-600 hover:bg-gray-700 text-white py-1 px-4 rounded-lg"
                  />
                </div>

                {/* Performance overview cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 p-6 rounded-lg shadow">
                    <h4 className="text-lg font-semibold mb-4">
                      Overall Performance
                    </h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Score:</span>
                        <span className="font-bold text-xl">
                          {testResults.correctAnswers} /{" "}
                          {testResults.totalQuestions}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Percentage:</span>
                        <span
                          className={`font-bold text-xl ${
                            parseFloat(testResults.percentScore) >= 70
                              ? "text-green-600"
                              : parseFloat(testResults.percentScore) >= 40
                              ? "text-yellow-600"
                              : "text-red-600"
                          }`}
                        >
                          {testResults.percentScore}%
                        </span>
                      </div>
                      <div className="mt-4">
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className={`h-3 rounded-full ${
                              parseFloat(testResults.percentScore) >= 70
                                ? "bg-green-500"
                                : parseFloat(testResults.percentScore) >= 40
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            }`}
                            style={{ width: `${testResults.percentScore}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg shadow">
                    <h4 className="text-lg font-semibold mb-4">
                      Subject Performance
                    </h4>
                    <div className="flex flex-col justify-center h-full">
                      <p className="text-center font-bold text-xl mb-2">
                        {testResults.subject}
                      </p>
                      <p className="text-center text-gray-600">
                        You scored {testResults.percentScore}% in this test
                      </p>
                      <div className="mt-4 text-center">
                        <span
                          className={`inline-block px-4 py-2 rounded-full font-medium ${
                            parseFloat(testResults.percentScore) >= 70
                              ? "bg-green-100 text-green-800"
                              : parseFloat(testResults.percentScore) >= 40
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {parseFloat(testResults.percentScore) >= 70
                            ? "Excellent"
                            : parseFloat(testResults.percentScore) >= 40
                            ? "Good Effort"
                            : "Needs Improvement"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Detailed answers table */}
                <div className="bg-white border border-gray-200 rounded-lg shadow overflow-hidden mb-6">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Question
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Your Answer
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Correct Answer
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Result
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {testResults.answers.map((answer, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-normal">
                            <div className="text-sm text-gray-900">
                              {index + 1}. {answer.question}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div
                              className={`text-sm ${
                                answer.isCorrect
                                  ? "text-green-600 font-medium"
                                  : "text-red-600"
                              }`}
                            >
                              {answer.userAnswer}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 font-medium">
                              {answer.correctAnswer}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {answer.isCorrect ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Correct
                              </span>
                            ) : (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                Incorrect
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Suggestions for improvement */}
                <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-blue-700 mb-2">
                    Suggestions for Improvement
                  </h4>
                  <p className="text-blue-600 mb-2">
                    {parseFloat(testResults.percentScore) >= 70
                      ? "Great job! Continue practicing to maintain your excellent performance."
                      : parseFloat(testResults.percentScore) >= 40
                      ? "Good effort! Focus on the topics where you made mistakes to improve your score."
                      : "Keep practicing! Consider revisiting the fundamental concepts in this subject."}
                  </p>
                  <ul className="list-disc list-inside text-blue-600 text-sm">
                    <li>Review the questions you answered incorrectly</li>
                    <li>Practice more tests in the same subject</li>
                    <li>Consider creating flashcards for difficult concepts</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Confirmation Dialog */}
          {showConfirmation && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="absolute inset-0 bg-black opacity-50"></div>
              <div className="bg-white p-6 rounded-lg shadow-xl z-10 max-w-md w-full">
                <h3 className="text-xl font-bold mb-4">Submit Test?</h3>
                <p className="mb-4">
                  You have {getUnansweredCount()} unanswered questions. Are you sure you want to submit?
                </p>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={cancelSubmit}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmSubmit}
                    className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg"
                  >
                    Yes, Submit
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Mocktest;
                              