import React, { useState, useEffect, useContext, useRef } from "react";
import { AppContext } from "../context/AppContext";
import Button from "./Button";
import BarChart from "./bar-chart";
import StyledSplitButton from "./StyledSplitButton";

const LbsTest = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(7200); // 2 hours in seconds
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [testResults, setTestResults] = useState(null);
  const [scoreHistorySubject, setScoreHistorySubject] = useState("GENERAL");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [markedForReview, setMarkedForReview] = useState({});
  const [visitedQuestions, setVisitedQuestions] = useState({});
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const sidebarRef = useRef(null);
  const [confirmSubmit, setConfirmSubmit] = useState(false);

  const { submitTestResult, mainTestScores, getMainTestScores, userId } = useContext(AppContext);

  // Define single section for the test
  const section = {
    name: "GENERAL",
    questionCount: 120, // Updated based on sectionQuestions array length
    image: "/images/general.jpg"
  };

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

 const sectionQuestions = [
    {
      "question": "C++ programming language follows:",
      "options": ["Procedural programming", "Object oriented programming", "Both (A) & (B)", "Neither A nor B"],
      "correctAnswer": "Both (A) & (B)"
    },
    {
      "question": "Pictorial representation of an algorithm is known as:",
      "options": ["Venn diagram", "Histogram", "ER diagram", "Flow chart"],
      "correctAnswer": "Flow chart"
    },
    {
      "question": "Which of the following is the correct syntax for declaring a pointer in C?",
      "options": ["int *ptr;", "int ptr*;", "*int ptr;", "ptr int*;"],
      "correctAnswer": "int *ptr;"
    },
    {
      "question": "Main feature of Operating System is:",
      "options": ["Memory management", "Processor management", "Device management", "All of the above"],
      "correctAnswer": "All of the above"
    },
    {
      "question": "What Is the full form of the term FLOPS Connected with Super Computer:",
      "options": ["Floating-point Operations Per Second", "Frames Loading Operation Per Second", "File Loading Operations Per Second", "File Locking Operations Per Second"],
      "correctAnswer": "Floating-point Operations Per Second"
    },
    {
      "question": "Which of the following is used to convert high level language to machine level language?",
      "options": ["Compiler", "Macros", "Operating System", "Loader"],
      "correctAnswer": "Compiler"
    },
    {
      "question": "Size of virtual memory depends on:",
      "options": ["Secondary memory", "Primary memory", "Cache memory", "Both (A) & (B)"],
      "correctAnswer": "Secondary memory"
    },
    {
      "question": "Cache memory is used to:",
      "options": ["Reduce memory access time", "Increase storage", "To implement pipelining", "Increase memory access time"],
      "correctAnswer": "Reduce memory access time"
    },
    {
      "question": "1 MB is equal to:",
      "options": ["1048576 bytes", "1047756 bytes", "2048576 bytes", "2047756 bytes"],
      "correctAnswer": "1048576 bytes"
    },
    {
      "question": "Main memory is also known as:",
      "options": ["ROM", "RAM", "EEPROM", "PROM"],
      "correctAnswer": "RAM"
    },
    {
      "question": "1 Petabyte is:",
      "options": ["1024 Megabytes", "2048 Terabytes", "1024 Gigabytes", "1024 Terabytes"],
      "correctAnswer": "1024 Terabytes"
    },
    {
      "question": "Which of the following is/are examples of relational database?",
      "options": ["Oracle", "Ingress", "MySQL", "All of these"],
      "correctAnswer": "All of these"
    },
    {
      "question": "Static RAM is:",
      "options": ["Volatile", "Quick access time", "High-cost", "All of the above"],
      "correctAnswer": "All of the above"
    },
    {
      "question": "Address of the next instruction to be executed from memory is stored in:",
      "options": ["Data register", "Program counter", "Accumulator", "None of these"],
      "correctAnswer": "Program counter"
    },
    {
      "question": "DQL stands for:",
      "options": ["Data Question Language", "Data Query Language", "Daily Query Language", "Data Quoted Language"],
      "correctAnswer": "Data Query Language"
    },
    {
      "question": "The output of a NOR Gate is 1 when:",
      "options": ["All the Inputs are 1", "Any one of the Input is 1", "All inputs are zero", "Any one of the input is 0"],
      "correctAnswer": "All inputs are zero"
    },
    {
      "question": "When an interrupt occurs:",
      "options": ["Flag register pushed on to the stack", "Return address is pushed on to the stack", "Both (A) & (B)", "Neither A nor B"],
      "correctAnswer": "Both (A) & (B)"
    },
    {
      "question": "Which of the following is a Data Manipulation Language?",
      "options": ["CREATE", "SELECT", "INSERT", "GRANT"],
      "correctAnswer": "INSERT"
    },
    {
      "question": "What is the decimal value of 1011.11?",
      "options": ["10.92", "11.75", "12.67", "13.87"],
      "correctAnswer": "11.75"
    },
    {
      "question": "Programmable Interrupt Controller is:",
      "options": ["8255", "8259", "8279", "8051"],
      "correctAnswer": "8259"
    },
    {
      "question": "Binary equivalent of decimal 23.6 is:",
      "options": ["10111.10011", "10110.10001", "10101.11001", "10110.10101"],
      "correctAnswer": "10111.10011"
    },
    {
      "question": "Bootstrap program to start the computer is stored in:",
      "options": ["RAM", "ROM", "CD-ROM", "All of these"],
      "correctAnswer": "ROM"
    },
    {
      "question": "In computer, bus carries information between:",
      "options": ["ROM and RAM", "Microprocessor and I/O", "Microprocessor, Memory and I/O", "RAM and Microprocessor"],
      "correctAnswer": "Microprocessor, Memory and I/O"
    },
    {
      "question": "Principle of locality of reference is associated with:",
      "options": ["Virtual memory", "ROM", "RAM", "Cache Memory"],
      "correctAnswer": "Cache Memory"
    },
    {
      "question": "Working principle of digital computer is based on:",
      "options": ["Von Neumann’s Principle", "Adams law", "De Morgan’s Principle", "Kirchhoff’s Law"],
      "correctAnswer": "Von Neumann’s Principle"
    },
    {
      "question": "Quality of a printer is analysed by:",
      "options": ["Words per inch", "Dot per inch", "Character per inch", "None of these"],
      "correctAnswer": "Dot per inch"
    },
    {
      "question": "DMA stands for:",
      "options": ["Direct Method Access", "Direct Module Access", "Direct Memory Access", "Day Memory Access"],
      "correctAnswer": "Direct Memory Access"
    },
    {
      "question": "Convert hexadecimal 9AF to binary:",
      "options": ["1001 1000 1110", "1001 1010 1111", "1110 1110 1101", "0111 1100 1100"],
      "correctAnswer": "1001 1010 1111"
    },
    {
      "question": "If function f (A, B, C, D) =Σ (0, 1, 2, 5,8, 9,10) is implemented using POS form, the resultant Boolean function is:",
      "options": ["(B+D).(C+D).(A+B)", "(B+A).(D+B).(B+C)", "(A+C).(B+D).(A+B)", "None of these"],
      "correctAnswer": "None of these"
    },
    {
      "question": "Data from tape memory is accessed using:",
      "options": ["Parallel", "Serial", "Sequential", "Indirect"],
      "correctAnswer": "Sequential"
    },
    {
      "question": "Convert 1000 1100 to hexadecimal:",
      "options": ["8C", "9C", "8A", "9B"],
      "correctAnswer": "8C"
    },
    {
      "question": "Address generated by CPU consists of:",
      "options": ["Page number and offset", "Frame number and offset", "Page bit and frame bit", "Page number only"],
      "correctAnswer": "Page number and offset"
    },
    {
      "question": "Which of the following represents Idempotent Law?",
      "options": ["A=A", "A+A=A", "Both A & B", "A.0=0"],
      "correctAnswer": "Both A & B"
    },
    {
      "question": "Computer has more than one processor is called:",
      "options": ["Multiprocessor", "Multitasking", "Multithreaded", "Multiclad"],
      "correctAnswer": "Multiprocessor"
    },
    {
      "question": "Snow Leopard is connected with",
      "options": ["Windows", "Intel", "Android", "Apple Mac"],
      "correctAnswer": "Apple Mac"
    },
    {
      "question": "Which of the following is sufficient to derive a Boolean Expression?",
      "options": ["XOR", "AND", "{OR, AND}", "None of these"],
      "correctAnswer": "None of these"
    },
    {
      "question": "If function f (A, B, C) =Σ (3,4,6,7) is implemented using SOP form, the resultant Boolean function is:",
      "options": ["BC+AC", "BC+AB", "CB+CA", "None of these"],
      "correctAnswer": "None of these"
    },
    {
      "question": "Synchronous DRAM has a built-in refresh rate of:",
      "options": ["56 milliseconds", "64 milliseconds", "65 milliseconds", "46 milliseconds"],
      "correctAnswer": "64 milliseconds"
    },
    {
      "question": "Database can store:",
      "options": ["Image", "Video", "Text", "All of these"],
      "correctAnswer": "All of these"
    },
    {
      "question": "Which of the following key is used to identify all the tuples in a relationship?",
      "options": ["Surrogate key", "Primary key", "Foreign Key", "All of the above"],
      "correctAnswer": "Primary key"
    },
    {
      "question": "FPGA stands for:",
      "options": ["Fast Peripheral Gate Array", "Field Programmable Gate Array", "Fast Programmable Gate Array", "Field Peripheral Gate Array"],
      "correctAnswer": "Field Programmable Gate Array"
    },
    {
      "question": "Entity Relationship modelling uses:",
      "options": ["Top-down approach", "Bottom-up approach", "Tree structure", "Both (A) & (B)"],
      "correctAnswer": "Top-down approach"
    },
    {
      "question": "Non maskable interrupt is known as:",
      "options": ["TRAP", "INT 65", "INT 75", "INT 16"],
      "correctAnswer": "TRAP"
    },
    {
      "question": "Physical memory is divided into fixed size block called:",
      "options": ["Pages", "Segments", "Frames", "Blocks"],
      "correctAnswer": "Frames"
    },
    {
      "question": "Multivalued dependency is handled in:",
      "options": ["1NF", "2NF", "3NF", "4NF"],
      "correctAnswer": "4NF"
    },
    {
      "question": "Real number in C language is represented as:",
      "options": ["Double", "Float", "Long", "Char"],
      "correctAnswer": "Double or Float"
    },
    {
      "question": "Error in computer data is known as:",
      "options": ["Trap", "Bug", "Tape", "Chip"],
      "correctAnswer": "Bug"
    },
    {
      "question": "Partial functional dependency is eliminated in:",
      "options": ["1NF", "2NF", "3NF", "BCNF"],
      "correctAnswer": "2NF"
    },
    {
      "question": "Programs written to perform a specific task is known as:",
      "options": ["System software", "Assembler", "Application software", "Loader"],
      "correctAnswer": "Application software"
    },
    {
      "question": "Data about data is known as:",
      "options": ["Mega data", "Meta data", "Schema", "Database"],
      "correctAnswer": "Meta data"
    },
    {
      "question": "Row in a database is termed as:",
      "options": ["Tuple", "Entity", "Relationship", "Text"],
      "correctAnswer": "Tuple"
    },
    {
      "question": "The distance between the lines 3x + 4y = 9 and 6x + 8y = 15 is:",
      "options": ["6", "6/5", "3/10", "1"],
      "correctAnswer": "3/10"
    },
    {
      "question": "If log₁₆x + log₄x + log₂x = 14, then x =",
      "options": ["64", "48", "16", "None of these"],
      "correctAnswer": "None of these"
    },
    {
      "question": "If aˣ = b, bʸ = c , cᶻ = a then the value of xyz is:",
      "options": ["1", "0", "abc", "2"],
      "correctAnswer": "1"
    },
    {
      "question": "√49 + 20√6 =",
      "options": ["7 + √30", "5 + 2√6", "49 − 20√6", "10"],
      "correctAnswer": "5 + 2√6"
    },
    {
      "question": "If the sum of n terms of two arithmetic series are in the ratio (7n + 1): (4n + 27), then their 11th term is in the ratio:",
      "options": ["3: 4", "4: 3", "7: 4", "1: 1"],
      "correctAnswer": "4: 3"
    },
    {
      "question": "If the roots of the equation ax² + bx + c = 0 are real and of the form then the value of =",
      "options": ["b² − 4ac", "b² + 4ac", "b² − 2ac", "0"],
      "correctAnswer": "b² − 4ac"
    },
    {
      "question": "The coefficient of x⁶ in the expansion of (1 − x)⁻² is:",
      "options": ["6", "7", "0", "1"],
      "correctAnswer": "7"
    },
    {
      "question": "From a group of 7 women and 6 men, 5 persons are to be selected to form a committee so that at least 3 women are there in the committee. In how many ways can it be done?",
      "options": ["525", "700", "756", "735"],
      "correctAnswer": "756"
    },
    {
      "question": "If 9P5 + 5 x 9P4 = 10Pr then r =",
      "options": ["5", "4", "10", "9"],
      "correctAnswer": "5"
    },
    {
      "question": "If cosθ + √3 sinθ = 2, then θ =",
      "options": ["π/3", "π/6", "π/4", "π/2"],
      "correctAnswer": "π/3"
    },
    {
      "question": "Let A and B be any two events. Probability of happening of at least one of the two events is 0.7 and their simultaneous happening is 0.3. then P(A) + P(B) =",
      "options": ["1", "0.21", "0.1", "0.4"],
      "correctAnswer": "1"
    },
    {
      "question": "The arithmetic mean of 15, 18, 10, 22 and x is 20. Then the value of x is:",
      "options": ["20", "35", "25", "30"],
      "correctAnswer": "35"
    },
    {
      "question": "The areas of two circles are in the ratio 1:3. If the circles are bent in the form of squares, what is the ratio of their areas?",
      "options": ["1:2", "1:3", "1: √2", "1: √3"],
      "correctAnswer": "1:3"
    },
    {
      "question": "The volume of a right circular cone is 600 cm³. If its height is 12 cm, then the area of its base is:",
      "options": ["50 cm²", "120 cm²", "150 cm²", "100 cm²"],
      "correctAnswer": "150 cm²"
    },
    {
      "question": "The value of cos12° + cos84° + cos156° + cos132° =",
      "options": ["0.5", "0", "1", "None of these"],
      "correctAnswer": "None of these"
    },
    {
      "question": "Find the area of a trapezium whose parallel sides are 15 cm and 20 cm long and the distance between them is 10cm:",
      "options": ["250 cm²", "175 cm²", "250 cm²", "350 cm²"],
      "correctAnswer": "175 cm²"
    },
    {
      "question": "If cosec ∝ + cot ∝ = a, then cos ∝ =",
      "options": ["(a² + 1)/(a² − 1)", "(a² − 1)/(a² + 1)", "1/a", "a"],
      "correctAnswer": "(a² − 1)/(a² + 1)"
    },
    {
      "question": "The focus of the parabola y² − x − 2y + 2 is:",
      "options": ["(1/4, 1)", "(1, 1)", "(1/2, 1)", "(1/4, 0)"],
      "correctAnswer": "(1/4, 1)"
    },
    {
      "question": "The eccentricity of the ellipse 9x² + 5y² − 30y = 0 is:",
      "options": ["2/3", "5/9", "9/5", "4/3"],
      "correctAnswer": "2/3"
    },
    {
      "question": "Find the unit digit of 129¹⁰³",
      "options": ["9", "3", "1", "7"],
      "correctAnswer": "9"
    },
    {
      "question": "The number of tangents that can be drawn from (-1, 3) to x² + y² = 10 is:",
      "options": ["1", "0", "2", "More than 2"],
      "correctAnswer": "1"
    },
    {
      "question": "Equation to the locus of a point equidistant from the points A(1, -5) and B (−2,3) is :",
      "options": ["x – 4y = 4", "6x – 16y =13", "16x – 6y = –13", "6x + 16 y = 13"],
      "correctAnswer": "6x – 16y =13"
    },
    {
      "question": "A solid metallic sphere of radius 15cm is melted and recast in the form of small spheres of radius 3 cm. How many small spheres are formed?",
      "options": ["25", "115", "102", "125"],
      "correctAnswer": "125"
    },
    {
      "question": "The sixth and eleventh term of a harmonic progression are 1/6 and 1/11 respectively. Then its second term is:",
      "options": ["1/16", "1/12", "1", "None of these"],
      "correctAnswer": "None of these"
    },
    {
      "question": "The value of [(15³ × 3¹⁵ × 2³) ÷ (30³ × 3¹²)]² is:",
      "options": ["81", "729", "5832", "3645"],
      "correctAnswer": "729"
    },
    {
      "question": "If a² + b² + c² = 25 and a + b + c =7, then (ab + bc + ca)² is:",
      "options": ["144", "576", "324", "81"],
      "correctAnswer": "144"
    },
    {
      "question": "The area of a square is 100 sq.cm. If the side length increased by 3 cm, what will be the percentage increase in the area?",
      "options": ["3%", "9%", "69%", "169%"],
      "correctAnswer": "69%"
    },
    {
      "question": "The average mark of 75% of the total number of students in a class is 80% of the class average. Then how much of the class average will be the average mark of the remaining 25% ?",
      "options": ["160%", "120%", "60%", "20%"],
      "correctAnswer": "160%"
    },
    {
      "question": "If P: Q = 3: 5 and Q: R = 7: 11, then, P: Q: R is:",
      "options": ["15:25:55", "15:35:55", "21:35:55", "21:49:77"],
      "correctAnswer": "21:35:55"
    },
    {
      "question": "If x = 18, then x(x² + 3x + 3) =",
      "options": ["326", "324", "322", "522"],
      "correctAnswer": "322"
    },
    {
      "question": "Which of the fractions is the largest?",
      "options": ["5/7", "4/5", "3/4", "2/3"],
      "correctAnswer": "4/5"
    },
    {
      "question": "Which of the following numbers is the smallest number which is completely divisible by all integers from 1 to 10?",
      "options": ["840", "1260", "2520", "5040"],
      "correctAnswer": "2520"
    },
    {
      "question": "What is the unit digit of the number (2148)²⁶ ?",
      "options": ["8", "4", "2", "6"],
      "correctAnswer": "4"
    },
    {
      "question": "The value of (√3 + 1/√3)² is :",
      "options": ["4/3", "3 + 1/√3", "4 + 2/√3", "3 + 2/√3"],
      "correctAnswer": "4 + 2/√3"
    },
    {
      "question": "If the price of a commodity increased by 20%, then what percentage is the reduction in consumption so that the expenditure remains the same?",
      "options": ["83 1/3", "16", "16 1/3", "16 2/3"],
      "correctAnswer": "16 2/3"
    },
    {
      "question": "Two litres of a mixture contains kerosene and petrol in the ratio 2:3. To prepare a new mixture containing kerosene and petrol in the ratio 3:2, how much more kerosene should be added?",
      "options": ["1.2 litres", "1 litre", "0.8 litre", "0.6 litre"],
      "correctAnswer": "1 litre"
    },
    {
      "question": "If 23ᵖ + 32ᵖ is divisible by 55, then the value of p is?",
      "options": ["10", "8", "6", "11"],
      "correctAnswer": "11"
    },
    {
      "question": "The remainder when 9¹ + 9² + 9³ + 9⁴ + 9⁵ + 9⁶ + 9⁷ is divided by 6 is:",
      "options": ["0", "1", "3", "5"],
      "correctAnswer": "3"
    },
    {
      "question": "The number of numbers greater than 3000 that can be formed from the digits 1, 2, 3, 4, 5 and 6 if repetition is not allowed is:",
      "options": ["240", "2500", "500", "1296"],
      "correctAnswer": "240"
    },
    {
      "question": "Complete the series: 26AZ1, 24CX9, , 20GT49",
      "options": ["22EV16", "22DV25", "22DV16", "22EV25"],
      "correctAnswer": "22EV25"
    },
    {
      "question": "Complete the series: 0, 4, 18, , 100, 180",
      "options": ["32", "40", "48", "64"],
      "correctAnswer": "48"
    },
    {
      "question": "Some of the letters of the series “a_aab_aa_a_a_b “are missing which are given in that order as one of the alternatives given below. Choose the correct alternative.",
      "options": ["babab", "ababa", "babaa", "abbba"],
      "correctAnswer": "babaa"
    },
    {
      "question": "State which of the conclusions follow from the statements given below: Statements : All apples are grapes. Some grapes are oranges Conclusions: 1. Some apples are oranges; 2. Some oranges are apples 3. Some oranges are grapes; 4. Some grapes are apples",
      "options": ["Only 3 and 4 follow", "Only 1 and 2 follow", "Only 2 and 3 follow", "None follows"],
      "correctAnswer": "Only 3 and 4 follow"
    },
    {
      "question": "If x = 1 + √2, then (x − 1/x)² =",
      "options": ["2", "4", "2√2", "4√2"],
      "correctAnswer": "4"
    },
    {
      "question": "A man travelled from P to Q at the rate of 5km per hour. Had he travelled at the rate of 7km per hour he would have taken 3 more hours to reach the destination. What is the distance between P and Q?",
      "options": ["42 km", "168 km", "84 km", "210 km"],
      "correctAnswer": "210 km"
    },
    {
      "question": "Following the situation, four probable answers are given as alternatives. Choose the most suitable alternative. You came to know your boss spies on your work in the office all the time. You will:",
      "options": ["Ignore the boss", "Subtly convey it to the boss", "Just do your work sincerely", "Tell the matter to others in the office"],
      "correctAnswer": "Just do your work sincerely"
    },
    {
      "question": "Which of the following is a major goal of women empowerment?",
      "options": ["Increase population growth", "Provide equal opportunities for women", "Enhance male employment", "Promote traditional gender roles"],
      "correctAnswer": "Provide equal opportunities for women"
    },
    {
      "question": "Female literacy can contribute to:",
      "options": ["More school dropouts", "Higher unemployment", "Greater dependence on men", "Greater independence and empowerment"],
      "correctAnswer": "Greater independence and empowerment"
    },
    {
      "question": "Equal pay for equal work ensures:",
      "options": ["Gender discrimination", "Workplace bias", "Gender equality", "More work for men"],
      "correctAnswer": "Gender equality"
    },
    {
      "question": "The Constitution of India grants equal rights to men and women under which article?",
      "options": ["Article 370", "Article 15", "Article 21A", "Article 356"],
      "correctAnswer": "Article 15"
    },
    {
      "question": "Which of the following is an obstacle to women empowerment in India?",
      "options": ["Access to education", "Gender discrimination", "Self-employment opportunities", "Government schemes"],
      "correctAnswer": "Gender discrimination"
    },
    {
      "question": "Which of the following best helps to improve memory retention?",
      "options": ["Watching TV", "Repetition and revision", "Ignoring new facts", "Sleeping more"],
      "correctAnswer": "Repetition and revision"
    },
    {
      "question": "The process of storing information in the brain is known as",
      "options": ["Recording", "Forgetting", "Storage", "Retrieval"],
      "correctAnswer": "Storage"
    },
    {
      "question": "Long-term memory is characterized by:.",
      "options": ["Very limited capacity", "Rapid forgetting", "Temporary storage", "Virtually unlimited capacity"],
      "correctAnswer": "Virtually unlimited capacity"
    },
    {
      "question": "Chunking helps memory by:",
      "options": ["Deleting useless data", "Dividing data into smaller parts", "Grouping information into meaningful units", "Forgetting quickly"],
      "correctAnswer": "Grouping information into meaningful units"
    },
    {
      "question": "Which of the following activities can improve the retrieval of memory?",
      "options": ["Cramming before an exam", "Regular review and practice", "Avoiding difficult topics", "Memorizing without understanding"],
      "correctAnswer": "Regular review and practice"
    },
    {
      "question": "Renu completed her work, ? (Add a suitable question tag)",
      "options": ["isn’t it", "didn’t she", "did she", "hadn’t she"],
      "correctAnswer": "didn’t she"
    },
    {
      "question": "It is very hot. (Convert into an exclamatory sentence)",
      "options": ["How hot is it!", "How hot it is!", "How hot was it!", "How very hot it is!"],
      "correctAnswer": "How hot it is!"
    },
    {
      "question": "Pick out the correct sentence:",
      "options": ["He wrote two letters since morning.", "He has written two letters since morning.", "He has been written two letters since morning.", "He has wrote two letters since morning"],
      "correctAnswer": "He has written two letters since morning."
    },
    {
      "question": "The project appeared to be simple, but we faced may difficulties when we started it. (Replace the word in italics with the correct phrase)",
      "options": ["came across", "came up to", "came to", "came along"],
      "correctAnswer": "came across"
    },
    {
      "question": "A is a person who pretends to be what he is not.",
      "options": ["hyperbolic", "hypocrite", "sycophant", "altruist"],
      "correctAnswer": "hypocrite"
    },
    {
      "question": "The invaders the city.",
      "options": ["stole", "plundered", "aggravated", "hailed"],
      "correctAnswer": "plundered"
    },
    {
      "question": "Susan is very confident of winning the race, but her friend Teena is --.",
      "options": ["diffident", "provident", "positive", "prudent"],
      "correctAnswer": "diffident"
    },
    {
      "question": "He could not finish the work he was very tired.",
      "options": ["since", "hence", "nevertheless", "despite"],
      "correctAnswer": "since"
    },
    {
      "question": "Who is the present Cabinet Minister for Education, Government of India?",
      "options": ["Kiran Rijiju", "Ramesh Pokhriyal", "Prakash Javadekar", "Dharmendra Pradhan"],
      "correctAnswer": "Dharmendra Pradhan"
    },
    {
      "question": "Mahl is one of the principal languages of:",
      "options": ["Andaman & Nicobar", "Bastar region of Chhattisgarh", "Lakshadweep", "Meghalaya"],
      "correctAnswer": "Lakshadweep"
    },
    {
      "question": "The world chess championship 2023 was won by:",
      "options": ["Ian Nepomniachtchi", "Ding Liren", "Zhu Chen", "Magnus Carlsen"],
      "correctAnswer": "Ding Liren"
    },
    {
      "question": "The Lyricist of the telugu song ‘Nattu nattu’ which won the Golden Globe Award:",
      "options": ["Kaala Bhairava", "Rahul Sipligunj", "Keeravani", "Chandrabose"],
      "correctAnswer": "Chandrabose"
    },
    {
      "question": "The G7 summit 2023 was held from May 19-21 at Japan.",
      "options": ["Hiroshima", "Tokyo", "Kyoto", "Yokohama"],
      "correctAnswer": "Hiroshima"
    }
];


  const startTest = () => {
    // Prepare questions with section metadata
    const allQuestions = sectionQuestions.map((q, idx) => ({
      ...q,
      section: section.name,
      sectionIndex: idx
    }));

    setQuestions(allQuestions);
    setIsStarted(true);
    setSelectedAnswers({});
    setMarkedForReview({});
    setVisitedQuestions({});
    setTimeLeft(7200); // Reset timer to 3 hours (10800 seconds)
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
      [section.name]: { correct: 0, total: section.questionCount }
    };

    // Calculate scores
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        results[question.section].correct += 1;
      }
    });

    const totalCorrect = results[section.name].correct;
    const totalQuestions = results[section.name].total;
    const percentScore = (totalCorrect / totalQuestions) * 100;

    setTestResults({
      sections: results,
      totalCorrect,
      totalQuestions,
      percentScore: percentScore.toFixed(2),
      questions: questions.map((question, index) => ({
        question: question.question,
        options: question.options,
        correctAnswer: question.correctAnswer,
        userAnswer: selectedAnswers[index]
      }))
    });

    // Submit results to the server via AppContext
    submitTestResult(section.name, results[section.name].correct, results[section.name].total);
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
    // Refresh the scores after closing the test
    getMainTestScores();
  };

  // Filter scores based on selected subject
  const filteredScores = scoreHistorySubject === "ALL"
    ? mainTestScores
    : mainTestScores.filter(score => score.setName === scoreHistorySubject);

  // Get subject color for bars and UI elements
  const getSubjectColor = (subject) => {
    return "bg-blue-500"; // Single color for all questions
  };

  // Get subject text color
  const getSubjectTextColor = (subject) => {
    return "text-blue-500"; // Single color for all questions
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
    result[section.name] = questions.filter(q => q.section === section.name)
      .map((q, i) => ({
        globalIndex: questions.findIndex(question =>
          question.section === section.name && question.sectionIndex === i
        ),
        sectionIndex: i
      }));
    return result;
  };

  // Get the count of answered questions
  const getAnsweredCount = () => {
    let result = { total: 0 };
    const count = questions.filter(q =>
      selectedAnswers[questions.indexOf(q)] !== undefined
    ).length;
    result[section.name] = count;
    result.total = count;
    return result;
  };

  const answeredCount = getAnsweredCount();

  return (
    <div className="min-h-screen bg-fixed bg-cover overflow-x-hidden flex flex-col items-center p-4 relative"
      style={{ backgroundImage: "url(/images/main-bg.webp)" }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/30"></div>

      <h1 className="text-4xl font-bold m-3 text-zinc-700 z-10">LBS MOCK TEST</h1>

      {!isStarted && !testResults && (
        <div className="w-full max-w-4xl my-20">
          {/* Test Information */}
          <div className="backdrop-blur-lg bg-[#ffffff3a] border border-gray-100 p-6 rounded-lg shadow-lg mb-8 bg-opacity-80 ">
            <h2 className="text-2xl font-bold text-[#37474F] mb-4">Examination Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex flex-col">
                <span className="text-gray-600 font-semibold">Total Questions:</span>
                <span className="text-xl font-bold">{section.questionCount}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-600 font-semibold">Total Duration:</span>
                <span className="text-xl font-bold">2 hours (120 minutes)</span>
              </div>

            </div>

            <div className=" flex justify-center items-center">
              <StyledSplitButton
                onClick={startTest}
                startTest={startTest}
                className=""
              />
            </div>
          </div>
        </div>
      )}

      {isStarted && !testResults && (
        <div className="fixed inset-0 bg-white overflow-hidden flex flex-col z-40" onWheel={(e) => e.stopPropagation()} data-lenis-prevent>
          {/* Top Bar with Timer */}
          <div className="bg-orange-100 text-gray-700 p-3 flex justify-between items-center shadow-md">
            <div className="flex items-center">
              <h2 className="text-xl font-bold">LBS MOCK TEST</h2>
            </div>
            <div className="flex items-center space-x-3 md:space-x-6">
              {/* Hidden on small screens */}
              <div className="hidden md:flex md:space-x-6">
                <div className="text-center">
                  <span className={`text-sm font-semibold ${getCurrentQuestionSection() === section.name ? 'text-yellow-600' : ''}`}>
                    {section.name}
                  </span>
                  <div className="text-xs">
                    {answeredCount[section.name]}/{section.questionCount}
                  </div>
                </div>
              </div>

              {/* Show on all screens */}
              <div className="bg-white text-gray-600 rounded-lg px-3 py-2 md:px-4 md:py-2 font-mono text-base md:text-xl font-bold">
                {formatTime(timeLeft)}
              </div>

              {/* Mobile question navigator button */}
              <button
                className="mobile-nav-toggle md:hidden flex items-center justify-center p-2 rounded-md gap-2 bg-white text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => setMobileNavOpen(true)}
                aria-label="Open question navigator"
              >
                <div className="text-sm font-semibold text-gray-600">
                  Q {questionIndex + 1}/{questions.length}
                </div>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile summary bar */}
          <div className="md:hidden bg-gray-100 p-2 border-b flex justify-between items-center">
            <div className="flex space-x-2 text-xs">
              <div className="text-center">
                <span className={`text-xs font-semibold ${getCurrentQuestionSection() === section.name ? getSubjectTextColor(section.name) : 'text-gray-600'}`}>
                  {section.name.substring(0, 4)}
                </span>
                <div className="text-xs">
                  {answeredCount[section.name]}/{section.questionCount}
                </div>
              </div>
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
                        className={`py-2 px-4 md:px-6 rounded-lg font-medium text-sm md:text-base ${questionIndex === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#01B707] text-white hover:bg-green-600'
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
                          className="bg-[#01B707] text-white py-2 px-4 md:px-6 rounded-lg font-medium text-sm md:text-base hover:bg-green-600"
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
                  <div className="sticky bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 ">
                    <button
                      onClick={() => {
                        setConfirmSubmit(true)
                      }}
                      className="w-full bg-[#01B707] text-white py-3 rounded-lg font-bold hover:bg-green-600 transition"
                    >
                      Submit Test
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* confirming submit */}
            {confirmSubmit && (
              <div className="fixed inset-0 bg-[#11111134] backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/3">
                  <h2 className="text-lg font-bold mb-4">Confirm Submission</h2>
                  <p className="text-gray-700 mb-4">Are you sure you want to submit the test? You won't be able to change your answers after submission.</p>
                  <div className="flex justify-between">
                    <button
                      onClick={() => setConfirmSubmit(false)}
                      className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        setConfirmSubmit(false);
                        evaluateAnswers();
                      }}
                      className="bg-[#01B707] text-white py-2 px-4 rounded-lg hover:bg-green-600"
                    >
                      Yes, Submit
                    </button>
                  </div>
                </div>
              </div>
            )}

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
                  <div>
                    <h4 className={`font-semibold ${getSubjectTextColor(section.name)} mb-2`}>
                      {section.name} ({answeredCount[section.name]}/{section.questionCount})
                    </h4>
                    <div className="grid grid-cols-5 gap-2">
                      {getQuestionsBySection()[section.name]?.map((q) => (
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
                </div>
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
                <div>
                  <h4 className={`font-semibold ${getSubjectTextColor(section.name)} mb-2`}>
                    {section.name} ({answeredCount[section.name]}/{section.questionCount})
                  </h4>
                  <div className="grid grid-cols-5 gap-2">
                    {getQuestionsBySection()[section.name]?.map((q) => (
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
              </div>

              <div className="mt-8">
                <button
                  onClick={() => {
                    setConfirmSubmit(true)
                  }}
                  className="w-full bg-[#01B707] text-white py-3 rounded-lg font-bold hover:bg-green-600 transition"
                >
                  Submit Test
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {testResults && (
        <div className="fixed inset-0 bg-white z-40 overflow-y-scroll" data-lenis-prevent>
          <div className="max-w-4xl mx-auto p-6 flex flex-col h-full">
            {/* Results Header */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white mb-6">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Test Results</h2>
              <div className="text-lg">
                <p>You scored <span className="font-bold text-yellow-300">{testResults.totalCorrect}</span> out of <span className="font-bold">{testResults.totalQuestions}</span> questions correctly.</p>
                <p className="text-xl md:text-2xl font-bold mt-2">
                  Overall Score: {testResults.percentScore}%
                </p>
              </div>
            </div>

            {/* Section-wise Results */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Section-wise Performance</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Section</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Out of</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {Object.entries(testResults.sections).map(([sectionName, data]) => {
                      const percentage = ((data.correct / data.total) * 100).toFixed(2);
                      return (
                        <tr key={sectionName}>
                          <td className={`px-6 py-4 whitespace-nowrap font-medium ${getSubjectTextColor(sectionName)}`}>
                            {sectionName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {data.correct}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {data.total}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2 dark:bg-gray-700" style={{ width: '100px' }}>
                                <div
                                  className={`${getSubjectColor(sectionName)} h-2.5 rounded-full`}
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                              <span>{percentage}%</span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Question Review Section */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Question Review</h3>
              <div className="space-y-4">
                {testResults.questions.map((q, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4">
                    <h4 className="font-semibold text-gray-700 mb-2">Question {index + 1}</h4>
                    <p className="text-gray-800 mb-2">{q.question}</p>
                    <div className="space-y-2">
                      {q.options.map((option, idx) => (
                        <div key={idx} className={`p-2 rounded ${option === q.correctAnswer ? 'bg-green-100' : option === q.userAnswer ? 'bg-red-100' : 'bg-gray-100'}`}>
                          <span className="font-medium">{['A', 'B', 'C', 'D', 'E'][idx]}. </span>
                          <span>{option}</span>
                          {option === q.correctAnswer && <span className="ml-2 text-green-600">(Correct Answer)</span>}
                          {option === q.userAnswer && option !== q.correctAnswer && <span className="ml-2 text-red-600">(Your Answer)</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-auto pb-5 sticky bg-white backdrop-blur-sm bottom-0">
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={closeTest}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-bold hover:bg-blue-700 transition"
                >
                  Back to Test Page
                </button>
                <button
                  onClick={startTest}
                  className="flex-1 bg-[#01B707] text-white py-3 px-6 rounded-lg font-bold hover:bg-green-600 transition"
                >
                  Retake Test
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LbsTest;
