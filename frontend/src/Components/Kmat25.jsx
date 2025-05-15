import React, { useState, useEffect, useContext, useRef } from "react";
import { AppContext } from "../context/AppContext";
import Button from "./Button";
import BarChart from "./bar-chart";
import StyledSplitButton from "./StyledSplitButton";

const Kmat25 = () => {
    const [isStarted, setIsStarted] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [timeLeft, setTimeLeft] = useState(10800); // 3 hours in seconds
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
        questionCount: 180, // Updated based on sectionQuestions array length
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
            "question": "They her and trusted her for years.",
            "options": ["know", "had known", "knew", "known"],
            "correctAnswer": "knew"
        },
        {
            "question": "I was born India Delhi",
            "options": ["in, at", "in, to", "at, in", "to, in"],
            "correctAnswer": "in, at"
        },
        {
            "question": "The point you spoke of will be attended . But if you ever touch it again, I hope you will speak length on the wider question which that points hinges.",
            "options": ["to, at, on, upon", "to, upon, at, on", "at, on, upon, to", "upon, to, at, on"],
            "correctAnswer": "to, upon, at, on"
        },
        {
            "question": "The word “dare” means",
            "options": ["help", "approve", "challenge", "hide"],
            "correctAnswer": "challenge"
        },
        {
            "question": "Which one of the following is a correctly spelled word?",
            "options": ["territoriees", "teritories", "territaries", "territories"],
            "correctAnswer": "territories"
        },
        {
            "question": "You have not visited me a long time past",
            "options": ["at", "in", "for", "with"],
            "correctAnswer": "for"
        },
        {
            "question": "I do not expect that he will be here a week and I am certain that he will not be here sunset today.",
            "options": ["before, within", "before, to", "within, before", "since, within"],
            "correctAnswer": "within, before"
        },
        {
            "question": "Which one of the following is an antonym to the word fabulous?",
            "options": ["superb", "ordinary", "remarkable", "awesome"],
            "correctAnswer": "ordinary"
        },
        {
            "question": "Which one of the following sentences is correct?",
            "options": ["Last year I go to Germany", "Last year I went to Japan", "Last year I will go to England", "Last year I am going to Norway"],
            "correctAnswer": "Last year I went to Japan"
        },
        {
            "question": "Which one of the following is correctly spelt",
            "options": ["Bouquete", "Bouqet", "Bouquet", "Bouquette"],
            "correctAnswer": "Bouquet"
        },
        {
            "question": "Choose the word, which is similar in meaning to the given word CONDESCEND",
            "options": ["blame", "resist", "trick", "act superior"],
            "correctAnswer": "act superior"
        },
        {
            "question": "Choose the word which is having similar meaning as the word - 'INDELIBLE'",
            "options": ["Memorable", "Stirring", "Inerasable", "Lasting"],
            "correctAnswer": "Inerasable"
        },
        {
            "question": "It depends on whether we get down by failures or use them as stepping-stones",
            "options": ["wretched", "bogged", "squirted", "eluded"],
            "correctAnswer": "bogged"
        },
        {
            "question": "Which one of the following is an antonym to the word conflict?",
            "options": ["battle", "clash", "agreement", "struggle"],
            "correctAnswer": "agreement"
        },
        {
            "question": "Change the present simple sentence 'He writes a letter' into past simple sentence.",
            "options": ["He has written a letter", "He wrote a letter", "He write a letter", "He send a written letter"],
            "correctAnswer": "He wrote a letter"
        },
        {
            "question": "Choose the word which is the exact OPPOSITE of the given word. EXODUS",
            "options": ["Influx", "Home-coming", "Return", "Restoration"],
            "correctAnswer": "Influx"
        },
        {
            "question": "Arrange the following components (1,2,3 and 4) in proper sentence to obtain a correct sentence. 1. every year many students from 2. appear the SSC Examination 3. held on all India basis 4. all over the country",
            "options": ["1,3,2,4", "1,4,3,2", "1,2,3,4", "1,4,2,3"],
            "correctAnswer": "1,4,2,3"
        },
        {
            "question": "Select the correctly spelled word",
            "options": ["rhyeme", "rhythm", "rythm", "rythem"],
            "correctAnswer": "rhythm"
        },
        {
            "question": "Change the sentence 'Drinking alcohol is a bad habit' into an interrogative sentence",
            "options": ["Do you drink alcohol?", "Is not drinking alcohol a bad habit?", "Do not drink alcohol", "Is it a bad habit?"],
            "correctAnswer": "Is not drinking alcohol a bad habit?"
        },
        {
            "question": "Find out the correct preposition He wants to be the party",
            "options": ["with", "of", "from", "at"],
            "correctAnswer": "at"
        },
        {
            "question": "Choose the appropriate meaning of the idiom Make up one's mind",
            "options": ["to be prepared", "to make someone happy", "make a decision", "to criticize someone"],
            "correctAnswer": "make a decision"
        },
        {
            "question": "Convert the sentence into DIRECT SPEECH: He said that he went to park every day",
            "options": ["He said, 'he used to park every day'", "He said, 'I will go to park every day'", "He said, 'he goes to park every day'", "He said, 'I go to park every day'"],
            "correctAnswer": "He said, 'I go to park every day'"
        },
        {
            "question": "Convert the sentence into Passive Voice: I must do it.",
            "options": ["It must be done by me", "It has to be done by me.", "It is to be done by him", "It must be done by him"],
            "correctAnswer": "It must be done by me"
        },
        {
            "question": "Convert the sentence into DIRECT SPEECH: He has said that he reads a novel every month",
            "options": ["He has said 'I do not read a novel every month'", "He has said 'he reads a novel every month'", "He has said 'he read a novel every month'", "He has said 'I read a novel every month'"],
            "correctAnswer": "He has said 'I read a novel every month'"
        },
        {
            "question": "Pick the word/phrase which is opposite in meaning to the given word ASPIRATION",
            "options": ["dislike", "eagerness", "passion", "objective"],
            "correctAnswer": "dislike"
        },
        {
            "question": "Choose the appropriate meaning of the idiom/phrase - 'Caught between two stools'",
            "options": ["met with an accident", "difficulty in choosing between two alternatives", "struck in a calamity", "doing two things at a time"],
            "correctAnswer": "difficulty in choosing between two alternatives"
        },
        {
            "question": "Select the correctly spelt word",
            "options": ["ocurred", "occured", "occurred", "ocured"],
            "correctAnswer": "occurred"
        },
        {
            "question": "Choose the correct alternative which can be substituted for the given word in the bracket to make the sentence meaningful: The seniors (apology) for their rude behavior with juniors",
            "options": ["apologising", "apologetic", "apologized", "apologetic"],
            "correctAnswer": "apologized"
        },
        {
            "question": "Find the odd term from the given 4 options which does not belong to the group of remaining options",
            "options": ["Vulture", "Doves", "Kingfishers", "Kiwi"],
            "correctAnswer": "Kiwi"
        },
        {
            "question": "Convert the sentence into Passive Voice: Take food on time.",
            "options": ["Food should be take early", "Food takes on time", "Food should be taken on time", "timely food is must"],
            "correctAnswer": "Food should be taken on time"
        },
        {
            "question": "Convert the sentence into Active Voice: The snake was killed by the dog.",
            "options": ["The dog killed the snake", "The dog kills the snake", "The snake is killed by him", "The dog has killed the snake"],
            "correctAnswer": "The dog killed the snake"
        },
        {
            "question": "Which one of the following is a correctly spelled word?",
            "options": ["Mateorology", "meteoralogy", "meteorology", "meterology"],
            "correctAnswer": "meteorology"
        },
        {
            "question": "Which one of the following is an antonym to the word hilarious?",
            "options": ["Entertaining", "lively", "amusing", "sad"],
            "correctAnswer": "sad"
        },
        {
            "question": "Find out the correct preposition: She wants to jump the swimming pool",
            "options": ["of", "with", "into", "out"],
            "correctAnswer": "into"
        },
        {
            "question": "Choose the words for each blank that best fit the meaning of the sentence as a whole: Violence the prison has three lives",
            "options": ["in, taken", "from, expired", "of, cost", "with, removed"],
            "correctAnswer": "in, taken"
        },
        {
            "question": "Choose the words for each blank that best fit the meaning of the sentence as a whole: The disease widely all the district",
            "options": ["expands, from", "spreads, over", "goes, in", "attack, with"],
            "correctAnswer": "spreads, over"
        },
        {
            "question": "Choose the word for the blank that best fit the meaning of the sentence as a whole: The main road was blocked for three hours today morning after an accident two cars",
            "options": ["including", "seeing", "involving", "connecting"],
            "correctAnswer": "involving"
        },
        {
            "question": "Convert the sentence into Active Voice: The surgery was performed by a team of doctors",
            "options": ["A team of doctors perform the surgery", "A team of doctors performed the surgery", "A team of doctors has performed the surgery", "A team of doctors have performed the surgery"],
            "correctAnswer": "A team of doctors performed the surgery"
        },
        {
            "question": "Choose the word for the blank that best fit the meaning of the sentence as a whole: Many university courses are not really to meet the needs of students seeking for employment",
            "options": ["required", "sufficient", "demanded", "omitted"],
            "correctAnswer": "sufficient"
        },
        {
            "question": "Choose the correct word from the options which is similar to the word given in italics in the sentence: The students are 'instructed' to attend the classes regularly",
            "options": ["avoided", "allowed", "ignored", "directed"],
            "correctAnswer": "directed"
        },
        {
            "question": "Choose the word for the blank that best fit the meaning of the sentence as a whole: After the Cabinet reshuffle, the Minister was not happy with his new .",
            "options": ["employment", "place", "work", "portfolio"],
            "correctAnswer": "portfolio"
        },
        {
            "question": "Rearrange the parts to form a meaningful and coherent sentence: P: in the building Q: collapsed R: the temporary sheds S: in the rain",
            "options": ["QRPS", "QSRP", "RPQS", "QPRS"],
            "correctAnswer": "RPQS"
        },
        {
            "question": "Rearrange the parts to form a meaningful and coherent sentence: P: restless Q: his piece of mind R: he becomes S: and loses",
            "options": ["RPSQ", "QSRP", "SQRP", "RPQS"],
            "correctAnswer": "RPSQ"
        },
        {
            "question": "Choose the word similar in meaning to the given word - LAX",
            "options": ["ensure", "slack", "servant", "strive"],
            "correctAnswer": "slack"
        },
        {
            "question": "Choose the word similar in meaning to the given word - PERSPICUOUS",
            "options": ["cruel", "clever", "dim", "clear"],
            "correctAnswer": "clear"
        },
        {
            "question": "Read the passage and answer the question: In today’s situation where the awareness and interest in reading about archaeology are increasing, new articles on our heritage have to be published in newspapers. Understanding history and myths, requires understanding the new developments in archaeology and new trends in technology. The above passage urges the need for the study of",
            "options": ["politics", "history", "archaeology", "environment"],
            "correctAnswer": "archaeology"
        },
        {
            "question": "Read the passage and answer the question: Colds and flu are viral infections of the upper respiratory tract. They are extremely contagious. They are spread by airborne droplets of mucus. The virus can also be passed on by physical contact if the recipients pick up the virus on their hand and rub their eyes or nose. This passage primarily focused on",
            "options": ["the contagious diseases", "the spread of common viruses", "health issues", "spread of colds and flu infections"],
            "correctAnswer": "spread of colds and flu infections"
        },
        {
            "question": "Read the passage and answer the question: A psychotropic drug is a chemical substance that changes the function of the nervous system. If the charges under the Narcotics Drugs and Psychotropic substances Act are proved, the accused will get a deterrent punishment. Police will take in drug addicts and admit them in centres for rehabilitation. This passage primarily focused on",
            "options": ["medical use of drugs", "drug abuse", "punishment", "law and order"],
            "correctAnswer": "drug abuse"
        },
        {
            "question": "Read the passage and answer the question: Animals are the most adorable and loving creatures existing on Earth. They may not be able to speak but they can understand. Domestic animals mostly move with humans. Wild animals generally live in forests. Animals play a vital role in maintaining nature’s balance. This passage primarily focused on the importance of",
            "options": ["domestic animals alone", "forests", "wild animals only", "animals"],
            "correctAnswer": "animals"
        },
        {
            "question": "Read the passage and answer the question: The Reserve Bank of India was established in the year 1935. The Central office of RBI is in Mumbai. The main function of the Reserve Bank of India is to regulate the issue of Bank Notes and keeping of reserves with a view to securing monetary stability in India. It generally operates the currency and credit system of the country to its advantage. In this passage, 'Bank Notes' refers to",
            "options": ["goods and services", "currency notes", "circulars sent by the Banks", "file notes"],
            "correctAnswer": "currency notes"
        },
        {
            "question": "If x + y = 2 and x² + y² = 2, what is the value of xy?",
            "options": ["-2", "-1", "0", "1"],
            "correctAnswer": "1"
        },
        {
            "question": "Rs.10000 is invested for 4 years and nine months at 10% simple interest. The interest amount at the end of the period is",
            "options": ["Rs.4750", "Rs.4160", "Rs.4760", "Rs.4260"],
            "correctAnswer": "Rs.4750"
        },
        {
            "question": "Rs.1000 was deposited in a bank for 2 years at 5% compound interest. At the end of second year, the maturity amount will be",
            "options": ["Rs. 1110.50", "Rs. 1120", "Rs. 1220.50", "Rs. 1102.50"],
            "correctAnswer": "Rs. 1102.50"
        },
        {
            "question": "If a : 3 = 24 : 9, then a is equal to",
            "options": ["8", "9", "7", "10"],
            "correctAnswer": "8"
        },
        {
            "question": "If A : B = 3 : 4 and B : C = 5 : 7, then A : B : C is equal to",
            "options": ["8 : 12 : 18", "6 : 9 : 13", "6 : 9 : 26", "15 : 20 : 28"],
            "correctAnswer": "15 : 20 : 28"
        },
        {
            "question": "A box contains coins of Rs.10, Rs.20 and Rs.5 respectively in the ratio 4 : 5 : 6. If the total number of coins in the box is 120, then the value of all coins in the box is",
            "options": ["1160", "1260", "1360", "1420"],
            "correctAnswer": "1360"
        },
        {
            "question": "Of the following, which is least?",
            "options": ["0.03/0.00071", "0.03/0.0071", "0.03/0.071", "0.03/7.1"],
            "correctAnswer": "0.03/7.1"
        },
        {
            "question": "A group of store managers must assemble 280 displays for an upcoming sale. If they assemble 25 percent of the displays during the first hour and 40 percent of the remaining displays during the second hour, how many of the displays will not have been assembled by the end of the second hour?",
            "options": ["70", "98", "126", "182"],
            "correctAnswer": "126"
        },
        {
            "question": "A company plans to produce 1500 units of an item per hour and plans to send out 700 units of the item per hour from the company for sales. The number of units will be available in the company at the end of 10 hours is",
            "options": ["15000 units", "12000 units", "10000 units", "8000 units"],
            "correctAnswer": "8000 units"
        },
        {
            "question": "A person owns 2 rectangular tracts of land. One is 300 m by 500 m and the other is 250 m by 630 m. The combined area of these 2 tracts is in square meters?",
            "options": ["305700", "307500", "370500", "350700"],
            "correctAnswer": "307500"
        },
        {
            "question": "If four fifth of a number is 24800, then two fifth of the same number is",
            "options": ["18400", "13400", "12400", "12475"],
            "correctAnswer": "12400"
        },
        {
            "question": "A can complete a work in 30 days and B can complete the same work in 20 days. If A and B work together, the number of days required for them to complete the work is",
            "options": ["25 days", "12 days", "15 days", "16 days"],
            "correctAnswer": "12 days"
        },
        {
            "question": "A rope 20.6 meters long is cut into two pieces. If the length of one piece of rope is 2.8 meters shorter than the length of the other, what is the length, in meters, of the longer piece of rope?",
            "options": ["7.5", "8.9", "9.9", "11.7"],
            "correctAnswer": "11.7"
        },
        {
            "question": "The annual budget of a certain college is to be shown on a circle graph. If the size of each sector of the graph is to be proportional to the amount of the budget it represents, how many degrees of the circle should be used to represent an item that is 15 percent of the budget?",
            "options": ["15", "36", "54", "90"],
            "correctAnswer": "54"
        },
        {
            "question": "If the student A scored 34 marks out of 50 in one subject and scored 70 marks out of 80 in another subject, then the percentage of marks scored by him is",
            "options": ["70", "80", "75", "85"],
            "correctAnswer": "80"
        },
        {
            "question": "If t % of 40 % of 100 is equal to 20 % of 300, then the value of t is",
            "options": ["150", "155", "125", "225"],
            "correctAnswer": "150"
        },
        {
            "question": "Now, the age of the Father and that of his Son are in the ratio 7 : 2. After 10 years, the ratio will become 9 : 4. The present age of the son is (in years)",
            "options": ["25", "10", "15", "8"],
            "correctAnswer": "10"
        },
        {
            "question": "Five machines at a certain factory operate at the same constant rate. If four of these machines, operating simultaneously, take 30 hours to fill a certain production order, how many fewer hours does it take all five machines, operating simultaneously, to fill the same production order?",
            "options": ["3", "5", "6", "8"],
            "correctAnswer": "6"
        },
        {
            "question": "A certain bridge is 4,024 feet long. Approximately how many minutes does it take to cross this bridge at a constant speed of 20 miles per hour? (1 mile = 5,280 feet)",
            "options": ["1.7", "2.3", "4.2", "6.1"],
            "correctAnswer": "2.3"
        },
        {
            "question": "In the sequence 50, 50+k, 50+2k, 50+3k, 50+4k, ..., the 51st term is 350. Then the value of k is equal to",
            "options": ["6", "8", "10", "15"],
            "correctAnswer": "6"
        },
        {
            "question": "Which one of the following numbers is divisible by 9, 11 and 13?",
            "options": ["1286", "1287", "1289", "1283"],
            "correctAnswer": "1287"
        },
        {
            "question": "A set A has 620 elements and another set B has 380 elements. If the union of the sets A and B have 950 elements, the number of common elements in A and B is equal to",
            "options": ["50", "100", "75", "60"],
            "correctAnswer": "50"
        },
        {
            "question": "How many numbers between 900 and 1000 which are divisible by 13?",
            "options": ["9", "11", "8", "7"],
            "correctAnswer": "7"
        },
        {
            "question": "The annual interest rate earned by an investment increased by 10 percent from last year to this year. If the annual interest rate earned by the investment this year was 11 percent, what was the annual interest rate last year?",
            "options": ["1%", "1.1%", "9.1%", "10%"],
            "correctAnswer": "10%"
        },
        {
            "question": "Each machine at a toy factory assembles a certain kind of toy at a constant rate of one toy every 3 minutes. If 40 percent of the machines at the factory are to be replaced by new machines that assemble this kind of toy at a constant rate of one toy every 2 minutes, what will be the percent increase in the number of toys assembled in one hour by all the machines at the factory, working at their constant rates?",
            "options": ["20%", "25%", "30%", "40%"],
            "correctAnswer": "20%"
        },
        {
            "question": "Two buses start at 9AM from two different places on a straight road. The buses travel towards each other at uniform speed of 45 kmph and 55 kmph respectively. If the two places are 200 km apart, the buses will meet at",
            "options": ["11 PM", "10AM", "10.30 AM", "11 AM"],
            "correctAnswer": "11 AM"
        },
        {
            "question": "A seller is to sale a product for Rs. x. But he sold it for Rs.4000 with 20% discount. Then x is",
            "options": ["Rs.5600", "Rs.5000", "Rs.5400", "Rs.5200"],
            "correctAnswer": "Rs.5000"
        },
        {
            "question": "Half of a large pizza is cut into 4 equal-sized pieces, and the other half is cut into 6 equal-sized pieces. If a person were to eat 1 of the larger pieces and 2 of the smaller pieces, what fraction of the pizza would remain uneaten?",
            "options": ["5/12", "13/24", "7/12", "17/24"],
            "correctAnswer": "17/24"
        },
        {
            "question": "A bag contains 15 White balls, 5 Red balls. A ball is drawn at random. Probability in percentage that the drawn ball be white ball is",
            "options": ["75%", "25%", "70%", "80%"],
            "correctAnswer": "75%"
        },
        {
            "question": "Two dice are rolled simultaneously. Find the probability that the sum of outcomes is 3",
            "options": ["1/9", "1/18", "1/12", "1/6"],
            "correctAnswer": "1/18"
        },
        {
            "question": "A certain financial institution reported that its assets totaled Rs.2,377,366.30 on a certain day. Of this amount, Rs.31,724.54 was held in cash. Approximately what percent of the reported assets was held in cash on that day?",
            "options": ["0.00013%", "0.0013%", "0.013%", "1.3%"],
            "correctAnswer": "1.3%"
        },
        {
            "question": "The sum of two numbers is 25 and their product is 144. The smaller number is",
            "options": ["17", "8", "9", "12"],
            "correctAnswer": "9"
        },
        {
            "question": "In the year 2024, the Department Store P had a sales total for December that was 4 times the average (arithmetic mean) of the monthly sales totals for January through November. The sales total for December was what fraction of the sales total for the year?",
            "options": ["1/4", "4/15", "1/3", "4/11"],
            "correctAnswer": "4/15"
        },
        {
            "question": "In a week, P and Q earn money in the ratio 5 : 4 and their expenses are in the ratio 2 : 1. If they save each Rs.3000 in the week, then in the week, the incomes of P and Q are (in Rs)",
            "options": ["10000,8000", "5000,4000", "8000,6000", "8000,7000"],
            "correctAnswer": "5000,4000"
        },
        {
            "question": "The lengths of two sides other than the hypotenuse of a right angled triangle are 9cm and 40cm. The largest side of the triangle is (in cm)",
            "options": ["46", "43", "41", "44"],
            "correctAnswer": "41"
        },
        {
            "question": "A rectangular field is of length 42m and width 24m. A path of width 2m is formed inside of the land adjoining all the four sides of the land. The remaining area of the field is (in sq. m.)",
            "options": ["780", "760", "860", "960"],
            "correctAnswer": "760"
        },
        {
            "question": "A mixture contains A and B syrups in equal proportion. If a new mixture is created by adding this mixture and B syrup in the ratio of 1: 3, then the ratio of A and B syrups in the new mixture is",
            "options": ["1 : 7", "1 : 6", "1 : 5", "1 : 4"],
            "correctAnswer": "1 : 7"
        },
        {
            "question": "In a class of 100 students, 73 like apple, 80 like orange, and 52 like grapes. It may be possible that some students do not like any of these three fruits. Find the difference between the maximum and minimum possible number of students who like all three fruits.",
            "options": ["47", "48", "53", "52"],
            "correctAnswer": "47"
        },
        {
            "question": "The value of (1125)2 – (875)2 is equal to",
            "options": ["500000", "500800", "500600", "500400"],
            "correctAnswer": "500000"
        },
        {
            "question": "The product of three consecutive positive integers is 720. Then the sum of the three numbers is",
            "options": ["27", "29", "28", "32"],
            "correctAnswer": "27"
        },
        {
            "question": "Person 'A' bought an item for Rs. 7250 and paid Rs.250 towards transportation. Then he sold it for Rs.9000. The profit percentage is (in %)",
            "options": ["25", "15", "20", "10"],
            "correctAnswer": "20"
        },
        {
            "question": "By selling a product for Rs.1800, the shop owner will have a loss 10%. How much (in Rs) should he sell it to gain a profit of 25%?",
            "options": ["2450", "2550", "2750", "2500"],
            "correctAnswer": "2500"
        },
        {
            "question": "The sum of two numbers is 40. If one number exceeds another number by 10, then the Least Common Multiple of these two numbers is",
            "options": ["75", "60", "80", "125"],
            "correctAnswer": "75"
        },
        {
            "question": "If the average income of seven families is Rs.4200 and a family with an income of Rs.1000 joins them, then the average income of all eight families is (in Rs)",
            "options": ["3800", "3700", "3600", "3900"],
            "correctAnswer": "3800"
        },
        {
            "question": "If the base of the triangle is 10cm and the height of the triangle is 12cm, then the area of the triangle is (in Sq Cm)",
            "options": ["240", "120", "60", "40"],
            "correctAnswer": "60"
        },
        {
            "question": "Athul invested his savings in two schemes. The simple interest earned on the first scheme at 15% per annum for 4 years is the same as the simple interest earned on the second scheme at 12% per annum for 3 years. Then, the percentage of his savings invested in the first scheme is",
            "options": ["60%", "37.5%", "62.5%", "40%"],
            "correctAnswer": "37.5%"
        },
        {
            "question": "In a panchayath election, there were four candidates, and 80% of the total voters casted their votes. One of the candidates received 30% of the casted votes while the other three candidates received the remaining casted votes in the proportion of 1 : 2 : 3. If the winner of the election received 2512 votes more than the candidate with the second highest votes, then the number of registered voters was.",
            "options": ["62800", "40192", "50240", "60820"],
            "correctAnswer": "62800"
        },
        {
            "question": "If a and b are non-negative real numbers such that a + 2b = 6, then the average of the maximum and minimum possible values of (a + b) is",
            "options": ["3.5", "4.5", "3", "4"],
            "correctAnswer": "4.5"
        },
        {
            "question": "A glass contains 500 cc of milk and a cup contains 500 cc of water. From the glass, 150 cc of milk is transferred to the cup and mixed thoroughly. Next, 150 cc of this mixture is transferred from the cup to the glass. Now, the amount of water in the glass and the amount of milk in the cup are in the ratio:",
            "options": ["3:10", "2:1", "1:1", "1:2"],
            "correctAnswer": "1:1"
        },
        {
            "question": "The lengths of all four sides of a quadrilateral are integer values. If three of its sides are of length 1 cm, 2 cm, and 4 cm, then what is the total number of possible lengths of the fourth side?",
            "options": ["5", "6", "3", "4"],
            "correctAnswer": "5"
        },
        {
            "question": "Five people L, M, N, O and P sit in a row, not necessarily in the same order. P sits exactly in between M and N. If L sits exactly in between M and O, then which of the following must be true?",
            "options": ["O sits to the immediate right of M.", "L and N always sit together.", "M sits exactly at the middle of the row", "P sits between M and L"],
            "correctAnswer": "M sits exactly at the middle of the row"
        },
        {
            "question": "About three towns A, B, and C, the information available are: A’s population is twice as B and C’s population is half times as B. Then A’s population compared to C is",
            "options": ["4 times", "2 times", "3 times", "one and half times"],
            "correctAnswer": "4 times"
        },
        {
            "question": "In the following pair of words, identify the pair of words that has same or similar relationship as Chef : Restaurant",
            "options": ["Doctor : Treatment", "Driver : Car", "Writer : Blog", "Teacher : School"],
            "correctAnswer": "Teacher : School"
        },
        {
            "question": "Arrange the following words in a logical sequence. 1.Chair 2. Wood 3. Seed 4. Sapling 5. Tree",
            "options": ["35421", "34512", "34521", "43521"],
            "correctAnswer": "34521"
        },
        {
            "question": "If all dogs are ferocious animals and no ferocious animal is cat, can we infer that no dog is a cat?",
            "options": ["yes", "no", "may be", "insufficient data"],
            "correctAnswer": "yes"
        },
        {
            "question": "Seven men, A, B, C, D, E, F and G have parked their cars in a row. The cars of E and F should be next to each other. The cars of D and G should be parked next to each other. Whereas A and B cannot park their cars next to each other. But B and D must park their cars next to each other and C’s car is parked to the immediate right of G’s car. If E parks his car to the left of F, then which of the following statements is false?",
            "options": ["There are two cars in between B and G’s cars", "B and C’s cars are not parked together", "G’s car is the only car in between D and C’s cars", "A’s car is at the left extreme end"],
            "correctAnswer": "There are two cars in between B and G’s cars"
        },
        {
            "question": "Five people A, B, C, D and E are sitting in a row facing the same direction. A is two places away to the right of B. C is two places away to the left of D. E is not sitting at the extreme right. Who is sitting in the middle of the row?",
            "options": ["A", "B", "C", "cant be determined"],
            "correctAnswer": "cant be determined"
        },
        {
            "question": "Five people A through E are sitting in a row facing the same direction. A is three places away to the right of C. Two people are sitting between B and D. Who is sitting in the middle of the row?",
            "options": ["A", "C", "E", "D"],
            "correctAnswer": "E"
        },
        {
            "question": "If in a certain language, GERMAN is coded as HFSNBO, how is SALEM coded in that language?",
            "options": ["TBNFM", "BMFTN", "STFEN", "TBMFN"],
            "correctAnswer": "TBMFN"
        },
        {
            "question": "Statements: I. The water level of the ponds supplying water to the town has increased. II. Most of the trains are canceled due to heavy rainfall and water logging",
            "options": ["Statement II is the cause and statement I is its effect", "Statement I is the cause and statement II is its effect", "Both the statements are effects of some common cause", "Both the statements are independent causes"],
            "correctAnswer": "Both the statements are effects of some common cause"
        },
        {
            "question": "Statements: I. The government has imported large quantities of rice as per trade contracts with other countries II. The prices of rice reduced sharply in the domestic market in recent months.",
            "options": ["Statement I is the cause and statement II is its effect", "Statement II is the cause and statement I is its effect", "Both the statements are effects of independent causes", "Both the statements are independent causes"],
            "correctAnswer": "Statement I is the cause and statement II is its effect"
        },
        {
            "question": "Arrange the following words in a meaningful sequence. 1. Selection 2. Probation 3. Appointment 4. Interview 5. Application 6. Advertisement",
            "options": ["524316", "654132", "654312", "524136"],
            "correctAnswer": "654132"
        },
        {
            "question": "In a row of twelve boys, a boy is shifted by three places towards the right, then he became sixth from the right end. The earlier position of that boy from the left end of the row is",
            "options": ["second", "third", "fourth", "fifth"],
            "correctAnswer": "fourth"
        },
        {
            "question": "Lakshmanan walked 10 m towards north, then turned right and walked 25 m. Then he turned right and walked 30m. Now he turned left and walked 10 m. Finally, he turned left and walked 20 m. How far and in which direction is he from the starting point?",
            "options": ["30m North", "35m East", "40m North", "50m East"],
            "correctAnswer": "35m East"
        },
        {
            "question": "If all oranges are apples and some apples are mangoes, can we infer that some oranges are mangoes?",
            "options": ["no", "yes", "may be", "insufficient data"],
            "correctAnswer": "yes"
        },
        {
            "question": "Three of the following four are alike in a certain way and so form a group. Which one of the following does not belong to that group?",
            "options": ["Rose", "Lotus", "Marigold", "Petal"],
            "correctAnswer": "Petal"
        },
        {
            "question": "Pointing to a photograph of a man, Gopal said, 'His mother is the wife of my father’s son and I have no brother and sister.' How is the man in the photograph related to Gopal?",
            "options": ["Nephew", "Son", "Cousin", "Brother"],
            "correctAnswer": "Son"
        },
        {
            "question": "Question: What is the sum of ages of Murali and Murugan? Statements: I. Murali is 5 years older than Murugan. II. The average of their ages is 25",
            "options": ["Statement I alone is sufficient to determine the answer", "Statement II alone is sufficient to determine the answer", "Both statements I and II are needed to answer the question", "Data in both the statements I and II together are not sufficient"],
            "correctAnswer": "Statement II alone is sufficient to determine the answer"
        },
        {
            "question": "Question: What is the pass mark in the examination? Statements: I. A student secures 32% but fails by 6 marks. II. The total marks is 200.",
            "options": ["Statement I alone is sufficient to determine the answer", "Statement II alone is sufficient, but statement I alone is not sufficient", "Data in both the statements together are not sufficient", "Both statements I and II are needed"],
            "correctAnswer": "Both statements I and II are needed"
        },
        {
            "question": "Question: What percentage of families in the city have television? Statements: I. In the city 50% of the families own houses. II. In the city 25% of the house owners also own television.",
            "options": ["Statement I alone is sufficient to determine the answer.", "Statement II alone is sufficient, but statement I alone is not sufficient", "Data in both the statements together are not sufficient", "Both statements I and II are needed"],
            "correctAnswer": "Data in both the statements together are not sufficient"
        },
        {
            "question": "Six people, namely P, Q, R, S, T and U are sitting in a row facing north. Further it is known that: I. Exactly two people are sitting between P and Q. II. Exactly one person is sitting between T and U. III. Q is sitting at the right end of the row. If U is sitting adjacent to S, then how many people are sitting between U and R?",
            "options": ["One", "Two", "Three", "cant be determined"],
            "correctAnswer": "Two"
        },
        {
            "question": "Eight books on different subjects, such as Biology, chemistry, Physics, Mathematics, English, Hindi, Zoology, and economics are stacked together. Further it is known that: I. Economics is above Biology which is just above Hindi, which is not at the bottom. II. There are only two books between the Zoology and the English books. III. Number of books above chemistry is less than the number of books below it. IV. Only Mathematics book is above Zoology. Which book is at the bottom of the stack?",
            "options": ["Physics", "Hindi", "English", "Economics"],
            "correctAnswer": "Physics"
        },
        {
            "question": "Six buildings of different colours red, yellow, white, blue, green and orange are in a row. Each of these buildings belongs to a different person among A,B,C,D,E and F. Following is the information known about them. I. Green building is three places to the right of A’s building. II. Red building is three places to the right of B’s building. III. White building is three places to the right of F’s building. IV. C’s building is adjacent to the orange building. V. D’s building is not green. B’s building is not blue. VI. E’s building is not adjacent to C’s building but three places away from F’s building. The red building belongs to",
            "options": ["C", "D", "E", "A"],
            "correctAnswer": "D"
        },
        {
            "question": "In a school there are five classes (class 1 to class 5) and each class has two sections A and B. Each section is accommodated in a different classroom. The class rooms are in a row. I. The two sections, A and B of any class are not adjacent to each other. II. Any four consecutive classrooms, accommodate two A sections and two B sections. III. Class 5 A is three places away from class 1 A and neither of these two is at any of the extreme ends. IV. Class 3 B is three places away from class 4 B and neither of these is at any of the extreme ends. V. Class 2 B is not at any of the extreme ends. VI. Class 2 A is at the extreme right. VII. Class 5 A is to the right of class 3 B. Which class is to the immediate right of class 3 B?",
            "options": ["1 A", "2 B", "5 A", "1 B"],
            "correctAnswer": "5 A"
        },
        {
            "question": "Statement: Monsoon started late in this season Conclusions: I. The climate changed II. Farming community is happy",
            "options": ["Only conclusion I follows", "Only conclusion II follows", "Both conclusions I and II follow", "Neither conclusion I nor conclusion II follows"],
            "correctAnswer": "Only conclusion I follows"
        },
        {
            "question": "Statement: All successful businessmen are good in time management Conclusions: I. All the people who manage the time effectively are successful businessmen. II. A successful businessman can not afford to waste time.",
            "options": ["Only conclusion I follows", "Only conclusion II follows", "Both conclusions I and II follow", "Neither conclusion I nor conclusion II follows"],
            "correctAnswer": "Only conclusion II follows"
        },
        {
            "question": "What is the essential part of (that is strongly connected to) ‘Book’?",
            "options": ["Education", "Pictures", "Pages", "Knowledge"],
            "correctAnswer": "Pages"
        },
        {
            "question": "Statement: The City Corporation will supply water only three days a week. Assumptions: I. Insufficient water storage in the water bodies due to seasonal rainfall deficit. II. Infrastructure work in progress",
            "options": ["Only assumption I is implicit", "Only assumption II is implicit", "Both assumptions I and II are implicit", "Neither assumption I nor II is implicit"],
            "correctAnswer": "Both assumptions I and II are implicit"
        },
        {
            "question": "Statement: The government policy directed the banking sector to reduce the interest on housing loans Assumptions: I. The government aims to provide house for all. II. Each family is given a house already",
            "options": ["Only assumption I is implicit", "Only assumption II is implicit", "Both assumptions I and II are implicit", "Neither assumption I nor II is implicit"],
            "correctAnswer": "Only assumption I is implicit"
        },
        {
            "question": "Statement: It is suggested to admit children in school at the age of 5 or more. Assumptions: I. At this age, a child is ready to learn new things. II. The School do not admit children after the age of 5.",
            "options": ["Only assumption I is implicit", "Only assumption II is implicit", "Both assumptions I and II are implicit", "Neither assumption I nor II is implicit"],
            "correctAnswer": "Only assumption I is implicit"
        },
        {
            "question": "Statement: More road accidents occur by two wheeler motorists. Arguments: I. Many two wheeler motorists drive without helmets. II. Many people drive after consuming alcohol.",
            "options": ["Only argument I is strong.", "Only argument II is strong.", "Neither I nor II is strong.", "Both I and II are strong"],
            "correctAnswer": "Neither I nor II is strong."
        },
        {
            "question": "Statement: Insurance industry has not grown in the state. Arguments: I. A strong public health infrastructure is available at free of cost. II. People are not educated",
            "options": ["Only argument I is strong", "Only argument II is strong", "Neither I nor II is strong", "Both I and II are strong"],
            "correctAnswer": "Only argument I is strong"
        },
        {
            "question": "Statement: Electric Vehicle manufacturing got a boom in the industry. Arguments: I. The government adopted policy to control carbon emission. II. The market demand petrol vehicle due to low cost.",
            "options": ["Only argument I is strong", "Only argument II is strong", "Neither I nor II is strong", "Both I and II are strong."],
            "correctAnswer": "Only argument I is strong"
        },
        {
            "question": "Statement: There must be more than one High Courts in each state in India. Arguments: I. This will be a sheer wastage of taxpayers’ money. II. This will help to reduce the backlog of cases pending for a very long time.",
            "options": ["Only argument I is strong.", "Only argument II is strong", "Neither I nor II is strong", "Both I and II are strong"],
            "correctAnswer": "Only argument II is strong"
        },
        {
            "question": "If every book buyer has a good reading habit and everyone with good reading habit visit libraries can we infer that all who visit libraries are book buyers?",
            "options": ["yes", "no", "may be", "insufficient data"],
            "correctAnswer": "no"
        },
        {
            "question": "In the following pair of words, identify the pair of words that has same or similar relationship as Petal: Flower",
            "options": ["Pen : Paper", "Engine : Car", "Cat : Dog", "Ball : Game"],
            "correctAnswer": "Engine : Car"
        },
        {
            "question": "Question: What is population of state A? Statements: I. Population of state A is 60% of population of state B II. Population of States A and B together 10 crores",
            "options": ["Statement I alone is sufficient to determine the answer", "Statement II alone is sufficient, but statement I alone is not sufficient", "Data in both the statements together are not sufficient", "Both statements I and II are needed"],
            "correctAnswer": "Both statements I and II are needed"
        },
        {
            "question": "Statement: Summer vacation is necessary for school children Conclusions: I. School children should help parents in their everyday activities II. School children need rest in the hot summer.",
            "options": ["Only conclusion I follows", "Only conclusion II follows", "Both conclusions I and II follow", "Neither conclusion I nor conclusion II follows"],
            "correctAnswer": "Only conclusion II follows"
        },
        {
            "question": "A group of five people, namely A, B, C, D and E are sitting in a row facing north. The following information is known about them. I. Only D is sitting between A and B. II. Neither A nor B is at the ends. III. C is sitting to the immediate left of B. Who is sitting at the right end of the row?",
            "options": ["A", "E", "B", "C"],
            "correctAnswer": "E"
        },
        {
            "question": "Seven friends P, Q, R, S, T, U and V sit on a bench facing north. Each of them is of a different weight (in kg), their random bodily weights are 79, 83, 85, 87, 89, 92 and 96. The following information is known about them. I. P sits third to the right of the heaviest person. II. The heaviest person sits exactly between R and the lightest person, who sits at an end. III. The third lightest person sits adjacent to R and that person is neither P nor adjacent to P. IV. Q sits third to the left of the person whose weight is the next higher to R. V. R’s weight is neither 83 kg nor 87 kg. VI. P’s weight is neither 92 kg nor 79 kg. VII. T’s weight is 83 kg. VIII. S is heavier than V but is not the heaviest Question - Who is the third lightest?",
            "options": ["P", "Q", "R", "S"],
            "correctAnswer": "Q"
        },
        {
            "question": "Which ministry has received the highest budgetary allocation in the Union Budget of India 2025-2026?",
            "options": ["Ministry of Railways", "Ministry of Defence", "Ministry of Home Affairs", "Ministry of Rural Development"],
            "correctAnswer": "Ministry of Defence"
        },
        {
            "question": "Which among the following rivers originate in Kerala and enters into Karnataka?",
            "options": ["Periyar River", "Kabani River", "Pampa River", "Meenachil River"],
            "correctAnswer": "Kabani River"
        },
        {
            "question": "The National Anthem of India, jana-gana-mana, was originally composed by Rabindranath Tagore in",
            "options": ["Sanskrit", "Hindi", "Bengali", "Sindhi"],
            "correctAnswer": "Bengali"
        },
        {
            "question": "The ratio of width of the Indian national Flag to its length is",
            "options": ["one to three", "two to five", "two to three", "three to five"],
            "correctAnswer": "two to three"
        },
        {
            "question": "Currently the Election Commission of India consists of",
            "options": ["Chief Election Commissioner and four Election Commissioners", "Chief Election Commissioner and one Election Commissioner", "Chief Election Commissioner and three Election Commissioners", "Chief Election Commissioner and two Election Commissioners"],
            "correctAnswer": "Chief Election Commissioner and two Election Commissioners"
        },
        {
            "question": "UNICEF stands for",
            "options": ["United Nations International Children’s Education Federation", "United Nations International Children’s Emergency Fund", "United Nations Intercontinental Children’s Emergency Fund", "United Nations International Children’s Emergency Federation"],
            "correctAnswer": "United Nations International Children’s Emergency Fund"
        },
        {
            "question": "The Capital of Bhutan",
            "options": ["Trongsa", "Phuentsholing", "Paro", "Thimphu"],
            "correctAnswer": "Thimphu"
        },
        {
            "question": "In India, the Chairperson of the Permanent House is",
            "options": ["the Vice President of India", "the President of India", "the loksabha speaker", "the Prime Minister"],
            "correctAnswer": "the Vice President of India"
        },
        {
            "question": "The current Secretary General of United Nations is",
            "options": ["Ban ki moon", "Kofi Annan", "Antonio Gutterres", "Kurt Waldheim"],
            "correctAnswer": "Antonio Gutterres"
        },
        {
            "question": "National Sports University is located at",
            "options": ["Arunachal Pradesh", "West Bengal", "Assam", "Manipur"],
            "correctAnswer": "Manipur"
        },
        {
            "question": "Nephrology is the study associated with",
            "options": ["Brain", "Kidney", "Liver", "Bones"],
            "correctAnswer": "Kidney"
        },
        {
            "question": "The Author of the Malayalam Novel ‘Naalukettu’ is",
            "options": ["M.T.Vasudevan Nair", "O.N.V. Kurupp", "Thakazhi Sivasankara Pillai", "S.K. pottekkattu"],
            "correctAnswer": "M.T.Vasudevan Nair"
        },
        {
            "question": "The Constitution of India allows for a maximum of",
            "options": ["650 Elected members in the Lok Sabha", "580 Elected members in the Lok Sabha", "590 Elected members in the Lok Sabha", "550 Elected members in the Lok Sabha"],
            "correctAnswer": "550 Elected members in the Lok Sabha"
        },
        {
            "question": "Which of the following is a disease not caused by Viruses?",
            "options": ["AIDS", "CoVID-19", "Smallpox", "Tuberculosis"],
            "correctAnswer": "Tuberculosis"
        },
        {
            "question": "The main role of the Securities and Exchange Board of India is to protect the interests of",
            "options": ["Investors in Securities", "National security", "Banks", "Public Sector Units"],
            "correctAnswer": "Investors in Securities"
        },
        {
            "question": "A stock exchange is a market place where",
            "options": ["Stocks and Bonds are sold only", "Stocks and Bonds are sold and bought", "the investors stock their holdings", "the investors register their holdings"],
            "correctAnswer": "Stocks and Bonds are sold and bought"
        },
        {
            "question": "Every Judge of the Supreme Court of India is appointed by",
            "options": ["Law Ministry of Government of India", "the Chief Justice of India", "the President of India", "the Prime Minister of India"],
            "correctAnswer": "the President of India"
        },
        {
            "question": "Which one of the following Indian Cities is known as City of Lakes?",
            "options": ["Hyderabad", "Udaipur", "Kashmir", "Alappuzha"],
            "correctAnswer": "Udaipur"
        },
        {
            "question": "The NITI Aayog stands for",
            "options": ["National Institution for Transforming India", "National Integration for Transformation of India", "National Information Transformation Institute", "National Institute for Transition in India"],
            "correctAnswer": "National Institution for Transforming India"
        },
        {
            "question": "Wheat Blast, recently seen in the news, is a disease of wheat crop caused by which one of the following?",
            "options": ["Fungus", "Bacteria", "Virus", "Helminths"],
            "correctAnswer": "Fungus"
        },
        {
            "question": "What is the name of the scheme established by the Supreme Court of India to ensure the safety of witnesses facing threats?",
            "options": ["Safety Assurance Scheme", "Witness Protection Scheme", "Witness Security Programme", "Judicial Witness Guard"],
            "correctAnswer": "Witness Protection Scheme"
        },
        {
            "question": "Which institution issues the Sovereign Green Bonds (SGrBs) on behalf of the government",
            "options": ["RBI", "SEBI", "NITI Aayog", "BSE"],
            "correctAnswer": "RBI"
        },
        {
            "question": "Which state organized the 38th edition of the National Games in 2025?",
            "options": ["Uttar Pradesh", "Uttarakhand", "Gujarat", "Madhya Pradesh"],
            "correctAnswer": "Uttarakhand"
        },
        {
            "question": "FIFA World Cup 2026 will be hosted by which one of the following countries?",
            "options": ["Canada, Mexico, and the United States", "Italy and France", "Saudi Arabia", "Russia"],
            "correctAnswer": "Canada, Mexico, and the United States"
        },
        {
            "question": "Antarctic research station, the Qinling facility is owned by",
            "options": ["China", "Japan", "Taiwan", "Russia"],
            "correctAnswer": "China"
        },
        {
            "question": "Which institution manages the unclaimed deposits in India?",
            "options": ["SEBI", "RBI", "Ministry of Finance", "BSE"],
            "correctAnswer": "RBI"
        },
        {
            "question": "Open Network for Digital Commerce (ONDC) is an initiative of which ministry?",
            "options": ["Ministry of Consumer Affairs", "Ministry of Commerce and Industry", "Ministry of Finance", "Ministry of Communications"],
            "correctAnswer": "Ministry of Commerce and Industry"
        },
        {
            "question": "Uber has launched India’s first water transport service, 'Uber Shikara' in which lake?",
            "options": ["Vembanad Lake", "Chilika Lake", "Dal Lake", "Pangong Lake"],
            "correctAnswer": "Dal Lake"
        },
        {
            "question": "The government has recently abolished the windfall tax on which products?",
            "options": ["Food Products", "Petrol, diesel, aviation fuel, and crude oil", "Pharmaceuticals", "None of the Above"],
            "correctAnswer": "Petrol, diesel, aviation fuel, and crude oil"
        },
        {
            "question": "The title 'Father of the Nation' to Gandhiji was given by who among the following?",
            "options": ["C.R. Das", "Jawaharlal Nehru", "R.N. Tagore", "S.C. Bose"],
            "correctAnswer": "S.C. Bose"
        },
        {
            "question": "Which of the following is a correct sequence of sea ports of India from 'South to North'?",
            "options": ["Calicut – Thiruvananthapuram – Cochin – Mangalore", "Cochin – Thiruvananthapuram – Calicut – Mangalore", "Thiruvananthapuram – Cochin – Calicut – Mangalore", "Thiruvananthapuram – Calicut – Mangalore – Cochin"],
            "correctAnswer": "Thiruvananthapuram – Cochin – Calicut – Mangalore"
        },
        {
            "question": "Which among the following is the major cause of acid rain?",
            "options": ["Carbon monoxide", "Carbon dioxide", "Nitrogen dioxide", "Helium"],
            "correctAnswer": "Nitrogen dioxide"
        },
        {
            "question": "'Starship' spacecraft, recently seen in the news, is built by which organization?",
            "options": ["SpaceX", "NASA", "DRDO", "ISRO"],
            "correctAnswer": "SpaceX"
        },
        {
            "question": "Which country has developed an mRNA vaccine for cancer patients recently?",
            "options": ["India", "China", "Japan", "Russia"],
            "correctAnswer": "Russia"
        },
        {
            "question": "Who among the following are the main beneficiaries of the 'Reverse Mortgage Scheme'?",
            "options": ["Working Government Employees", "Senior Citizens", "Students", "Foreign Investors"],
            "correctAnswer": "Senior Citizens"
        },
        {
            "question": "What is the main purpose of EXIM bank?",
            "options": ["Finance Infrastructure", "Finance the Exports", "Finance agriculture", "Finance MSME"],
            "correctAnswer": "Finance the Exports"
        },
        {
            "question": "What is the number of sellers in a monopoly market structure?",
            "options": ["one", "two", "three", "more than ten"],
            "correctAnswer": "one"
        },
        {
            "question": "Which among the following formulates fiscal policy?",
            "options": ["RBI", "SEBI", "IRDA", "Ministry of Finance"],
            "correctAnswer": "Ministry of Finance"
        },
        {
            "question": "BT seed is associated with?",
            "options": ["Rice", "Cotton", "Lotus", "Wheat"],
            "correctAnswer": "Cotton"
        },
        {
            "question": "Recently, which organization has released Financial inclusion index?",
            "options": ["Reserve Bank of India", "Ministry of Finance", "NABARD", "SEBI"],
            "correctAnswer": "Reserve Bank of India"
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

            <h1 className="text-4xl font-bold m-3 text-zinc-700 z-10 text-center">KMAT MOCK TEST 2</h1>

            {!isStarted && !testResults && (
                <div className="w-full max-w-4xl  my-20">
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
                                <span className="text-xl font-bold">3 hours (180 minutes)</span>
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
                            <h2 className="text-xl font-bold">KMAT MOCK TEST 2</h2>
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
                <div className="fixed inset-0 bg-white z-40 overflow-y-scroll " data-lenis-prevent>
                    <div className="max-w-4xl mx-auto p-6 flex flex-col h-full ">
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
                        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 ">
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

export default Kmat25;
