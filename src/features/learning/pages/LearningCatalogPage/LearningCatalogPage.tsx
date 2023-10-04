import {typedMemo} from "../../../../core/utils/typedMemo";
import React, {FC} from "react";
import styles from "./LearningCatalogPage.module.css";
import {Typography} from "../../../../components/Typography";
import {Page} from "../../../../components/Page";

export const LearningCatalogPage: FC = typedMemo(function LearningCatalogPage(){
    return (
        <Page className={styles.learningCatalog}>
            <Typography
                variant="h1"
                className={styles.learningCatalog__title}>
                Обучение
            </Typography>
        </Page>
    )
})
