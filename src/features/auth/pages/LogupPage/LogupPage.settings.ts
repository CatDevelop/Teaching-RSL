import * as Yup from "yup";

export const schema = Yup.object({
    name:Yup.string().nullable().required('Введите имя'),
    surname:Yup.string().nullable().required('Введите фамилию'),
    email: Yup.string().nullable().required('Введите почту'),
    password: Yup.string().nullable().required('Введите пароль'),
    confirmPassword: Yup.string().nullable().required("Повторите пароль").oneOf([Yup.ref('password')], 'Пароли не совпадают')
});