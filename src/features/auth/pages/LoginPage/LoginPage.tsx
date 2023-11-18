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
import VK from "../../../../assets/images/VK.svg"
import Yandex from "../../../../assets/images/Yandex.svg"
import { useDispatch } from "react-redux";
import { useMutation } from "react-query";
import { UserService } from "api/services/user";
import { login as loginDispatch } from "store/auth/authSlice";
import { LoginUserRequest } from "core/models/auth/LoginUserRequest";

/**
 * Страница входа
 */
export const LoginPage: FC = typedMemo(function LoginPage(){
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginUserRequest>({resolver: yupResolver(schema)})

    const dispatch = useDispatch();

    const {isLoading: isFetching, mutate: login} = useMutation('auth/login', UserService.login, {
        onSuccess: () => {
            dispatch(loginDispatch())
        }
    })

    const onSubmit = (form: LoginUserRequest) => {
        login(form);
    }

    const socialLinks = [
        {
            label: "Вконтакте",
            icon: VK,
            onClick: () => {}
        },
        {
            label: "Яндекс",
            icon: Yandex,
            onClick: () => {}
        }
    ]

    return (
        <AuthFormPage>
            <Typography variant="h3">Вход</Typography>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.loginPage__form}>
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
                <Button 
                    color="primary" 
                    type="submit" 
                    onClick={handleSubmit(onSubmit)}
                    isLoading={isFetching}
                    isDisabled={isFetching}
                >
                    Войти
                </Button>
            </form>
            <SocialBlock
                label="Или войти с помощью"
                links={socialLinks}
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
