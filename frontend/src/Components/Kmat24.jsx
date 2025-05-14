import React, { useState, useEffect, useContext, useRef } from "react";
import { AppContext } from "../context/AppContext";
import Button from "./Button";
import BarChart from "./bar-chart";
import StyledSplitButton from "./StyledSplitButton";

const Kmat24 = () => {
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
      "question": "Identify the correctly spelled word:",
      "options": ["Relevent", "Relavent", "Relevant", "Relavant"],
      "correctAnswer": "Relevant"
    },
    {
      "question": "Choose the correctly spelled word from the options below:",
      "options": ["Neccessary", "Necesary", "Necessary", "Neccesary"],
      "correctAnswer": "Necessary"
    },
    {
      "question": "Identify the correctly spelled word:",
      "options": ["Consciece", "Conscience", "Consience", "Consciense"],
      "correctAnswer": "Conscience"
    },
    {
      "question": "Find the correctly spelled word:",
      "options": ["Persuade", "Persuaid", "Persuadee", "Perswade"],
      "correctAnswer": "Persuade"
    },
    {
      "question": "Identify the misspelled word in the list below:",
      "options": ["Accommodate", "Mischievous", "Embarras", "Irresistible"],
      "correctAnswer": "Embarras"
    },
    {
      "question": "Identify the word that has the same meaning as 'FORTITUDE' in the list given below:",
      "options": ["Courage", "Deceit", "Frivolity", "Ambivalence"],
      "correctAnswer": "Courage"
    },
    {
      "question": "Choose the word that is closest in meaning to the word 'PRECISE' from the options provided:",
      "options": ["Ambiguous", "Accurate", "Vague", "Dubious"],
      "correctAnswer": "Accurate"
    },
    {
      "question": "Find the word with a similar meaning to 'BENEVOLENT' in the list below:",
      "options": ["Malevolent", "Hostile", "Friendly", "Pessimistic"],
      "correctAnswer": "Friendly"
    },
    {
      "question": "Find the word with a similar meaning to 'EXUBERANT' from the options below:",
      "options": ["Dull", "Energetic", "Hesitant", "Melancholic"],
      "correctAnswer": "Energetic"
    },
    {
      "question": "Identify the word that has a similar meaning to 'PEACEFUL' in the options provided:",
      "options": ["Chaotic", "Tranquil", "Aggressive", "Turbulent"],
      "correctAnswer": "Tranquil"
    },
    {
      "question": "Choose the word that is synonymous with 'CUNNING' from the list below:",
      "options": ["Honest", "Devious", "Transparent", "Naive"],
      "correctAnswer": "Devious"
    },
    {
      "question": "Identify the word with the opposite meaning to 'EVIDENT' in the list provided:",
      "options": ["Obvious", "Concealed", "Clear", "Apparent"],
      "correctAnswer": "Concealed"
    },
    {
      "question": "Find the word that has an opposite meaning to 'HARMONY' from the options below:",
      "options": ["Discord", "Unity", "Accord", "Consensus"],
      "correctAnswer": "Discord"
    },
    {
      "question": "Choose the word that has opposite meaning to 'FRAUDULENT' in the list given below:",
      "options": ["Dishonest", "Trustworthy", "Deceptive", "Unethical"],
      "correctAnswer": "Trustworthy"
    },
    {
      "question": "Convert the sentence into DIRECT SPEECH: She suggested, 'Why don't we go for a walk?'",
      "options": ["She said, 'Let us go for a walk.'", "She said, 'Why not we go for a walk?'", "She said, 'Shall we go for a walk?'", "She said, 'Why don't we went for a walk.'"],
      "correctAnswer": "She said, 'Shall we go for a walk?'"
    },
    {
      "question": "Change the sentence into DIRECT SPEECH: He advised, 'You should study regularly to do well in exams.'",
      "options": ["He said, 'You should study regularly to do well in exams.'", "He said, 'Study regularly to do well in exams.'", "He said, 'You must study regularly for success in exams.'", "He said, 'To do well in exams, you should study regularly.'"],
      "correctAnswer": "He said, 'You should study regularly to do well in exams.'"
    },
    {
      "question": "Convert the sentence into INDIRECT SPEECH: She said, 'I will visit my grandmother tomorrow.'",
      "options": ["She stated that she would visit her grandmother the next day.", "She announced, 'I will visit my grandmother tomorrow.'", "She declared that she is visiting her grandmother tomorrow.", "She mentioned that she will visit her grandmother tomorrow."],
      "correctAnswer": "She stated that she would visit her grandmother the next day."
    },
    {
      "question": "Change the sentence into INDIRECT SPEECH: Tom exclaimed, 'What a surprise!'",
      "options": ["Tom exclaimed that it was a surprise.", "Tom exclaimed, 'What a surprising event!'", "Tom exclaimed, 'How surprising it was!'", "Tom exclaimed, 'What a surprise!' remained unchanged."],
      "correctAnswer": "Tom exclaimed that it was a surprise."
    },
    {
      "question": "Identify the Mood and Tense of the verb in the following sentence: May you have a wonderful day!",
      "options": ["Imperative, Simple Past", "Subjunctive, Present Continuous", "Imperative, Simple Present", "Subjunctive, Future Perfect"],
      "correctAnswer": "Imperative, Simple Present"
    },
    {
      "question": "Convert the sentence into ACTIVE VOICE: The cake was baked by the chef.",
      "options": ["The chef bakes the cake.", "The chef baked the cake.", "The chef is baking the cake.", "The chef had baked the cake."],
      "correctAnswer": "The chef baked the cake."
    },
    {
      "question": "Change the sentence into ACTIVE VOICE: A solution will be found by our team.",
      "options": ["Our team is finding a solution.", "Our team finds a solution.", "Our team found a solution.", "Our team will find a solution."],
      "correctAnswer": "Our team will find a solution."
    },
    {
      "question": "Convert the sentence given in the question into PASSIVE VOICE. Who created this?",
      "options": ["By whom was this create?", "By whom was this being created?", "By whom was this created?", "By whom is this created?"],
      "correctAnswer": "By whom was this created?"
    },
    {
      "question": "The following question has two blanks. Choose the words for each blank which best fit the meaning of the sentence as a whole. She is …… to become …… successful entrepreneur in the future.",
      "options": ["ambitious, a", "aspiring, the", "eager, a", "reluctant, the"],
      "correctAnswer": "ambitious, a"
    },
    {
      "question": "The following question has two blanks. Choose the words for each blank which best fit the meaning of the sentence as a whole. …… is the first step towards wisdom, and …… is the key to success.",
      "options": ["Patience, perseverance", "Perseverance, patience", "Wisdom, perseverance", "Success, patience"],
      "correctAnswer": "Perseverance, patience"
    },
    {
      "question": "The following question has two blanks. Choose the words for each blank which best fit the meaning of the sentence as a whole. …… is the ability to adapt to change, and …… is the strength to initiate it.",
      "options": ["Flexibility, innovation", "Innovation, flexibility", "Creativity, resilience", "Resilience, creativity"],
      "correctAnswer": "Flexibility, innovation"
    },
    {
      "question": "The following question has two blanks. Choose the words for each blank which best fit the meaning of the sentence as a whole. She has been an inspiration to many, proving that with determination and passion, anyone can overcome …… obstacles and achieve …… goals.",
      "options": ["insurmountable, their", "daunting, his", "formidable, her", "overwhelming, its"],
      "correctAnswer": "insurmountable, their"
    },
    {
      "question": "Choose the words for each blank which best fit the meaning of the sentence as a whole. …… is crucial in building a strong team, and …… is essential for maintaining a healthy work environment.",
      "options": ["Communication, cooperation", "Cooperation, communication", "Trust, collaboration", "Collaboration, trust"],
      "correctAnswer": "Communication, cooperation"
    },
    {
      "question": "Choose the words for each blank that best fit the meaning of the sentence as a whole. The success of any project depends on …… planning and …… execution.",
      "options": ["meticulous, flawless", "meticulous, careful", "haphazard, careful", "detailed, flawless"],
      "correctAnswer": "meticulous, flawless"
    },
    {
      "question": "Choose the words for each blank that best fit the meaning of the sentence as a whole. …… is the key to unlocking potential, and …… is the pathway to continuous improvement.",
      "options": ["Reflection, feedback", "Feedback, reflection", "Practice, critique", "Critique, practice"],
      "correctAnswer": "Reflection, feedback"
    },
    {
      "question": "Reorder the parts to create a coherent sentence: A: for various health benefits B: meditation is practiced C: such as reducing stress D: worldwide",
      "options": ["BCDA", "DCAB", "ACBD", "DABC"],
      "correctAnswer": "ACBD"
    },
    {
      "question": "Rearrange the parts to form a meaningful sentence: A: enjoy various B: tourists can C: outdoor activities D: during their stay",
      "options": ["BACD", "DCBA", "ACBD", "DACB"],
      "correctAnswer": "BACD"
    },
    {
      "question": "Read the passage and answer the question. In a small village, there was a scarcity of water, and the only well in the vicinity was often dry during the hot summer months. The villagers, tired of this recurring problem, decided to take matters into their own hands. They organized a community initiative to build a reservoir to store water during the rainy season and provide a steady supply throughout the year. The project required teamwork and dedication, but the villagers were determined to overcome the water crisis. With a collective effort, they completed the reservoir, ensuring that every household had access to water even in the driest months. The villagers' initiative demonstrates their commitment to:",
      "options": ["Agricultural development", "Community Welfare", "Industrial expansion", "Environmental conservation"],
      "correctAnswer": "Community Welfare"
    },
    {
      "question": "Read the passage and answer the question. A group of young activists started a campaign to raise awareness about the importance of recycling in their neighborhood. They conducted workshops, distributed pamphlets, and organized community clean-up events. Their efforts aimed to encourage residents to adopt sustainable practices and reduce waste. As a result of their campaign, more households began sorting and recycling their waste, contributing to a cleaner and greener environment. The activists' campaign primarily focused on promoting:",
      "options": ["Renewable energy", "Wildlife conservation", "Environmental awareness", "Air pollution control"],
      "correctAnswer": "Environmental awareness"
    },
    {
      "question": "Read the passage and answer the question. In a remote village, where access to healthcare was limited, a group of dedicated volunteers established a mobile medical clinic. The clinic visited the village regularly, providing free medical check-ups and consultations and distributing essential medicines. The villagers, who previously had to travel long distances for medical assistance, greatly benefited from this initiative. The mobile clinic initiative reflects the volunteers' commitment to:",
      "options": ["Educational development", "Public transportation", "Healthcare accessibility", "Agricultural reform"],
      "correctAnswer": "Healthcare accessibility"
    },
    {
      "question": "Read the passage and answer the question. A group of young entrepreneurs initiated a project to empower local artisans to preserve traditional craftsmanship. They collaborated with skilled artisans to create a platform where their handmade products could reach a wider market. The artisans gained economic independence through this initiative, and traditional art forms thrived. The entrepreneurs' project primarily focused on promoting:",
      "options": ["Economic diversity", "Globalization", "Technological innovation", "Cultural heritage"],
      "correctAnswer": "Cultural heritage"
    },
    {
      "question": "Read the passage and answer the question. In a society where gender stereotypes were prevalent, many students started a campaign to challenge these norms. They organized workshops, discussions, and awareness programs to promote gender equality and empower individuals to break free from traditional expectations. The students' campaign primarily aimed at challenging:",
      "options": ["Educational Policies", "Racial discrimination", "Gender stereotypes", "Environmental degradation"],
      "correctAnswer": "Gender stereotypes"
    },
    {
      "question": "Read the passage and answer the question. A group of environmentally conscious citizens initiated a tree-planting campaign to combat the rising pollution levels in their city. They encouraged residents to participate in the drive, providing saplings and guidance on suitable planting locations. The campaign aimed to enhance green cover, reduce air pollution, and create a healthier living environment. The citizens' initiative primarily focused on addressing:",
      "options": ["Traffic congestion", "Noise pollution", "Deforestation", "Air pollution"],
      "correctAnswer": "Air pollution"
    },
    {
      "question": "Read the passage and answer the question. Concerned about the lack of educational resources in underserved communities, a group of teachers launched a mobile library project. They traveled to remote areas, offering books and educational materials to children without access to formal schooling. The project aimed to bridge the educational gap and promote a love for learning among disadvantaged children. The teachers' initiative primarily focused on addressing:",
      "options": ["Economic inequality", "Healthcare disparities", "Educational accessibility", "Cultural preservation"],
      "correctAnswer": "Educational accessibility"
    },
    {
      "question": "Read the passage and answer the question. In a world grappling with the effects of climate change, a team of scientists initiated a research project to develop sustainable agricultural practices. They focused on creating methods that enhance crop yields while minimizing environmental impact. The project aimed to offer solutions for ensuring food security in the face of climate challenges. The scientists' initiative primarily focused on addressing:",
      "options": ["Technological innovation", "Biodiversity conservation", "Climate change adaptation", "Urbanization challenges"],
      "correctAnswer": "Climate change adaptation"
    },
    {
      "question": "Read the passage and answer the question. Recognizing the importance of mental health awareness, a group of mental health professionals launched a campaign to destigmatize mental health issues. Through seminars, online resources, and community events, they aimed to promote open discussions and provide support for those struggling with mental health challenges. The professionals' campaign primarily focused on addressing:",
      "options": ["Physical disabilities", "Social inequality", "Mental health stigma", "Substance abuse"],
      "correctAnswer": "Mental health stigma"
    },
    {
      "question": "Read the passage and answer the question. Amid concerns about declining civic engagement, a group of citizens initiated a project encouraging active participation in community affairs. They organized town hall meetings, volunteer opportunities, and information sessions to foster a sense of community responsibility. The citizens' project primarily focused on addressing:",
      "options": ["Technological advancements", "Political apathy", "Environmental degradation", "Economic inequality"],
      "correctAnswer": "Political apathy"
    },
    {
      "question": "Identify the sentence with the same meaning. She finished her homework and then went to the library.",
      "options": ["Before going to the library, she finished her homework.", "Before she finished her homework, she went to the library.", "After going to the library, she finished her homework.", "She went to the library before finishing her homework."],
      "correctAnswer": "Before going to the library, she finished her homework."
    },
    {
      "question": "Identify the sentence with the same meaning. The team won the championship, and then they celebrated at the local restaurant.",
      "options": ["Before celebrating at the local restaurant, the team won the championship.", "The team celebrated at the local restaurant after winning the championship.", "After celebrating at the local restaurant, the team won the championship.", "Celebrating at the local restaurant, the team won the championship."],
      "correctAnswer": "The team celebrated at the local restaurant after winning the championship."
    },
    {
      "question": "Identify the sentence with the same meaning. Maria finished her workout, and then she took a refreshing shower.",
      "options": ["Taking a refreshing shower, Maria finished her workout.", "Before taking a refreshing shower, Maria finished her workout.", "Maria took a refreshing shower before finishing her workout.", "After taking a refreshing shower, Maria finished her workout."],
      "correctAnswer": "Before taking a refreshing shower, Maria finished her workout."
    },
    {
      "question": "Identify the word that can be substituted for the given words/sentence. The act of giving up one's country or leaving to reside in another.",
      "options": ["Immigration", "Emigration", "Expatriation", "Repatriation"],
      "correctAnswer": "Emigration"
    },
    {
      "question": "Out of four alternatives, choose the one that can be substituted for the given words/sentence. Leave or remove from a place considered dangerous.",
      "options": ["Evade", "Evacuate", "Avoid", "Exterminate"],
      "correctAnswer": "Evacuate"
    },
    {
      "question": "Choose the word that can be substituted for the given words/sentence. A state of being unconscious for a long time.",
      "options": ["Coma", "Stupor", "Hibernation", "Dormancy"],
      "correctAnswer": "Coma"
    },
    {
      "question": "Choose the correct option to complete the sentence: The smell of freshly baked bread wafted the bakery, making everyone in the neighborhood hungry.",
      "options": ["through", "along", "by", "from"],
      "correctAnswer": "through"
    },
    {
      "question": "Identify the correct sentence among the options:",
      "options": ["She don't like to go shopping on weekends.", "Despite of the rain, they decided to go for a hike.", "The movie was so boring, and I can't understand why people like it.", "He plays guitar better than me."],
      "correctAnswer": "He plays guitar better than me."
    },
    {
      "question": "Identify the sentence with the correct use of punctuation:",
      "options": ["She told him, 'I'll be there by 3 pm'.", "Despite the storm they decided to go out.", "The teacher said the assignment is due tomorrow.", "Walking in the park, a bird flew overhead."],
      "correctAnswer": "She told him, 'I'll be there by 3 pm'."
    },
    {
      "question": "If Alice is currently 30 years old and twice the age her son Ben will be in 5 years, in 10 years, how many times will Alice’s age be compared to Ben's?",
      "options": ["2.5 times", "1.5 times", "2 times", "3 times"],
      "correctAnswer": "2 times"
    },
    {
      "question": "A can complete a task in 6 days, B can complete it in 8 days, and C can complete it in 12 days. If they all work together, how many days will be required to complete the task?",
      "options": ["5 days approx", "2 days approx", "4 days approx", "3 days approx"],
      "correctAnswer": "3 days approx"
    },
    {
      "question": "A machine can produce 200 units per hour, while another machine can produce 300 units per hour. How many units will be produced if they operate together for 3 hours?",
      "options": ["1500", "1200", "900", "1800"],
      "correctAnswer": "1500"
    },
    {
      "question": "A can do a job in 20 days, B can do it in 30 days, and C can do it in 40 days. If they all work together for 8 days, what fraction of the job remains?",
      "options": ["2/15", "5/12", "13/15", "7/12"],
      "correctAnswer": "2/15"
    },
    {
      "question": "A number divided by 180 gives a remainder of 98. What will be the remainder if the same number is divided by 15?",
      "options": ["7", "8", "9", "10"],
      "correctAnswer": "8"
    },
    {
      "question": "How many numbers between 400 and 800 are divisible by 13?",
      "options": ["30", "31", "32", "33"],
      "correctAnswer": "31"
    },
    {
      "question": "If three-fifth of a number is 540, find one sixth of the number.",
      "options": ["200", "250", "100", "150"],
      "correctAnswer": "150"
    },
    {
      "question": "If A travels 324 km in 12 hours of driving, what distance will he travel in 5 hours at the same speed?",
      "options": ["125 km", "150 km", "135 km", "100 km"],
      "correctAnswer": "135 km"
    },
    {
      "question": "A vessel contains 24 litres of milk and water in the ratio 5:3. How much water should be added so that the ratio becomes 1:1?",
      "options": ["5", "4", "6", "8"],
      "correctAnswer": "6"
    },
    {
      "question": "The ages of Jack and Jill are in the ratio 5:4. What will be the ratio of their ages after 6 years if Jack is now elder to Jill by 4 years?",
      "options": ["13:11", "12:11", "11:10", "10:9"],
      "correctAnswer": "13:11"
    },
    {
      "question": "The number 2*056 is divisible by 11. Which is the digit at the * sign?",
      "options": ["4", "2", "3", "5"],
      "correctAnswer": "3"
    },
    {
      "question": "How many times should the keys of the keyboard be pressed to enter the first 300 counting numbers?",
      "options": ["795", "889", "788", "792"],
      "correctAnswer": "792"
    },
    {
      "question": "Which of the following numbers is exactly divisible by 4, 5, 6, and 7?",
      "options": ["1260", "1340", "1080", "1400"],
      "correctAnswer": "1260"
    },
    {
      "question": "Five alarms sound together at intervals of 5, 10, 15, 20, and 25 minutes respectively. At most, how many times will they all sound together in 2 hours?",
      "options": ["1", "2", "3", "0"],
      "correctAnswer": "0"
    },
    {
      "question": "What fraction of 1km is 400m?",
      "options": ["1/4", "2/5", "1/3", "1/2"],
      "correctAnswer": "2/5"
    },
    {
      "question": "The incomes of A and B are in the ratio 3:2 and their expenses are in the ratio 5:3. If each saves Rs.700,000, what is the income of A?",
      "options": ["Rs.40 lakh", "Rs.45 lakh", "Rs.42 lakh", "Rs.35 lakh"],
      "correctAnswer": "Rs.42 lakh"
    },
    {
      "question": "If 15 men do a work in 9 days, 5 men can do the same work in how many days?",
      "options": ["3 days", "45 days", "27 days", "30 days"],
      "correctAnswer": "27 days"
    },
    {
      "question": "Determine the compound interest on Rs.6 lakh for one year at 8% pa interest compounded half yearly.",
      "options": ["48000", "48600", "48860", "48960"],
      "correctAnswer": "48960"
    },
    {
      "question": "A train running at a speed of 72 kmph passes a telegraphic pole in 8 seconds. How much time will it take to cross a bridge of 180m?",
      "options": ["9 seconds", "17 seconds", "8 seconds", "15 seconds"],
      "correctAnswer": "17 seconds"
    },
    {
      "question": "Two trains start at 10 am from two stations and travel towards each other at speeds 40 kmph and 60 kmph. If the two stations are 400 km apart, when will they meet?",
      "options": ["1 pm", "12 noon", "2 pm", "1:30 pm"],
      "correctAnswer": "2 pm"
    },
    {
      "question": "A person walks a certain distance and cycles back, taking a total time of 90 minutes. He could walk both ways in 120 minutes. How long will it take for him to ride both ways?",
      "options": ["45 minutes", "75 minutes", "40 minutes", "60 minutes"],
      "correctAnswer": "60 minutes"
    },
    {
      "question": "John sold a product for 15% profit. If he had sold it for Rs.600 more, he would have made 25% profit. What is the cost price of the product?",
      "options": ["Rs.6000", "Rs.3000", "Rs.5000", "Rs.4500"],
      "correctAnswer": "Rs.6000"
    },
    {
      "question": "What was the original price of a product sold for Rs.1200 if the seller gave a discount of 25%?",
      "options": ["Rs.1500", "Rs.2500", "Rs.900", "Rs.1600"],
      "correctAnswer": "Rs.1600"
    },
    {
      "question": "The value of equipment is Rs.1 crore. If depreciation is calculated at 10% annually using the written-down value method, what will be the value after 3 years?",
      "options": ["Rs.72.9 lakh", "Rs.70 lakh", "Rs.65.7 lakh", "Rs.75.6 lakh"],
      "correctAnswer": "Rs.72.9 lakh"
    },
    {
      "question": "A number is doubled and 9 is added. If the resultant is trebled it becomes 75. What is that number?",
      "options": ["6", "8", "3.5", "None of these"],
      "correctAnswer": "8"
    },
    {
      "question": "When 25 is subtracted from 50% of a number, the result is 25. Find the number.",
      "options": ["75", "100", "50", "60"],
      "correctAnswer": "100"
    },
    {
      "question": "If the price of a product is first increased by 20% and then by 10%, what is the total increase?",
      "options": ["30%", "31%", "32%", "33%"],
      "correctAnswer": "32%"
    },
    {
      "question": "A factory can produce 1000 units per day, while another factory can produce 1500 units per day. If they work together for 2 days, what fraction will be left if the total production required is 15000 units?",
      "options": ["1/3", "2/3", "1/5", "2/5"],
      "correctAnswer": "2/3"
    },
    {
      "question": "If A can paint a room in 8 hours and B can paint the same room in 10 hours, how much of the room remains unpainted if they work together for 3 hours?",
      "options": ["2/35", "1/3", "13/35", "13/40"],
      "correctAnswer": "13/40"
    },
    {
      "question": "A contractor can finish building a house in 60 days, while his assistant can finish it in 90 days. If they work together for 15 days, what fraction of the work is remaining?",
      "options": ["5/12", "7/12", "2/3", "1/2"],
      "correctAnswer": "7/12"
    },
    {
      "question": "X can complete a project in 12 days and Y can complete it in 18 days. If they work together for 6 days, what fraction of the project remains unfinished?",
      "options": ["5/4", "1/6", "1/3", "1/2"],
      "correctAnswer": "1/6"
    },
    {
      "question": "Sarah's age is now five times that of her nephew Jack. If Jack will be 11 years old, in 3 years, how old will Sarah be then?",
      "options": ["43 years", "48 years", "53 years", "58 years"],
      "correctAnswer": "43 years"
    },
    {
      "question": "If Thomas is currently 20 years old and twice the age of his sister Mary, how old will Mary be in 5 years?",
      "options": ["10 years", "15 years", "20 years", "25 years"],
      "correctAnswer": "15 years"
    },
    {
      "question": "David is currently twice the age of his brother Daniel. If Daniel is 10 years old, how old will David be in 5 years?",
      "options": ["15 years", "20 years", "25 years", "30 years"],
      "correctAnswer": "25 years"
    },
    {
      "question": "Janaki's age is three times that of her daughter Sita. If Sita will be 15 years old in 5 years, how old will Janaki be in 5 years?",
      "options": ["45 years", "40 years", "50 years", "35 years"],
      "correctAnswer": "35 years"
    },
    {
      "question": "A printer can complete a printing work in 9 hours, while another printer can do it in 12 hours. If they work together for 4 hours, what fraction of the work will be completed?",
      "options": ["2/9", "2/3", "1/3", "7/9"],
      "correctAnswer": "7/9"
    },
    {
      "question": "Worker P can complete a task in 10 days, and worker Q can complete the same task in 15 days. If they work together for 5 days, what fraction of the task remains to be done?",
      "options": ["2/3", "1/5", "1/6", "5/6"],
      "correctAnswer": "1/6"
    },
    {
      "question": "In a class of 150 students, 55 speak English, 85 speak Malayalam and 30 speak neither English nor Malayalam. How many students speak both English and Malayalam?",
      "options": ["20", "10", "120", "45"],
      "correctAnswer": "20"
    },
    {
      "question": "In a certain class, 40% of the students take coffee, 40% take tea, 50% take milk, and 10% take all the three. Also, 20% take coffee and tea, 20% take tea and milk, and 20% take coffee and milk. 10 students do not take any of the three. How many students are there in the class?",
      "options": ["100", "90", "50", "40"],
      "correctAnswer": "50"
    },
    {
      "question": "If Jack walks at 4 kmph he reaches the bus stop 10 minutes late. Starting from home at the same time, if he walks at 6 kmph, he reaches the bus stop 5 minutes early. What is the distance she walks to the bus stop?",
      "options": ["4 km", "6 km", "5 km", "3 km"],
      "correctAnswer": "3 km"
    },
    {
      "question": "A train covers 400 metres in 40 seconds. What is the speed of the train in kmph?",
      "options": ["40", "36", "50", "30"],
      "correctAnswer": "36"
    },
    {
      "question": "A bus leaves city A at 11:20 am and arrives at city B 240 km away at 4:20 pm on the same day. What is the average speed of the bus for the journey?",
      "options": ["48 kmph", "36 kmph", "50 kmph", "44 kmph"],
      "correctAnswer": "48 kmph"
    },
    {
      "question": "A takes half as long as B to do a piece of work. Together they can complete the work in 12 days. How many days will A take if he does the work alone?",
      "options": ["30", "36", "18", "15"],
      "correctAnswer": "18"
    },
    {
      "question": "If the perimeter of a rectangle is 48 cm and its length is twice its breadth, what is its area?",
      "options": ["130 sq.cm", "120 sq. cm", "150 sq.cm", "128 sq.cm"],
      "correctAnswer": "128 sq.cm"
    },
    {
      "question": "If the area of a rectangle is 60 sq. cm and its length is 4 cm more than its breadth, what is its perimeter?",
      "options": ["30 cm", "32 cm", "36 cm", "38 cm"],
      "correctAnswer": "32 cm"
    },
    {
      "question": "A certain sum of money becomes Rs. 28,000 in 4 years at 10% simple interest. What is the principal amount?",
      "options": ["Rs.20,000", "Rs.18,000", "Rs.15,000", "Rs.16,000"],
      "correctAnswer": "Rs.20,000"
    },
    {
      "question": "A company's revenue increased by 25% from last year to this year. If the revenue this year is Rs.500,000, what was the revenue last year?",
      "options": ["Rs.300,000", "Rs.450,000", "Rs.400,000", "Rs.375,000"],
      "correctAnswer": "Rs.400,000"
    },
    {
      "question": "The average of 5 consecutive even numbers is 24. What is the largest of these numbers?",
      "options": ["30", "28", "32", "26"],
      "correctAnswer": "28"
    },
    {
      "question": "A bag contains 5 red balls, 4 green balls, and 3 blue balls. If one ball is drawn at random, what is the probability that it is not blue?",
      "options": ["1/4", "3/4", "1/3", "7/12"],
      "correctAnswer": "3/4"
    },
    {
      "question": "The sum of two numbers is 35, and their difference is 5. What are the two numbers?",
      "options": ["20,15", "18,17", "10,15", "25,20"],
      "correctAnswer": "20,15"
    },
    {
      "question": "If all MBA students are hardworking, and John is hardworking, can we conclude that John is an MBA student?",
      "options": ["Yes", "No", "Maybe", "Cannot be determined"],
      "correctAnswer": "No"
    },
    {
      "question": "If some managers are leaders and all leaders are good decision-makers, can we infer that some managers are good decision-makers?",
      "options": ["Yes", "No", "Maybe", "Insufficient information"],
      "correctAnswer": "Yes"
    },
    {
      "question": "If A is twice as old as B, and C is half the age of A, how many times older is A compared to C?",
      "options": ["4 times", "2 times", "1.5 times", "3 times"],
      "correctAnswer": "2 times"
    },
    {
      "question": "If all finance majors are good at math, and some good-at-math people are not finance majors, can we conclude that all finance majors are good-at-math?",
      "options": ["Yes", "No", "Maybe", "Cannot be determined"],
      "correctAnswer": "Yes"
    },
    {
      "question": "If no athletes are doctors, and some doctors are musicians, can we infer that no athletes are musicians?",
      "options": ["Yes", "No", "Maybe", "Insufficient information"],
      "correctAnswer": "No"
    },
    {
      "question": "If every student who studies hard gets good grades, and Mary gets good grades, can we conclude that Mary studied hard?",
      "options": ["Yes", "No", "Maybe", "Cannot be determined"],
      "correctAnswer": "Cannot be determined"
    },
    {
      "question": "If no artists are scientists, and some scientists are writers, can we infer that no artists are writers?",
      "options": ["Yes", "No", "Maybe", "Insufficient information"],
      "correctAnswer": "No"
    },
    {
      "question": "If the average age of a group of 5 people is 30 years, and one person leaves the group, what is the new average age?",
      "options": ["28 years", "30 years", "32 years", "Insufficient information"],
      "correctAnswer": "Insufficient information"
    },
    {
      "question": "If 60% of students in a class are female, and 40% of the females wear glasses, what percentage of the class wears glasses?",
      "options": ["60%", "40%", "24%", "36%"],
      "correctAnswer": "24%"
    },
    {
      "question": "If some graduates are employed and all employed people are financially stable, can we infer that some graduates are financially stable?",
      "options": ["Yes", "No", "Maybe", "Insufficient information"],
      "correctAnswer": "Yes"
    },
    {
      "question": "If all leaders are good communicators, and some good communicators are not leaders, can we conclude that some leaders are not good communicators?",
      "options": ["Yes", "No", "Maybe", "Insufficient information"],
      "correctAnswer": "No"
    },
    {
      "question": "If 20% of a company's employees are managers, and 10% of the managers are also team leaders, what percentage of the employees are both managers and team leaders?",
      "options": ["10%", "2%", "20%", "0.2%"],
      "correctAnswer": "2%"
    },
    {
      "question": "If every successful entrepreneur is innovative, and John is innovative, can we conclude that John is a successful entrepreneur?",
      "options": ["Yes", "No", "Maybe", "Insufficient information"],
      "correctAnswer": "Maybe"
    },
    {
      "question": "If all MBA students are ambitious, and some ambitious people are not MBA students, can we infer that some MBA students are not ambitious?",
      "options": ["Yes", "No", "Maybe", "Insufficient information"],
      "correctAnswer": "No"
    },
    {
      "question": "If some employees are satisfied with their jobs, and all satisfied employees are productive, can we infer that some employees are productive?",
      "options": ["Yes", "No", "Maybe", "Insufficient information"],
      "correctAnswer": "Yes"
    },
    {
      "question": "If no graduates are unemployed, and some unemployed people are not graduates, can we conclude that some graduates are employed?",
      "options": ["Yes", "No", "Maybe", "Insufficient information"],
      "correctAnswer": "Insufficient information"
    },
    {
      "question": "If all leaders are strategic thinkers, and some strategic thinkers are not leaders, can we infer that some leaders are not strategic thinkers?",
      "options": ["Yes", "No", "Maybe", "Insufficient information"],
      "correctAnswer": "No"
    },
    {
      "question": "If 25% of students like math, and 60% of those who like math also like science, what percentage of students like both math and science?",
      "options": ["15%", "25%", "60%", "75%"],
      "correctAnswer": "15%"
    },
    {
      "question": "If every candidate who completes the training program gets a job, and Tom got a job, can we conclude that Tom completed the training program?",
      "options": ["Yes", "No", "Maybe", "Insufficient information"],
      "correctAnswer": "Maybe"
    },
    {
      "question": "If no scholars are athletes, and some athletes are musicians, can we infer that no scholars are musicians?",
      "options": ["Yes", "No", "Maybe", "Insufficient information"],
      "correctAnswer": "No"
    },
    {
      "question": "In the question below, a statement is given, followed by two conclusions numbered I and II. You have to assume everything in the statement to be true, then consider the two conclusions together and decide which of them logically follows beyond a reasonable doubt from the information given in the statement. Statement: All students in the class passed the exam. Conclusions: I. Every student is good at academics. II. No student failed the exam.",
      "options": ["If only conclusion I follows", "If only conclusion II follows", "If either I or II follows", "If neither I nor II follows"],
      "correctAnswer": "If only conclusion II follows"
    },
    {
      "question": "In the question below is given a statement followed by two conclusions numbered I and II. You have to assume everything in the statement to be true, then consider the two conclusions together and decide which of them logically follows beyond a reasonable doubt from the information given in the statement. Statement: The train arrived late at the station. Conclusions: I. The train schedule was disrupted. II. Passengers were unhappy with the delay.",
      "options": ["If only conclusion I follows", "If only conclusion II follows", "If either I or II follows", "If neither I nor II follows"],
      "correctAnswer": "If only conclusion I follows"
    },
    {
      "question": "In the question below, a statement is given, followed by two conclusions numbered I and II. You have to assume everything in the statement to be true, then consider the two conclusions together and decide which of them logically follows beyond a reasonable doubt from the information given in the statement. Statement: All actors are trained in performing arts. Conclusions: I. Every person trained in performing arts is an actor. II. Some actors may not be trained in performing arts.",
      "options": ["If only conclusion I follows", "If only conclusion II follows", "If either I or II follows", "If neither I nor II follows"],
      "correctAnswer": "If neither I nor II follows"
    },
    {
      "question": "In the question below, a statement is given, followed by two conclusions numbered I and II. You have to assume everything in the statement to be true, then consider the two conclusions together and decide which of them logically follows beyond a reasonable doubt from the information given in the statement. Statement: All students passed the mathematics exam. Conclusions: I. Every student is good at mathematics. II. No student failed the mathematics exam.",
      "options": ["If only conclusion I follows", "If only conclusion II follows", "If either I or II follows", "If neither I nor II follows"],
      "correctAnswer": "If only conclusion II follows"
    },
    {
      "question": "In the question below, a statement is given, followed by two conclusions numbered I and II. You have to assume everything in the statement to be true, then consider the two conclusions together and decide which of them logically follows beyond a reasonable doubt from the information given in the statement. Statement: The traffic signal is red. Conclusions: I. All vehicles must stop. II. Pedestrians can cross the road.",
      "options": ["If only conclusion I follows", "If only conclusion II follows", "If either I or II follows", "If neither I nor II follows"],
      "correctAnswer": "If only conclusion I follows"
    },
    {
      "question": "Question consist of a statement, followed by two arguments numbered I and II. You have to decide which of the arguments is a ‘strong’ argument and which a ‘weak’ argument. Statement: Should the use of plastic be banned worldwide? Arguments: I. Yes. It is essential for environmental conservation and reducing pollution. II. No. It is a versatile material with various applications and banning it would disrupt industries.",
      "options": ["Only argument I is strong.", "Only argument II is strong.", "Either I or II is strong.", "Both I and II are strong."],
      "correctAnswer": "Both I and II are strong."
    },
    {
      "question": "The question consists of a statement and two arguments numbered I and II. You have to decide which of the arguments is a ‘strong’ argument and which a ‘weak’ argument Statement: Should public transportation be made free in urban areas? Arguments: I. Yes. It would reduce traffic congestion and air pollution. II. No. It would lead to misuse and financial burden on the government.",
      "options": ["Only argument I is strong.", "Only argument II is strong.", "Either I or II is strong.", "Both I and II are strong."],
      "correctAnswer": "Both I and II are strong."
    },
    {
      "question": "The question consists of a statement and two arguments numbered I and II. You have to decide which of the arguments is a ‘strong’ argument and which a ‘weak’ argument Statement: Should social media platforms have stricter regulations on content to combat misinformation? Arguments: I. Yes. It helps prevent the spread of false information and protects users. II. No. It infringes on freedom of speech and expression.",
      "options": ["Only argument I is strong.", "Only argument II is strong.", "Either I or II is strong.", "Both I and II are strong."],
      "correctAnswer": "Only argument I is strong."
    },
    {
      "question": "In the question, a statement is given, followed by two assumptions numbered I and II. An assumption is something supposed or taken for granted. You have to consider the statement and the following assumptions and decide which of the assumption(s) is/are implicit in the statement Statement: The company has decided to launch a new product with advanced features. Assumptions: I. Consumers are always interested in products with advanced features. II. The company has conducted market research to identify consumer preferences.",
      "options": ["If only Assumption I is implicit.", "If only Assumption II is implicit.", "If either Assumption I or II is implicit.", "If neither Assumption I nor II is implicit."],
      "correctAnswer": "If either Assumption I or II is implicit."
    },
    {
      "question": "In the question, a statement is given, followed by two assumptions numbered I and II. An assumption is something supposed or taken for granted. You have to consider the statement and the following assumptions and decide which of the assumption(s) is/are implicit in the statement. Statement: The city administration is implementing a new waste management system. Assumptions: I. The current waste management system is ineffective. II. The residents are willing to cooperate with the new system.",
      "options": ["If only Assumption I is implicit.", "If only Assumption II is implicit.", "If either Assumption I or II is implicit.", "If neither Assumption I nor II is implicit."],
      "correctAnswer": "If neither Assumption I nor II is implicit."
    },
    {
      "question": "In the question, a statement is given, followed by two assumptions numbered I and II. An assumption is something supposed or taken for granted. You have to consider the statement and the following assumptions and decide which of the assumption(s) is/are implicit in the statement. Statement: The government has increased the tax rates on luxury goods. Assumptions: I. The government aims to generate additional revenue through higher taxes. II. People will reduce their consumption of luxury goods due to increased taxes.",
      "options": ["If only Assumption I is implicit.", "If only Assumption II is implicit.", "If either Assumption I or II is implicit.", "If neither Assumption I nor II is implicit."],
      "correctAnswer": "If only Assumption I is implicit."
    },
    {
      "question": "The question is followed by two statements numbered I and II. You must decide whether the data provided in the statements is sufficient to answer the question. Question: What is the speed of the train? Statements: I. The train covers a distance of 300 kilometers in 4 hours. II. The train's average speed during the journey is 75 kilometers per hour.",
      "options": ["If the data in statement I alone is sufficient to determine the answer.", "If the data either in statement I alone or statement II alone are sufficient to determine the answer.", "If the data in both the statements I and II together are insufficient to answer the question.", "If the data in both the statements I and II together are necessary to answer the question."],
      "correctAnswer": "If the data either in statement I alone or statement II alone are sufficient to determine the answer."
    },
    {
      "question": "The question is followed by two statements numbered I and II. You must decide whether the data provided in the statements is sufficient to answer the question. Question: How many employees does Company X have? Statements: I. Company X has five departments, each with 50 employees. II. Company X's average number of employees per department is 40.",
      "options": ["If the data in statement I alone is sufficient to determine the answer.", "If the data either in statement I alone or statement II alone are sufficient to determine the answer.", "If the data in both the statements I and II together are insufficient to answer the question.", "If the data in both the statements I and II together are necessary to answer the question."],
      "correctAnswer": "If the data in statement I alone is sufficient to determine the answer."
    },
    {
      "question": "Each question below consists of a question followed by two statements numbered I and II. You have to decide whether the data provided in the statements are sufficient to answer the question Question: In a group of friends, who is the tallest? Statements: I. Jack is taller than Sam but shorter than Mark. II. Mark is shorter than Sarah.",
      "options": ["If the data in statement I alone is sufficient to determine the answer.", "If the data either in statement I alone or statement II alone are sufficient to determine the answer.", "If the data in both the statements I and II together are insufficient to answer the question.", "If the data in both the statements I and II together are necessary to answer the question."],
      "correctAnswer": "If the data in both the statements I and II together are necessary to answer the question."
    },
    {
      "question": "Each question below consists of a question followed by two statements numbered I and II. You have to decide whether the data provided in the statements are sufficient to answer the question Question: What is the total number of students in the class? Statements: I. There are 25 boys in the class. II. The ratio of boys to girls is 2:1.",
      "options": ["If the data in statement I alone is sufficient to determine the answer.", "If the data either in statement I alone or statement II alone are sufficient to determine the answer.", "If the data in both the statements I and II together are insufficient to answer the question.", "If the data in both the statements I and II together are necessary to answer the question."],
      "correctAnswer": "If the data in both the statements I and II together are necessary to answer the question."
    },
    {
      "question": "Each question below consists of a question followed by two statements numbered I and II. You have to decide whether the data provided in the statements are sufficient to answer the question Question: How many siblings does Tom have? Statements: I. Tom has two sisters. II. Each of Tom's sisters has one brother.",
      "options": ["If the data in statement I alone is sufficient to determine the answer.", "If the data either in statement I alone or statement II alone are sufficient to determine the answer.", "If the data in both the statements I and II together are insufficient to answer the question.", "If the data in both the statements I and II together are necessary to answer the question."],
      "correctAnswer": "If the data in both the statements I and II together are necessary to answer the question."
    },
    {
      "question": "If the cost of 5 pens is $30, what is the price of 8 pens?",
      "options": ["$40", "$48", "$50", "$64"],
      "correctAnswer": "$48"
    },
    {
      "question": "What is the probability of drawing a red ball at random if a box contains 12 red balls and 8 green balls?",
      "options": ["3/5", "2/5", "1/3", "2/3"],
      "correctAnswer": "3/5"
    },
    {
      "question": "If the sum of three consecutive odd numbers is 63, what is the largest number?",
      "options": ["21", "23", "25", "27"],
      "correctAnswer": "23"
    },
    {
      "question": "If the average of six numbers is 18, and three of the numbers are 15, 20, and 25, what is the average of the remaining three numbers?",
      "options": ["16", "18", "20", "22"],
      "correctAnswer": "16"
    },
    {
      "question": "Who among the following world leaders has the highest number of YouTube followers",
      "options": ["Rahul Gandhi", "Narendra Modi", "Shashi Tharoor", "Jair Bolsonaro"],
      "correctAnswer": "Narendra Modi"
    },
    {
      "question": "Which State won the Vijay Hazare Trophy in 2023?",
      "options": ["Rajasthan", "Karnataka", "Haryana", "Tamil Nadu"],
      "correctAnswer": "Haryana"
    },
    {
      "question": "Safest city in India as per the report of National Crime Records Bureau (NCRB), a government agency, 2023",
      "options": ["Kolkata", "Chennai", "Coimbatore", "Surat"],
      "correctAnswer": "Kolkata"
    },
    {
      "question": "Amazonia 1 is an Earth Observation satellite launched by ISRO for the country",
      "options": ["Brazil", "India", "South Africa", "Argentina"],
      "correctAnswer": "Brazil"
    },
    {
      "question": "Who is the new permanent member ofthe G20",
      "options": ["European Union", "NATO", "WHO", "African Union"],
      "correctAnswer": "African Union"
    },
    {
      "question": "Who is known as the Father of Cloning?",
      "options": ["Ian Wilmut", "Keith Campbell", "Colin Tudge", "Roger Highfield"],
      "correctAnswer": "Ian Wilmut"
    },
    {
      "question": "Who inaugurated the 4th National Chilika Birds Festival in 2024?",
      "options": ["Nitish Kumar", "Vishnudeo Sai", "Naveen Patnaik", "Arvind Kejriwal"],
      "correctAnswer": "Naveen Patnaik"
    },
    {
      "question": "What is the interest rate declared by EPFO for the Financial Year 23-2024?",
      "options": ["8 %", "8.5%", "7.5%", "8.25%"],
      "correctAnswer": "8.25%"
    },
    {
      "question": "Which of the following countries is not a member of SAARC?",
      "options": ["India", "Pakistan", "Nepal", "Singapore"],
      "correctAnswer": "Singapore"
    },
    {
      "question": "Lakshmisha Tolpadi has been chosen for which of the following prestigious award in the year 2023?",
      "options": ["Kendra Sahitya Akademi Award", "Sahitya Akademi Translation Prize", "Sangeet NatakAkademi Award", "Vyas Samman"],
      "correctAnswer": "Kendra Sahitya Akademi Award"
    },
    {
      "question": "Allan Border Trophy is related to which of the following sports?",
      "options": ["Tennis", "Cricket", "Football", "Hockey"],
      "correctAnswer": "Cricket"
    },
    {
      "question": "The Indian Railways introduced a Bharat Gaurav Deluxe Tourist Train to showcase the heritage of which state",
      "options": ["Assam", "Goa", "Gujarat", "Punjab"],
      "correctAnswer": "Gujarat"
    },
    {
      "question": "Which Article of the Indian Constitution disqualifies MPs from Lok Sabha or Rajya Sabha?",
      "options": ["Article 101", "Article 102", "Article 103", "Article 104"],
      "correctAnswer": "Article 102"
    },
    {
      "question": "Which institution has been granted a patent for creating and manufacturing a “reusable straw”?",
      "options": ["BSI", "ASI", "Start-up mission", "CCI"],
      "correctAnswer": "BSI"
    },
    {
      "question": "Which state/UT received a Geographical Indication tag for ‘Sea Buckthorn’?",
      "options": ["Kerala", "Goa", "Ladakh", "Tamilnadu"],
      "correctAnswer": "Ladakh"
    },
    {
      "question": "Which country’s Prime Minister was granted the ‘Grand Cross of the Order of Honour’ by Greece in 2023?",
      "options": ["China", "Bangladesh", "Brazil", "None of the above"],
      "correctAnswer": "None of the above"
    },
    {
      "question": "Which institution implements and administers the Advance Authorization Scheme?",
      "options": ["SEBI", "RBI", "NABARD", "DGFT"],
      "correctAnswer": "DGFT"
    },
    {
      "question": "Which is the only state in India that produces diamonds?",
      "options": ["West Bengal", "Punjab", "Madhya Pradesh", "Bihar"],
      "correctAnswer": "Madhya Pradesh"
    },
    {
      "question": "Which among the following agricultural products is India’s main import item?",
      "options": ["Pulses", "Oil seeds", "Edible Oils", "Sugar"],
      "correctAnswer": "Edible Oils"
    },
    {
      "question": "What is an infrastructure project developed on an empty site?",
      "options": ["Yellow Field Project", "Whitefield Project", "Greenfield Project", "Redfield Project"],
      "correctAnswer": "Greenfield Project"
    },
    {
      "question": "What is India’s rank in coal production worldwide?",
      "options": ["3", "5", "7", "2"],
      "correctAnswer": "2"
    },
    {
      "question": "Which of the following is another name for the Hard Disk Drive?",
      "options": ["Winchester Drive", "Thin Film Drive", "SSD", "AMD"],
      "correctAnswer": "Winchester Drive"
    },
    {
      "question": "The most advanced form Of Read Only Memory (ROM) is:",
      "options": ["Cache Memory", "PROM", "PROME", "EEPROM"],
      "correctAnswer": "EEPROM"
    },
    {
      "question": "Christ the Redeemer’s statue is a landmark monument in which country?",
      "options": ["USA", "Canada", "Brazil", "Italy"],
      "correctAnswer": "Brazil"
    },
    {
      "question": "Avangkhu is India’s first village on the border of which country?",
      "options": ["Pakistan", "China", "Nepal", "Myanmar"],
      "correctAnswer": "Myanmar"
    },
    {
      "question": "Which institution introduced the ‘Global Greenhouse Gas Monitoring Infrastructure’?",
      "options": ["WHO", "WMO", "IMF", "WEF"],
      "correctAnswer": "WMO"
    },
    {
      "question": "Kishtwar High Altitude National Park is in which state/UT?",
      "options": ["Jammu and Kashmir", "Sikkim", "Meghalaya", "Assam"],
      "correctAnswer": "Jammu and Kashmir"
    },
    {
      "question": "Calcium is required in plants in the formation of which of the following",
      "options": ["Cell Membrane", "Cell wall", "Chlorophyll", "None of the above"],
      "correctAnswer": "Cell wall"
    },
    {
      "question": "Which of the following functions is performed by the kidneys in the human body?",
      "options": ["Digestion", "Reproduction", "Excretion", "None of the above"],
      "correctAnswer": "Excretion"
    },
    {
      "question": "Which of the following factors affect the Surface Tension?",
      "options": ["Nature of liquid", "Area of Surface", "Both A and B", "None of the above"],
      "correctAnswer": "Both A and B"
    },
    {
      "question": "The presence of which among the following minerals in Banana makes them slightly radioactive?",
      "options": ["Sodium", "Magnesium", "Potassium", "Protium"],
      "correctAnswer": "Potassium"
    },
    {
      "question": "Who among the following said about Raja Rammohan Roy that he is “the human link between the unfading past and the dawning future”?",
      "options": ["Nandlal Chatterjee", "Jayaprakash Narayan", "Abdus Samad Khan", "Dr. Rajendra Prasad"],
      "correctAnswer": "Nandlal Chatterjee"
    },
    {
      "question": "Which country has been recently hit by tropical storm Idalia?",
      "options": ["India", "Netherland", "Argentina", "Cuba"],
      "correctAnswer": "Cuba"
    },
    {
      "question": "United Nations Biodiversity has urged people to use which word instead of ‘flora and fauna’?",
      "options": ["Wild", "Fungai", "Alga", "Species"],
      "correctAnswer": "Fungai"
    },
    {
      "question": "Which Indian city is set to launch an innovative disease surveillance dashboard?",
      "options": ["Mumbai", "Indore", "Bhuvneshwar", "Bengaluru"],
      "correctAnswer": "Bengaluru"
    },
    {
      "question": "Who is the author of the book “How to Avoid a Climate Disaster”?",
      "options": ["Mark Zuckerberg", "Bill Gates", "Azim Premji", "Steve Jobs"],
      "correctAnswer": "Bill Gates"
    },
    {
      "question": "Iodine is obtained from which of the following?",
      "options": ["Brown algae", "Blue algae", "Yellow algae", "White algae"],
      "correctAnswer": "Brown algae"
    },
    {
      "question": "Where is the National Institute of Hydrology (NIH) located?",
      "options": ["Jaipur", "New Delhi", "Roorkee", "Manali"],
      "correctAnswer": "Roorkee"
    },
    {
      "question": "Where was the 12th India-Oman ‘Joint Military Cooperation Committee meeting held?",
      "options": ["Dubai", "Muscat", "Mumbai", "Sharjah"],
      "correctAnswer": "Muscat"
    },
    {
      "question": "'One Stop Centre scheme’, recently seen in the news, is formulated by which ministry?",
      "options": ["Ministry of Finance", "Ministry of Higher Education", "Ministry of Sports", "Ministry of Women and Child Development"],
      "correctAnswer": "Ministry of Women and Child Development"
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
      style={{ backgroundImage: "url(/images/mock-bg.webp)" }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/30"></div>

      <h1 className="text-4xl font-bold m-3 text-zinc-700 z-10 text-center">KMAT 24 MOCK TEST</h1>

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
              <h2 className="text-xl font-bold">KMAT24 MOCK TEST</h2>
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

export default Kmat24;
