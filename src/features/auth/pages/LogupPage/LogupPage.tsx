import React, { FC } from "react";
import { typedMemo } from "../../../../core/utils/typedMemo";
import styles from "./LogupPage.module.css";
import { AuthFormPage } from "../../components/AuthFormPage";
import { Typography } from "../../../../components/Typography";
import { Input } from "../../../../components/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./LogupPage.settings";
import { Button } from "../../../../components/Button";
import { SocialBlock } from "../../components/SocialBlock";
import { FormLink } from "../../components/FormLink";

type LogupTemp = {
    email: string;
    password:string;
    repeatPassword:string;
}

export const LogupPage: FC = typedMemo(function LogupPage(){
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LogupTemp>({resolver: yupResolver(schema)})
    
    const onSubmit = () =>{}

    return (
        <AuthFormPage>
            <Typography variant="h3">Новый аккаунт</Typography>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.logupPage__form}>
                <Input 
                    label="Почта"
                    isInvalid={errors.email !== undefined}
                    color={errors.email !== undefined ? "danger" : "default"}
                    errorMessage={errors.email?.message}
                    {...register('email')}
                />
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
                    Создать аккаунт
                </Button>
            </form>
            <SocialBlock 
                onVKClick={() => {}}
                onYandexClick={() => {}}
                label="Или создать аккаунт с помощью"
            />
            <FormLink 
                className={styles.logupPage__link}
                label="У вас уже есть аккаунт?"
                linkText="Войти"
                linkUrl="/signin"
            />
        </AuthFormPage>
    )
})