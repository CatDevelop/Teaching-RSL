import { useForm } from "react-hook-form";
import { Typography } from "../../../../components/Typography";
import { typedMemo } from "../../../../core/utils/typedMemo";
import { AuthFormPage } from "../../components/AuthFormPage";
import React, { FC } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../../../../components/Input";
import { Button } from "../../../../components/Button";
import { schema } from "./RestorePasswordPage.settings";
import { FormLink } from "../../components/FormLink";
import styles from "./RestorePasswordPage.module.css";

type RestorePasswordTemp = {
    email: string;
}

/**
 * Страница восстановления пароля
 */
export const RestorePasswordPage: FC = typedMemo(function RestorePasswordPage(){
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RestorePasswordTemp>({resolver: yupResolver(schema)})
    
    const onSubmit = () =>{}

    return (
        <AuthFormPage>
            <Typography variant="h3">Password restore</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input 
                    label="Email"
                    isInvalid={errors.email !== undefined}
                    color={errors.email !== undefined ? "danger" : "default"}
                    errorMessage={errors.email?.message}
                    {...register('email')}
                />
                <Button color="primary" type="submit">
                    Send a letter
                </Button>
            </form>
            <FormLink 
                className={styles.resetPasswordPage__link}
                linkText="Login to account"
                linkUrl="/signin"
            />
        </AuthFormPage>
    )
})