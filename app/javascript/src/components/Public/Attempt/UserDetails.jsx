import React from "react";

import { Form, Formik } from "formik";
import { RightArrowCircle } from "neetoicons";
import { Typography, Button } from "neetoui";
import { Input } from "neetoui/formik";

import publicApi from "apis/public";

import { INITIAL_USER_VALUE, USER_VALIDATION_SCHEMA } from "./constants";

const UserDetails = ({
  title,
  quizId,
  setShowQuiz,
  setAttemptId,
  setSubmittedStatus,
}) => {
  const handleSubmit = async values => {
    try {
      const { data } = await publicApi.createUser({
        user: {
          first_name: values.firstName,
          last_name: values.lastName,
          email: values.email,
          quiz_id: quizId,
        },
      });
      setAttemptId(data.id);
      setSubmittedStatus(data.submitted);
      setShowQuiz(true);
    } catch (error) {
      logger.error(error);
    }
  };
  return (
    <div className="flex w-full justify-center my-16">
      <Formik
        initialValues={INITIAL_USER_VALUE}
        validationSchema={USER_VALIDATION_SCHEMA}
        onSubmit={handleSubmit}
      >
        {() => (
          <div className="w-1/3 text-center">
            <Form>
              <div className="space-y-10">
                <Typography style="h2">Welcome to {title} quiz</Typography>
                <div className="space-y-4">
                  <Input
                    label="First name"
                    size="large"
                    name="firstName"
                    placeholder="Eve"
                  />
                  <Input
                    label="Last name"
                    size="large"
                    name="lastName"
                    placeholder="Smith"
                  />
                  <Input
                    label="Email"
                    size="large"
                    name="email"
                    placeholder="eve@example.com"
                  />
                </div>
                <div className="text-right">
                  <Button
                    label="Next"
                    style="primary"
                    size="large"
                    icon={RightArrowCircle}
                    type="submit"
                  />
                </div>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default UserDetails;
