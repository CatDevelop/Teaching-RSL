import { typedMemo } from "../../../../../../core/utils/typedMemo";
import React, { FC } from "react";
import styles from "./LoginForm.module.css";
import { Typography } from "../../../../../../components/Typography";
import { Input } from "../../../../../../components/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./LoginForm.settings";
import { Button } from "../../../../../../components/Button";
import { SocialBlock } from "../../../../components/SocialBlock"
import { FormLink } from "../../../../components/FormLink";

type Props = Readonly<{
    
}>

type LoginTemp = {
    email: string;
    password:string;
}

export const LoginForm:FC<Props> = typedMemo(function LoginForm(props){
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginTemp>({resolver: yupResolver(schema)})
    
    const onSubmit = () =>{}
    
    return (
        <div className={styles.loginForm}>
            <Typography variant="h3">Вход</Typography>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm__form}>
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
            <div className={styles.loginForm__links}>
                <FormLink 
                    label="Забыли пароль?"
                    linkText="Восстановить"
                    linkUrl="/reset"
                />
                <FormLink 
                    label="У вас еще нет аккаунта?"
                    linkText="Зарегистрироваться"
                    linkUrl="/signup"
                />
            </div>
        </div>
    )
})