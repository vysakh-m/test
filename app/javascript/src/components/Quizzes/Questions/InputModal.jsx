import React from "react";

import { Form, Formik } from "formik";
import { Typography, Modal, Button } from "neetoui";
import { Input, Select } from "neetoui/formik";

import { QUESTION_VALIDATION_SCHEMA } from "./constants";
import OptionsField from "./OptionsField";

const InputModal = ({
  showInputModal,
  setShowInputModal,
  initialValues,
  handleSubmit,
  title,
  buttonLabel,
}) => (
  <Modal
    isOpen={showInputModal}
    onClose={() => setShowInputModal(false)}
    size="md"
    className="p-8"
  >
    <Modal.Header className="text-center">
      <Typography style="h3">{title}</Typography>
    </Modal.Header>
    <Formik
      initialValues={initialValues}
      validationSchema={QUESTION_VALIDATION_SCHEMA}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values, setFieldValue, handleChange }) => (
        <Form>
          <Modal.Body className="space-y-4">
            <div className="space-y-2">
              <Typography style="h5">Question</Typography>
              <Input
                size="large"
                placeholder="Maximum of 100 characters"
                name="title"
              />
            </div>
            <div className="space-y-2">
              <Typography style="h5">Options</Typography>
              <OptionsField
                values={values}
                setFieldValue={setFieldValue}
                handleChange={handleChange}
              />
            </div>
            <Select
              placeholder="Select correct answer"
              name="answer"
              options={values.option
                .filter(option => option.value !== "")
                .map(option => ({
                  label: option.value,
                  value: option.value,
                }))}
              className="bg-white"
            />
          </Modal.Body>
          <Modal.Footer className="space-x-2">
            <Button size="large" label={buttonLabel} type="submit" />
            <Button
              style="text"
              size="large"
              label="Cancel"
              onClick={() => setShowInputModal(false)}
            />
          </Modal.Footer>
        </Form>
      )}
    </Formik>
  </Modal>
);

export default InputModal;
