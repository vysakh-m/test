import * as yup from "yup";

export const INITIAL_LOGIN_VALUES = {
  email: "",
  password: "",
};

export const LOGIN_VALIDATION_SCHEMA = yup.object({
  email: yup.string().email("Invalid Email").required("Email is required"),
  password: yup.string().required("Password is required"),
});
