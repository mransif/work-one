import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";


const MockTest = () => {
  const { getMockQuestions, questions } = useContext(AppContext);

  useEffect(() => {
    getMockQuestions("set3");  // ✅ Load questions for "set3"
  }, []);

  return (
    <div>
      <h1>Mock Test Questions</h1>
      <ul>
        {questions.map((q, index) => (
          <>
            <li key={index}>{q.question}</li>
            <li key={index}>{q.options}</li>
            
          </>
        ))}
      </ul>

    </div>
  );
};

export default MockTest;
