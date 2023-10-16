import React, { FC } from "react";
import { typedMemo } from "../../../../core/utils/typedMemo";
import { LoginForm } from "./components/LoginForm";
import { Page } from "../../../../components/Page";
import Logo from "../../../../assets/images/Logo.svg";
import styles from "./LoginPage.module.css";
import { PageContent } from "../../../../components/PageContent";
import { SocialBlock } from "../../components/SocialBlock";

export const LoginPage: FC = typedMemo(function LoginPage(){
    return (
        <Page>
            <PageContent className={styles.loginPage}>
                <img 
                    className={styles.loginPage__logo}
                    src={Logo} 
                    alt={"Логотип сервиса \"Изучение русского жестового языка\""} 
                />
                <LoginForm/>
            </PageContent>
        </Page>
    )
})