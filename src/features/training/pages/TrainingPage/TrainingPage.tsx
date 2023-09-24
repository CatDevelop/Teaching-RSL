import { typedMemo } from "../../../../core/utils/typedMemo";
import React, { FC } from "react";
import { RecognitionBlock } from "./components/RecognitionBlock";
import styles from "./TrainingPage.module.css";
import { Button } from "../../../../components/Button";
import Logo from "../../../../assets/images/Logo.svg";
import User from "../../../../assets/images/User.svg";
import { Typography } from "../../../../components/Typography";
import { Tooltip } from "react-tooltip";
import { Page } from "../../../../components/Page";

export const TrainingPage: FC = typedMemo(function TrainingPage(props){
    return (
        <Page className={styles.trainingPage}>
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
                </div>
            </div>
            <RecognitionBlock text="bugaga" className={styles.trainingPage__recognition}/>

            <Button variant="faded">Пропустить</Button>
        </Page>
    );
});
