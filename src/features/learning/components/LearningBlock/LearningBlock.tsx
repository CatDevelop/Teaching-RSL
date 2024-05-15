import {typedMemo} from "../../../../core/utils/typedMemo";
import React, {FC, PropsWithChildren} from "react";
import styles from "./LearningBlock.module.css"
import {Typography} from "../../../../components/Typography";
import {ComponentProps} from "../../../../core/models/ComponentProps";
import {TaskFeedback} from "../../../../components/TaskFeedback";

type Props = PropsWithChildren & ComponentProps & Readonly <{
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
                    text="Report an error"
                    items={
                        [
                            {
                                id: "0",
                                label: "My answer should have been accepted"
                            },
                            {
                                id: "1",
                                label: "No image available"
                            },
                            {
                                id: "2",
                                label: "The task is incorrect"
                            },
                            {
                                id: "3",
                                label: "Something else went wrong"
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
