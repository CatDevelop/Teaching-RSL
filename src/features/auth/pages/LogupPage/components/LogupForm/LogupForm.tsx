import { typedMemo } from "../../../../../../core/utils/typedMemo";
import React, { FC } from "react";
import styles from "./LogupForm.module.css";
import { Typography } from "../../../../../../components/Typography";
import { Input } from "../../../../../../components/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./LogupForm.settings";
import { Button } from "../../../../../../components/Button";
import { SocialBlock } from "../../../../components/SocialBlock";
import { FormLink } from "../../../../components/FormLink";

type Props = Readonly<{
    
}>

type LogupTemp = {
    email: string;
    password:string;
    repeatPassword:string;
}

export const LogupForm:FC<Props> = typedMemo(function LogupForm(props){
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LogupTemp>({resolver: yupResolver(schema)})
    
    const onSubmit = () =>{}
    
    return (
        <div className={styles.logupForm}>
            <Typography variant="h3">Новый аккаунт</Typography>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.logupForm__form}>
                <Input label="Почта"/>
                <Input label="Пароль"/>
                <Input label="Повторите пароль"/>
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
                className={styles.logupForm__link}
                label="У вас уже есть аккаунт?"
                linkText="Войти"
                linkUrl="/signin"
            />
        </div>
    )
})