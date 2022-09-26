import * as yup from "yup";

export const QUESTION_VALIDATION_SCHEMA = yup.object().shape({
  title: yup
    .string()
    .required("Question is required")
    .max(100, "Must not exceed 100 characters"),
  option: yup.array().of(
    yup.object().shape({
      value: yup
        .string()
        .required("Field is required")
        .max(25, "Must not exceed 25 characters"),
    })
  ),
  answer: yup.object().nullable().required("Answer is required"),
});

export const QUESTION_INITIAL_VALUE = {
  title: "",
  option: [{ value: "" }, { value: "" }],
  answer: "",
};
