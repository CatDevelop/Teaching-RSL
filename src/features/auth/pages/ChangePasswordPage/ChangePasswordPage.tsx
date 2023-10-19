import { useForm } from "react-hook-form";
import { Typography } from "../../../../components/Typography";
import { typedMemo } from "../../../../core/utils/typedMemo";
import { AuthFormPage } from "../../components/AuthFormPage";
import React, { FC } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../../../../components/Input";
import { Button } from "../../../../components/Button";
import { schema } from "./ChangePasswordPage.settings";
import { FormLink } from "../../components/FormLink";
import styles from "./ChangePasswordPage.module.css";

type ChangePasswordTemp = {
    password: string;
    repeatPassword: string;
}

export const ChangePasswordPage: FC = typedMemo(function ChangePasswordPage(){
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ChangePasswordTemp>({resolver: yupResolver(schema)})
    
    const onSubmit = () =>{}

    return (
        <AuthFormPage>
            <Typography variant="h3">Смена пароля</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
            <Input 
                    label="Пароль"
                    isInvalid={errors.password !== undefined}
                    color={errors.password !== undefined ? "danger" : "default"}
                    errorMessage={errors.password?.message}
                    {...register('password')}
                />
                <Input 
                    label="Повторите пароль"
                    isInvalid={errors.repeatPassword !== undefined}
                    color={errors.repeatPassword !== undefined ? "danger" : "default"}
                    errorMessage={errors.repeatPassword?.message}
                    {...register('repeatPassword')}
                />
                <Button color="primary" type="submit">
                    Сохранить
                </Button>
            </form>
            <FormLink 
                className={styles.changePasswordPage__link}
                linkText="Войти в аккаунт"
                linkUrl="/signin"
            />
        </AuthFormPage>
    )
})