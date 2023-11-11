import * as Yup from "yup";

export const validationSchema = Yup.object({
    name: Yup.string().trim().required("Введите имя"),
    surname: Yup.string().trim().required("Введите фамилию"),
    email: Yup.string().trim().required("Введите почту"),
    oldPassword: Yup.string().trim().when('newPassword', {
        is: (value?: string) => value !== undefined && value.length > 0,
        then: (schema) => schema.trim().min(1, "Введите текущий пароль"),
        otherwise: (schema) => schema.trim().min(0)
    }),
    newPassword: Yup.string().trim(),
    repeatedNewPassword: Yup.string().trim().when('newPassword', {
        is: (value?: string) => value !== undefined &&  value.length > 0,
        then: (schema) => schema.trim().min(1, "Введите текущий пароль"),
        otherwise: (schema) => schema.trim().min(0)
    })
})