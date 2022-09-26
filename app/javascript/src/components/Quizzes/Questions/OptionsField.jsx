import React from "react";

import { FieldArray } from "formik";
import { Plus, Close } from "neetoicons";
import { Button } from "neetoui";
import { Input } from "neetoui/formik";

const OptionsField = ({ values, setFieldValue, handleChange }) => (
  <FieldArray name="option">
    {fieldArrayProps => {
      const {
        form: {
          values: { option },
        },
        remove,
      } = fieldArrayProps;

      const resetField = val => {
        if (val.value === values.answer.value) {
          setFieldValue("answer", "");
        }
      };
      return (
        <>
          {option.map((val, index) => (
            <div key={index}>
              <Input
                name={`option[${index}].value`}
                size="large"
                placeholder={`Option ${index + 1} (Maximum of 25 characters)`}
                onChange={e => {
                  handleChange(e);
                  resetField(val);
                }}
                suffix={
                  index > 1 && (
                    <Close
                      className="text-red-300"
                      size={20}
                      onClick={() => {
                        remove(index);
                        resetField(val);
                      }}
                    />
                  )
                }
              />
            </div>
          ))}
          <Button
            iconPosition="left"
            icon={Plus}
            label="Add option"
            onClick={() => {
              fieldArrayProps.push({ value: "" });
            }}
            style="secondary"
            disabled={values.option.length >= 4}
          />
        </>
      );
    }}
  </FieldArray>
);

export default OptionsField;
