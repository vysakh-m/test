import React, { useState } from "react";

import { PageLoader } from "neetoui";

import quizApi from "apis/quizzes";

import Title from "./Form/Title";

import Container from "../Container";

const Create = ({ history }) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async ({ title }) => {
    setIsLoading(true);
    try {
      await quizApi.create({ quiz: { title } });
      setIsLoading(false);
      history.push("/");
    } catch (error) {
      setIsLoading(false);
      logger.error(error);
    }
  };
  return (
    <Container>
      {isLoading ? (
        <div className="h-below-nav">
          <PageLoader />
        </div>
      ) : (
        <Title
          description="Add new quiz"
          handleSubmit={handleSubmit}
          initialValue=""
          buttonLabel="Submit"
        />
      )}
    </Container>
  );
};

export default Create;
