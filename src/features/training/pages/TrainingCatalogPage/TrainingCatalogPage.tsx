import React, { FC } from "react";
import { typedMemo } from "../../../../core/utils/typedMemo";
import styles from "./TrainingCatalogPage.module.css";
import { Typography } from "../../../../components/Typography";
import { WorkOnMistakes } from "./components/WorkOnMistakes";
import { Page } from "../../../../components/Page";
import { SystemTests } from "./components/SystemTests";
import { UserTests } from "./components/UserTests";
import { Button } from "../../../../components/Button";
import RandomIcon from "../../../../assets/images/Random.svg";
import { Tooltip } from "react-tooltip";
import { PageContent } from "../../../../components/PageContent";

export const TrainingCatalogPage: FC = typedMemo(function TrainingCatalogPage(){
    return (
        <Page className={styles.trainingCatalog}>
            <PageContent>
                <Typography 
                    variant="h1"
                    className={styles.trainingCatalog__title}
                >
                    Тренировки
                </Typography>

                <WorkOnMistakes missingWordsCount={0} className={styles.trainingCatalog__workOnMistakes}/>

                <div className={styles.trainingCatalog__testsOverflow}>
                    <div className={styles.trainingCatalog__tests}>
                        <SystemTests />
                        <UserTests />
                        
                        <Tooltip anchorSelect={`.${styles.trainingCatalog__randomTest}`}>
                            Создать рандомный тест
                        </Tooltip>
                        <Button
                                className={styles.trainingCatalog__randomTest}
                                variant="faded"
                                endContent={<img src={RandomIcon} alt="Create random test" />}
                            />
                    </div>
                </div>
            </PageContent>
        </Page>
    )
})
