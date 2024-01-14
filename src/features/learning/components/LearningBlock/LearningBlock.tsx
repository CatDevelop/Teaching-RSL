import {Card} from "../../../../components/Card";
import {typedMemo} from "../../../../core/utils/typedMemo";
import React, {FC, PropsWithChildren} from "react";
import styles from "./LearningBlock.module.css"
import {Typography} from "../../../../components/Typography";
import {ComponentProps} from "../../../../core/models/ComponentProps";
import clsx from "clsx";
import {TaskFeedback} from "../../../../components/TaskFeedback";

type Props = PropsWithChildren & ComponentProps & Readonly <{
    iconUrl: string;
    title: string;
}>

/**
 * Learning block.
 */
export const LearningBlock: FC<Props> = typedMemo(function LearningBlock(props){
    return (
        <div className={styles.learningBlock}>
            <div className={styles.learningBlock__header}>
                <Typography
                    variant="h2"
                    className={styles.learningBlock__title}>
                    {props.title}
                </Typography>

                <TaskFeedback
                    className={styles.learningBlock__taskFeedback}
                    text="Сообщить об ошибке"
                    items={
                        [
                            {
                                id: "0",
                                label: "Мой ответ следовало принять"
                            },
                            {
                                id: "1",
                                label: "Изображение отсутствует"
                            },
                            {
                                id: "2",
                                label: "Задание некорректное"
                            },
                            {
                                id: "3",
                                label: "Что-то ещё пошло не так"
                            }
                        ]
                    }/>
            </div>
            <div className={styles.learningBlock__contentContainer}>
                {props.children}
            </div>
        </div>
    );
});
