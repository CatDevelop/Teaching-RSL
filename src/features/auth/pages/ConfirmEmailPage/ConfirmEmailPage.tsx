import { Page } from "components/Page";
import { PageContent } from "components/PageContent";
import { typedMemo } from "core/utils/typedMemo";
import React, { FC, useCallback, useEffect } from "react";
import {ReactComponent as Logo} from "../../../../assets/images/Logo.svg";

import styles from "./ConfirmEmailPage.module.css";
import { Card, CardHeader } from "components/Card";
import { Button } from "components/Button";
import { useNavigate, useParams } from "react-router";
import { Typography } from "components/Typography";
import { useMutation } from "react-query";
import { AuthService } from "api/services/auth";

type Props = Readonly<{}>

/**
 * Страница Подтверждение пароля
 */
export const ConfirmEmailPage: FC<Props> = typedMemo(function ConfirmEmailPage(props){
    const navigate = useNavigate()
    const toMainPage = useCallback(() => navigate("/"), [navigate])
    const {mutate: confirmEmail} = useMutation(AuthService.confirmEmail);
    const {token} = useParams<{token: string}>();

    useEffect(() => {
        confirmEmail(token ?? '');
    }, [])

    return (
        <Page>
            <PageContent className={styles.confirmPage}>
                <Logo
                    className={styles.confirmPage__logo}
                    onClick={toMainPage}
                />
                <Typography variant="h2" className={styles.confirmPage__header}>Почта подтверждена</Typography>
                <Button color="primary" variant="solid" onClick={toMainPage}>На главную</Button>
            </PageContent>
        </Page>
    )
})
