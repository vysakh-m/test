import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import Questions from "./Questions";
import Result from "./Result";
import UserDetails from "./UserDetails";

import Container from "../../Container";

const Attempt = ({ location, history }) => {
  const [quizData, setQuizData] = useState({});
  const [showQuiz, setShowQuiz] = useState(false);
  const [attemptId, setAttemptId] = useState("");
  const [submittedStatus, setSubmittedStatus] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    if (location?.state?.data) {
      setQuizData(location.state.data);
    } else {
      history.push(`/public/${slug}`);
    }
  }, []);
  useEffect(() => {
    if (submittedStatus) {
      history.push({
        pathname: `/public/${slug}/attempt/result`,
        state: { attemptId },
      });
    }
  }, [submittedStatus]);
  return (
    <Container>
      <div className="p-10">
        {quizData?.quiz &&
          (showQuiz ? (
            submittedStatus ? (
              <Result
                title={quizData.quiz.title}
                questions={quizData.questions}
                attemptId={attemptId}
              />
            ) : (
              <Questions
                questions={quizData.questions}
                title={quizData.quiz.title}
                attemptId={attemptId}
                setSubmittedStatus={setSubmittedStatus}
              />
            )
          ) : (
            <UserDetails
              title={quizData.quiz.title}
              quizId={quizData.quiz.id}
              setShowQuiz={setShowQuiz}
              setAttemptId={setAttemptId}
              setSubmittedStatus={setSubmittedStatus}
            />
          ))}
      </div>
    </Container>
  );
};

export default Attempt;
