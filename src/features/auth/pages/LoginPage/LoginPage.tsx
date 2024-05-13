import React, {FC} from "react";
import {typedMemo} from "../../../../core/utils/typedMemo";
import styles from "./LoginPage.module.css";
import {AuthFormPage} from "../../components/AuthFormPage";
import {Typography} from "../../../../components/Typography";
import {Input} from "../../../../components/Input";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {schema} from "./LoginPage.settings";
import {Button} from "../../../../components/Button";
import {FormLink} from "../../components/FormLink";
import {useDispatch} from "react-redux";
import {useMutation} from "react-query";
import {UserService} from "api/services/user";
import {login as loginDispatch} from "store/auth/authSlice";
import {LoginUserRequest} from "core/models/auth/LoginUserRequest";
import {toast} from "react-toastify";

/**
 * Страница входа
 */
export const LoginPage: FC = typedMemo(function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<LoginUserRequest>({resolver: yupResolver(schema)})

    const dispatch = useDispatch();

    const {isLoading: isFetching, mutate: login} = useMutation('auth/login', UserService.login, {
        onSuccess: () => {
            dispatch(loginDispatch())
        },
        onError: (error: { response: { data: Object } }) => {
            if ("error_description" in error.response.data && error.response.data.error_description === "invalid_username_or_password")
                toast.error('Wrong email or password!');
            else
                toast.error('Error!');
        }
    })

    const onSubmit = (form: LoginUserRequest) => {
        login(form);
    }

    return (
        <AuthFormPage>
            <Typography variant="h3">Sign in</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                <Button
                    color="primary"
                    type="submit"
                    onClick={handleSubmit(onSubmit)}
                    isLoading={isFetching}
                    isDisabled={isFetching}
                >
                    Sign in
                </Button>
            </form>
            {/*<SocialBlock*/}
            {/*    label="Или войти с помощью"*/}
            {/*    links={socialLinks}*/}
            {/*/>*/}
            <div className={styles.loginPage__links}>
                <FormLink
                    label="Forgot your password?"
                    linkText="Restore"
                    linkUrl="/restorepassword"
                />
                <FormLink
                    label="Don't have an account yet?"
                    linkText="Register"
                    linkUrl="/signup"
                />
            </div>
        </AuthFormPage>
    )
})
