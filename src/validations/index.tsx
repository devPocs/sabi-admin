import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required(" Username is Required"),
    password: Yup.string()
      .min(5, "Too Short!")
      .max(50, "Too Long!")
      .required("Password is Required"),
  });