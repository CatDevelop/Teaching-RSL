import React, {FC} from "react";
import {typedMemo} from "../../../../../core/utils/typedMemo";
import {Card} from "../../../../../components/Card";
import {Typography} from "../../../../../components/Typography";
import {ThemeProgress} from "./ThemeProgress";
import styles from "./LearningProgress.module.css";
import {Tabs, Tab} from "@nextui-org/react";
import {ComponentProps} from "../../../../../core/models/ComponentProps";
import {clsx} from "clsx";

type Props = ComponentProps & Readonly<{

}>

export const LearningProgress: FC<Props> = typedMemo(function LearningProgress(props){
    return (
        <Card className={clsx(props.className)}>
            <Typography variant='h2' className={styles.learningProgress__title}>Прогресс прохождения</Typography>
            <Tabs className={styles.learningProgress__tabs}>
                <Tab key="learning" title="Обучение">
                    <div className={styles.learningProgress__themes}>
                        {[0,0,0,0,0].map((_, i) => (
                            <ThemeProgress key={i}/>
                        ))}
                    </div>
                </Tab>
                <Tab key="training" title="Тренировки">
                    <div className={styles.learningProgress__themes}>
                        {[0,0,0,0,0].map((_, i) => (
                            <ThemeProgress key={i}/>
                        ))}
                    </div>
                </Tab>
            </Tabs>
        </Card>
    )
})