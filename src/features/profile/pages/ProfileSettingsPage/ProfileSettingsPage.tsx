import React, {FC, useCallback, useState} from "react";
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
import {useMutation, useQuery} from "react-query";
import {UserService} from "../../../../api/services/user";
import {login as loginDispatch} from "../../../../store/auth/authSlice";
import {toast} from "react-toastify";

type Props = Readonly<{}>

type TempSettings = {
   name: string;
   surname: string;
   email: string;
   oldPassword?: string;
   newPassword?: string;
   repeatedNewPassword?: string;
}

/**
 * Настройки пользователя
 */
export const ProfileSettingsPage: FC<Props> = typedMemo(function ProfileSettingsPage(props){
    const { mutate: changeName} = useMutation('user/changename', UserService.changeName, {
        onSuccess: () => {
            toast.success("Вы успешно сменили имя и фамилию")
        }
    })

    const {data: user} = useQuery(['user-welcome-info', changeName], UserService.getWelcomeUserInfo)

    const {register, handleSubmit, formState: {errors}} = useForm<TempSettings>({
        resolver: yupResolver(validationSchema),
        mode: 'onChange'
    })

    const onSubmit = useCallback((payload: TempSettings) => {
        if(payload.name !== user?.firstName || payload.surname !== user?.lastName) {
            changeName({name: payload.name, surname: payload.surname})
        }
    }, [user])

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
                                isInvalid={errors.name !== undefined}
                                color={errors.name !== undefined ? "danger" : "default"}
                                errorMessage={errors.name?.message}
                                {...register('name')}
                                label="Имя"
                                defaultValue={user?.firstName || ""}
                            />
                            <Input
                                {...register('surname')}
                                isInvalid={errors.surname !== undefined}
                                color={errors.surname !== undefined ? "danger" : "default"}
                                errorMessage={errors.surname?.message}
                                label="Фамилия"
                                defaultValue={user?.lastName || ""}
                            />
                            <Input
                                {...register('email')}
                                isInvalid={errors.email !== undefined}
                                color={errors.email !== undefined ? "danger" : "default"}
                                errorMessage={errors.email?.message}
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
                            className={styles.profileSettingsPage__submitButton}>
                            Сохранить
                        </Button>
                    </form>
                </Card>
            </PageContent>
        </Page>
    )
})
