import { typedMemo } from "../../../../core/utils/typedMemo";
import React, { FC, PropsWithChildren } from "react";
import { Page } from "../../../../components/Page";
import { PageContent } from "../../../../components/PageContent";
import Logo from "../../../../assets/images/Logo.svg";
import styles from "./AuthFormPage.module.css";

type Props = PropsWithChildren;

export const AuthFormPage: FC<Props> = typedMemo(function AuthFormPage(props){
    return (
        <Page>
            <PageContent className={styles.authFormPage}>
                <img 
                    className={styles.authFormPage__logo}
                    src={Logo} 
                    alt={"Логотип сервиса \"Изучение русского жестового языка\""} 
                />
                <div className={styles.authFormPage__form}>
                    {props.children}
                </div>
            </PageContent>
        </Page>
    )
})