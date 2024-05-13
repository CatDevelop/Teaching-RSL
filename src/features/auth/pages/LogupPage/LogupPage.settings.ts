import * as Yup from "yup";

export const schema = Yup.object({
    name:Yup.string().nullable().required('Enter name'),
    surname:Yup.string().nullable().required('Enter surname'),
    email: Yup.string().nullable().required('Enter your email'),
    password: Yup.string().nullable().required('Enter password'),
    confirmPassword: Yup.string().nullable().required("Repeat password").oneOf([Yup.ref('password')], 'Password mismatch')
});