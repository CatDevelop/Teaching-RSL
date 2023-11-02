import {typedMemo} from "../../../../../core/utils/typedMemo";
import React, {FC} from "react";
import styles from "../ProfilePage.module.css";
import {LevelBlock} from "../../../../../components/LevelBlock";
import {Card} from "../../../../../components/Card";

type Props = Readonly<{

}>

export const LevelProgress: FC<Props> = typedMemo(function LevelProgress(props){
    return (
        <Card className={styles.profile__levelBlock}>
            <LevelBlock level={33} experience={1236} experienceForNextLevel={3000}/>
        </Card>
    )
})