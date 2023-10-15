import { typedMemo } from "../../../../../../core/utils/typedMemo";
import React, { FC } from "react";
import styles from "./LoginForm.module.css";
import { Typography } from "../../../../../../components/Typography";
import { Input } from "../../../../../../components/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./LoginForm.settings";
import { Button } from "../../../../../../components/Button";

type Props = Readonly<{
    
}>

type LoginTemp = {
    email: string;
    password:string;
    repeatPassword:string;
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
            <Typography variant="h3">Новый аккаунт</Typography>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm__login}>
                <Input label="Почта"/>
                <Input label="Пароль"/>
                <Input label="Повторите пароль"/>
                <Button color="primary" type="submit">
                    Создать аккаунт
                </Button>
            </form>
        </div>
    )
})