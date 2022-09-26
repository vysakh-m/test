import React from "react";

import { Form, Formik } from "formik";
import { Typography, Button } from "neetoui";
import { Input } from "neetoui/formik";

import { TITLE_VALIDATION_SCHEMA } from "./constants";

const Title = ({ description, handleSubmit, initialValue, buttonLabel }) => (
  <div className="p-10">
    <Typography style="h1">{description}</Typography>
    <div className="flex justify-start pt-10 space-x-12">
      <Typography className="mt-1 neeto-ui-text-gray-600" style="h4">
        Quiz Name
      </Typography>
      <Formik
        initialValues={{ title: initialValue }}
        validationSchema={TITLE_VALIDATION_SCHEMA}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <div className="flex flex-col items-start	space-y-4">
              <Input
                name="title"
                className="w-64"
                placeholder="(Max 25 characters)"
              />
              <Button type="submit" label={buttonLabel} style="primary" />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  </div>
);

export default Title;
