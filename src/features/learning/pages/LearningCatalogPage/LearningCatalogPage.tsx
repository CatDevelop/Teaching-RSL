import React, {FC, useCallback} from "react";
import {typedMemo} from "../../../../core/utils/typedMemo";
import styles from "./LearningCatalogPage.module.css";
import {Typography} from "../../../../components/Typography";
import {Page} from "../../../../components/Page";
import {PageContent} from "../../../../components/PageContent";
import {SideBar} from "../../../../components/SideBar";
import {Button} from "../../../../components/Button";
import {useNavigate} from "react-router-dom";
import {LevelLink} from "../../components/Temporary/TestToTask/LevelLink";

export const LearningCatalogPage: FC = typedMemo(function LearningCatalogPage(){
    const navigate = useNavigate()
    const toTask = useCallback(() => navigate("0"), [navigate])
    return (
        <Page className={styles.learningCatalogg}>
            <SideBar/>
            <PageContent>
                <Typography
                    variant="h1"
                    className={styles.learningCatalog__title}
                >
                    Обучение
                </Typography>
                <div className={styles.learningCatalog__links}>
                    <LevelLink id={"0"} name={"Часть 1"} completeWordsCount={5} allWordsCount={10}/>
                    <LevelLink id={"1"} name={"Часть 2"} completeWordsCount={9} allWordsCount={10}/>
                </div>
            </PageContent>
        </Page>
    )
})
