import * as Yup from "yup";

export const validationSchema = Yup.object({
    firstName: Yup.string().trim().required("Введите имя"),
    lastName: Yup.string().trim().required("Введите фамилию"),
    email: Yup.string().trim().required("Введите почту"),
    oldPassword: Yup.string().trim().when('newPassword', ([newPassword], schema) =>{
        return  newPassword !== undefined &&  newPassword.trim().length > 0 ? 
             schema.trim().required("Введите текущий пароль") : 
             schema.trim()
     }),
    newPassword: Yup.string().trim(),
    repeatedNewPassword: Yup.string().trim().when('newPassword', ([newPassword], schema) =>{
       return  newPassword !== undefined &&  newPassword.trim().length > 0 ? 
            schema.trim().required("Повторите новый пароль") : 
            schema.trim()
    })
})