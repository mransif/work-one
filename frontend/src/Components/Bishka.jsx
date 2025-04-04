import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import Button from "./Button";
import StyledSplitButton from "./StyledSplitButton";
import BarChart from "./bar-chart";
import { LatexQuestion, LatexOption } from "./LatexParser"; // Import the new LaTeX components

const Mocktest = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [testResults, setTestResults] = useState(null);
  const [scoreHistorySubject, setScoreHistorySubject] = useState("ALL");
  const [isTimeLow, setIsTimeLow] = useState(false);

  const { submitMockTestResult, scores } = useContext(AppContext);

  const subjects = [
    { name: "MATHEMATICS", image: "/images/maths.jpg" },
    { name: "PHYSICS", image: "/images/physics.png" },
    { name: "CHEMISTRY", image: "/images/chemistry.jpg" },
  ];

  // Updated questions with LaTeX format
  const subjectQuestions = {
    MATHEMATICS: [
      {
        question: "If $f(x) = x^2 + 3x + 2$, find $f(-1)$.",
        options: ["$0$", "$2$", "$6$", "$-2$"],
        correctAnswer: "$0$",
      },
      {
        question: "What is the derivative of $\\sin(x)$?",
        options: ["$\\cos(x)$", "$-\\sin(x)$", "$-\\cos(x)$", "$\\sec^2(x)$"],
        correctAnswer: "$\\cos(x)$",
      },
      {
        question:
          "Evaluate the definite integral: $\\int_{0}^{\\pi} \\sin(x) dx$",
        options: ["$0$", "$1$", "$2$", "$\\pi$"],
        correctAnswer: "$2$",
      },
      {
        question: "Solve the equation: $x^2 - 5x + 6 = 0$",
        options: [
          "$x = 2, x = 3$",
          "$x = -2, x = -3$",
          "$x = 2, x = -3$",
          "$x = -2, x = 3$",
        ],
        correctAnswer: "$x = 2, x = 3$",
      },
      {
        question:
          "If $\\vec{a} = 3\\hat{i} + 2\\hat{j}$ and $\\vec{b} = -\\hat{i} + 4\\hat{j}$, find $\\vec{a} \\cdot \\vec{b}$",
        options: ["$5$", "$-3$", "$8$", "$11$"],
        correctAnswer: "$5$",
      },
    ],
    PHYSICS: [
      {
        question: "What is the SI unit of electric current?",
        options: ["Ampere", "Watt", "Volt", "Ohm"],
        correctAnswer: "Ampere",
      },
      {
        question:
          "Newton's second law can be expressed as $\\vec{F} = m\\vec{a}$. What does $m$ represent?",
        options: ["Mass", "Momentum", "Moment", "Magnetic field"],
        correctAnswer: "Mass",
      },
      {
        question: "The equation $E = mc^2$ represents:",
        options: [
          "Conservation of momentum",
          "Mass-energy equivalence",
          "Gravitational potential energy",
          "Kinetic energy",
        ],
        correctAnswer: "Mass-energy equivalence",
      },
      {
        question:
          "According to Coulomb's law, the force between two charges is $F = k\\frac{q_1q_2}{r^2}$. If the distance is doubled, the force becomes:",
        options: [
          "Twice as large",
          "Half as large",
          "One-fourth as large",
          "Four times as large",
        ],
        correctAnswer: "One-fourth as large",
      },
      {
        question:
          "A harmonic oscillator has the displacement equation $x = A\\sin(\\omega t + \\phi)$. What is the physical meaning of $\\omega$?",
        options: [
          "Angular frequency",
          "Amplitude",
          "Time period",
          "Phase angle",
        ],
        correctAnswer: "Angular frequency",
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
      {
        question:
          "In the reaction $2H_2 + O_2 \\rightarrow 2H_2O$, what is the coefficient of $O_2$?",
        options: ["1", "2", "3", "4"],
        correctAnswer: "1",
      },
      {
        question: "What is the hybridization of carbon in $CH_4$?",
        options: ["$sp^3$", "$sp^2$", "$sp$", "$d^2sp^3$"],
        correctAnswer: "$sp^3$",
      },
      {
        question:
          "The equilibrium constant expression for $N_2 + 3H_2 \\rightleftharpoons 2NH_3$ is:",
        options: [
          "$K_c = \\frac{[NH_3]^2}{[N_2][H_2]^3}$",
          "$K_c = \\frac{[N_2][H_2]^3}{[NH_3]^2}$",
          "$K_c = \\frac{[NH_3]}{[N_2][H_2]}$",
          "$K_c = [NH_3]^2 - [N_2][H_2]^3$",
        ],
        correctAnswer: "$K_c = \\frac{[NH_3]^2}{[N_2][H_2]^3}$",
      },
    ],
  };

  // Function to shuffle array (Fisher-Yates algorithm)
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const startTest = (subject) => {
    // Select 20 random questions from the subject
    const selectedQuestions = shuffleArray(
      subjectQuestions[subject.name]
    ).slice(0, 20);

    // Shuffle the options for each question and create a new questions array with shuffled options
    const questionsWithShuffledOptions = selectedQuestions.map((q) => {
      const shuffledOptions = shuffleArray(q.options);
      return {
        ...q,
        options: shuffledOptions,
      };
    });

    setSelectedSubject(subject);
    setQuestions(questionsWithShuffledOptions);
    setSelectedAnswers({});
    setTimeLeft(1200); // Reset timer to 20 minutes
    setTestResults(null);
    setIsTimeLow(false);
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

          {/* Score History Section - Unchanged */}
          {/* ...existing score history code... */}
        </>
      )}

      {selectedSubject && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-40">
          <div className="bg-[#F4F8D3] w-full h-full p-6 overflow-y-auto flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-4">{selectedSubject.name}</h2>

            {!testResults ? (
              <>
                {/* Timer with visual indication when time is low */}
                <div className="w-full max-w-2xl mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <p
                      className={`text-xl font-semibold ${
                        isTimeLow
                          ? "text-red-600 animate-pulse"
                          : "text-[#37474F]"
                      }`}
                    >
                      Time Left: {formatTime(timeLeft)}
                    </p>
                    <p className="text-sm text-gray-600">
                      {Object.keys(selectedAnswers).length} of{" "}
                      {questions.length} answered
                    </p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div
                      className="h-full rounded-full bg-blue-500"
                      style={{ width: `${calculateProgress()}%` }}
                    ></div>
                  </div>
                </div>

                <div className="w-full max-w-2xl">
                  {questions.map((q, index) => (
                    <div
                      key={index}
                      className="mb-4 p-4 border rounded-lg shadow bg-white"
                    >
                      <p className="font-semibold flex">
                        <span className="inline-block bg-blue-500 text-white rounded-full w-6 h-6 text-center mr-2 flex-shrink-0">
                          {index + 1}
                        </span>
                        <LatexQuestion question={q.question} />
                      </p>
                      <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                        {q.options.map((option, idx) => (
                          <button
                            key={idx}
                            className={`p-2 border rounded-lg ${
                              selectedAnswers[index] === option
                                ? "bg-blue-200 border-blue-500"
                                : "hover:bg-gray-100"
                            } flex items-center justify-center`}
                            onClick={() => handleOptionSelect(index, option)}
                          >
                            <LatexOption option={option} />
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  click={evaluateAnswers}
                  text="Submit Test"
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg font-semibold"
                />
              </>
            ) : (
              <div className="text-center bg-white p-6 rounded-lg shadow-md max-w-2xl w-full">
                <h3 className="text-2xl font-bold mb-4">Test Results</h3>

                {/* Results content - Update to use LaTeX parsing for review section */}
                <div className="mb-6">
                  <div className="inline-block p-6 rounded-full bg-blue-50 mb-4">
                    <span className="text-4xl font-bold text-blue-600">
                      {testResults.percentScore}%
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-left mb-6">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-gray-500 text-sm">Subject</p>
                      <p className="font-semibold">{testResults.subject}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-gray-500 text-sm">Score</p>
                      <p className="font-semibold">
                        {testResults.correctAnswers} /{" "}
                        {testResults.totalQuestions}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-center gap-4 mt-6">
                    <Button
                      click={closeTest}
                      text="Close"
                      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold"
                    />
                    <Button
                      click={() => {
                        // Implement review functionality if needed
                        setTestResults({ ...testResults, showReview: true });
                      }}
                      text="Review Answers"
                      className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-6 rounded-lg font-semibold"
                    />
                  </div>
                </div>

                {/* Review section with LaTeX support */}
                {testResults.showReview && (
                  <div className="mt-8 text-left">
                    <h4 className="text-xl font-semibold mb-4 border-b pb-2">
                      Review Your Answers
                    </h4>

                    <div className="space-y-4">
                      {testResults.answers.map((answer, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded-lg border ${
                            answer.isCorrect
                              ? "border-green-200 bg-green-50"
                              : "border-red-200 bg-red-50"
                          }`}
                        >
                          <div className="font-medium mb-2 flex">
                            <span className="mr-2">{index + 1}.</span>
                            <LatexQuestion question={answer.question} />
                          </div>
                          <div className="grid grid-cols-1 gap-1 text-sm">
                            <p className="flex">
                              <span className="text-gray-600 mr-2">
                                Your answer:{" "}
                              </span>
                              <span
                                className={
                                  answer.isCorrect
                                    ? "text-green-600 font-medium"
                                    : "text-red-600 font-medium"
                                }
                              >
                                <LatexOption option={answer.userAnswer} />
                              </span>
                            </p>
                            {!answer.isCorrect && (
                              <p className="flex">
                                <span className="text-gray-600 mr-2">
                                  Correct answer:{" "}
                                </span>
                                <span className="text-green-600 font-medium">
                                  <LatexOption option={answer.correctAnswer} />
                                </span>
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Mocktest;
