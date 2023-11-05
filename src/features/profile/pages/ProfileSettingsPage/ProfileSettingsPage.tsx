import React, {FC, useCallback} from "react";
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
    const {register, handleSubmit, formState: {errors}} = useForm<TempSettings>({
        resolver: yupResolver(validationSchema),
        mode: 'onChange'
    })

    const onSubmit = useCallback((a: any) => {}, [])

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
                            />
                            <Input
                                {...register('surname')}
                                isInvalid={errors.surname !== undefined}
                                color={errors.surname !== undefined ? "danger" : "default"}
                                errorMessage={errors.surname?.message}
                                label="Фамилия"
                            />
                            <Input
                                {...register('email')}
                                isInvalid={errors.email !== undefined}
                                color={errors.email !== undefined ? "danger" : "default"}
                                errorMessage={errors.email?.message}
                                label="Почта"
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