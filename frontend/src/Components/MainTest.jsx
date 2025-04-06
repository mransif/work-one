import React, { useState, useEffect, useContext, useRef } from "react";
import { AppContext } from "../context/AppContext";
import Button from "./Button";
import BarChart from "./bar-chart";
import StyledSplitButton from "./StyledSplitButton";

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
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const sidebarRef = useRef(null);

  const { submitTestResult, mainTestScores, getMainTestScores, userId } = useContext(AppContext);

  const sections = [
    { name: "MATHEMATICS", questionCount: 75, image: "/images/maths.jpg" },
    { name: "PHYSICS", questionCount: 45, image: "/images/physics.png" },
    { name: "CHEMISTRY", questionCount: 30, image: "/images/chemistry.jpg" },
  ];

  // Close sidebar when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) &&
        !event.target.closest('.mobile-nav-toggle')) {
        setMobileNavOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarRef]);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (mobileNavOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileNavOpen]);

  // Fetch main test scores when component mounts
  useEffect(() => {
    if (userId) {
      getMainTestScores();
    }
  }, [userId, getMainTestScores]);


  const sectionQuestions = {
    MATHEMATICS: [
      {
        "question": "If (a² + b² = 1), then (1 + (a - i b)) / (1 + (a + i b)) =",
        "options": ["a - i b", "a + i b", "-a + i b", "-a - i b"],
        "correctAnswer": "a - i b"
      },
      {
        "question": "The range of the function f(x) = 8 + √(x - 5) is",
        "options": ["(-∞, 5]", "[5, ∞)", "(-∞, 5] ∪ [8, ∞)", "[5, 8]", "[8, ∞)"],
        "correctAnswer": "[8, ∞)"
      },
      {
        "question": "( (1 + i) / sqrt(2) )²⁰²⁴ =",
        "options": ["4", "2^1012", "1", "sqrt(2)", "2^2024"],
        "correctAnswer": "1"
      },
      {
        "question": "The number of positive integers that have at most seven digits and contain only the digits 0 and 9 is",
        "options": ["112", "127", "136", "142", "150"],
        "correctAnswer": "127"
      },
      {
        "question": "The sum of first 20 terms of the G.P √3 + (-1 / √3) + (1 / 3 √3) + (-1 / 3² √3) + ⋯ is equal to",
        "options": ["(√3 / 4) * ((3²⁰ - 1) / 3¹⁹)", "(√3 / 2) * ((3²⁰ - 1) / 3¹⁹)", "(√3 / 4) * ((3²⁰ - 1) / 3²⁰)", "√3 * ((3²⁰ - 1) / 3¹⁹)", "(√3 / 2) * ((3²⁰ - 1) / 3²⁰)"],
        "correctAnswer": "(√3 / 4) * ((3²⁰ - 1) / 3²⁰)"
      },
      {
        "question": "Integral of (x⁴ - 8 x² + 16 x) * (4 x³ - 16 x + 16) dx =",
        "options": ["x⁴ + 4 x³ - 8 x² + 16 x + 7 + C", "(1/2) * (x⁴ - 8 x² + 16 x)² + C", "(1/2) * (x⁴ - 8 x² + 16 x)² + C", "(1/2) * (x⁴ - 8 x² + 16 x)² + C", "(1/4) * (x⁴ - 8 x² + 16 x)² + C"],
        "correctAnswer": "(1/2) * (x⁴ - 8 x² + 16 x)² + C"
      },
      {
        "question": "Let [x] be the greatest integer less than or equal to x. Then lim (x → 0⁻) (x * ([x] + |x|)) / |x| =",
        "options": ["-1", "-2", "0", "1", "2"],
        "correctAnswer": "1"
      },
      {
        "question": "Let A = {1, 3, 5, 7, ..., 21}. The number of ways 4 numbers, containing always 11, can be selected from the set A is equal to",
        "options": ["120", "160", "240", "260", "320"],
        "correctAnswer": "120"
      },
      {
        "question": "The relation R in the set of integers Z is given by R = {(a, b): b = 2 a + 3}. Then the relation R is",
        "options": ["reflexive, symmetric and transitive", "neither reflexive nor symmetric nor transitive", "not reflexive but symmetric and transitive", "reflexive and symmetric but not transitive", "reflexive but not symmetric and transitive"],
        "correctAnswer": "neither reflexive nor symmetric nor transitive"
      },
      {
        "question": "The value of the sum ∑(k = 0 to 48) (1 / ((k + 1) * (k + 2))) is equal to",
        "options": ["51 / 50", "51 / 49", "49 / 50", "48 / 49", "50 / 49"],
        "correctAnswer": "49 / 50"
      },
      {
        "question": "If x = 5 tan t and y = 5 sec t, then dy / dx at t = pi / 3 =",
        "options": ["1/2", "1/4", "sqrt(3)/2", "1/sqrt(3)", "sqrt(3)"],
        "correctAnswer": "sqrt(3)/2"
      },
      {
        "question": "The area bounded by the curves y = x² and y = 2 x in the first quadrant is equal to",
        "options": ["2/3", "4/3", "1/3", "8/3", "7/3"],
        "correctAnswer": "4/3"
      },
      {
        "question": "If two dice are rolled simultaneously, then the probability that the difference of the numbers on the two dice equals to zero is",
        "options": ["1 / 12", "1 / 9", "5 / 36", "7 / 36", "1 / 6"],
        "correctAnswer": "1 / 6"
      },
      {
        "question": "Let A and B be two events. If P(A) = 0.49, P(B) = 0.3 and P(A | B') = 0.4, then P(A | B) is equal to",
        "options": ["0.45", "0.28", "0.4", "0.7", "0.3"],
        "correctAnswer": "0.4"
      },
      {
        "question": "tan x - cot x + cosec x sec x =",
        "options": ["2 tan x", "2 cosec x sec x", "2 tan x sec x", "2 cot x", "2 cot x cosec x"],
        "correctAnswer": "2 tan x"
      },
      {
        "question": "The value of tan(cos⁻¹(-24 / 25)) is equal to",
        "options": ["7 / 24", "-7 / 24", "-7 / 25", "-24 / 7", "24 / 7"],
        "correctAnswer": "-7 / 24"
      },
      {
        "question": "Integral of (sec x) / ((sec + tan x)²) dx =",
        "options": ["2 / (5 * (sec x + tan x)⁴) + C", "-1 / (2 * (sec x + tan x)²) + C", "2 / (3 * (sec x + tan x)^(3/2)) + C", "-2 / (3 * (sec x + tan x)³) + C", "(sec x + tan x)² + C"],
        "correctAnswer": "-1 / (2 * (sec x + tan x)²) + C"
      },
      {
        "question": "If Integral of x e^(-x) dx = M e^(-x) + C, where C is an arbitrary constant, then M =",
        "options": ["-(1 + x)", "1 + x", "-2 x", "x²", "2"],
        "correctAnswer": "-(1 + x)"
      },
      {
        "question": "The value of Integral from -4 to -2 of [(x + 3)³ + 2 + (x + 3) cos (x + 3)] dx is equal to",
        "options": ["3", "-2", "-1", "1", "4"],
        "correctAnswer": "4"
      },
      {
        "question": "The equation of the parabola with focus at (3, 1) and vertex at (5, 1) is",
        "options": ["(y - 1)² = -8(x - 5)", "(y - 1)² = 8(x - 5)", "(y - 1)² = 8(x - 3)", "(y - 1)² = -8(x - 3)", "(y - 1)² = -4(x - 5)"],
        "correctAnswer": "(y - 1)² = -8(x - 5)"
      },
      {
        "question": "The eccentricity of the ellipse p x² + 5 y² = 80, where p > 5, is √3 / 2. Then the value of p is equal to",
        "options": ["5 / 8", "16", "5 / 4", "20", "25"],
        "correctAnswer": "20"
      },
      {
        "question": "For an ellipse the foci are F(3, 0) and F'(-3, 0). If the length of the minor axis is 8, then the length of the major axis is equal to",
        "options": ["16", "15", "14", "12", "10"],
        "correctAnswer": "10"
      },
      {
        "question": "If (a, -6) lies on the perpendicular bisector of the line segment joining (-2, -1) and (4, -13), then the value of a is equal to",
        "options": ["1", "-2", "2", "-3", "3"],
        "correctAnswer": "3"
      },
      {
        "question": "Integral from -500 to 500 of log_e ((1000 + x) / (1000 - x)) dx =",
        "options": ["1000", "log_e 1000", "log_e 500", "0", "1 / 1000"],
        "correctAnswer": "0"
      },
      {
        "question": "When y = v x, the differential equation dy / dx = (y / x) + (f(y / x) / f'(y / x)) reduces to",
        "options": ["(f(v) / f'(v)) dv = (1 / x) dx", "(f'(v) / f(v)) dv = x dx", "(f'(v) / f(v)) dv = (1 / x) dx", "f'(v) f(v) dv = x dx", "f'(v) f(v) dv = (1 / x) dx"],
        "correctAnswer": "(f'(v) / f(v)) dv = (1 / x) dx"
      },
      {
        "question": "The integrating factor of (1 + 2 e^(-x)) * (dy / dx) - 2 e^(-x) y = 1 + e^(-x) is",
        "options": ["2 e^(-x)", "1 + e^(-x)", "1 - e^(-x)", "1 - 2 e^(-x)", "1 + 2 e^(-x)"],
        "correctAnswer": "1 + 2 e^(-x)"
      },
      {
        "question": "Let A(0, 3, -3), B(1, 1, 1) and C(2, 0, 3) be three points in space. Then the projection of AB on AC is equal to",
        "options": ["26 / 7", "32 / 7", "34 / 7", "24 / 7", "20 / 7"],
        "correctAnswer": "32 / 7"
      },
      {
        "question": "If a = 5 i - 7 j + 9 k and b = -5 i + 7 j - 9 k, then a . (a × b) + (a + b) . b is equal to",
        "options": ["50", "-50", "49", "-49", "0"],
        "correctAnswer": "0"
      },
      {
        "question": "The line joining the points (2, 2, 2) and (6, 6, 6) meets the line (x - 1) / 3 = (y - 2) / 2 = (z - 5) / -1 at the point",
        "options": ["(1, 1, 1)", "(2, 2, 2)", "(3, 3, 3)", "(4, 4, 4)", "(6, 6, 6)"],
        "correctAnswer": "(4, 4, 4)"
      },
      {
        "question": "The angle between the vectors a and b is π / 3. If |a . b|² = 15, then |a × b|² is equal to",
        "options": ["5", "15 √3", "15 / √3", "5 √3", "45"],
        "correctAnswer": "45"
      },
      {
        "question": "The solution of e^(d y / d x) = x + 2 is",
        "options": ["y = (x + 2) log (x + 2) + x + C", "y = (x + 2) log (x + 2) - x + C", "y = (x + 1) log (x + 1) - x + C", "y = (x + 1) log (x + 1) + x + C", "y = (x + 1) log (x + 1) + C"],
        "correctAnswer": "y = (x + 2) log (x + 2) - x + C"
      },
      {
        "question": "The solution of (dy / cos y) = dx is",
        "options": ["log |sec y - tan y| = x + C", "x + sec y + tan y = C", "sec y + tan y = x + C", "log |sec x + tan y| = sec y + x + C", "log |sec y + tan y| = x + C"],
        "correctAnswer": "log |sec y + tan y| = x + C"
      },
      {
        "question": "The solution of (y cos y + sin y) dy = (2 x log x + x) dx is",
        "options": ["y sin x = x² log x + C", "y sin y = x log x + C", "y sin y = x² log x + C", "sin x = x² log x + C", "y sin x = x log x + C"],
        "correctAnswer": "y sin y = x² log x + C"
      },
      {
        "question": "Let f(x) = a x³ + b x² + c x + d. If f has a local maximum value 21 at x = -1 and a local minimum value 7 at x = 1, then f(0) is equal to",
        "options": ["10", "11", "12", "13", "14"],
        "correctAnswer": "14"
      },
      {
        "question": "The value of ∫(-2 to 2) x |x| dx is equal to",
        "options": ["1 / 8", "1 / 4", "-1 / 4", "-1 / 8", "0"],
        "correctAnswer": "0"
      },
      {
        "question": "∫ x⁵ e^(x³) dx =",
        "options": ["(e^(x³) / 3) * (x³ - 1) + C", "(e^(x³) / 5) * (x² - 1) + C", "(e^(x³) / 4) * (x⁴ - 1) + C", "(e^(x³) / 3) * (x⁵ - 1) + C", "(x³ e^(x³)) / 3 + C"],
        "correctAnswer": "(e^(x³) / 3) * (x³ - 1) + C"
      },
      {
        "question": "lim (x → 6) ((√(x² + 13) - 7) / (x² - 36)) =",
        "options": ["1 / 7", "1 / 13", "13 / 36", "1 / 14", "1 / 36"],
        "correctAnswer": "1 / 14"
      },
      {
        "question": "If x⁴ + 2 √(y + 1) = 3, then dy / dx at (1, 0) is equal to",
        "options": ["4", "2", "-4", "-2", "-1 / 8"],
        "correctAnswer": "-4"
      },
      {
        "question": "The area enclosed by the curve x = 3 cos theta, y = 5 sin theta, 0 <= theta <= 2 pi is equal to",
        "options": ["15 pi", "2 pi", "4 pi", "8 pi", "10 pi"],
        "correctAnswer": "15 pi"
      },
      {
        "question": "lim (x → 0) of (sin (pi sin² x)) / x² =",
        "options": ["2 pi", "pi²", "2 pi²", "pi / 2"],
        "correctAnswer": "pi / 2"
      },
      {
        "question": "If lim (x → 1) of (x² - a x - b) / (x - 1) = 5, then a + b =",
        "options": ["0", "5", "-1", "-5", "1"],
        "correctAnswer": "-5"
      },
      {
        "question": "Integral of dx / (x⁵ * (1 / x⁷ + 1)²^(2 / 3)) =",
        "options": ["(3 / 7) * (1 / x⁷ + 1)²^(2 / 3) + C", "-(3 / 7) * (1 / x⁷ + 1)²^(2 / 3) + C", "-(3 / 7) * (1 / x⁷ + 1)¹^(1 / 3) + C", "(3 / 7) * (1 / x⁷ + 1)¹^(1 / 3) + C", "(7 / 3) * (1 / x⁷ + 1)²^(2 / 3) + C"],
        "correctAnswer": "-(3 / 7) * (1 / x⁷ + 1)¹^(1 / 3) + C"
      },
      {
        "question": "The value of Integral from 0 to pi / 2 of (cos⁶ 15° + cos⁶ 15°) is equal to",
        "options": ["pi / 4", "pi / 2", "2 pi", "pi", "pi / 3"],
        "correctAnswer": "pi / 4"
      },
      {
        "question": "Let α and β be real numbers such that f(x) = (2 x² + 4 x + α, if x < 1; β x² + 5, if x ≥ 1) is differentiable at x = 1. Then α + β is equal to",
        "options": ["5", "6", "7", "8", "9"],
        "correctAnswer": "7"
      },
      {
        "question": "If f(x) = x² + 2 x f'(1) + f''(2) for all x, then f(0) is equal to",
        "options": ["4", "3", "2", "1", "0"],
        "correctAnswer": "2"
      },
      {
        "question": "The function f(x) = 6 x⁴ - 3 x² - 5 is increasing in the set",
        "options": ["(-∞, -1 / 2) ∪ (1 / 2, 1)", "(-1 / 2, 0) ∪ (1 / 2, ∞)", "(-1 / 2, 1 / 2)", "(-∞, 1 / 2)", "(-∞, -1 / 2) ∪ (1 / 2, ∞)"],
        "correctAnswer": "(-1 / 2, 0) ∪ (1 / 2, ∞)"
      },
      {
        "question": "Let N be the set of all natural numbers. Let R be a relation defined on N given by a R b if and only if a + 2 b = 11. Then the relation R is",
        "options": ["reflexive but not symmetric", "not reflexive but symmetric", "reflexive and symmetric", "neither reflexive nor symmetric", "an equivalence relation"],
        "correctAnswer": "neither reflexive nor symmetric"
      },
      {
        "question": "If R = {(x, y) : x, y in Z, x² + 3 y² <= 7} is a relation on the set of integers Z, then the range of the relation R is",
        "options": ["{0, 1}", "{1, -1}", "{0, -1}", "{1}", "{0, -1, 1}"],
        "correctAnswer": "{0, -1, 1}"
      },
      {
        "question": "Let f(x) = |sin x| + |cos x|, x in R. The period of f(x) is",
        "options": ["2 pi", "pi", "pi / 4", "pi / 2", "3 pi / 2"],
        "correctAnswer": "pi / 2"
      },
      {
        "question": "Let a, b, c be positive numbers such that a b c = 1. Then the minimum value of a + b + c is",
        "options": ["8", "4", "6", "2", "3"],
        "correctAnswer": "3"
      },
      {
        "question": "The coefficient of x³ in the expansion of 1 / (1 + 2 x)^(-10) is",
        "options": ["980", "960", "1020", "860", "880"],
        "correctAnswer": "960"
      },
      {
        "question": "The sum up to n terms of 1 / sqrt(1 + sqrt(6)) + 1 / sqrt(6 + sqrt(11)) + ... is",
        "options": ["(1 / 5) * [sqrt(5 n + 1)]", "(1 / 5) * [sqrt(5 n + 1) + 1]", "(1 / 5) * [sqrt(5 n + 1) - 1]", "(1 / 6) * [sqrt(6 n + 1)]", "(1 / 7) * [sqrt(7 n + 1) - 1]"],
        "correctAnswer": "(1 / 5) * [sqrt(5 n + 1) - 1]"
      },
      {
        "question": "Sum from n = 1 to 24 of (i^n + i^(n + 1)) =",
        "options": ["1 + i", "i", "1 - i", "0", "1"],
        "correctAnswer": "0"
      },
      {
        "question": "Number of integers greater than 7000 can be formed using the digits 2, 4, 5, 7, 8 is (Repetition of digits is not allowed)",
        "options": ["120", "168", "144", "108", "124"],
        "correctAnswer": "168"
      },
      {
        "question": "The coefficient of x^17 in (1 - x)^13 * (1 + x + x²)^12 is",
        "options": ["C(12, 6)", "C(9, 7)", "0", "1", "C(12, 4)"],
        "correctAnswer": "0"
      },
      {
        "question": "Let A be a symmetric matrix and B be a skew symmetric. If A + B = (1, 3; -2, 5), then A - B is equal to",
        "options": ["(1, 3; -2, 5)", "(1, -2; 3, -5)", "(1, -2; -3, -5)", "(1, -2; 3, 5)", "(-1, 3; 2, -5)"],
        "correctAnswer": "(1, -2; 3, 5)"
      },
      {
        "question": "If A = (x, 2; 2, x) and det(A²) = 25, then x is equal to",
        "options": ["±3", "±1", "±2", "±4", "±5"],
        "correctAnswer": "±3"
      },
      {
        "question": "If theta in (0, pi / 3) and |(0, -sin² theta, -2 - 4 cos 6 theta; 0, cos² theta, -2 - 4 cos 6 theta; 1, sin theta, cos 2 theta)| = 0, then theta is equal to",
        "options": ["pi / 18", "pi / 6", "pi / 2", "pi / 9", "pi / 5"],
        "correctAnswer": "pi / 9"
      },
      {
        "question": "If |(x, 2, -1; 1, x, 5; 1, x, 5; 3, 2, x)| = 0, then the real value of x is",
        "options": ["4", "-3", "2", "-1", "-4"],
        "correctAnswer": "-4"
      },
      {
        "question": "Let A = (0, 1; -1, 2), B = (1, 1; -1, -1), C = (-1, 2; 1, 1), D = (1, 1; -1, -1). Then (A x B) . (C x D) =",
        "options": ["-5", "-4", "-3", "-6", "-8"],
        "correctAnswer": "-6"
      },
      {
        "question": "If alpha, beta, gamma are the angles made by (x - 1) / 3 = (y + 1) / 2 = -z with the coordinate axes, then (cos alpha, cos beta, cos gamma) =",
        "options": ["(3 / sqrt(14), 2 / sqrt(14), -1 / sqrt(14))", "(3 / sqrt(7), -2 / sqrt(7), -1 / sqrt(7))", "(3 / sqrt(14), -2 / sqrt(14), -1 / sqrt(14))", "(3 / sqrt(7), 2 / sqrt(7), -1 / sqrt(7))", "(-3 / sqrt(14), -2 / sqrt(14), -1 / sqrt(14))"],
        "correctAnswer": "(3 / sqrt(14), 2 / sqrt(14), -1 / sqrt(14))"
      },
      {
        "question": "The common point of the two straight lines r = (i - 2 j + 3 k) + s(2 i + j + k) and r = (-i + 2 j + 7 k) + t(i + j + k), t, s in R is",
        "options": ["(11, 8, -3)", "(-11, -8, -3)", "(11, -8, 3)", "(11, -8, -3)", "(9, 8, -3)"],
        "correctAnswer": "(-11, -8, -3)"
      },
      {
        "question": "The angle between the two straight lines r = (4 i - k) + t(2 i + j - 2 k), t in R and r = (i - j + 2 k) + s(2 i - 2 j + k), s in R is",
        "options": ["pi / 4", "pi / 3", "pi / 6", "0", "pi / 2"],
        "correctAnswer": "pi / 2"
      },
      {
        "question": "The shortest distance between the parallel straight lines r = j + t(i + j) and r = k + s(i + j), t, s in R is",
        "options": ["sqrt(3)", "sqrt(3) / sqrt(2)", "sqrt(3) / 2", "1 / sqrt(2)", "1 / sqrt(3)"],
        "correctAnswer": "sqrt(3) / sqrt(2)"
      },
      {
        "question": "If a and b are two unit vectors and if pi / 4 is the angle between a and b, then (a + (a . b) b) . (a - (a . b) b) is equal to",
        "options": ["1 / 4", "3 / 4", "3 / 2", "1 / 2", "5 / 4"],
        "correctAnswer": "1 / 2"
      },
      {
        "question": "If a and b are two nonzero vectors and if |a x b| = |a . b|, then the angle between a and b is equal to",
        "options": ["pi / 2", "pi / 4", "pi / 3", "pi / 6", "2 pi / 3"],
        "correctAnswer": "pi / 4"
      },
      {
        "question": "The symmetric form of the equation of the straight line r = i + rj, t in R is",
        "options": ["(x - 1) / 0 = y / 1 = z / 0", "x / 1 = y / 1 = (z - 1) / 0", "(x - 1) / 0 = (y - 1) / 0 = z / 1", "(x - 1) / 1 = y / 1 = z / 0", "(x - 1) / 0 = y / 1 = z / 1"],
        "correctAnswer": "(x - 1) / 0 = y / 1 = z / 0"
      },
      {
        "question": "If a = alpha i + beta j and b = alpha i - beta j are perpendicular, where alpha != beta, then alpha + beta is equal to",
        "options": ["alpha beta", "alpha - beta", "1 / (alpha - beta)", "1 / (2 alpha beta)", "0"],
        "correctAnswer": "0"
      },
      {
        "question": "Three dice are thrown simultaneously. The probability that all the three outcomes are same number is",
        "options": ["1 / 6", "1 / 216", "1 / 72", "1 / 36", "5 / 36"],
        "correctAnswer": "1 / 36"
      },
      {
        "question": "Let A and B be two events such that P(A) = 0.4, P(B) = 0.5 and P(A ∩ B) = 0.1. Then P(A / B) =",
        "options": ["1 / 5", "2 / 5", "4 / 5", "3 / 5", "1 / 3"],
        "correctAnswer": "3 / 5"
      },
      {
        "question": "(1 + cos (pi / 5) + i sin (pi / 5)) / (1 + cos (pi / 5) - i sin (pi / 5)) =",
        "options": ["cos (pi / 5) + i sin (pi / 5)", "cos (pi / 5) - i sin (pi / 5)", "sin (pi / 5) + i cos (pi / 5)", "sin (pi / 5) - i cos (pi / 5)", "cos (pi / 5)"],
        "correctAnswer": "cos (pi / 5) + i sin (pi / 5)"
      },
      {
        "question": "If x != 0, y != 0, then the value of cot^(-1)(x / y) + cot^(-1)(y / x) is",
        "options": ["pi", "pi / 2", "0", "-pi", "-pi / 2"],
        "correctAnswer": "pi / 2"
      },
      {
        "question": "If z is a complex number of unit modulus, then |(1 + z) / (1 + z bar)| equals",
        "options": ["2", "1", "1 / 2", "4", "6"],
        "correctAnswer": "1"
      },
      {
        "question": "The solution of the inequality |3 x - 4| <= 5 is",
        "options": ["[ -1 / 3, 3 ]", "[-1, 4]", "[1, inf)", "[-1, 1]", "[0, 1]"],
        "correctAnswer": "[-1, 4]"
      },
      {
        "question": "Variance of 6, 7, 8, 9 is",
        "options": ["1 / 4", "3 / 4", "2 / 3", "1 / 3", "5 / 4"],
        "correctAnswer": "5 / 4"
      }
    ],

    PHYSICS: [
      {
        "question": "Two spheres A and B having respective charges 6 C and 12 C placed at a distance d repel each other by a force F. The charge given to sphere A to reverse the force as -F is",
        "options": ["-8 C", "-12 C", "-10 C", "-6 C", "-15 C"],
        "correctAnswer": "-12 C"
      },
      {
        "question": "The work done by a source in taking a unit charge from lower to higher potential energy is called the source's",
        "options": ["electric current", "electric conductivity", "electric field intensity", "electromotive force", "electric flux"],
        "correctAnswer": "electromotive force"
      },
      {
        "question": "A person standing in an elevator, experiences weight loss, when the elevator",
        "options": ["moves down with uniform velocity", "moves upward with constant acceleration", "moves downward with constant acceleration", "moves upward with uniform velocity", "moves down with variable acceleration"],
        "correctAnswer": "moves downward with constant acceleration"
      },
      {
        "question": "The ratio of the maximum kinetic energy to the maximum potential energy of a bob of a simple pendulum executing small oscillations is",
        "options": ["1: 1", "1: 2", "2: 1", "1: 4", "4: 1"],
        "correctAnswer": "1: 1"
      },
      {
        "question": "A proton with kinetic energy of 2 MeV is describing a circular path of radius R in a uniform magnetic field. The kinetic energy of the deuteron to describe the same circular path in the same field is",
        "options": ["0.5 MeV", "1 MeV", "2 MeV", "4 MeV", "0.25 MeV"],
        "correctAnswer": "1 MeV"
      },
      {
        "question": "A car moving with a speed, v is stopped at a distance d by a retarding force F. The force needed to stop the same car moving with the speed 3 v within the same distance is",
        "options": ["3 F", "6 F", "8 F", "9 F", "12 F"],
        "correctAnswer": "9 F"
      },
      {
        "question": "A balloon of mass 60 g is moving up with an acceleration of 4 ms⁻². The mass to be added to the balloon to descend it down with the same acceleration is (g = 10 ms⁻²)",
        "options": ["60 g", "80 g", "100 g", "120 g", "40 g"],
        "correctAnswer": "80 g"
      },
      {
        "question": "A body of mass M is at equilibrium under the action of four forces F1, F2, F3 and F4. If F1 is removed from the body then the body moves with an acceleration of",
        "options": ["F1 / M", "(F1 + F2) / 2 M", "(F1 + F2) / 2 M", "(F1 + F2) / M", "F4 / M"],
        "correctAnswer": "F1 / M"
      },
      {
        "question": "If a body at rest undergoes one dimensional motion with constant acceleration, then the power delivered to it at a time t is proportional to",
        "options": ["Option A", "Option B", "t³", "t^(3⁄2)", "Option E"],
        "correctAnswer": "Option E"
      },
      {
        "question": "If a body at rest undergoes one dimensional motion with constant acceleration, then the power delivered to it at a time t is proportional to",
        "options": ["sqrt(t)", "t²", "t^(3 / 2)", "t³", "t"],
        "correctAnswer": "t"
      },
      {
        "question": "The collision in which the two colliding particles move together after collision is called",
        "options": ["completely inelastic collision", "elastic collision", "partial inelastic collision", "collision without transfer of energy", "partial elastic collision"],
        "correctAnswer": "completely inelastic collision"
      },
      {
        "question": "The analogy between linear motion and rotational motion are given. The FALSE one is",
        "options": ["Force : Torque", "Linear Displacement : Angular displacement", "Mass : Moment of inertia", "Linear momentum : Angular momentum", "Translational energy : Vibrational energy"],
        "correctAnswer": "Translational energy : Vibrational energy"
      },
      {
        "question": "If an ideal engine needs to transmit a torque 200 Nm to maintain a rotor at a uniform angular speed of 300 rads⁻¹, then the power required for the engine is",
        "options": ["30 kW", "60 kW", "90 kW", "150 kW", "300 kW"],
        "correctAnswer": "60 kW"
      },
      {
        "question": "If a body is taken above the surface of earth, it looses its weight by 20 % at a height of",
        "options": ["sqrt(5) / 2 R", "(sqrt(5) / 2 - 3) R", "(sqrt(5) / 2 - 1) R", "(sqrt(5) / 2 - 2) R", "(1 + sqrt(5) / 2) R"],
        "correctAnswer": "(sqrt(5) / 2 - 1) R"
      },
      {
        "question": "If a planet orbits the sun in an elliptical orbit the quantities associated with the planet that remain constant are",
        "options": ["kinetic energy and total energy", "potential energy and angular momentum", "linear speed and angular velocity", "total energy and angular momentum", "kinetic energy and angular velocity"],
        "correctAnswer": "total energy and angular momentum"
      },
      {
        "question": "For the flow of incompressible liquid through a pipe, the Venturi-meter is used to measure the",
        "options": ["pressure of liquid", "volume of flow", "speed of flow", "temperature of liquid", "mass of liquid flown"],
        "correctAnswer": "speed of flow"
      },
      {
        "question": "Two gases under the same thermal conditions have same number of molecules per unit volume. If the respective molecular diameters of the gases are in the ratio 1: 3, then their respective mean free paths are in the ratio",
        "options": ["1: 1", "1: 3", "3: 1", "9: 1", "4: 9"],
        "correctAnswer": "9: 1"
      },
      {
        "question": "The quantity of heat conducted through a metal rod kept its ends at 100°C and 120°C is 5 J s⁻¹. If the ends are kept at 200°C and 220°C then the quantity of heat conducted in 10 seconds is",
        "options": ["5 J", "25 J", "10 J", "100 J", "50 J"],
        "correctAnswer": "50 J"
      },
      {
        "question": "If an ideal gas, in an insulated vessel is allowed to expand into another similar evacuated vessel through a valve then",
        "options": ["external work is done on the gas", "the pressure of the gas is doubled", "the volume of the gas is doubled", "the pressure of the gas remains same", "the temperature of the gas is increased"],
        "correctAnswer": "the volume of the gas is doubled"
      },
      {
        "question": "The electric field intensity due to an ideal dipole at a distance r from its centre on the axial point is directly proportional to",
        "options": ["r²", "r³", "Option C", "Option D", "Option E"],
        "correctAnswer": "Option E"
      },
      {
        "question": "Two spheres A and B having respective charges 6 C and 12 C placed at a distance d repel each other by a force F. The charge given to sphere A to reverse the force as – F is",
        "options": ["-8C", "-12C", "-10C", "-6C", "-15C"],
        "correctAnswer": "-12C"
      },
      {
        "question": "The work done by a source in taking a unit charge from lower to higher potential energy is called the source’s",
        "options": [
          "electric current",
          "electric conductivity",
          "electric field intensity",
          "electromotive force",
          "electric flux"
        ],
        "correctAnswer": "electromotive force"
      },
      {
        "question": "If a charged particle enters a uniform magnetic field B, with a velocity v such that v has a component along B, then the charged particle describes",
        "options": [
          "a circular path",
          "an elliptical path",
          "a straight line",
          "a helical path",
          "a parabolic path"
        ],
        "correctAnswer": "a helical path"
      },
      {
        "question": "A proton with kinetic energy of 2 MeV is describing a circular path of radius R in a uniform magnetic field. The kinetic energy of the deuteron to describe the same circular path in the same field is",
        "options": ["0.5 MeV", "1 MeV", "2 MeV", "4 MeV", "0.25 MeV"],
        "correctAnswer": "1 MeV"
      },
      {
        "question": "Two straight long parallel wires carrying equal amount of current in opposite directions placed at 5 cm apart are repel each other by a force F. If the current in one of wire is doubled and reversed, then the force between them is",
        "options": [
          "2 F and attractive",
          "F/2 and repulsive",
          "F and repulsive",
          "2F and repulsive",
          "F/2 and attractive"
        ],
        "correctAnswer": "2 F and attractive"
      },
      {
        "question": "The mutual inductance between a pair of coils A and B placed close to each other depends upon",
        "options": [
          "the rate of change of current in A",
          "the rate of change of current in A and B",
          "the material of the wire of the coils",
          "the relative position and orientation of A and B",
          "the direction of flow of current in B"
        ],
        "correctAnswer": "the relative position and orientation of A and B"
      },
      {
        "question": "The ratio between the magnetic dipole moment of a revolving electron in circular orbit to its angular momentum is ( e charge and m mass of the electron )",
        "options": ["Option A", "Option B", "Option C", "Option D", "Option E"],
        "correctAnswer": "Option C"
      },
      {
        "question": "The electromagnetic waves used in LASIK and cell phones are respectively",
        "options": [
          "microwaves and radio waves",
          "ultraviolet rays and radio waves",
          "infrared rays and micro waves",
          "X- rays and radio waves",
          "radio waves and visible rays"
        ],
        "correctAnswer": "ultraviolet rays and radio waves"
      },
      {
        "question": "Which one of the following phenomena does not occur when a white light falls on an equilateral glass prism?",
        "options": [
          "Reflection",
          "Refraction",
          "Dispersion",
          "Deviation",
          "Interference"
        ],
        "correctAnswer": "Interference"
      },
      {
        "question": "The de Broglie wavelength associated with the electrons accelerated by a potential of 81 V is lying in the region of electromagnetic waves",
        "options": [
          "ultraviolet rays",
          "infrared rays",
          "microwaves",
          "X- rays",
          "Option E"
        ],
        "correctAnswer": "X- rays"
      },
      {
        "question": "If the frequency of the incident light on a metal surface is increased by 10% then the kinetic energy of the emitted photoelectrons is increased from 0.5eV to 0.7 eV. Then the work function of the metal is",
        "options": ["1 eV", "1.2 eV", "1.5 eV", "1.8 eV", "2 eV"],
        "correctAnswer": "1.5 eV"
      },
      {
        "question": "Plutonium nucleus undergoes fission with",
        "options": [
          "fast neutrons",
          "slow neutrons",
          "fast deuterons",
          "slow deuterons",
          "fast α – Particles"
        ],
        "correctAnswer": "slow neutrons"
      },
      {
        "question": "During the formation of p – n junction",
        "options": [
          "majority holes diffuse from n side to p side",
          "majority electrons diffuse from p side to n side",
          "ionized donors formed on p side",
          "ionized acceptors formed on n side",
          "the space charge region on either side of the junction is called depletion region"
        ],
        "correctAnswer": "the space charge region on either side of the junction is called depletion region"
      },
      {
        "question": "A particle is moved in a semi-circular path of radius R. Then",
        "options": [
          "its average velocity is zero",
          "its average acceleration is zero",
          "its magnitude of displacement is 2R",
          "its average velocity and average speed are equal",
          "its distance travelled is equal to displacement"
        ],
        "correctAnswer": "its magnitude of displacement is 2R"
      },
      {
        "question": "Pick out the correct statement",
        "options": [
          "Second law of motion is a vector equation",
          "Second law of motion is applicable to a particle and not to the system of particles",
          "Force is always in the direction of motion",
          "If external force on a body is zero, it does not mean the acceleration is zero",
          "Acceleration at an instant depends on the history of the motion of the particle"
        ],
        "correctAnswer": "Second law of motion is a vector equation"
      },
      {
        "question": "The Work - Energy theorem",
        "options": [
          "does not hold in all inertial frames",
          "is independent of Newton's second law",
          "may be viewed as a scalar form of Newton's second law",
          "cannot be extended to non-inertial frames",
          "is independent of Newton's third law"
        ],
        "correctAnswer": "may be viewed as a scalar form of Newton's second law"
      },
      {
        "question": "A body of mass 2 kg is moving with a momentum of 10 kg ms⁻¹. The force needed to increase its kinetic energy by four times in 10 seconds is",
        "options": ["2 N", "4 N", "1 N", "0.5 N", "8 N"],
        "correctAnswer": "1 N"
      },
      {
        "question": "A disc spinning at the rate 27.5 rad s⁻¹ is slowed at the rate 10 rad s⁻². The time after which it will come to rest is",
        "options": ["2.75 s", "5.5 s", "1.25 s", "3.5 s", "6.2 s"],
        "correctAnswer": "2.75 s"
      },
      {
        "question": "Four particles of masses m1 = 1 kg, m2 = 2 kg, m3 = 1 kg and m4 are placed at the four corners of a square. The mass m4 required, so that the centre of mass of all the four particles is exactly at the centre of the square is",
        "options": ["3 kg", "4 kg", "1.5 kg", "0.5 kg", "2 kg"],
        "correctAnswer": "2 kg"
      },
      {
        "question": "Two nearest harmonics of an organ pipe open at both the ends are 200 Hz and 240 Hz. The fundamental frequency is",
        "options": ["40 Hz", "20 Hz", "30 Hz", "80 Hz", "50 Hz"],
        "correctAnswer": "40 Hz"
      },
      {
        "question": "Two strings of the same material and same length are given equal tension. If they are vibrating with fundamental frequencies 1600 Hz and 900 Hz, then the ratio of their respective diameters is",
        "options": ["16:9", "4:3", "81: 256", "3:4", "9:16"],
        "correctAnswer": "9:16"
      },
      {
        "question": "An object, moving in a straight line with velocity 100ms⁻¹, goes past a stationary observer. If the object emits note of 400 Hz while moving, the change in the frequency noted by the observer as the object goes past him is (speed of sound in air = 300 ms⁻¹)",
        "options": ["350 Hz", "300 Hz", "200 Hz", "100 Hz", "150 Hz"],
        "correctAnswer": "300 Hz"
      },
      {
        "question": "A capacitance of a parallel plate air capacitor is 10µF. Dielectric constant of the medium to be introduced in between its plates to double its capacitance is",
        "options": ["2", "3", "4", "2.5", "1.5"],
        "correctAnswer": "2"
      },
      {
        "question": "The electric potential V at any point (x, y, z) in space is given by V = 4z² volt, where x, y, z are all in metre. The electric field at that point (1m, 0, 2m) in vm⁻¹ is",
        "options": [
          "16 along the positive z axis",
          "16 along the negative z axis",
          "4 along the positive z axis",
          "4 along the negative z axis",
          "8 along the negative z axis"
        ],
        "correctAnswer": "16 along the negative z axis"
      },
      {
        "question": "The work done in moving a point charge of 10µC through a distance of 3 cm along the equatorial axis of an electric dipole is",
        "options": [
          "10 x10⁻⁶ J",
          "30 x 10⁻⁶ J",
          "20 x10⁻⁶ J",
          "5 x 10⁻⁶ J",
          "zero"
        ],
        "correctAnswer": "zero"
      }
    ],

    CHEMISTRY: [
      {
        "question": "The volume of neon gas in cm³ at STP having the same number of atoms as that present in 800 mg of Ca is (At. mass: Ca = 40 g mol, Ne = 20 g mol⁻¹)",
        "options": ["56", "896", "224", "112", "448"],
        "correctAnswer": "448"
      },
      {
        "question": "Which of the following statement is incorrect?",
        "options": ["The greater the disorder in an isolated system, the higher is the entropy.", "The crystalline solid state of a substance is the state of lowest entropy.", "Entropy is not the measure of average chaotic motion of particles in the system.", "The gaseous state of a substance is state of highest entropy.", "ΔS is related to q and T for a reversible reaction as ΔS = q_rev / T."],
        "correctAnswer": "Entropy is not the measure of average chaotic motion of particles in the system."
      },
      {
        "question": "PCl₅(g), PCl₃(g) and Cl₂(g) are at equilibrium at 500 K. The equilibrium concentrations of PCl₃(g), Cl₂(g) and PCl₃(g) are respectively 4.0 M, 4.0 M and 2.0 M. Calculate Kc for the reaction, PCl₅(g) ⇌ PCl₃(g) + Cl₂(g)",
        "options": ["2 mol dm⁻³", "4 mol dm⁻³", "6 mol dm⁻³", "8 mol dm⁻³", "10 mol dm⁻³"],
        "correctAnswer": "8 mol dm⁻³"
      },
      {
        "question": "Which of the following molecule has the highest dipole moment?",
        "options": ["NH₃", "NF₃", "CCl₄", "BeF₂", "BF₃"],
        "correctAnswer": "NH₃"
      },
      {
        "question": "Which of the following aqueous mixture is a buffer solution?",
        "options": ["Acetic acid + Ammonium chloride", "Hydrochloric acid + Potassium acetate", "Acetic acid + Sodium chloride", "Acetic acid + Sodium acetate", "Sodium hydroxide + Potassium acetate"],
        "correctAnswer": "Acetic acid + Sodium acetate"
      },
      {
        "question": "The observed molecular weight of 1: 1 strong electrolyte is 117 g mol⁻¹ as determined by the depression of freezing point method. Its theoretical molecular weight is 60 g mol⁻¹. The percentage of dissociation of the electrolyte is",
        "options": ["90 %", "95 %", "100 %", "85 %", "80 %"],
        "correctAnswer": "Question Cancelled"
      },
      {
        "question": "Thermal decomposition of a compound X follows first order kinetics. The initial concentration of X is 2 mol L⁻¹. It decreased to 0.125 mol L⁻¹ in one hour at 400 K . What is the half-life period of the reaction at 400 K ? (log 2 = 0.3010)",
        "options": ["15 min", "20 min", "30 min", "25 min", "10 min"],
        "correctAnswer": "15 min"
      },
      {
        "question": "Some enzyme catalysed reactions which occur at metal surfaces are",
        "options": ["first order reactions", "second order reactions", "third order reactions", "fractional order reactions", "zero order reactions"],
        "correctAnswer": "zero order reactions"
      },
      {
        "question": "The reagents and conditions (X) required for the following conversion",
        "options": ["X = H₂O, 623 K, 300 atm & H⁺", "X = KOH, 443 K, 100 atm & H⁺", "X = NaOH, 368 K, 300 atm & H⁺", "X = warm, H₂O & H⁺", "X = NaOH, 623 K, 300 atm & H⁺"],
        "correctAnswer": "X = NaOH, 623 K, 300 atm & H⁺"
      },
      {
        "question": "One mole of alkene on ozonolysis gives 2 moles of butanone. The alkene is",
        "options": ["3,4-dimethylhex-2-ene", "2,3-dimethylhex-3-ene", "3,4-dimethylhex-3-ene", "2,3-dimethylhex-2-ene", "2,5-dimethylhex-3-ene"],
        "correctAnswer": "3,4-dimethylhex-3-ene"
      },
      {
        "question": "Isopropylbenzene is oxidized in the presence of air to compound ‘A’. When compound ‘A’ is treated with dilute mineral acid, the aromatic product formed is",
        "options": ["phenol", "benzene", "benzaldehyde", "acetophenone", "toluene"],
        "correctAnswer": "phenol"
      },
      {
        "question": "The repeating unit present in Nylon-6 is",
        "options": ["—[NH(CH₃)₃NHCO(CH₃)₄CO]—", "—[CO(CH₃)₃NH]—", "—[CO(CH₃)₃NH]—", "—[CO(CH₃)₃NH]—", "—(NH(CH₃)₃NHCO(CH₃)₂CO]—"],
        "correctAnswer": "—[CO(CH₃)₃NH]—"
      },
      {
        "question": "The IUPAC name of complex [Co(NH₃)₂(H₂O)₄]Cl₃ is",
        "options": ["Diaminetetraaquacobalt (III) trichloride", "Diaminetetraaquacobalt (II) chloride", "Diaminetetraaquacobalt (III) chloride", "Tetraaquadiaminecobalt (III) trichloride", "Tetraaquadiaminecobalt (II) chloride"],
        "correctAnswer": "Diaminetetraaquacobalt (III) chloride"
      },
      {
        "question": "The products obtained by the ozonolysis of 2-ethylbut-1-ene are",
        "options": ["propanone and ethanal", "ethanol and 3-pentanone", "butanal and ethanol", "methanol and 2-pentanone", "methanol and 3-pentanone"],
        "correctAnswer": "methanol and 3-pentanone"
      },
      {
        "question": "The correct decreasing order of reactivity for a given alkyl (R) group in both Sₙ1 and Sₙ2 reaction mechanism is",
        "options": ["R-I > R-Br > R-Cl > R-F", "R-I > R-Cl > R-Br > R-F", "R-F > R-Cl > R-Br > R-I", "R-F > R-I > R-Cl > R-Br", "R-Br > R-I > R-F > R-Cl"],
        "correctAnswer": "R-I > R-Br > R-Cl > R-F"
      },
      {
        "question": "Which of the following is not expected to undergo iodoform reaction?",
        "options": ["Propan-2-ol", "1-Phenylethanol", "2-Butanol", "Ethanol", "Diphenyl methanol"],
        "correctAnswer": "Diphenyl methanol"
      },
      {
        "question": "Which one of the following is not correct in respect of hybridization of orbitals?",
        "options": ["The orbitals present in the valence shell only are hybridized", "The orbitals undergoing hybridization have almost equal energy", "Promotion of electron is not essential condition for hybridization", "It is not always that only partially filled orbitals participate in hybridization; in some cases even filled orbitals in valence shell take part are", "Pure atomic orbitals are more effective in forming stable bonds than hybrid orbitals"],
        "correctAnswer": "Pure atomic orbitals are more effective in forming stable bonds than hybrid orbitals"
      },
      {
        "question": "Which one of the following statements is correct?",
        "options": ["NaCl is a paramagnetic salt", "CuSO₄ is a diamagnetic salt", "MnO is an example of ferromagnetic substance", "CrO₂ is an example of antiferromagnetic substance", "Ferrimagnetic substance like ZnFe₂O₄ becomes paramagnetic on heating"],
        "correctAnswer": "Ferrimagnetic substance like ZnFe₂O₄ becomes paramagnetic on heating"
      },
      {
        "question": "Among the elements B, Mg, Al and K, the correct order of increasing metallic character is",
        "options": ["B < Al < Mg < K", "B < Mg < Al < K", "Mg < B < Al < K", "Mg < Al < B < K", "K < Mg < Al < B"],
        "correctAnswer": "B < Al < Mg < K"
      },
      {
        "question": "The correct formula of borax is",
        "options": ["Na₂ [BaO₄(OH)₃].9 H₂O", "Na₂ [BaO₅(OH)₄].8 H₂O", "Na₂ [BaO₆(OH)₅].7 H₂O", "Na₂ [BaO₇(OH)₆].6 H₂O", "Na₂ [BaO₈(OH)₇].5 H₂O"],
        "correctAnswer": "Na₂ [BaO₅(OH)₄].8 H₂O"
      },
      {
        "question": "The following reaction CH₃Br + AgF → CH₃F + AgBr is known as",
        "options": ["Finkelstein reaction", "Wurtz reaction", "Sandmeyer's reaction", "Williamson reaction", "Swarts reaction"],
        "correctAnswer": "Swarts reaction"
      },
      {
        "question": "Which is incorrect statement with regard to 1-phenylethanol?",
        "options": ["It is a primary alcohol", "It is an aromatic alcohol", "It forms a ketone on oxidation", "It is optically active", "It liberates H₂ when treated with metallic sodium"],
        "correctAnswer": "It is a primary alcohol"
      },
      {
        "question": "In Dumas method of nitrogen estimation 0.14 g of an organic compound gave 22.4 mL of nitrogen at STP. The percentage of the nitrogen in the compound is",
        "options": ["12.5 %", "15 %", "17.5 %", "20 %", "22.5 %"],
        "correctAnswer": "20 %"
      },
      {
        "question": "When n-hexane is heated with anhydrous AlCl₃ and HCl gas, the major product obtained is",
        "options": ["1-chlorohexane", "2-chlorohexane", "3-chlorohexane", "hex-3-ene", "mixture of 2-methylpentane and 3-methylpentane"],
        "correctAnswer": "mixture of 2-methylpentane and 3-methylpentane"
      },
      {
        "question": "Identify the combination of compound that undergo Aldol condensation followed by dehydration to produce but-2-enal",
        "options": ["methanal and ethanal", "two moles of ethanol", "methanal and propanone", "ethanal and propanone", "two moles of ethanol"],
        "correctAnswer": "two moles of ethanol"
      },
      {
        "question": "Molecular shapes of SF₄, CF₄ and XeF₄ and the number of lone pairs on the central atom are respectively",
        "options": ["the same, with 1, 2 and 1", "the same, with 1, 0 and 1", "different, with 0, 1 and 2", "different, with 1, 0 and 2", "the same, with 0, 0 and 1"],
        "correctAnswer": "different, with 1, 0 and 2"
      },
      {
        "question": "What is the total number of sigma bonds found in the following compound? CH₃ - CH = C = CH - C ≡ C - H",
        "options": ["10", "11", "12", "9", "13"],
        "correctAnswer": "11"
      },
      {
        "question": "Which of the following is the most reactive in aromatic electrophilic substitution reaction?",
        "options": ["Benzene", "Chlorobenzene", "Phenol", "Benzaldehyde", "Nitrobenzene"],
        "correctAnswer": "Phenol"
      },
      {
        "question": "In Solvay process of manufacture of sodium carbonate, the by-product is",
        "options": ["NH₄Cl", "NaHCO₃", "CaCl₂", "CO₂", "NH₃"],
        "correctAnswer": "CaCl₂"
      },
      {
        "question": "The correct increasing order of acid strength of benzoic acid (I), 4-nitrobenzoic acid(II), 3,4-dinitrobenzoic acid(III), 4-methoxybenzoic acid(IV) is",
        "options": ["I < II < III < IV", "II < I < IV < III", "IV < I < II < III", "IV < II < I < III", "I < IV < II < III"],
        "correctAnswer": "IV < I < II < III"
      }
    ]
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
    setVisitedQuestions(prev => ({ ...prev, 0: true }));
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
      // Close the mobile navigation after selecting a question
      setMobileNavOpen(false);
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

    // Submit results for each section to the server via AppContext
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
    // Refresh the scores after closing the test
    getMainTestScores();
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

  // Get the count of answered questions for each section and in total
  const getAnsweredCount = () => {
    let result = { total: 0 };

    sections.forEach(section => {
      const count = questions.filter(q =>
        q.section === section.name && selectedAnswers[questions.indexOf(q)] !== undefined
      ).length;

      result[section.name] = count;
      result.total += count;
    });

    return result;
  };

  const answeredCount = getAnsweredCount();

  return (
    <div className="min-h-screen  bg-fixed bg-cover overflow-x-hidden flex flex-col items-center p-4"
      style={{ backgroundImage: "url(/images/main-bg.webp)" }}
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

            </div>

            <h3 className="text-xl font-semibold text-[#37474F] mb-2">Section-wise Question Distribution</h3>
            <div className="overflow-x-auto bg-white rounded-lg shadow mb-4">
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



            <StyledSplitButton
              onClick={() => startTest(subject)}
              startTest={startTest}
              subject={startTest}
              className=""
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
        <div className="fixed inset-0 bg-white overflow-hidden flex flex-col z-40" onWheel={(e) => e.stopPropagation()} data-lenis-prevent>
          {/* Top Bar with Timer and Subjects */}
          <div className="bg-orange-100 text-gray-700 p-3 flex justify-between items-center shadow-md">
            <div className="flex items-center">
              <h2 className="text-xl font-bold">KEAM Main Test</h2>
            </div>
            <div className="flex items-center space-x-3 md:space-x-6">
              {/* Hidden on small screens */}
              <div className="hidden md:flex md:space-x-6">
                {sections.map((section, idx) => (
                  <div key={idx} className="text-center">
                    <span className={`text-sm font-semibold ${getCurrentQuestionSection() === section.name ? 'text-yellow-600' : ''}`}>
                      {section.name}
                    </span>
                    <div className="text-xs">
                      {answeredCount[section.name]}/{section.questionCount}
                    </div>
                  </div>
                ))}
              </div>

              {/* Show on all screens */}
              <div className="bg-white text-gray-600 rounded-lg px-3 py-2 md:px-4 md:py-2 font-mono text-base md:text-xl font-bold">
                {formatTime(timeLeft)}
              </div>

              {/* Mobile question navigator button */}
              <button
                className="mobile-nav-toggle md:hidden flex items-center justify-center p-2 rounded-md   "
                onClick={() => setMobileNavOpen(true)}
                aria-label="Open question navigator"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile summary bar */}
          <div className="md:hidden bg-gray-100 p-2 border-b flex justify-between items-center">
            <div className="flex space-x-2 text-xs">
              {sections.map((section, idx) => (
                <div key={idx} className="text-center">
                  <span className={`text-xs font-semibold ${getCurrentQuestionSection() === section.name ? getSubjectTextColor(section.name) : 'text-gray-600'}`}>
                    {section.name.substring(0, 4)}
                  </span>
                  <div className="text-xs">
                    {answeredCount[section.name]}/{section.questionCount}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-sm font-semibold text-gray-600">
              Q {questionIndex + 1}/{questions.length}
            </div>
          </div>

          <div className="flex flex-1 overflow-hidden">
            {/* Question Panel - Takes most of the space */}
            <div className="flex-1 p-4 md:p-6 overflow-y-auto">
              {questions[questionIndex] && (
                <div className="max-w-3xl mx-auto">
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                      <div className={`px-4 py-1 rounded-full font-medium ${getSubjectColor(questions[questionIndex].section)} text-white`}>
                        {questions[questionIndex].section}
                      </div>
                      <div className="text-sm md:text-base text-gray-700">
                        Question {questionIndex + 1} of {questions.length}
                      </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 mb-4">
                      <h3 className="text-base md:text-lg font-semibold mb-4">
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
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 border ${selectedAnswers[questionIndex] === option ? 'bg-blue-500 text-white border-blue-500' : 'border-gray-400'
                                }`}>
                                {['A', 'B', 'C', 'D', 'E'][idx]}
                              </div>
                              <div>{option}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap md:flex-nowrap gap-2 md:gap-4 justify-between">
                      <button
                        onClick={() => navigateQuestion(questionIndex - 1)}
                        disabled={questionIndex === 0}
                        className={`py-2 px-4 md:px-6 rounded-lg font-medium text-sm md:text-base ${questionIndex === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-600'
                          }`}
                      >
                        Previous
                      </button>

                      <button
                        onClick={toggleMarkForReview}
                        className={`py-2 px-4 md:px-6 rounded-lg font-medium text-sm md:text-base ${markedForReview[questionIndex] ? 'bg-yellow-500 text-white' : 'border border-yellow-500 text-yellow-600 hover:bg-yellow-50'
                          }`}
                      >
                        {markedForReview[questionIndex] ? 'Marked' : 'Mark Review'}
                      </button>

                      {questionIndex < questions.length - 1 ? (
                        <button
                          onClick={() => navigateQuestion(questionIndex + 1)}
                          className="bg-green-500 text-white py-2 px-4 md:px-6 rounded-lg font-medium text-sm md:text-base hover:bg-green-600"
                        >
                          Next
                        </button>
                      ) : (
                        <button
                          onClick={evaluateAnswers}
                          className="bg-green-600 text-white py-2 px-4 md:px-6 rounded-lg font-medium text-sm md:text-base hover:bg-green-700"
                        >
                          Submit
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Question Navigator Panel - Slide in from right */}
            <div
              ref={sidebarRef}
              className={`fixed inset-y-0 right-0 z-50 w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${mobileNavOpen ? 'translate-x-0' : 'translate-x-full'
                } md:hidden overflow-y-auto`}
            >
              <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-orange-100 text-gray-700">
                <h3 className="font-bold text-lg">Question Navigator</h3>
                <button
                  onClick={() => setMobileNavOpen(false)}
                  className="p-2 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-4">
                <div className="flex space-x-3 mb-4 text-xs">
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

                <div className="space-y-6 pb-20">
                  {sections.map((section, sectionIdx) => {
                    const sectionQuestions = getQuestionsBySection()[section.name] || [];

                    return (
                      <div key={sectionIdx}>
                        <h4 className={`font-semibold ${getSubjectTextColor(section.name)} mb-2`}>
                          {section.name} ({answeredCount[section.name]}/{section.questionCount})
                        </h4>
                        <div className="grid grid-cols-5 gap-2">
                          {sectionQuestions.map((q) => (
                            <button
                              key={q.globalIndex}
                              className={`w-10 h-10 rounded flex items-center justify-center text-sm font-medium ${questionIndex === q.globalIndex ? 'ring-2 ring-blue-500' : ''
                                } ${getQuestionStatusColor(q.globalIndex)} ${selectedAnswers[q.globalIndex] || markedForReview[q.globalIndex] || visitedQuestions[q.globalIndex] ? 'text-white' : 'text-gray-700'
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
              </div>

              <div className="relative bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 md:hidden">
                <button
                  onClick={() => {
                    setMobileNavOpen(false);
                    evaluateAnswers();
                  }}
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition"
                >
                  Submit Test
                </button>
              </div>
            </div>

            {/* Desktop Question Navigation Panel */}
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

              <div className="space-y-6">
                {sections.map((section, sectionIdx) => {
                  const sectionQuestions = getQuestionsBySection()[section.name] || [];

                  return (
                    <div key={sectionIdx}>
                      <h4 className={`font-semibold ${getSubjectTextColor(section.name)} mb-2`}>
                        {section.name} ({answeredCount[section.name]}/{section.questionCount})
                      </h4>
                      <div className="grid grid-cols-5 gap-2">
                        {sectionQuestions.map((q) => (
                          <button
                            key={q.globalIndex}
                            className={`w-10 h-10 rounded flex items-center justify-center text-sm font-medium ${questionIndex === q.globalIndex ? 'ring-2 ring-blue-500' : ''
                              } ${getQuestionStatusColor(q.globalIndex)} ${selectedAnswers[q.globalIndex] || markedForReview[q.globalIndex] || visitedQuestions[q.globalIndex] ? 'text-white' : 'text-gray-700'
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
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8 my-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Test Results</h2>
              <p className="text-gray-600">
                You scored {testResults.totalCorrect} out of {testResults.totalQuestions} questions
              </p>
            </div>

            <div className="mt-4 md:mt-0">
              <div className="text-5xl font-bold text-blue-600">{testResults.percentScore}%</div>
              <div className="text-sm text-gray-500 text-center">Overall Score</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {Object.keys(testResults.sections).map((section, idx) => (
              <div key={idx} className="bg-gray-50 p-4 rounded-xl shadow">
                <div className="flex items-center mb-3">
                  <div className={`w-2 h-16 ${getSubjectColor(section)} rounded-full mr-3`}></div>
                  <div>
                    <h3 className="font-bold text-gray-700">{section}</h3>
                    <div className="text-3xl font-bold text-gray-800">
                      {Math.round((testResults.sections[section].correct / testResults.sections[section].total) * 100)}%
                    </div>
                    <div className="text-sm text-gray-500">
                      {testResults.sections[section].correct} / {testResults.sections[section].total} correct
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Section Performance</h3>
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="space-y-4">
                {Object.keys(testResults.sections).map((section, idx) => {
                  const percentage = (testResults.sections[section].correct / testResults.sections[section].total) * 100;
                  return (
                    <div key={idx}>
                      <div className="flex justify-between mb-1">
                        <span className={`font-medium ${getSubjectTextColor(section)}`}>{section}</span>
                        <span className="text-gray-700 font-medium">{percentage.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full ${getSubjectColor(section)}`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              click={closeTest}
              text="Back to Dashboard"
              className="py-3 px-8 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MainTest;