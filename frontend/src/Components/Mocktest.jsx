import React, { useState } from 'react';

const MockTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [testSubmitted, setTestSubmitted] = useState(false);

  const mockQuestions = [
    {
      id: 1,
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correctAnswer: "Paris"
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correctAnswer: "Mars"
    },
    {
      id: 3,
      question: "What is 7 × 8?",
      options: ["54", "56", "62", "64"],
      correctAnswer: "56"
    }
  ];

  const handleAnswerSelect = (questionId, selectedOption) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: selectedOption
    }));
  };

  const moveToNextQuestion = () => {
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const moveToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const submitTest = () => {
    setTestSubmitted(true);
  };

  const calculateScore = () => {
    return mockQuestions.reduce((score, question) => {
      return selectedAnswers[question.id] === question.correctAnswer 
        ? score + 1 
        : score;
    }, 0);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg w-full max-w-md overflow-hidden">
        <div className="bg-gray-200 p-4 text-center">
          <h2 className="text-2xl font-bold">
            {testSubmitted ? "Test Results" : "Mock Test"}
          </h2>
        </div>
        
        <div className="p-6">
          {!testSubmitted ? (
            <>
              <div className="mb-4">
                <p className="font-semibold mb-2">
                  Question {currentQuestion + 1} of {mockQuestions.length}
                </p>
                <p className="text-lg mb-4">
                  {mockQuestions[currentQuestion].question}
                </p>
                
                <div className="space-y-3">
                  {mockQuestions[currentQuestion].options.map((option) => (
                    <button
                      key={option}
                      className={`w-full p-3 border rounded-lg text-left transition-colors duration-200 ${
                        selectedAnswers[mockQuestions[currentQuestion].id] === option 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-white hover:bg-gray-100'
                      }`}
                      onClick={() => handleAnswerSelect(mockQuestions[currentQuestion].id, option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between mt-6">
                <button 
                  className={`px-4 py-2 rounded ${
                    currentQuestion === 0 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                  onClick={moveToPreviousQuestion}
                  disabled={currentQuestion === 0}
                >
                  Previous
                </button>
                
                {currentQuestion === mockQuestions.length - 1 ? (
                  <button 
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={submitTest}
                  >
                    Submit Test
                  </button>
                ) : (
                  <button 
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={moveToNextQuestion}
                  >
                    Next
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="text-center">
              <p className="text-xl mb-4">
                Your Score: {calculateScore()} / {mockQuestions.length}
              </p>
              <button 
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => setTestSubmitted(false)}
              >
                Retake Test
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MockTest;