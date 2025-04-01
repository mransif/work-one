import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import Button from "./Button";
import BarChart from "./bar-chart";

const MainTest = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [currentSection, setCurrentSection] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(10800); // 3 hours in seconds
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [testResults, setTestResults] = useState(null);
  const [scoreHistorySubject, setScoreHistorySubject] = useState("ALL");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [markedForReview, setMarkedForReview] = useState({});
  const [visitedQuestions, setVisitedQuestions] = useState({});

  const { submitTestResult, mainTestScores } = useContext(AppContext);

  const sections = [
    { name: "MATHEMATICS", questionCount: 75, image: "/images/maths.jpg" },
    { name: "PHYSICS", questionCount: 45, image: "/images/physics.png" },
    { name: "CHEMISTRY", questionCount: 30, image: "/images/chemistry.jpg" },
  ];

  // This would be your question bank - for demonstration purposes adding sample questions
  // In a real implementation, you would likely fetch these from an API or database
  const sectionQuestions = {
    MATHEMATICS: Array(75).fill(null).map((_, i) => ({
      question: `Mathematics Question ${i + 1}: Sample question text for mathematics.`,
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: ["Option A", "Option B", "Option C", "Option D"][Math.floor(Math.random() * 4)]
    })),
    PHYSICS: Array(45).fill(null).map((_, i) => ({
      question: `Physics Question ${i + 1}: Sample question text for physics.`,
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: ["Option A", "Option B", "Option C", "Option D"][Math.floor(Math.random() * 4)]
    })),
    CHEMISTRY: Array(30).fill(null).map((_, i) => ({
      question: `Chemistry Question ${i + 1}: Sample question text for chemistry.`,
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: ["Option A", "Option B", "Option C", "Option D"][Math.floor(Math.random() * 4)]
    }))
  };

  const startTest = () => {
    // Prepare all questions from all sections
    let allQuestions = [];
    sections.forEach(section => {
      const sectionQs = sectionQuestions[section.name].map((q, idx) => ({
        ...q,
        section: section.name,
        sectionIndex: idx
      }));
      allQuestions = [...allQuestions, ...sectionQs];
    });

    setQuestions(allQuestions);
    setIsStarted(true);
    setSelectedAnswers({});
    setMarkedForReview({});
    setVisitedQuestions({});
    setTimeLeft(10800); // Reset timer to 3 hours (10800 seconds)
    setTestResults(null);
    setQuestionIndex(0);
    setVisitedQuestions(prev => ({...prev, 0: true}));
  };

  const handleOptionSelect = (option) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: option
    }));
  };

  const toggleMarkForReview = () => {
    setMarkedForReview(prev => ({
      ...prev,
      [questionIndex]: !prev[questionIndex]
    }));
  };

  const navigateQuestion = (index) => {
    if (index >= 0 && index < questions.length) {
      setQuestionIndex(index);
      setVisitedQuestions(prev => ({
        ...prev,
        [index]: true
      }));
    }
  };

  const evaluateAnswers = () => {
    let results = {
      MATHEMATICS: { correct: 0, total: 75 },
      PHYSICS: { correct: 0, total: 45 },
      CHEMISTRY: { correct: 0, total: 30 }
    };

    // Calculate scores for each section
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        results[question.section].correct += 1;
      }
    });

    const totalCorrect = results.MATHEMATICS.correct + results.PHYSICS.correct + results.CHEMISTRY.correct;
    const totalQuestions = results.MATHEMATICS.total + results.PHYSICS.total + results.CHEMISTRY.total;
    const percentScore = (totalCorrect / totalQuestions) * 100;

    setTestResults({
      sections: results,
      totalCorrect,
      totalQuestions,
      percentScore: percentScore.toFixed(2),
    });

    // Submit results for each section
    Object.keys(results).forEach(section => {
      submitTestResult(section, results[section].correct, results[section].total);
    });
  };

  useEffect(() => {
    if (isStarted && timeLeft > 0 && !testResults) {
      const timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !testResults) {
      evaluateAnswers(); // Auto-submit when time runs out
    }
  }, [isStarted, timeLeft, testResults]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const closeTest = () => {
    setIsStarted(false);
    setTestResults(null);
    setCurrentSection(null);
  };

  // Filter scores based on selected subject
  const filteredScores = scoreHistorySubject === "ALL"
    ? mainTestScores
    : mainTestScores.filter(score => score.setName === scoreHistorySubject);

  // Get subject color for bars and UI elements
  const getSubjectColor = (subject) => {
    switch (subject) {
      case "MATHEMATICS": return "bg-blue-500";
      case "PHYSICS": return "bg-purple-500";
      case "CHEMISTRY": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  // Get subject text color
  const getSubjectTextColor = (subject) => {
    switch (subject) {
      case "MATHEMATICS": return "text-blue-500";
      case "PHYSICS": return "text-purple-500";
      case "CHEMISTRY": return "text-green-500";
      default: return "text-gray-500";
    }
  };

  // Get question status color
  const getQuestionStatusColor = (index) => {
    if (markedForReview[index]) return "bg-yellow-400"; // Marked for review
    if (selectedAnswers[index] !== undefined) return "bg-green-500"; // Answered
    if (visitedQuestions[index]) return "bg-red-300"; // Visited but not answered
    return "bg-gray-300"; // Not visited
  };

  // Create chart items for performance visualization
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
        className: `rounded-md ${getSubjectColor(placeholderSubject).replace('bg-', 'bg-opacity-30 ')}`,
        label: `Future Test ${i + 1}`,
        progress: "0"
      }));

      return [...realItems, ...placeholders];
    }

    return realItems;
  };

  // Get current question's section
  const getCurrentQuestionSection = () => {
    if (!questions[questionIndex]) return null;
    return questions[questionIndex].section;
  };

  // Group questions by section for the question navigation panel
  const getQuestionsBySection = () => {
    const result = {};
    
    sections.forEach(section => {
      result[section.name] = questions.filter(q => q.section === section.name)
        .map((q, i) => ({
          globalIndex: questions.findIndex(question => 
            question.section === section.name && question.sectionIndex === i
          ),
          sectionIndex: i
        }));
    });
    
    return result;
  };

  return (
    <div className="min-h-screen bg-[#F4F8D3] bg-cover overflow-x-hidden flex flex-col items-center p-4"
      style={{ backgroundImage: "url(/images/test-bg.png)" }}
    >
      <h1 className="text-4xl font-bold m-3 text-[#37474F]">KEAM MAIN TEST</h1>
      
      {!isStarted && !testResults && (
        <div className="w-full max-w-4xl">
          {/* Test Information */}
          <div className="backdrop-blur-lg border border-gray-100 p-6 rounded-lg shadow-lg mb-8 bg-white bg-opacity-80">
            <h2 className="text-2xl font-bold text-[#37474F] mb-4">Examination Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex flex-col">
                <span className="text-gray-600 font-semibold">Total Questions:</span>
                <span className="text-xl font-bold">150</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-600 font-semibold">Total Duration:</span>
                <span className="text-xl font-bold">3 hours (180 minutes)</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-600 font-semibold">Marking Scheme:</span>
                <span className="text-lg">+4 for correct answers</span>
                <span className="text-lg">-1 for incorrect answers</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-600 font-semibold">Mode:</span>
                <span className="text-lg">Online CBT (Computer Based Test)</span>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold text-[#37474F] mb-2">Section-wise Question Distribution</h3>
            <div className="overflow-hidden bg-white rounded-lg shadow mb-4">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number of Questions</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Maximum Marks</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sections.map((section, idx) => (
                    <tr key={idx}>
                      <td className={`px-6 py-4 whitespace-nowrap font-medium ${getSubjectTextColor(section.name)}`}>
                        {section.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {section.questionCount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {section.questionCount * 4}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium">TOTAL</td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">150</td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">600</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <Button 
              click={startTest} 
              text="Begin Test" 
              className="mt-6 w-full md:w-auto py-3 px-8 text-lg font-bold bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300" 
            />
          </div>
          
          {/* Past Score Section */}
          {mainTestScores && mainTestScores.length > 0 && (
            <div className="w-full max-w-4xl rounded-xl shadow-xl p-8 backdrop-blur-lg border border-gray-100 bg-white bg-opacity-80">
              <div className="flex items-center mb-6">
                <div className="w-1 h-8 bg-blue-500 rounded-full mr-3"></div>
                <h2 className="text-2xl font-bold bg-clip-text text-[#37474F]">Previous Test Performance</h2>
              </div>

              {/* Subject Filter Dropdown */}
              <div className="mb-6">
                <label htmlFor="subject-filter" className="block text-sm font-medium text-gray-700 mb-2">
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

              {/* Performance Chart */}
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
        </div>
      )}

      {isStarted && !testResults && (
        <div className="fixed inset-0 bg-white overflow-hidden flex flex-col">
          {/* Top Bar with Timer and Subjects */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-3 flex justify-between items-center shadow-md">
            <div className="flex items-center">
              <h2 className="text-xl font-bold">KEAM Main Test</h2>
            </div>
            <div className="flex items-center space-x-6">
              {sections.map((section, idx) => (
                <div key={idx} className="text-center">
                  <span className={`text-sm font-semibold ${getCurrentQuestionSection() === section.name ? 'text-yellow-300' : ''}`}>
                    {section.name}
                  </span>
                  <div className="text-xs">
                    {questions.filter(q => q.section === section.name && selectedAnswers[questions.indexOf(q)] !== undefined).length}/{section.questionCount}
                  </div>
                </div>
              ))}
              <div className="bg-white text-blue-800 rounded-lg px-4 py-2 font-mono text-xl font-bold">
                {formatTime(timeLeft)}
              </div>
            </div>
          </div>

          <div className="flex flex-1 overflow-hidden">
            {/* Question Panel - Takes most of the space */}
            <div className="flex-1 p-6 overflow-y-auto">
              {questions[questionIndex] && (
                <div className="max-w-3xl mx-auto">
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                      <div className={`px-4 py-1 rounded-full font-medium ${getSubjectColor(questions[questionIndex].section)} text-white`}>
                        {questions[questionIndex].section}
                      </div>
                      <div className="text-gray-700">
                        Question {questionIndex + 1} of {questions.length}
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
                      <h3 className="text-lg font-semibold mb-4">
                        {questions[questionIndex].question}
                      </h3>
                      
                      <div className="space-y-3 mt-4">
                        {questions[questionIndex].options.map((option, idx) => (
                          <button
                            key={idx}
                            className={`w-full text-left p-3 border rounded-lg transition-all duration-200 hover:bg-gray-50 
                              ${selectedAnswers[questionIndex] === option ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                            onClick={() => handleOptionSelect(option)}
                          >
                            <div className="flex items-center">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 border ${
                                selectedAnswers[questionIndex] === option ? 'bg-blue-500 text-white border-blue-500' : 'border-gray-400'
                              }`}>
                                {['A', 'B', 'C', 'D'][idx]}
                              </div>
                              <div>{option}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex space-x-4 justify-between">
                      <button
                        onClick={() => navigateQuestion(questionIndex - 1)}
                        disabled={questionIndex === 0}
                        className={`py-2 px-6 rounded-lg font-medium ${
                          questionIndex === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
                        }`}
                      >
                        Previous
                      </button>
                      
                      <button
                        onClick={toggleMarkForReview}
                        className={`py-2 px-6 rounded-lg font-medium ${
                          markedForReview[questionIndex] ? 'bg-yellow-500 text-white' : 'border border-yellow-500 text-yellow-600 hover:bg-yellow-50'
                        }`}
                      >
                        {markedForReview[questionIndex] ? 'Marked for Review' : 'Mark for Review'}
                      </button>
                      
                      {questionIndex < questions.length - 1 ? (
                        <button
                          onClick={() => navigateQuestion(questionIndex + 1)}
                          className="bg-blue-500 text-white py-2 px-6 rounded-lg font-medium hover:bg-blue-600"
                        >
                          Next
                        </button>
                      ) : (
                        <button
                          onClick={evaluateAnswers}
                          className="bg-green-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-green-700"
                        >
                          Submit Test
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Question Navigation Panel */}
            <div className="w-72 bg-gray-100 p-4 overflow-y-auto hidden md:block border-l border-gray-200">
              <div className="mb-4">
                <h3 className="font-bold text-gray-700">Question Navigator</h3>
                <div className="flex space-x-3 mt-2 text-xs">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                    <span>Answered</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-300 mr-1"></div>
                    <span>Visited</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-yellow-400 mr-1"></div>
                    <span>Review</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                {sections.map((section, sectionIdx) => {
                  const sectionQuestions = getQuestionsBySection()[section.name] || [];
                  
                  return (
                    <div key={sectionIdx}>
                      <h4 className={`font-semibold ${getSubjectTextColor(section.name)} mb-2`}>
                        {section.name} ({sectionQuestions.filter(q => selectedAnswers[q.globalIndex] !== undefined).length}/{section.questionCount})
                      </h4>
                      <div className="grid grid-cols-5 gap-2">
                        {sectionQuestions.map((q) => (
                          <button
                            key={q.globalIndex}
                            className={`w-10 h-10 rounded flex items-center justify-center text-sm font-medium ${
                              questionIndex === q.globalIndex ? 'ring-2 ring-blue-500' : ''
                            } ${getQuestionStatusColor(q.globalIndex)} ${
                              selectedAnswers[q.globalIndex] || markedForReview[q.globalIndex] || visitedQuestions[q.globalIndex] ? 'text-white' : 'text-gray-700'
                            }`}
                            onClick={() => navigateQuestion(q.globalIndex)}
                          >
                            {q.sectionIndex + 1}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-8">
                <button
                  onClick={evaluateAnswers}
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition"
                >
                  Submit Test
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {testResults && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-90 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-3xl rounded-xl overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
              <h2 className="text-2xl font-bold">KEAM Main Test Results</h2>
              <p className="text-lg opacity-90">Your performance summary</p>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">Overall Performance</h3>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Score:</span>
                    <span className="text-xl font-bold">{testResults.totalCorrect} / {testResults.totalQuestions}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Percentage:</span>
                    <span className={`text-xl font-bold ${
                      parseFloat(testResults.percentScore) >= 70 ? 'text-green-600' : 
                      parseFloat(testResults.percentScore) >= 50 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {testResults.percentScore}%
                    </span>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-5 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">Time Taken</h3>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-700">
                      {formatTime(10800 - timeLeft)}
                    </div>
                    <div className="text-gray-500 mt-1">
                      out of 3 hours
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Subject-wise Performance</h3>
                <div className="overflow-hidden bg-white rounded-lg shadow-sm">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {Object.keys(testResults.sections).map((subject, idx) => {
                        const section = testResults.sections[subject];
                        const percentage = ((section.correct / section.total) * 100).toFixed(2);
                        let statusColor, statusText;
                        
                        if (parseFloat(percentage) >= 70) {
                          statusColor = "text-green-600";
                          statusText = "Excellent";
                        } else if (parseFloat(percentage) >= 50) {
                          statusColor = "text-yellow-600";
                          statusText = "Good";
                        } else {
                          statusColor = "text-red-600";
                          statusText = "Needs Improvement";
                        }
                        
                        return (
                          <tr key={idx}>
                            <td className={`px-6 py-4 whitespace-nowrap font-medium ${getSubjectTextColor(subject)}`}>
                              {subject}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {section.correct} / {section.total}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {percentage}%
                            </td>
                            <td className={`px-6 py-4 whitespace-nowrap font-medium ${statusColor}`}>
                              {statusText}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="flex justify-center">
                <Button
                  click={closeTest}
                  text="Return to Main Menu"
                  className="bg-blue-600 text-white py-3 px-8 rounded-lg font-bold hover:bg-blue-700 transition"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainTest;