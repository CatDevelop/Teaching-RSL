import React, {FC} from "react";
import {typedMemo} from "../../core/utils/typedMemo";
import styles from "./LevelBlock.module.css";
import {ComponentProps} from "../../core/models/ComponentProps";
import {Typography} from "../Typography";
import {Progress} from "@nextui-org/react";

type Props = ComponentProps & Readonly<{
    level: number;
    experience: number;
    experienceForNextLevel: number;
}>

/** 
 * Блок с уровнем и количеством опыта
 */
export const LevelBlock: FC<Props> = typedMemo(function LevelBlock(props) {
    return (
        <div className={styles.levelBlock}>
            <div className={styles.levelBlock__titleContainer}>
                <Typography variant='h1' className={styles.levelBlock__level}>
                    Level {props.level}
                </Typography>
                <Typography variant='p' className={styles.levelBlock__experienceCount}>
                    {props.experience} / {props.experienceForNextLevel}
                </Typography>
            </div>
            <Progress value={props.experience / props.experienceForNextLevel * 100}/>
        </div>
    )
});
