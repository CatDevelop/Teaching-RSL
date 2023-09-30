import { Page } from "../../../../components/Page";
import { typedMemo } from "../../../../core/utils/typedMemo";
import React, { FC } from "react";
import Logo from "../../../../assets/images/Logo.svg";
import User from "../../../../assets/images/User.svg";
import ResultImage from "../../../../assets/images/ResultImage.png";
import Result from "../../../../assets/images/Result.svg";
import styles from "./TrainingResultPage.module.css";
import { Typography } from "../../../../components/Typography";
import { Tooltip } from "react-tooltip";
import { Button } from "../../../../components/Button";
import { TaskFeedback } from "../../../../components/TaskFeedback";
import { PageContent } from "../../../../components/PageContent";
import { ResultCard } from "./components/ResultCard";

export const TrainingResultPage: FC = typedMemo(function TrainingResultPage(){
    return (
        <Page className={styles.trainingResultPage}>
            <PageContent className={styles.trainingResultPage__content}>
                <div className={styles.trainingResultPage__header}>
                    <img src={Logo} alt="Go to main page" className={styles.trainingResultPage__logo} />

                    <div className={styles.trainingResultPage__info}>
                        <Typography variant="h2">ДЗ бла бла бла</Typography>
                        <Tooltip anchorSelect={`.${styles.trainingResultPage__author}`}>
                            Тест от пользователя Крашенинникова Любовь
                        </Tooltip>
                        <img src={User} alt="Test's author" className={styles.trainingResultPage__author} />
                    </div>

                    <TaskFeedback items={[{id:"0", label:"Хочу пиццу"}]} className={styles.trainingResultPage__feedback} />
                </div>

                <div className={styles.trainingResultPage__result}>
                    <img src={ResultImage} className={styles.trainingResultPage__resultImage} alt="Your result"/>
                    <Typography variant="h2" className={styles.trainingResultPage__resultTitle}>Конец тренировки!</Typography>
                    <ResultCard title="Результат" iconUrl={Result} content="100%" className={styles.trainingResultPage__resultCard} />
                </div>
            </PageContent>

            <div className={styles.trainingResultPage__continue}>
                <Button color="primary">Далее</Button>
            </div>
        </Page>
    );
});
