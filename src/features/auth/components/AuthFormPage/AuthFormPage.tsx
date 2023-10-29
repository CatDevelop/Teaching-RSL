import { typedMemo } from "../../../../core/utils/typedMemo";
import React, {FC, PropsWithChildren, useCallback} from "react";
import { Page } from "../../../../components/Page";
import { PageContent } from "../../../../components/PageContent";
import Logo from "../../../../assets/images/Logo.svg";
import styles from "./AuthFormPage.module.css";
import {useNavigate} from "react-router-dom";

type Props = PropsWithChildren;

/**
 * Страница из раздела авторизации
 */
export const AuthFormPage: FC<Props> = typedMemo(function AuthFormPage(props){
    const navigate = useNavigate()
    const toMainPage = useCallback(() => navigate("/"), [navigate])

    return (
        <Page>
            <PageContent className={styles.authFormPage}>
                <img
                    className={styles.authFormPage__logo}
                    src={Logo}
                    alt={"Логотип сервиса \"Изучение русского жестового языка\""}
                    onClick={toMainPage}
                />
                <div className={styles.authFormPage__form}>
                    {props.children}
                </div>
            </PageContent>
        </Page>
    )
})
