import React, { useState } from "react";

import { Typography, Button } from "neetoui";

import publicApi from "apis/public";

import Question from "./Question";

const Questions = ({ questions, title, attemptId, setSubmittedStatus }) => {
  const [answers, setAnswers] = useState([]);
  const onOptionChange = (questionId, e) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    const results = Object.entries(answers).map(entry => ({
      attempt_id: attemptId,
      question_id: entry[0],
      answer: entry[1],
    }));
    try {
      await publicApi.updateAttempt({
        id: attemptId,
        payload: {
          attempt: { submitted: true, attempt_answers_attributes: results },
        },
      });
      setSubmittedStatus(true);
    } catch (error) {
      logger.error(error);
    }
  };
  return (
    <div className="space-y-10 pt-10">
      <Typography style="h2" className="font-extrabold neeto-ui-text-gray-600">
        {title}
      </Typography>
      <div className="space-y-6">
        {questions.map((question, index) => (
          <Question
            key={index}
            question={question}
            count={index + 1}
            onOptionChange={onOptionChange}
          />
        ))}
      </div>
      <Button
        className="ml-32"
        style="primary"
        label="Submit"
        size="large"
        onClick={handleSubmit}
      />
    </div>
  );
};

export default Questions;
