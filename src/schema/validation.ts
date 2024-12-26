import * as yup from "yup";
import { isValidPhoneNumber } from "libphonenumber-js";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;

export const SignUpSchema = yup.object().shape({
  fullname: yup
    .string()
    .required("Full Name is required")
    .min(3, "Full Name must be at least 3 characters")
    .test("is-full-name", "Full Name is required", (value: any) => {
      return value && value.trim().split(" ").length >= 2;
    }),
  email: yup.string().email("Invalid email address").required("Email is required"),
  password: yup.string().required("Password is required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Please confirm your new password"),
});

export const SignInSchema = yup.object().shape({
  email: yup.string().email("Invalid email address").required("Email is required"),
  password: yup.string().required("Password is required"),
  rememberMe: yup.boolean().optional(),
});

export const PasswordSchema = yup.object().shape({
  otpValue: yup
    .string()
    .matches(/^\d{4}$/, "OTP must be a 4-digit number")
    .required("OTP is required"),
  new_password: yup
    .string()
    .min(8, "New password must be at least 8 characters")
    .matches(
      passwordRegex,
      "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character"
    )
    .required("Password is required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("new_password"), undefined], "Passwords must match")
    .required("Please confirm your new password"),
});

export const ProfileSchema = yup.object().shape({
  name: yup.string().required("Title is required"),
  email: yup.string().email("Invalid email address").required("Email Address is required"),
  phone_number: yup
    .string()
    .test(
      "is-valid-phone",
      "Please enter a valid phone number",
      (value) => isValidPhoneNumber(value!, "NG") // Validate if it's a valid Nigerian phone number
    )
    .required("Phone Number is required"),
  location: yup.string().required("Location is required"),
  old_password: yup.string().required("Password is required"),
  new_password: yup
    .string()
    .min(8, "New password must be at least 8 characters")
    .matches(
      passwordRegex,
      "New password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character"
    ),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Please confirm your new password"),
});

export const ProfilePasswordSchema = yup.object().shape({
  old_password: yup.string().required("Password is required"),
  new_password: yup
    .string()
    .min(8, "New password must be at least 8 characters")
    .matches(
      passwordRegex,
      "New password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character"
    )
    .required("New password is required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("new_password"), undefined], "Passwords must match")
    .required("Please confirm your new password"),
});
