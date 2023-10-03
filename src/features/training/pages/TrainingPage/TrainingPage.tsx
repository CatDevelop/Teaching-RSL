import React, { FC, useCallback, useState } from "react";
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
import { feedbackTemp } from "./data";
import { useNavigate } from "react-router";
import { testTemp } from "../../data";
import { TaskContinue } from "../../../../components/TaskContinue";

export const TrainingPage: FC = typedMemo(function TrainingPage(props){
    const data = testTemp;
    const [currentTask, setCurrentTask] = useState(data.words[0]);
    const [countSkippedWords, setCountSkippedWords] = useState(0);
    const [isDoneTask, setIsDoneTask] = useState(false);
    const navigate = useNavigate();

    const toNextTask = useCallback(() => {
        const nextTaskIndex = data.words.findIndex(word => word.id === currentTask.id) + 1;

        if(nextTaskIndex === data.words.length){
            navigate('result', {state: {result: 100 - Math.floor((countSkippedWords + 1) / data.words.length * 100)}});
            return;
        }

        setCurrentTask(data.words[nextTaskIndex]);
    }, [data, currentTask, navigate, setCurrentTask, countSkippedWords])

    const skip = useCallback(() => {
        toNextTask();
        setCountSkippedWords(count => count + 1);
    }, [setCountSkippedWords, toNextTask]);

    const next = useCallback(() => {
        toNextTask();
        setIsDoneTask(false);
    }, [])

    return (
        <Page className={styles.trainingPage}>
            <PageContent className={styles.trainingPage__content}>
                <div className={styles.trainingPage__header}>
                    <img src={Logo} alt="Go to main page" className={styles.trainingPage__logo} />

                    <div className={styles.trainingPage__info}>
                        <div className={styles.trainingPage__name}>
                            <Typography variant="h2">{data.name}</Typography>
                            <Tooltip anchorSelect={`.${styles.trainingPage__author}`}>
                                Системный тест
                            </Tooltip>
                            <img src={User} alt="Test's author" className={styles.trainingPage__author} />
                        </div>

                        <div className={styles.trainingPage__progress}>
                            <Button 
                                className={styles.trainingPage__closeTraining}
                                variant="light" 
                                endContent={<img src={Close} alt="Close training"/>}
                            />
                            <TaskProgress currentTaskId={currentTask.id} tasks={data.words}/>
                        </div>
                    </div>
                    <div className={styles.trainingPage__actions}>
                        <TaskFeedback items={feedbackTemp} className={styles.trainingPage__feedback} />
                        {/* <TaskSetting />*/}
                    </div>
                </div>
                <RecognitionBlock text={currentTask.word} className={styles.trainingPage__recognition} next={() => setIsDoneTask(true)}/>

                {!isDoneTask && <Button variant="faded" onClick={skip}>Пропустить</Button>}
            </PageContent>
            {isDoneTask && <TaskContinue next={next} isRightAnswer={true} />}
        </Page>
    );
});
