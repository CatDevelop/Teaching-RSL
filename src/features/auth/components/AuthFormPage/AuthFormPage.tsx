import { typedMemo } from "../../../../core/utils/typedMemo";
import React, {FC, PropsWithChildren, useCallback} from "react";
import { Page } from "../../../../components/Page";
import { PageContent } from "../../../../components/PageContent";
import {ReactComponent as Logo} from "../../../../assets/images/LogoMonochrome.svg";
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
                <Logo width={218} className={styles.authFormPage__logo}/>
                <div className={styles.authFormPage__form}>
                    {props.children}
                </div>
            </PageContent>
        </Page>
    )
})
