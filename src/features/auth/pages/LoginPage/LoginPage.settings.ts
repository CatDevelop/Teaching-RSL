import * as Yup from "yup";

export const schema = Yup.object({
    email: Yup.string().nullable().required('Введите почту'),
    password: Yup.string().nullable().required('Введите пароль'),
});
