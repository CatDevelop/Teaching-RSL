import React, {FC} from "react";
import {typedMemo} from "../../../../core/utils/typedMemo";
import styles from "./LearningCatalogPage.module.css";
import {Typography} from "../../../../components/Typography";
import {Page} from "../../../../components/Page";
import {PageContent} from "../../../../components/PageContent";
import {SideBar} from "../../../../components/SideBar";
import {LevelLink} from "../../components/Temporary/TestToTask/LevelLink";
import {LevelList} from "../../components/Temporary/LevelList/LevelList";
import {ThemesList} from "../../components/ThemesList/ThemesList";

export const LearningCatalogPage: FC = typedMemo(function LearningCatalogPage(){
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
                <ThemesList />
            </PageContent>
        </Page>
    )
})
