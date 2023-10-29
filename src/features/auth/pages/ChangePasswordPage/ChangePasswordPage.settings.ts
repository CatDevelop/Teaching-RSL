import * as Yup from "yup";

export const schema = Yup.object({
    password: Yup.string().nullable().required('Введите пароль'),
    repeatPassword: Yup.string().nullable().required('Повторите пароль'),
});
