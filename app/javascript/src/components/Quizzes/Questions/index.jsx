import React from "react";

import Question from "./Question";

const Questions = ({ questions, fetchData, setIsLoading }) => (
  <div className="space-y-10 pt-10">
    {questions.map((question, index) => (
      <Question
        key={index}
        question={question}
        count={index + 1}
        fetchData={fetchData}
        setIsLoading={setIsLoading}
      />
    ))}
  </div>
);

export default Questions;
