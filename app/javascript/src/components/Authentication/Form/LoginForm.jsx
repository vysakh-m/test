import React from "react";

import { Form, Formik } from "formik";
import { Button, Typography } from "neetoui";
import { Input } from "neetoui/formik";

import { INITIAL_LOGIN_VALUES, LOGIN_VALIDATION_SCHEMA } from "./constants";

const LoginForm = ({ handleSubmit }) => {
  return (
    <div className="flex items-center justify-center h-below-nav">
      <div className="w-full max-w-md">
        <Typography style="h1" className="text-center font-bold">
          Login
        </Typography>

        <Formik
          initialValues={INITIAL_LOGIN_VALUES}
          validationSchema={LOGIN_VALIDATION_SCHEMA}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <div className="mt-5 space-y-5">
                <Input
                  label="Email"
                  placeholder="sam@example.com"
                  size="large"
                  name="email"
                  type="email"
                />
                <Input
                  label="Password"
                  placeholder="********"
                  size="large"
                  name="password"
                  type="password"
                />
                <Button
                  label="Submit"
                  type="submit"
                  style="primary"
                  size="large"
                  fullWidth
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
