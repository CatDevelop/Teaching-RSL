import * as Yup from "yup";

export const schema = Yup.object({
    email: Yup.string().nullable().required('Введите почту'),
});
