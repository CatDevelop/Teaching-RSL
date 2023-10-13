import React, {FC, useCallback} from "react";
import {typedMemo} from "../../../../core/utils/typedMemo";
import styles from "./LearningCatalogPage.module.css";
import {Typography} from "../../../../components/Typography";
import {Page} from "../../../../components/Page";
import {PageContent} from "../../../../components/PageContent";
import {SideBar} from "../../../../components/SideBar";
import {Button} from "../../../../components/Button";
import {useNavigate} from "react-router-dom";

export const LearningCatalogPage: FC = typedMemo(function LearningCatalogPage(){
    const navigate = useNavigate()
    const toTask = useCallback(() => navigate("0"), [navigate])
    return (
        <Page className={styles.trainingCatalog}>
            <SideBar currentPage={"/learning"}/>
            <PageContent>
                <Typography
                    variant="h1"
                    className={styles.trainingCatalog__title}
                >
                    Обучение
                </Typography>
                <Button onClick={toTask}>К заданию</Button>
            </PageContent>
        </Page>
    )
})
