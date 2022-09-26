import * as yup from "yup";

export const INITIAL_USER_VALUE = {
  firstName: "",
  lastName: "",
  email: "",
};

export const USER_VALIDATION_SCHEMA = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid Email").required("Email is required"),
});
