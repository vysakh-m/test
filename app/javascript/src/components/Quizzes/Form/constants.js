import * as yup from "yup";

export const TITLE_VALIDATION_SCHEMA = yup.object({
  title: yup.string().trim().required("Name cannot be blank"),
});
