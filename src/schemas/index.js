// An external yup schema created for '05ValidationUsingFormik'

import * as Yup from 'yup';

export const validationSchemaUsingYup = Yup.object({
    firstName: Yup.string().required("First Name is Required").min(2, "Atleast two characters are required.").max(25,"Too many characters"),
    lastName: Yup.string().required("Last Name is Required").min(2, "Atleast two characters are required.").max(25,"Too many characters"),
    email: Yup.string().required("Email is Required").email("Invalid Email format").matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Invalid Email format"),
    phoneNumber: Yup.string().required("Phone Number is Required").matches(/^\d{10}$/, "Phone Number must be 10 digits and number"),
    password: Yup.string().required("Password is Required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[!@#$%^&*()_+{}<>?:"]/, "password must contain atleast one symbol")
    .matches(/[0-9]/, "password must contain atleast one number")
    .matches(/[A-Z]/, "password must contain atleast one uppercase")
    .matches(/[a-z]/, "password must contain atleast one lowercase"),
    confirmPassword: Yup.string().required("Confirm Password is Required").oneOf([Yup.ref("password")], "password must match"),
    age: Yup.number().typeError("Age must be a number")
    .min(18, "Your age must be at least 18 years old")
    .max(100, "Your age cannot be older than 100 years")
    .required("Age is required"),
    gender: Yup.string().required("Gender is required"),
    birthDate:Yup.date().required("Date of birth is required"),
    coding: Yup.boolean(),
    reading: Yup.boolean(),
    sports: Yup.boolean(),
})