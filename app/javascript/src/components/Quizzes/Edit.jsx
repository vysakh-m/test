import React, { useEffect, useState } from "react";

import { PageLoader } from "neetoui";
import { useParams } from "react-router-dom";

import quizApi from "apis/quizzes";

import Title from "./Form/Title";

import Container from "../Container";

const Edit = ({ history }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const response = await quizApi.show(id);
      setTitle(response.data.quiz.title);
    } catch (error) {
      logger.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async ({ title }) => {
    setIsLoading(true);
    try {
      await quizApi.update({
        id,
        payload: {
          quiz: { title },
        },
      });
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
          description="Edit quiz name"
          initialValue={title}
          handleSubmit={handleSubmit}
          buttonLabel="Update"
        />
      )}
    </Container>
  );
};

export default Edit;
