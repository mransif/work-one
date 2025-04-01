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
  // Mobile navigation panel state
  const [showMobileNav, setShowMobileNav] = useState(false);

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
    setShowMobileNav(false);
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
      // Close mobile nav when navigating on small screens
      setShowMobileNav(false);
    }
  };

  const goToPrevQuestion = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(currentQuestionIdx - 1);
      // Close mobile nav when navigating on small screens
      setShowMobileNav(false);
    }
  };

  const goToQuestion = (index) => {
    setCurrentQuestionIdx(index);
    setIsReviewMode(false);
    // Close mobile nav when selecting a specific question on small screens
    setShowMobileNav(false);
  };

  // Open confirmation dialog
  const handleSubmitClick = () => {
    setShowConfirmation(true);
    // Close mobile nav
    setShowMobileNav(false);
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

  // Toggle mobile navigation panel
  const toggleMobileNav = () => {
    setShowMobileNav(!showMobileNav);
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
      className="min-h-screen bg-[#F4F8D3] bg-cover overflow-x-hidden flex flex-col items-center p-2 sm:p-4"
      style={{ backgroundImage: "url(/images/mock-bg.png)" }}
    >
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold m-2 sm:m-3 text-[#37474F]">KEAM MOCK TEST</h1>

      {!selectedSubject && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-8 w-full max-w-4xl mb-6 sm:mb-8 px-2 sm:px-0">
            {subjects.map((subject, index) => (
              <div
                key={index}
                className="backdrop-blur-lg border border-gray-100 p-3 sm:p-4 md:p-6 rounded-lg shadow-lg flex flex-col items-center w-full md:w-[90%]"
              >
                <img
                  src={subject.image}
                  className="w-full h-32 sm:h-40 md:h-48 lg:h-56 object-cover rounded-lg shadow-md"
                  alt={subject.name}
                />
                <h3 className="mt-2 text-lg sm:text-xl font-semibold text-[#37474F]">
                  {subject.name}
                </h3>
                <StyledSplitButton
                  onClick={() => startTest(subject)}
                  startTest={startTest}
                  subject={subject}
                  className="mt-3 bg-blue-500 text-white py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg hover:bg-blue-600 transition text-sm sm:text-base"
                />
              </div>
            ))}
          </div>

          {/* Score History Section */}
          {scores.length > 0 && (
            <div className="w-full max-w-4xl rounded-xl shadow-xl p-4 sm:p-6 md:p-8 backdrop-blur-lg border border-gray-100 mx-2 sm:mx-0">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-1 h-6 sm:h-8 bg-blue-500 rounded-full mr-2 sm:mr-3"></div>
                <h2 className="text-xl sm:text-2xl font-bold bg-clip-text text-[#37474F]">
                  Your Score History
                </h2>
              </div>

              {/* Subject Filter Dropdown */}
              <div className="mb-4 sm:mb-6">
                <label
                  htmlFor="subject-filter"
                  className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2"
                >
                  Filter by Subject:
                </label>
                <div className="relative">
                  <select
                    id="subject-filter"
                    value={scoreHistorySubject}
                    onChange={(e) => setScoreHistorySubject(e.target.value)}
                    className="w-full sm:w-54 md:w-64 px-3 py-2 sm:px-4 sm:py-3 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent appearance-none"
                  >
                    <option value="ALL">All Subjects</option>
                    <option value="MATHEMATICS">Mathematics</option>
                    <option value="PHYSICS">Physics</option>
                    <option value="CHEMISTRY">Chemistry</option>
                  </select>
                </div>
              </div>

              {/* Score Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
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
                      className={`p-3 sm:p-4 md:p-5 rounded-lg shadow-md border-l-4 ${getSubjectColor(
                        score.setName
                      ).replace(
                        "bg-",
                        "border-"
                      )} bg-gradient-to-br ${bgGradient} hover:shadow-lg transition-shadow duration-300`}
                    >
                      <h3 className={`font-bold text-base sm:text-lg mb-1 sm:mb-2 ${textColor}`}>
                        {score.setName}
                      </h3>
                      <div className="flex justify-between items-center mb-2 sm:mb-3">
                        <span className="text-gray-600 font-medium text-sm sm:text-base">
                          Score:
                        </span>
                        <div className="flex items-center">
                          <span className="font-bold text-base sm:text-lg">
                            {score.score}
                          </span>
                          <span className="text-gray-500 mx-1">/</span>
                          <span className="text-gray-500">
                            {score.questions}
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3 mb-1 sm:mb-2 overflow-hidden">
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
                          className={`text-right text-xs sm:text-sm font-bold ${
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
              <div className="bg-white p-3 sm:p-4 md:p-6 rounded-xl shadow-md border border-gray-100">
                <div className="flex items-center mb-3 sm:mb-4">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                  </svg>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                    Performance Chart
                  </h3>
                </div>
                <div className="relative h-48 sm:h-56 md:h-64 w-full">
                  <BarChart height={window.innerWidth < 640 ? 180 : 230} items={createChartItems()} />
                </div>
                <div className="mt-2 sm:mt-4 text-xs text-gray-500 text-center">
                  Chart shows your test scores as percentage
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {selectedSubject && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-40">
          <div className="bg-white w-full h-full flex flex-col sm:flex-row overflow-hidden">
            {!testResults ? (
              // Responsive test interface
              <>
                {/* Mobile header with timer and question status toggle button */}
                <div className="sm:hidden flex justify-between items-center p-3 border-b bg-gray-50">
                  <div className="flex items-center">
                    <h2 className="text-lg font-bold">{selectedSubject.name}</h2>
                    <div className="ml-2">
                      <div 
                        className={`px-2 py-1 rounded-md text-sm font-semibold ${
                          isTimeLow ? "bg-red-100 text-red-600 animate-pulse" : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        {formatTime(timeLeft)}
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={toggleMobileNav}
                    className="bg-blue-500 text-white p-2 rounded-md flex items-center text-sm"
                  >
                    <span className="mr-1">Q {currentQuestionIdx + 1}/{questions.length}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                  </button>
                </div>

                {/* Main test area - Responsive layout */}
                <div className="flex-1 flex flex-col sm:flex-row w-full h-full overflow-hidden">
                  {/* Question area */}
                  <div className="flex-1 p-3 sm:p-4 overflow-y-auto flex flex-col h-full">
                    {/* Desktop header with timer - hidden on mobile */}
                    <div className="hidden sm:flex w-full justify-between items-center mb-4">
                      <h2 className="text-xl sm:text-2xl font-bold">
                        {selectedSubject.name}
                      </h2>
                      <div className="flex items-center gap-4">
                        <div 
                          className={`bg-blue-50 border border-blue-100 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg ${
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
                    <div className="flex-1 mb-4 sm:mb-6 p-3 sm:p-6 border rounded-lg shadow-md bg-white">
                      <div className="flex justify-between items-center mb-3 sm:mb-6">
                        <h3 className="font-semibold text-base sm:text-xl">
                          Question {currentQuestionIdx + 1}: 
                        </h3>
                        
                        {/* Progress indicator for mobile */}
                        <div className="sm:hidden text-sm text-gray-500">
                          {Object.keys(selectedAnswers).length}/{questions.length} answered
                        </div>
                      </div>
                      
                      <p className="mb-4 text-sm sm:text-base">
                        {questions[currentQuestionIdx]?.question}
                      </p>

                      <div className="space-y-2 sm:space-y-3">
                        {questions[currentQuestionIdx]?.options.map(
                          (option, idx) => (
                            <button
                              key={idx}
                              className={`w-full p-2 sm:p-4 border rounded-lg text-left flex items-center text-sm sm:text-base ${
                                selectedAnswers[currentQuestionIdx] === option
                                  ? "bg-blue-50 border-blue-500"
                                  : "hover:bg-gray-50"
                              }`}
                              onClick={() =>
                                handleOptionSelect(currentQuestionIdx, option)
                              }
                            >
                              <span className="inline-flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-100 text-gray-700 mr-2 sm:mr-3 text-sm">
                                {String.fromCharCode(65 + idx)}
                              </span>
                              {option}
                            </button>
                          )
                        )}
                      </div>

                      {/* Navigation buttons */}
                      <div className="flex justify-between mt-6 sm:mt-8">
                        <button
                          onClick={goToPrevQuestion}
                          className={`px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base ${
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
                          className="px-2 sm:px-4 py-1.5 sm:py-2 bg-yellow-100 hover:bg-yellow-200 rounded-lg text-yellow-800 text-sm sm:text-base"
                        >
                          Mark
                        </button>

                        <button
                          onClick={goToNextQuestion}
                          className={`px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base ${
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
                    
                    {/* Mobile Submit button - fixed at bottom on mobile */}
                    <div className="sm:hidden sticky bottom-0 left-0 right-0 p-3 bg-white border-t">
                      <button 
                        onClick={handleSubmitClick}
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 rounded-md transition-colors"
                      >
                        Submit Test
                      </button>
                    </div>
                  </div>

                  {/* Question status panel - Slide in on mobile */}
                  <div className={`
                    ${showMobileNav ? "translate-x-0" : "translate-x-full sm:translate-x-0"} 
                    fixed sm:relative top-0 right-0 h-full 
                    w-5/6 sm:w-64 bg-gray-50 border-l border-gray-200 p-3 sm:p-4 
                    overflow-y-auto z-20 transition-transform duration-300 ease-in-out
                    sm:block
                  `}>
                    {/* Mobile close button */}
                    <div className="sm:hidden flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">Question Status</h3>
                      <button 
                        onClick={toggleMobileNav}
                        className="p-2 text-gray-600 hover:bg-gray-200 rounded-full"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>

                    {/* Progress summary */}
                    <div className="mb-4 bg-white rounded-lg border p-3">
                      <h3 className="text-sm font-semibold mb-1.5">Progress</h3>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                        <div 
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${calculateProgress()}%` }}
                        ></div>
                      </div>

                      <div className="text-xs sm:text-sm grid grid-cols-2 gap-2">
                        {/* Question counters */}
                        <div className="flex items-center gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <span>Answered: {getQuestionCounts().answered + getQuestionCounts().answeredMarked}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-red-100"></div>
                          <span>Not Answered: {getQuestionCounts().notAnswered}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-gray-200"></div>
                          <span>Not Visited: {getQuestionCounts().notVisited}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-yellow-100 border border-yellow-400"></div>
                          <span>Marked: {getQuestionCounts().marked + getQuestionCounts().answeredMarked}</span>
                        </div>
                      </div>
                    </div>

                    {/* Question navigation grid */}
                    <div className="mb-4 bg-white rounded-lg border p-3">
                      <h3 className="text-sm font-semibold mb-2 flex items-center">
                        <span>Question Navigation</span>
                      </h3>
                      <div className="grid grid-cols-5 gap-1.5">
                        {questionStatus.map((status, index) => (
                          <button
                            key={index}
                            onClick={() => goToQuestion(index)}
                            className={`
                              w-full aspect-square flex items-center justify-center 
                              text-xs rounded-md ${getStatusColorClass(status)}
                              ${currentQuestionIdx === index ? 'ring-2 ring-blue-500' : ''}
                            `}
                          >
                            {index + 1}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Desktop Submit button */}
                    <div className="hidden sm:block mt-auto">
                      <button 
                        onClick={handleSubmitClick}
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 rounded-md"
                      >
                        Submit Test
                      </button>
                    </div>
                  </div>
                </div>

                {/* Confirmation Dialog */}
                {showConfirmation && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-5 max-w-sm w-full mx-4">
                      <h3 className="text-lg font-bold mb-4">Confirm Submission</h3>
                      <p className="mb-4">
                        {getUnansweredCount() > 0 
                          ? `You have ${getUnansweredCount()} unanswered questions. Are you sure you want to submit?` 
                          : "Are you sure you want to submit your test?"}
                      </p>
                      <div className="flex justify-end gap-3">
                        <button 
                          onClick={cancelSubmit}
                          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button 
                          onClick={confirmSubmit}
                          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              // Test Results
              <div className="flex-1 p-4 sm:p-6 md:p-10 overflow-y-auto">
                <div className="max-w-4xl mx-auto">
                  <div className="bg-white shadow-md rounded-xl p-5 sm:p-8 mb-8">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                          Test Results
                        </h2>
                        <p className="text-gray-500">
                          {selectedSubject.name} - {new Date().toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        onClick={closeTest}
                        className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 text-sm sm:text-base"
                      >
                        Close
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex flex-col items-center justify-center">
                        <p className="text-sm text-blue-600 font-medium mb-1">Total Questions</p>
                        <p className="text-2xl sm:text-3xl font-bold">{testResults.totalQuestions}</p>
                      </div>
                      <div className="bg-green-50 border border-green-100 rounded-lg p-4 flex flex-col items-center justify-center">
                        <p className="text-sm text-green-600 font-medium mb-1">Correct Answers</p>
                        <p className="text-2xl sm:text-3xl font-bold">{testResults.correctAnswers}</p>
                      </div>
                      <div className="bg-purple-50 border border-purple-100 rounded-lg p-4 flex flex-col items-center justify-center">
                        <p className="text-sm text-purple-600 font-medium mb-1">Score Percentage</p>
                        <p className="text-2xl sm:text-3xl font-bold">{testResults.percentScore}%</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-4">Question Analysis</h3>
                      <div className="space-y-4">
                        {testResults.answers.map((answer, index) => (
                          <div
                            key={index}
                            className={`border rounded-lg p-4 ${
                              answer.isCorrect
                                ? "bg-green-50 border-green-100"
                                : "bg-red-50 border-red-100"
                            }`}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-medium text-base sm:text-lg">
                                Question {index + 1}
                              </h4>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  answer.isCorrect
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {answer.isCorrect ? "Correct" : "Incorrect"}
                              </span>
                            </div>
                            <p className="text-sm sm:text-base mb-2">{answer.question}</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                              <div className="flex items-center">
                                <span className="font-medium mr-2">Your Answer:</span>
                                <span
                                  className={
                                    answer.isCorrect
                                      ? "text-green-600"
                                      : "text-red-600"
                                  }
                                >
                                  {answer.userAnswer}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <span className="font-medium mr-2">Correct Answer:</span>
                                <span className="text-green-600">
                                  {answer.correctAnswer}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Mocktest;