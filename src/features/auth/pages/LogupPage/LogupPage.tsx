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
import {ReactComponent as VK} from "../../../../assets/images/VK.svg";
import {ReactComponent as Yandex} from "../../../../assets/images/Yandex.svg";
import { RegisterUserRequest } from "core/models/auth/RegisterUserRequest";
import { useMutation } from "react-query";
import { UserService } from "api/services/user";
import { useDispatch } from "react-redux"
import { login } from "../../../../store/auth/authSlice";

/**
 * Страница регистрации
 */
export const LogupPage: FC = typedMemo(function LogupPage(){
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterUserRequest>({resolver: yupResolver<RegisterUserRequest>(schema)})

    const dispatch = useDispatch();

    const {isLoading: isFetching, mutate: logup} = useMutation('auth/register', UserService.register, {
        onSuccess: () => {
            dispatch(login())
        }
    })

    const onSubmit = (form: RegisterUserRequest) => {
        logup(form);
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
            <Typography variant="h3">New account</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    label="Name"
                    isInvalid={errors.name !== undefined}
                    color={errors.name !== undefined ? "danger" : "default"}
                    errorMessage={errors.name?.message}
                    {...register('name')}
                />
                <Input
                    label="Surname"
                    isInvalid={errors.surname !== undefined}
                    color={errors.surname !== undefined ? "danger" : "default"}
                    errorMessage={errors.surname?.message}
                    {...register('surname')}
                />
                <Input
                    label="Email"
                    isInvalid={errors.email !== undefined}
                    color={errors.email !== undefined ? "danger" : "default"}
                    errorMessage={errors.email?.message}
                    {...register('email')}
                />
                <Input
                    label="Password"
                    type="password"
                    isInvalid={errors.password !== undefined}
                    color={errors.password !== undefined ? "danger" : "default"}
                    errorMessage={errors.password?.message}
                    {...register('password')}
                />
                <Input
                    label="Repeat password"
                    type="password"
                    isInvalid={errors.confirmPassword !== undefined}
                    color={errors.confirmPassword !== undefined ? "danger" : "default"}
                    errorMessage={errors.confirmPassword?.message}
                    {...register('confirmPassword')}
                />
                <Button color="primary" type="submit" isLoading={isFetching} isDisabled={isFetching}>
                    Create an account
                </Button>
            </form>
            {/*<SocialBlock*/}
            {/*    label="Или создать аккаунт с помощью"*/}
            {/*    links={socialLinks}*/}
            {/*/>*/}
            <FormLink
                className={styles.logupPage__link}
                label="Already have an account?"
                linkText="Sign in"
                linkUrl="/signin"
            />
        </AuthFormPage>
    )
})
