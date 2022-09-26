import React, { useState, useEffect } from "react";

import { Plus, CheckCircle, Copy } from "neetoicons";
import { Button, Typography, PageLoader, Toastr } from "neetoui";
import { useParams } from "react-router-dom";

import questionApi from "apis/questions";
import quizApi from "apis/quizzes";

import Questions from "./Questions";
import { QUESTION_INITIAL_VALUE } from "./Questions/constants";
import InputModal from "./Questions/InputModal";
import { assignAnswerStatus } from "./Questions/questions.helper";

import EmptyData from "../Common/EmptyData";
import Container from "../Container";

const Show = () => {
  const [questions, setQuestions] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showInputModal, setShowInputModal] = useState(false);
  const [quiz, setQuiz] = useState({});
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const { data } = await quizApi.show(id);
      setQuiz({ slug: data.quiz.slug, title: data.quiz.title });
      setQuestions(data.questions);
    } catch (error) {
      logger.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async values => {
    setIsLoading(true);
    const finalOptions = assignAnswerStatus(values);
    const payload = {
      title: values.title,
      options_attributes: finalOptions,
      quiz_id: id,
    };
    try {
      await questionApi.create({ question: payload });
      setShowInputModal(false);
      fetchData();
    } catch (error) {
      logger.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePublish = async () => {
    setIsLoading(true);
    try {
      await quizApi.update({
        id,
        payload: {
          quiz: { publish: true },
        },
      });
      fetchData();
    } catch (error) {
      logger.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const url = `${window.origin}/public/${quiz.slug}`;
  const onCopy = () => {
    navigator.clipboard.writeText(url);
    Toastr.success("Copied to clipboard");
  };
  return (
    <Container>
      {isLoading ? (
        <div className="h-below-nav">
          <PageLoader />
        </div>
      ) : (
        <div className="w-full p-10 text-center">
          <div className="flex justify-between">
            <Typography
              className="font-extrabold neeto-ui-text-gray-600"
              style="h2"
            >
              {quiz.title}
            </Typography>
            <div className="space-x-4">
              <Button
                label="Add Question"
                size="large"
                icon={Plus}
                iconPosition="left"
                onClick={() => setShowInputModal(true)}
              />
              {questions.length > 0 &&
                (quiz.slug === null ? (
                  <Button
                    label="Publish"
                    size="large"
                    onClick={handlePublish}
                  />
                ) : (
                  <Button label="Published" size="large" disabled />
                ))}
            </div>
          </div>
          {quiz.slug !== null && (
            <div className="text-left pt-3 flex items-center space-x-1">
              <CheckCircle size={16} color="green" />
              <Typography style="h5">
                Published, your public link is -
              </Typography>
              <a href={url}>{url}</a>
              <Copy
                size={16}
                className="cursor-pointer hover:text-gray-600"
                onClick={onCopy}
              />
            </div>
          )}

          {questions.length === 0 ? (
            <EmptyData description="There are no questions in this quiz." />
          ) : (
            <Questions
              questions={questions}
              fetchData={fetchData}
              setIsLoading={setIsLoading}
            />
          )}
          <InputModal
            showInputModal={showInputModal}
            setShowInputModal={setShowInputModal}
            initialValues={QUESTION_INITIAL_VALUE}
            handleSubmit={handleSubmit}
            title="Add new question"
            buttonLabel="Submit"
          />
        </div>
      )}
    </Container>
  );
};

export default Show;
