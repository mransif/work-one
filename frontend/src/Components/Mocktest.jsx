import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import StyledSplitButton from "./StyledSplitButton";
import BarChart from "./bar-chart";

const Mocktest = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes in seconds
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [testResults, setTestResults] = useState(null);
  const [scoreHistorySubject, setScoreHistorySubject] = useState("ALL");
  const [isTimeLow, setIsTimeLow] = useState(false);
  const [questionStatus, setQuestionStatus] = useState([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);

  const { submitMockTestResult, scores } = useContext(AppContext);

  const subjects = [
    { name: "MATHEMATICS", image: "/images/maths.webp" },
    { name: "PHYSICS", image: "/images/physics.webp" },
    { name: "CHEMISTRY", image: "/images/chemistry.webp" },
  ];

  const subjectQuestions = {
    MATHEMATICS: [
      {
        question: "If y = cosec⁻¹((1 + x²)/(2x)), then dy/dx =",
        options: ["1/√(x² - 1)", "-1/√(x² - 1)", "1/(1 + x²)", "2/(1 + x²)", "-2/√(x² - 1)"],
        correctAnswer: "2/(1 + x²)"
      },
      {
        question: "If a + 1, 2a + 1, 4a - 1 are in arithmetic progression, then the value of a is",
        options: ["1", "2", "3", "4", "5"],
        correctAnswer: "5"
      },
      {
        question: "If tan θ = 1/2 and tan ɸ = 1/3, then tan(2θ + ɸ) =",
        options: ["3/4", "4/3", "3", "1/3", "1/2"],
        correctAnswer: "3"
      },
      {
        question: "The solution of dy/dx + y tan x = sec x, y(0) = 0 is",
        options: ["y sec x = tan x", "y tan x = sec x", "tan x = y tan x", "x sec x = tan y", "y cot x = sec x"],
        correctAnswer: "y sec x = tan x"
      },
      {
        question: "∫x⁴ cos(x⁵) dx equals",
        options: ["(1/3) sin(x⁵) + C", "(1/4) sin(x⁵) + C", "(1/5) sin(x⁵) + C", "sin(x⁵) + C", "2 sin(x⁵) + C"],
        correctAnswer: "(1/5) sin(x⁵) + C"
      },
      {
        question: "If a, b, c are unit vectors such that a + b + c = 0, then the value of a·b + b·c + c·a is",
        options: ["0", "1", "3", "-3/2", "none of these"],
        correctAnswer: "-3/2"
      },

      {
        question: "Let f(x + y) = f(x) f(y) for all x and y. If f(0) = 1, f(3) = 3 and f'(0) = 11, then f'(3) is equal to",
        options: ["11", "22", "33", "44", "55"],
        correctAnswer: "33"
      },
      {
        question: "If the product AB = 0 then",
        options: ["either A=0 or B=0", "A=0 and B=0", "A=0, B≠0", "A is symmetric and B is skew symmetric", "neither A=0 nor B=0"],
        correctAnswer: "neither A=0 nor B=0"
      },

      {
        question: "Let p, q, r be three simple statements. Then ∼(p ∨ q) ∨ ∼(p ∨ r) is equivalent to",
        options: ["(∼p) ∧ (∼q ∨ ∼r)", "(∼p) ∧ (q ∨ r)", "p ∧ (q ∨ r)", "p ∨ (q ∧ r)", "(p ∨ q) ∧ r"],
        correctAnswer: "(∼p) ∧ (∼q ∨ ∼r)"
      },
      {
        question: "∫₋₁¹ (|x + 2|)/(x + 2) dx =",
        options: ["0", "1", "-1", "2", "-2"],
        correctAnswer: "2"
      },
      {
        question: "If X follows a Binomial distribution with parameters n = 6 and p, and if 9P(X = 4) = P(X = 2), then p =",
        options: ["1/2", "1/3", "1/6", "1/4", "1"],
        correctAnswer: "1/4"
      },
      {
        question: "The differential equation representing the family of curves y² = a(ax + b) where a and b are arbitrary constants, is of",
        options: ["order 1, degree 1", "order 1, degree 3", "order 2, degree 3", "order 1, degree 4", "order 2, degree 1"],
        correctAnswer: "order 2, degree 1"
      },
      {
        question: "In a flight, 50 people speak Hindi, 20 speak English, and 10 speak both English and Hindi. The number of people who speak at least one of the two languages is",
        options: ["40", "50", "20", "80", "60"],
        correctAnswer: "60"
      },
      {
        question: "From 4 red balls, 2 white balls and 4 black balls, four balls are selected. The probability of getting 2 red balls is",
        options: ["7/21", "8/21", "9/21", "10/21", "11/21"],
        correctAnswer: "8/21"
      },
      {
        question: "limₓ→₀ (eˣ - (1 + x))/x³ =",
        options: ["1", "-1", "1/2", "-1/2", "0"],
        correctAnswer: "1/2"
      },
      {
        question: "If y = tan⁻¹(x/2) - cot⁻¹(x/2), then dy/dx =",
        options: ["4/(4 + x²)", "2/(4 + x²)", "1/(4 + x²)", "2/(1 + x²)", "0"],
        correctAnswer: "4/(4 + x²)"
      },
      {
        question: "If f(x) = |cos x|, then f'(π/3) + f'(2π/3) =",
        options: ["√3", "2√3", "-√3", "0", "-2√3"],
        correctAnswer: "0"
      },
      {
        question: "The period of sin²x + cos²x is",
        options: ["π", "π/2", "π/4", "2π", "none"],
        correctAnswer: "π/2"
      },
      {
        question: "If * is defined by a*b = aᵇ for a, b ∈ N, then (2*3)*2 =",
        options: ["81", "512", "216", "64", "243"],
        correctAnswer: "64"
      },
      {
        question: "The function f(x) = xˣ decreases in",
        options: ["(0,1)", "(0,e)", "(0,1/e)", "(-1,0)", "(1,e)"],
        correctAnswer: "(0,1/e)"
      },
      {
        question: "If ω is a complex cube root of unity, then √(-1 -√(-1 -√(-1...))) equals",
        options: ["±ω", "ω or ω²", "ω + ω²", "ω - ω²", "1"],
        correctAnswer: "ω or ω²"
      },
      {
        question: "The integrating factor of (x² +1)dy/dx + 2xy = 4x² is",
        options: ["x² +1", "√(1 + x²)", "e^(1 + x²)", "e^√(1 + x²)", "4x²"],
        correctAnswer: "x² +1"
      },
      {
        question: "In an A.P., the 6th term is 52 and 11th term is 112. The common difference is",
        options: ["4", "20", "12", "8", "6"],
        correctAnswer: "12"
      },
      {
        question: "The number of 3×3 matrices with entries -1 or +1 is",
        options: ["2⁻⁴", "2⁵", "2⁶", "2⁷", "2⁹"],
        correctAnswer: "2⁹"
      },
      {
        question: "limₓ→₃ (x³ - 27)/(x² - 9) =",
        options: ["9/2", "0", "1", "1/2", "27"],
        correctAnswer: "9/2"
      },
      {
        question: "The center of the ellipse 4x² + y² - 8x + 4y - 8 = 0 is",
        options: ["(0,2)", "(2,-1)", "(2,1)", "(1,2)", "(1,-2)"],
        correctAnswer: "(1,-2)"
      },
      {
        question: "The distance between (2,1,0) and plane 2x + y + 2z + 5 = 0 is",
        options: ["10", "10/3", "10/9", "5", "1"],
        correctAnswer: "10/3"
      },
      {
        question: "∫(2x + sin2x)/(1 + cos2x) dx =",
        options: ["x + log|tan x| + C", "x log|tan x| + C", "x tan x + C", "log|cos x| + C", "log|sin x| + C"],
        correctAnswer: "x tan x + C"
      },
      {
        question: "If the derivative of (ax - 5)e³ˣ at x = 0 is -13, then the value of a is",
        options: ["8", "-5", "5", "-2", "2"],
        correctAnswer: "2"
      },
      {
        question: "If a, b, c are unit vectors such that a + b + c = 0, then the value of a·b + b·c + c·a is",
        options: ["0", "1", "3", "-3/2", "none of these"],
        correctAnswer: "-3/2"
      },
    ],

    PHYSICS: [
      {
        question: "If the time period T of a satellite revolving close to the earth is given as T = 2πRᵃgᵇ, then the value of a and b are respectively (R – Radius of the earth)",
        options: [
          "1/2 and 1/2",
          "1/2 and -1/2",
          "1/2 and 1/2",
          "3/2 and -1/2",
          "-1/2 and 1/2"
        ],
        correctAnswer: "1/2 and -1/2"
      },
      {
        question: "The angle between A × B and B × A is",
        options: [
          "90°",
          "60°",
          "180°",
          "0°",
          "270°"
        ],
        correctAnswer: "180°"
      },
      {
        question: "If the initial speed of the car moving at constant acceleration is halved, then the stopping distance S becomes",
        options: [
          "2S",
          "S/2",
          "4S",
          "S/4",
          "S/8"
        ],
        correctAnswer: "S/4"
      },
      {
        question: "When a cricketer catches a ball in 30 s, the force required is 2.5 N. The force required to catch that ball in 50 s is",
        options: [
          "1.5 N",
          "1 N",
          "2.5 N",
          "3 N",
          "5 N"
        ],
        correctAnswer: "1.5 N"
      },
      {
        question: "A ball is thrown vertically upwards with an initial speed of 20 ms⁻¹. The velocity (in ms⁻¹) and acceleration (in ms⁻²) at the highest point of its motion are respectively",
        options: [
          "20 and 9.8",
          "0 and 9.8",
          "0 and 0",
          "10 and 9.8",
          "0 and 4.9"
        ],
        correctAnswer: "0 and 9.8"
      },
      {
        question: "Which one is an INCORRECT statement?",
        options: [
          "Forces always occur in pairs",
          "Impulsive force is a force that acts for a shorter duration",
          "Impulse is the change in momentum of the body",
          "Momentum and change in momentum both have the same direction",
          "Action and reaction forces act on different bodies"
        ],
        correctAnswer: "Momentum and change in momentum both have the same direction"
      },
      {
        question: "Impending motion is opposed by",
        options: [
          "static friction",
          "fluid friction",
          "sliding friction",
          "kinetic friction",
          "rolling friction"
        ],
        correctAnswer: "static friction"
      },
      {
        question: "A block of 50 g mass is connected to a spring of spring constant 500 Nm⁻¹. It is extended to the maximum and released. If the maximum speed of the block is 3 ms⁻¹, then the length of extension is",
        options: [
          "4 cm",
          "1 cm",
          "2.5 cm",
          "3 cm",
          "5 cm"
        ],
        correctAnswer: "3 cm"
      },
      {
        question: "A particle is displaced from P(3i + 2j - k) to Q(2i + 2j + 2k) by a force F = i + j + k. The work done on the particle (in J) is",
        options: [
          "2",
          "1",
          "2.5",
          "3",
          "5"
        ],
        correctAnswer: "2"
      },
      {
        question: "The motion of a cylinder on an inclined plane is a",
        options: [
          "rotational but not translation",
          "translation but not rotational",
          "translational but not rolling",
          "rotational, translational and rolling motion",
          "rotational and rolling but not translational motion"
        ],
        correctAnswer: "rotational, translational and rolling motion"
      },
      {
        question: "A flywheel ensures a smooth ride on the vehicle because of its",
        options: [
          "larger speed",
          "zero moment of inertia",
          "large moment of inertia",
          "lesser mass with smaller radius",
          "small moment of inertia"
        ],
        correctAnswer: "large moment of inertia"
      },
      {
        question: "The escape speed of the moon when compared with escape speed of the earth is approximately",
        options: [
          "twice smaller",
          "thrice smaller",
          "4 times smaller",
          "5 times smaller",
          "6 times smaller"
        ],
        correctAnswer: "5 times smaller"
      },
      {
        question: "The force of gravity is a",
        options: [
          "strong force",
          "noncentral force",
          "nonconservative force",
          "contact force",
          "conservative force"
        ],
        correctAnswer: "conservative force"
      },
      {
        question: "The terminal velocity of a small steel ball falling through a viscous medium is",
        options: [
          "directly proportional to the radius of the ball",
          "inversely proportional to the radius of the ball",
          "directly proportional to the square of the radius of the ball",
          "directly proportional to the square root of the radius of the ball",
          "inversely proportional to the square of the radius of the ball"
        ],
        correctAnswer: "directly proportional to the square of the radius of the ball"
      },
      {
        question: "The stress required to produce a fractional compression of 1.5% in a liquid having bulk modulus of 0.9×10⁹ Nm⁻² is",
        options: [
          "2.48×10⁷ Nm⁻²",
          "0.26×10⁷ Nm⁻²",
          "3.72×10⁷ Nm⁻²",
          "1.35×10⁷ Nm⁻²",
          "4.56×10⁷ Nm⁻²"
        ],
        correctAnswer: "1.35×10⁷ Nm⁻²"
      },
      {
        question: "When heat is supplied to the gas in an isochoric process, the supplied heat changes its",
        options: [
          "volume only",
          "internal energy and volume",
          "internal energy only",
          "internal energy and temperature",
          "temperature only"
        ],
        correctAnswer: "internal energy and temperature"
      },
      {
        question: "1 g of ice at 0°C is converted into water by supplying a heat of 418.72 J. The quantity of heat that is used to increase the temperature of water from 0°C is (Latent heat of fusion of ice = 3.35×10⁵ Jkg⁻¹)",
        options: [
          "83.72 J",
          "33.52 J",
          "335.72 J",
          "837.24 J",
          "418.72 J"
        ],
        correctAnswer: "83.72 J"
      },
      {
        question: "All real gases behave like an ideal gas at",
        options: [
          "high pressure and low temperature",
          "low temperature and low pressure",
          "high pressure and high temperature",
          "at all temperatures and pressures",
          "low pressure and high temperature"
        ],
        correctAnswer: "low pressure and high temperature"
      },
      {
        question: "0.5 mole of N₂ at 27°C is mixed with 0.5 mole of O₂ at 42°C. The temperature of the mixture is",
        options: [
          "42°C",
          "34.5°C",
          "32.5°C",
          "37.5°C",
          "27°C"
        ],
        correctAnswer: "34.5°C"
      },
      {
        question: "A wave with a frequency of 600 Hz and wavelength of 0.5 m travels a distance of 200 m in air in a time of",
        options: [
          "1.67 s",
          "0.67 s",
          "1 s",
          "0.33 s",
          "1.33 s"
        ],
        correctAnswer: "0.67 s"
      },
      {
        question: "If the fundamental frequency of the stretched string of length 1 m under a given tension is 3 Hz, then the fundamental frequency of the stretched string of length 0.75 m under the same tension is",
        options: [
          "1 Hz",
          "2 Hz",
          "6 Hz",
          "4 Hz",
          "5 Hz"
        ],
        correctAnswer: "4 Hz"
      },
      {
        question: "Three capacitances 1 µF, 4 µF and 5 µF are connected in parallel with a supply voltage. If the total charge flowing through the capacitors is 50 µC, then the supply voltage is",
        options: [
          "2 V",
          "10 V",
          "6 V",
          "3 V",
          "5 V"
        ],
        correctAnswer: "5 V"
      },
      {
        question: "The resistance of a wire at 0°C is 4 Ω. If the temperature coefficient of resistance of the material of the wire is 5×10⁻³/°C, then the resistance of a wire at 50°C is",
        options: [
          "20 Ω",
          "10 Ω",
          "6 Ω",
          "8 Ω",
          "5 Ω"
        ],
        correctAnswer: "5 Ω"
      },
      {
        question: "n number of electrons flowing in a copper wire for 1 minute constitute a current of 0.5 A. Twice the number of electrons flowing through the same wire for 20 s will constitute a current of",
        options: [
          "0.25 A",
          "3 A",
          "1 A",
          "1.25 A",
          "2.25 A"
        ],
        correctAnswer: "3 A"
      },
      {
        question: "If a cell of 12 V emf delivers 2 A current in a circuit having a resistance of 5.8 Ω, then the internal resistance of the cell is",
        options: [
          "1 Ω",
          "0.2 Ω",
          "0.3 Ω",
          "0.6 Ω",
          "0.8 Ω"
        ],
        correctAnswer: "0.2 Ω"
      },
      {
        question: "Torque on a coil carrying current I having N turns and area of cross section A when placed with its plane perpendicular to a magnetic field B is",
        options: [
          "2NBIA",
          "NBIA/3",
          "0",
          "NBIA/2",
          "NBIA"
        ],
        correctAnswer: "0"
      },
      {
        question: "A long straight wire carrying a current 3 A produces a magnetic field B at certain distance. The current that flows through the same wire will produce a magnetic field B/3 at the same distance is",
        options: [
          "1.5 A",
          "1 A",
          "2.5 A",
          "3 A",
          "5 A"
        ],
        correctAnswer: "1 A"
      },
      {
        question: "Which one of the following statement is INCORRECT?",
        options: [
          "Isolated magnetic poles do not exist",
          "Magnetic field lines do not intersect",
          "Moving charges do not produce magnetic field in the surrounding space",
          "Magnetic field lines always form closed loops",
          "Magnetic force on a negative charge is opposite to that on a positive charge"
        ],
        correctAnswer: "Moving charges do not produce magnetic field in the surrounding space"
      },
      {
        question: "When a current passing through a coil changes at a rate of 30 As⁻¹ the emf induced in the coil is 12 V. If the current passing through this coil changes at a rate of 20 As⁻¹ the emf induced in this coil is",
        options: [
          "8 V",
          "10 V",
          "2.5 V",
          "3 V",
          "5 V"
        ],
        correctAnswer: "8 V"
      },
      {
        question: "The reactance of an induction coil of 4 H for a dc current (in Ω) is",
        options: [
          "zero",
          "4π",
          "40π",
          "400π",
          "infinity"
        ],
        correctAnswer: "zero"
      },
      {
        question: "The radiations used in LASIK eye surgery are",
        options: [
          "IR radiations",
          "micro waves",
          "radio waves",
          "gamma rays",
          "UV radiations"
        ],
        correctAnswer: "UV radiations"
      },
      {
        question: "When two coherent sources each of individual intensity I₀ interfere, the resultant intensity due to constructive and destructive interference are respectively",
        options: [
          "4I₀ and 0",
          "I₀ and 2I₀",
          "0 and 2I₀",
          "2I₀ and I₀",
          "2I₀ and 0"
        ],
        correctAnswer: "4I₀ and 0"
      }
    ],
    CHEMISTRY: [
      {
        question: "The unit of an universal constant is cm⁻¹. What is the constant?",
        options: [
          "Planck's constant",
          "Boltzmann constant",
          "Rydberg constant",
          "Avogadro constant",
          "Molar gas constant"
        ],
        correctAnswer: "Rydberg constant"
      },
      {
        question: "Which of the following molecule has the most polar bond?",
        options: [
          "Cl₂",
          "HCl",
          "PCl₃",
          "N₂",
          "HF"
        ],
        correctAnswer: "HF"
      },
      {
        question: "ΔS would be negative for which of the following reactions? (I) CaCO₃(s) → CaO(s) + CO₂(g) (II) Ag⁺(aq) + Cl⁻(aq) → AgCl(s) (III) N₂(g) + 3H₂(g) → 2NH₃(g)",
        options: [
          "I and III only",
          "II and III only",
          "I only",
          "III only",
          "I, II, and III"
        ],
        correctAnswer: "II and III only"
      },
      {
        question: "Equal volumes of pH 3, 4 & 5 are mixed in a container. The concentration of H⁺ in the mixture is (Assume no change in volume during mixing)",
        options: [
          "1×10⁻³M",
          "3.7×10⁻⁴M",
          "1×10⁻⁴M",
          "3.7×10⁻⁵M",
          "3×10⁻⁵M"
        ],
        correctAnswer: "3.7×10⁻⁴M"
      },
      {
        question: "For the reaction H₂O(g) + Cl₂O(g) ⇌ 2HOCl(g), at equilibrium the partial pressures are 300 mm Hg (H₂O), 20 mm (Cl₂O) and 60 mm (HOCl). The Kₚ at 300K is",
        options: [
          "36",
          "6.0",
          "60",
          "3.6",
          "0.60"
        ],
        correctAnswer: "0.60"
      },
      {
        question: "Strong intra-molecular hydrogen bond is present in",
        options: [
          "water",
          "hydrogen fluoride",
          "o-cresol",
          "o-nitrophenol",
          "ammonia"
        ],
        correctAnswer: "o-nitrophenol"
      },
      {
        question: "Which molecule has a Lewis structure that does not obey the octet rule?",
        options: [
          "HCN",
          "CS₂",
          "NO",
          "CCl₄",
          "PF₃"
        ],
        correctAnswer: "NO"
      },
      {
        question: "The rate and rate constant of a reaction have the same units. The order of the reaction is",
        options: [
          "one",
          "two",
          "three",
          "zero",
          "half"
        ],
        correctAnswer: "zero"
      },
      {
        question: "For the reaction 2A + B → 2C + D, given initial rate data, the total order and order in [B] are respectively",
        options: [
          "2,1",
          "1,1",
          "1,2",
          "2,2",
          "2,0"
        ],
        correctAnswer: "2,0"
      },
      {
        question: "The standard molar entropy change for 2SO₂(g) + O₂(g) → 2SO₃(g) given standard entropies (SO₂=250, SO₃=257, O₂=205 JK⁻¹mol⁻¹) is",
        options: [
          "-198 JK⁻¹",
          "-191 JK⁻¹",
          "198 JK⁻¹",
          "191 JK⁻¹",
          "-1219 JK⁻¹"
        ],
        correctAnswer: "-191 JK⁻¹"
      },
      {
        question: "An aqueous solution contains 20g of non-volatile strong electrolyte A₂B (M=60 g/mol) in 1 kg water. If 100% dissociated, the boiling point is (Kb=0.52 K kg mol⁻¹)",
        options: [
          "372.482K",
          "374.56K",
          "373.52K",
          "371.44K",
          "374.02K"
        ],
        correctAnswer: "373.52K"
      },
      {
        question: "An organic compound contains 37.5% C, 12.5% H and rest oxygen. Its empirical formula is",
        options: [
          "CH₄O",
          "C₂H₃O",
          "CH₃O₂",
          "C₂H₄O",
          "CH₃O"
        ],
        correctAnswer: "CH₄O"
      },
      {
        question: "How many grams of HCl will completely react with 17.4g MnO₂ to liberate Cl₂? (Atomic masses: Mn=55, H=1, Cl=35.5)",
        options: [
          "14.6g",
          "7.3g",
          "21.9g",
          "29.2g",
          "34.8g"
        ],
        correctAnswer: "29.2g"
      },
      {
        question: "Current required to liberate 16g O₂ during water electrolysis (1F=96500C) is",
        options: [
          "4.825×10⁴C",
          "9.65×10⁴C",
          "2.895×10⁵C",
          "4.825×10⁵C",
          "1.93×10⁵C"
        ],
        correctAnswer: "1.93×10⁵C"
      },
      {
        question: "Matching coordination compounds with their isomerism types: [Pt(NH₃)₂Cl₂], [Co(en)₃]³⁺, [Cr(NH₃)₅(SO₄)]Br, [Co(NH₃)₅(NO₂)]Cl₂",
        options: [
          "(a)-(ii),(b)-(iv),(c)-(i),(d)-(iii)",
          "(a)-(iv),(b)-(i),(c)-(ii),(d)-(iii)",
          "(a)-(iv),(b)-(iii),(c)-(i),(d)-(ii)",
          "(a)-(iv),(b)-(ii),(c)-(iii),(d)-(i)",
          "(a)-(iii),(b)-(ii),(c)-(iv),(d)-(i)"
        ],
        correctAnswer: "(a)-(iv),(b)-(iii),(c)-(i),(d)-(ii)"
      },
      {
        question: "Which amine will not undergo carbylamine reaction?",
        options: [
          "N-methylethanamine",
          "Phenylmethanamine",
          "Aniline",
          "Ethanamine",
          "Propan-2-amine"
        ],
        correctAnswer: "N-methylethanamine"
      },
      {
        question: "The 3d block metal having positive standard electrode potential (M²⁺/M) is",
        options: [
          "Titanium",
          "Vanadium",
          "Iron",
          "Copper",
          "Chromium"
        ],
        correctAnswer: "Copper"
      },
      {
        question: "Which statement is incorrect about interstitial compounds of transition elements?",
        options: [
          "They have high melting points",
          "They are very hard",
          "They have metallic conductivity",
          "They are chemically inert",
          "They are stoichiometric compounds"
        ],
        correctAnswer: "They are stoichiometric compounds"
      },
      {
        question: "The alloy containing ~95% lanthanoids, 5% iron used in Mg-based bullets is",
        options: [
          "bell metal",
          "monel metal",
          "misch metal",
          "bronze",
          "german silver"
        ],
        correctAnswer: "misch metal"
      },
      {
        question: "IUPAC name of [Cr(NH₃)₃(H₂O)₃]Cl₃ is",
        options: [
          "triaquatriamminechromium(III) chloride",
          "triamminetriaquachromium(III) chloride",
          "triaquatriamminechromium(II) chloride",
          "triamminetriaquachromium(II) chloride",
          "triaquatriamminechromium(III) trichloride"
        ],
        correctAnswer: "triamminetriaquachromium(III) chloride"
      },
      {
        question: "In Carius method, 0.4g organic compound gave 0.188g AgBr. Percentage of bromine is (Ag=108, Br=80)",
        options: [
          "20%",
          "10%",
          "15%",
          "25%",
          "30%"
        ],
        correctAnswer: "20%"
      },
      {
        question: "Which compound can exhibit both optical and geometrical isomerism?",
        options: [
          "2-chloropent-2-ene",
          "5-chloropent-2-ene",
          "4-chloropent-2-ene",
          "3-chloropent-1-ene",
          "3-chloropent-2-ene"
        ],
        correctAnswer: "4-chloropent-2-ene"
      },
      {
        question: "Which nucleophile is ambident?",
        options: [
          "CH₃O⁻",
          "HO⁻",
          "CH₃COO⁻",
          "H₂O",
          "CN⁻"
        ],
        correctAnswer: "CN⁻"
      },
      {
        question: "The achiral molecule among the following is",
        options: [
          "2-bromobutane",
          "3-nitropentane",
          "3-chlorobut-1-ene",
          "1-bromoethanol",
          "2-hydroxypropanoic acid"
        ],
        correctAnswer: "3-nitropentane"
      },
      {
        question: "Phenol can be converted to salicylaldehyde by",
        options: [
          "Kolbe reaction",
          "Williamson reaction",
          "Etard reaction",
          "Reimer-Tiemann reaction",
          "Stephen reaction"
        ],
        correctAnswer: "Reimer-Tiemann reaction"
      },
      {
        question: "The order of decreasing acid strength of carboxylic acids is",
        options: [
          "FCH₂COOH > ClCH₂COOH > NO₂CH₂COOH > CNCH₂COOH",
          "CNCH₂COOH > FCH₂COOH > NO₂CH₂COOH > ClCH₂COOH",
          "NO₂CH₂COOH > FCH₂COOH > ClCH₂COOH > CNCH₂COOH",
          "FCH₂COOH > NO₂CH₂COOH > ClCH₂COOH > CNCH₂COOH",
          "NO₂CH₂COOH > CNCH₂COOH > FCH₂COOH > ClCH₂COOH"
        ],
        correctAnswer: "NO₂CH₂COOH > CNCH₂COOH > FCH₂COOH > ClCH₂COOH"
      },
      {
        question: "Chlorophenylmethane treated with ethanolic NaCN then reduced with H₂/Ni gives",
        options: [
          "Phenylmethanamine",
          "1-phenylethanamine",
          "2-phenylethanamine",
          "1-methyl-2-phenylethanamine",
          "phenylmethanamine"
        ],
        correctAnswer: "2-phenylethanamine"
      },
      {
        question: "A reagent that can reduce benzene diazonium chloride to benzene is",
        options: [
          "ethanol",
          "methanol",
          "methanoic acid",
          "acetone",
          "phosphorous acid"
        ],
        correctAnswer: "ethanol"
      },
      {
        question: "Which is not an essential amino acid?",
        options: [
          "Lysine",
          "Tyrosine",
          "Threonine",
          "Tryptophan",
          "Methionine"
        ],
        correctAnswer: "Tyrosine"
      },
      {
        question: "14g cyclopropane burnt completely in excess oxygen. Moles of water formed is",
        options: [
          "1.4 moles",
          "2.8 moles",
          "2.0 moles",
          "1.0 mole",
          "4 moles"
        ],
        correctAnswer: "1.0 mole"
      }
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


    const initialStatus = Array(questionsWithShuffledOptions.length).fill(
      "not-visited"
    );

    setSelectedSubject(subject);
    setQuestions(questionsWithShuffledOptions);
    setSelectedAnswers({});
    setQuestionStatus(initialStatus);
    setCurrentQuestionIdx(0);
    setTimeLeft(1200); // reset timer
    setTestResults(null);
    setIsTimeLow(false);
    setIsReviewMode(false);
    setShowMobileNav(false);
  };

  const handleOptionSelect = (questionIndex, option) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionIndex]: option }));
    setQuestionStatus((prev) => {
      const newStatus = [...prev];

      newStatus[questionIndex] =
        prev[questionIndex] === "marked" ? "answered-marked" : "answered";
      return newStatus;
    });
  };


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


      if (timeLeft <= 120 && !isTimeLow) {
        setIsTimeLow(true);
      }

      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !testResults) {
      evaluateAnswers();
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


  const toggleMarkForReview = (questionIndex) => {
    setQuestionStatus((prev) => {
      const newStatus = [...prev];

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


  const goToNextQuestion = () => {
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);

      setShowMobileNav(false);
    }
  };

  const goToPrevQuestion = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(currentQuestionIdx - 1);

      setShowMobileNav(false);
    }
  };

  const goToQuestion = (index) => {
    setCurrentQuestionIdx(index);
    setIsReviewMode(false);

    setShowMobileNav(false);
  };


  const handleSubmitClick = () => {
    setShowConfirmation(true);

    setShowMobileNav(false);
  };


  const cancelSubmit = () => {
    setShowConfirmation(false);
  };


  const confirmSubmit = () => {
    setShowConfirmation(false);
    evaluateAnswers();
  };


  const toggleMobileNav = () => {
    setShowMobileNav(!showMobileNav);
  };


  const filteredScores =
    scoreHistorySubject === "ALL"
      ? scores
      : scores.filter((score) => score.setName === scoreHistorySubject);


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


  const createChartItems = () => {
    const realItems = filteredScores.map((score) => ({
      className: `rounded-md ${getSubjectColor(score.setName)}`,
      label: score.setName,
      progress: ((score.score / score.questions) * 100).toFixed(2),
    }));


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


  const calculateProgress = () => {
    const answeredQuestions = Object.keys(selectedAnswers).length;
    return (answeredQuestions / questions.length) * 100;
  };


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


  const getUnansweredCount = () => {
    return questions.length - Object.keys(selectedAnswers).length;
  };


  const getQuestionSections = () => {

    const questionCount = questions.length;
    const sectionSize = 30; //  30 questions per section

    const sections = [];
    for (let i = 0; i < questionCount; i += sectionSize) {
      sections.push({
        name: selectedSubject.name,
        questions: questions.slice(i, Math.min(i + sectionSize, questionCount)),
        startIndex: i,
      });
    }

    return sections;
  };


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
      className="min-h-screen bg-[#F4F8D3] bg-cover bg-fixed overflow-x-hidden flex flex-col items-center p-2 sm:p-4 relative"
      style={{ backgroundImage: "url(/images/mock-bg.webp)" }}
    >

      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/10"></div>


      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold m-2 sm:m-3 text-[#37474F]">
        KEAM MOCK TEST
      </h1>

      {!selectedSubject && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-8 w-full max-w-4xl  mb-6 sm:mb-8 px-2 sm:px-0">
            {subjects.map((subject, index) => (
              <div
                key={index}
                className="backdrop-blur-lg bg-[#ffffff3a] border border-gray-100 p-3 sm:p-4 md:p-6 rounded-lg shadow-lg flex flex-col items-center w-full md:w-[90%]"
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
            <div className="w-full max-w-4xl rounded-xl shadow-xl p-4 sm:p-6 md:p-8 backdrop-blur-lg  bg-[#ffffff4e] border border-gray-100 mx-2 sm:mx-0">
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
                      <h3
                        className={`font-bold text-base sm:text-lg mb-1 sm:mb-2 ${textColor}`}
                      >
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
                          className={`text-right text-xs sm:text-sm font-bold ${percentage >= 70
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
                  <BarChart
                    height={window.innerWidth < 640 ? 180 : 230}
                    items={createChartItems()}
                  />
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
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-40" onWheel={(e) => e.stopPropagation()} data-lenis-prevent>
          <div className="bg-white w-full h-full flex flex-col sm:flex-row overflow-hidden">
            {!testResults ? (

              <>
                {/* Mobile header with timer and question status toggle button */}
                <div className="sm:hidden flex justify-between items-center p-3 border-b bg-gray-50">
                  <div className="flex items-center">
                    <h2 className="text-lg font-bold">
                      {selectedSubject.name}
                    </h2>
                    <div className="ml-2">
                      <div
                        className={`px-2 py-1 rounded-md text-sm font-semibold ${isTimeLow
                            ? "bg-red-100 text-red-600 animate-pulse"
                            : "bg-blue-100 text-blue-600"
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
                    <span className="mr-1">
                      Q {currentQuestionIdx + 1}/{questions.length}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16m-7 6h7"
                      />
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
                          className={`bg-blue-50 border border-blue-100 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg ${isTimeLow
                              ? "animate-pulse border-red-300 bg-red-50"
                              : ""
                            }`}
                        >
                          <p
                            className={`font-semibold ${isTimeLow ? "text-red-600" : ""
                              }`}
                          >
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


                        <div className="sm:hidden text-sm text-gray-500">
                          {Object.keys(selectedAnswers).length}/
                          {questions.length} answered
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
                              className={`w-full p-2 sm:p-4 border rounded-lg text-left flex items-center text-sm sm:text-base ${selectedAnswers[currentQuestionIdx] === option
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
                          className={`px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base ${currentQuestionIdx > 0
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
                          Mark for review
                        </button>

                        <button
                          onClick={goToNextQuestion}
                          className={`px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base ${currentQuestionIdx < questions.length - 1
                              ? "bg-blue-500 text-white hover:bg-blue-600"
                              : "bg-gray-100 text-gray-400 cursor-not-allowed"
                            }`}
                          disabled={currentQuestionIdx === questions.length - 1}
                        >
                          Next
                        </button>
                      </div>
                    </div>


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
                  <div
                    className={`
                    ${showMobileNav
                        ? "translate-x-0"
                        : "translate-x-full sm:translate-x-0"
                      } 
                    fixed sm:relative top-0 right-0 h-full 
                    w-5/6 sm:w-64 bg-gray-50 border-l border-gray-200 p-3 sm:p-4 
                    overflow-y-auto z-20 transition-transform duration-300 ease-in-out
                    sm:block
                  `}
                  >
                    {/* Mobile close button */}
                    <div className="sm:hidden flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">Question Status</h3>
                      <button
                        onClick={toggleMobileNav}
                        className="p-2 text-gray-600 hover:bg-gray-200 rounded-full"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
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
                          <span>
                            Answered:{" "}
                            {getQuestionCounts().answered +
                              getQuestionCounts().answeredMarked}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-red-100"></div>
                          <span>
                            Not Answered: {getQuestionCounts().notAnswered}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-gray-200"></div>
                          <span>
                            Not Visited: {getQuestionCounts().notVisited}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-yellow-100 border border-yellow-400"></div>
                          <span>
                            Marked for review:{" "}
                            {getQuestionCounts().marked +
                              getQuestionCounts().answeredMarked}
                          </span>
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
                              ${currentQuestionIdx === index
                                ? "ring-2 ring-blue-500"
                                : ""
                              }
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
                  <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-5 max-w-sm w-full mx-4">
                      <h3 className="text-lg font-bold mb-4">
                        Confirm Submission
                      </h3>
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
              //  Test Results
              <div className="flex-1 p-4 sm:p-6 md:p-10 overflow-y-auto">
                <div className="max-w-4xl mx-auto">
                  <div className="bg-white shadow-md rounded-xl p-5 sm:p-8 mb-8">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                          Test Results
                        </h2>
                        <p className="text-gray-500">
                          {selectedSubject.name} -{" "}
                          {new Date().toLocaleDateString()}
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
                        <p className="text-sm text-blue-600 font-medium mb-1">
                          Total Questions
                        </p>
                        <p className="text-2xl sm:text-3xl font-bold">
                          {testResults.totalQuestions}
                        </p>
                      </div>
                      <div className="bg-green-50 border border-green-100 rounded-lg p-4 flex flex-col items-center justify-center">
                        <p className="text-sm text-green-600 font-medium mb-1">
                          Correct Answers
                        </p>
                        <p className="text-2xl sm:text-3xl font-bold">
                          {testResults.correctAnswers}
                        </p>
                      </div>
                      <div className="bg-purple-50 border border-purple-100 rounded-lg p-4 flex flex-col items-center justify-center">
                        <p className="text-sm text-purple-600 font-medium mb-1">
                          Score Percentage
                        </p>
                        <p className="text-2xl sm:text-3xl font-bold">
                          {testResults.percentScore}%
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-4">
                        Question Analysis
                      </h3>
                      <div className="space-y-4">
                        {testResults.answers.map((answer, index) => (
                          <div
                            key={index}
                            className={`border rounded-lg p-4 ${answer.isCorrect
                                ? "bg-green-50 border-green-100"
                                : "bg-red-50 border-red-100"
                              }`}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-medium text-base sm:text-lg">
                                Question {index + 1}
                              </h4>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${answer.isCorrect
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                  }`}
                              >
                                {answer.isCorrect ? "Correct" : "Incorrect"}
                              </span>
                            </div>
                            <p className="text-sm sm:text-base mb-2">
                              {answer.question}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                              <div className="flex items-center">
                                <span className="font-medium mr-2">
                                  Your Answer:
                                </span>
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
                                <span className="font-medium mr-2">
                                  Correct Answer:
                                </span>
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
