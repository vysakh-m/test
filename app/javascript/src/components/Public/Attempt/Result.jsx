import React, { useEffect, useState } from "react";

import { Typography, PageLoader } from "neetoui";

import publicApi from "apis/public";

import Question from "./Questions/Question";

import Container from "../../Container";

const Result = ({ location }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    if (location?.state?.attemptId) {
      try {
        const { data } = await publicApi.showAttempt(location.state.attemptId);
        setData(data);
        setIsLoading(false);
      } catch (error) {
        logger.error(error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      {isLoading ? (
        <div className="h-below-nav">
          <PageLoader />
        </div>
      ) : (
        <div className="space-y-10 p-10">
          <Typography
            style="h2"
            className="font-extrabold neeto-ui-text-gray-600"
          >
            {data.quiz.title}
          </Typography>
          <Typography style="h5" className="neeto-ui-text-gray-800">
            Thank you for taking the quiz, here are your results. <br />
            You have submitted {data.attempt.correct_answers_count} correct
            &amp; {data.attempt.incorrect_answers_count} incorrect answers
          </Typography>
          <div className="space-y-6">
            {data.questions.map((question, index) => (
              <Question
                key={index}
                question={question}
                count={index + 1}
                disableOptions={true}
              />
            ))}
          </div>
        </div>
      )}
    </Container>
  );
};

export default Result;
