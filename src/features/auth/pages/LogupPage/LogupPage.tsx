import React, { FC } from "react";
import { typedMemo } from "../../../../core/utils/typedMemo";
import { LogupForm } from "./components/LogupForm";
import { Page } from "../../../../components/Page";
import Logo from "../../../../assets/images/Logo.svg";
import styles from "./LogupPage.module.css";
import { PageContent } from "../../../../components/PageContent";

export const LogupPage: FC = typedMemo(function LogupPage(){
    return (
        <Page>
            <PageContent className={styles.logupPage}>
                <img 
                    className={styles.logupPage__logo}
                    src={Logo} 
                    alt={"Логотип сервиса \"Изучение русского жестового языка\""} 
                />
                <LogupForm/>
            </PageContent>
        </Page>
    )
})