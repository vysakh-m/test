import React, { useState } from "react";

import { useParams } from "react-router-dom";

import questionApi from "apis/questions";

import Option from "./Option";
import Title from "./Title";

import DeleteAlert from "../../DeleteAlert";
import InputModal from "../InputModal";
import { assignAnswerStatus } from "../questions.helper";

const Question = ({ question, count, fetchData, setIsLoading }) => {
  const [showInputModal, setShowInputModal] = useState(false);
  const [initialValue, setInitialValue] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [deleteQuestionId, setDeleteQuestionId] = useState("");
  const { id } = useParams();

  const showEditModal = () => {
    const answer = question.option.filter(item => item.is_answer)[0];
    setInitialValue({
      title: question.title,
      option: question.option,
      answer: { label: answer.value, value: answer.value },
    });
    setShowInputModal(true);
  };

  const showDeleteAlert = id => {
    setDeleteQuestionId(id);
    setShowAlert(true);
  };

  const handleEdit = async values => {
    setIsLoading(true);
    // Find deleted options
    const deletedOptions = initialValue.option.filter(
      ({ id: initialId }) =>
        !values.option.some(({ id: finalId }) => finalId === initialId)
    );
    const deleteInDB = deletedOptions.map(option => ({
      id: option.id,
      _destroy: "1",
    }));
    // Updates answer status
    const finalOptions = assignAnswerStatus(values);
    const payload = {
      title: values.title,
      options_attributes: [...finalOptions, ...deleteInDB],
      quiz_id: id,
    };
    try {
      await questionApi.update({
        id: question.id,
        payload: { question: payload },
      });
      setShowInputModal(false);
      fetchData();
    } catch (error) {
      logger.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    setShowAlert(false);
    try {
      await questionApi.destroy(deleteQuestionId);
      fetchData();
      deleteQuestionId("");
    } catch (error) {
      logger.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="text-left">
        <Title
          title={question.title}
          count={count}
          id={question.id}
          showEditModal={showEditModal}
          showDeleteAlert={showDeleteAlert}
        />
        <Option options={question.option} />
      </div>

      <InputModal
        showInputModal={showInputModal}
        setShowInputModal={setShowInputModal}
        initialValues={initialValue}
        handleSubmit={handleEdit}
        title="Edit question"
        buttonLabel="Update"
      />
      <DeleteAlert
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        deleteMethod={handleDelete}
        type="question"
      />
    </>
  );
};

export default Question;
