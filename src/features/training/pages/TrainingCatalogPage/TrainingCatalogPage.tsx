import { typedMemo } from "../../../../core/utils/typedMemo";
import React, { FC } from "react";
import styles from "./TrainingCatalogPage.module.css";
import { Typography } from "../../../../components/Typography";
import { WorkOnMistakes } from "./components/WorkOnMistakes";
import { Page } from "../../../../components/Page";
import { SystemTests } from "./components/SystemTests";
import { themes } from "../../data";

export const TrainingCatalogPage: FC = typedMemo(function TrainingCatalogPage(){
    return (
        <Page className={styles.trainingCatalog}>
            <Typography 
                variant="h1"
                className={styles.trainingCatalog__title}>
                Тренировки
            </Typography>

            <WorkOnMistakes missingWordsCount={15} className={styles.trainingCatalog__workOnMistakes}/>

            <div className={styles.trainingCatalog__testsOverflow}>
                <div className={styles.trainingCatalog__tests}>
                    <SystemTests themes={themes} />
                </div>
            </div>
        </Page>
    )
})