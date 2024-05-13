import * as Yup from "yup";

export const validationSchema = Yup.object({
    firstName: Yup.string().trim().required("Enter name"),
    lastName: Yup.string().trim().required("Enter surname"),
    email: Yup.string().trim().required("Enter your email"),
    oldPassword: Yup.string().trim().when('newPassword', ([newPassword], schema) =>{
        return  newPassword !== undefined &&  newPassword.trim().length > 0 ? 
             schema.trim().required("Enter the current password") :
             schema.trim()
     }),
    newPassword: Yup.string().trim(),
    repeatedNewPassword: Yup.string().trim().when('newPassword', ([newPassword], schema) =>{
       return  newPassword !== undefined &&  newPassword.trim().length > 0 ? 
            schema.trim().required("Repeat new password") :
            schema.trim()
    })
})