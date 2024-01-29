import React, {FC, useCallback, useMemo} from "react";
import {typedMemo} from "../../../../core/utils/typedMemo";
import {Page} from "../../../../components/Page";
import {PageContent} from "../../../../components/PageContent";
import {SideBar} from "../../../../components/SideBar";
import {Card} from "../../../../components/Card";
import styles from "./ProfileSettingsPage.module.css"
import {Back} from "../../../../components/Back";
import {Typography} from "../../../../components/Typography";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {validationSchema} from "./ProfileSettingsPage.config";
import {Input} from "../../../../components/Input";
import {Button} from "../../../../components/Button";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { UserService } from "api/services/user";
import { ChangePasswordRequest } from "core/models/user/ChangePasswordRequest";
import { ChangeUserEmailRequest } from "core/models/user/ChangeUserEmailRequest";
import { ChangeUserFioRequest } from "core/models/user/ChangeUserFioRequest";
import { toast } from "react-toastify";

type Props = Readonly<{}>

type FormState = ChangePasswordRequest & ChangeUserEmailRequest & ChangeUserFioRequest & {
    repeatedNewPassword?: string;
};

/**
 * Настройки пользователя
 */
export const ProfileSettingsPage: FC<Props> = typedMemo(function ProfileSettingsPage(props){
    const queryClient = useQueryClient()
    const {data: user} = useQuery('user-welcome-info', UserService.getWelcomeUserInfo)
    const initialFormData: FormState = useMemo(() => {
        return {
            firstName: user!.firstName ?? '',
            lastName: user!.lastName ?? '',
            email: user!.email ?? ''
        }
    }, [user])

    const {mutate: changeUsername, isLoading: isUsernameFetching} = useMutation(
        UserService.changeUsername,
        {
            onSuccess: () => {
                queryClient.resetQueries('user-welcome-info')
            }
        }
    )
    const {mutate: changeEmail, isLoading: isEmailFetching} = useMutation(
        UserService.changeEmail,
        {
            onSuccess: (_, variables) => {
                if(variables.email !== initialFormData.email){
                    toast.success('Почта изменена, отправлено подтверждение почты')}
                }
        }
        )
    const {mutate: changePassword, isLoading: isPasswordFetching} = useMutation(UserService.changePassword)

    const {register, handleSubmit, formState: {errors}, watch} = useForm<FormState>({
        resolver: yupResolver(validationSchema),
        mode: 'onChange',
        values: initialFormData,
    })
    const firstName = watch('firstName')
    const lastName = watch('lastName')
    const email = watch('email')

    const onSubmit = useCallback((form: FormState) => {
        changeUsername(new ChangeUserFioRequest({firstName: form.firstName.trim(), lastName: form.lastName.trim()}))
        changeEmail(new ChangeUserEmailRequest({email: form.email.trim()}))

        if(form.newPassword && form.oldPassword){
            changePassword(new ChangePasswordRequest({oldPassword: form.oldPassword.trim(), newPassword: form.newPassword.trim()}))
        }
    }, [changeEmail, changePassword, changeUsername])

    const isActionActive = !(isUsernameFetching || isEmailFetching || isPasswordFetching)

    return (
        <Page>
            <SideBar/>
            <PageContent>
                <Card className={styles.profileSettingsPage__form}>
                    <div className={styles.profileSettingsPage__formHeader}>
                        <Back to={'/profile'}/>
                        <Typography variant='h2'>Настройки</Typography>
                    </div>
                    <form className={styles.profileSettingsPage__formScroll} onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.profileSettingsPage__formGroup}>
                            <Typography variant="h3">Личная информация</Typography>
                            <Input
                                isInvalid={errors.firstName !== undefined}
                                color={errors.firstName !== undefined ? "danger" : "default"}
                                errorMessage={errors.firstName?.message}
                                {...register('firstName')}
                                value={firstName}
                                label="Имя"
                                defaultValue={user?.firstName || ""}
                            />
                            <Input
                                {...register('lastName')}
                                isInvalid={errors.lastName !== undefined}
                                color={errors.lastName !== undefined ? "danger" : "default"}
                                errorMessage={errors.lastName?.message}
                                value={lastName}
                                label="Фамилия"
                                defaultValue={user?.lastName || ""}
                            />
                            <Input
                                {...register('email')}
                                isInvalid={errors.email !== undefined}
                                color={errors.email !== undefined ? "danger" : "default"}
                                errorMessage={errors.email?.message}
                                value={email}
                                label="Почта"
                                defaultValue={user?.email || ""}
                            />
                        </div>

                        <div className={styles.profileSettingsPage__formGroup}>
                            <Typography variant="h3">Смена пароля</Typography>
                            <Input
                                {...register('oldPassword')}
                                isInvalid={errors.oldPassword !== undefined}
                                color={errors.oldPassword !== undefined ? "danger" : "default"}
                                errorMessage={errors.oldPassword?.message}
                                label="Старый пароль"
                            />
                            <Input
                                {...register('newPassword')}
                                isInvalid={errors.newPassword !== undefined}
                                color={errors.newPassword !== undefined ? "danger" : "default"}
                                errorMessage={errors.newPassword?.message}
                                label="Новый пароль"
                            />
                            <Input
                                {...register('repeatedNewPassword')}
                                isInvalid={errors.repeatedNewPassword !== undefined}
                                color={errors.repeatedNewPassword !== undefined ? "danger" : "default"}
                                errorMessage={errors.repeatedNewPassword?.message}
                                label="Повторите новый пароль"
                            />
                        </div>
                        <Button
                            type="submit"
                            color="primary"
                            disabled={!isActionActive}
                            isLoading={!isActionActive}
                            className={styles.profileSettingsPage__submitButton}>
                            Сохранить
                        </Button>
                    </form>
                </Card>
            </PageContent>
        </Page>
    )
})
