import React, { FC } from "react";
import { Tooltip } from "react-tooltip";
import { typedMemo } from "../../../../core/utils/typedMemo";
import { RecognitionBlock } from "./components/RecognitionBlock";
import { Button } from "../../../../components/Button";
import Logo from "../../../../assets/images/Logo.svg";
import User from "../../../../assets/images/User.svg";
import Close from "../../../../assets/images/Close.svg";
import { Typography } from "../../../../components/Typography";
import { Page } from "../../../../components/Page";
import { TaskFeedback } from "../../../../components/TaskFeedback";
import { TaskProgress } from "../../../../components/TaskProgress";
import { PageContent } from "../../../../components/PageContent";
import { TaskSetting } from "../../../../components/TaskSetting";
import styles from "./TrainingPage.module.css";

export const TrainingPage: FC = typedMemo(function TrainingPage(props){
    return (
        <Page className={styles.trainingPage}>
            <PageContent className={styles.trainingPage__content}>
                <div className={styles.trainingPage__header}>
                    <img src={Logo} alt="Go to main page" className={styles.trainingPage__logo} />

                    <div className={styles.trainingPage__info}>
                        <div className={styles.trainingPage__name}>
                            <Typography variant="h2">ДЗ бла бла бла</Typography>
                            <Tooltip anchorSelect={`.${styles.trainingPage__author}`}>
                                Тест от пользователя Крашенинникова Любовь
                            </Tooltip>
                            <img src={User} alt="Test's author" className={styles.trainingPage__author} />
                        </div>

                        <div className={styles.trainingPage__progress}>
                            <Button 
                                className={styles.trainingPage__closeTraining}
                                variant="light" 
                                endContent={<img src={Close} alt="Close training"/>}
                            />
                            <TaskProgress currentTaskId={0} tasks={[{id: 0}, {id:1}]}/>
                        </div>
                    </div>
                    <div className={styles.trainingPage__actions}>
                        <TaskFeedback items={[{id:"0", label:"Хочу пиццу"}]} className={styles.trainingPage__feedback} />
                        <TaskSetting />
                    </div>
                </div>
                <RecognitionBlock text="bugaga" className={styles.trainingPage__recognition}/>

                <Button variant="faded">Пропустить</Button>
            </PageContent>
        </Page>
    );
});
