import React, { FC } from "react";
import { typedMemo } from "../../../../core/utils/typedMemo";
import styles from "./LoginPage.module.css";
import { SocialBlock } from "../../components/SocialBlock";
import { AuthFormPage } from "../../components/AuthFormPage";
import { Typography } from "../../../../components/Typography";
import { Input } from "../../../../components/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./LoginPage.settings";
import { Button } from "../../../../components/Button";
import { FormLink } from "../../components/FormLink";

type LoginTemp = {
    email: string;
    password:string;
}

export const LoginPage: FC = typedMemo(function LoginPage(){
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginTemp>({resolver: yupResolver(schema)})
    
    const onSubmit = () =>{}
    
    return (
        <AuthFormPage>
            <Typography variant="h3">Вход</Typography>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.loginPage__form}>
                <Input label="Почта"/>
                <Input label="Пароль"/>
                <Button color="primary" type="submit">
                    Войти
                </Button>
            </form>
            <SocialBlock 
                label="Или войти с помощью"
                onVKClick={() => {}}
                onYandexClick={() => {}}
            />
            <div className={styles.loginPage__links}>
                <FormLink 
                    label="Забыли пароль?"
                    linkText="Восстановить"
                    linkUrl="/restorepassword"
                />
                <FormLink 
                    label="У вас еще нет аккаунта?"
                    linkText="Зарегистрироваться"
                    linkUrl="/signup"
                />
            </div>
        </AuthFormPage>
    )
})