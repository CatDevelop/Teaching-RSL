import * as Yup from "yup";

export const schema = Yup.object({
    email: Yup.string().nullable().required('Enter your email'),
    password: Yup.string().nullable().required('Enter password'),
});
