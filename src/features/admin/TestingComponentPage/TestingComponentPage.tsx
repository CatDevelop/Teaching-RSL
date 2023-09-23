import React, { FC } from "react";
import { typedMemo } from "../../../core/utils/typedMemo";
import styles from "./TestingComponentPage.module.css";
import {Button} from "../../../components/Button";
import {Card} from "../../../components/Card";
import {ScrollBox} from "../../../components/ScrollBox";
import {TaskContinue} from "../../../components/TaskContinue";
import {TaskProgress} from "../../../components/TaskProgress";

export const TestingComponentPage: FC = typedMemo(function TestingComponentPage() {
    return (
        <div className={styles.centeredContainer}>
            <Button variant={"faded"}>Secondary button</Button>
            <Button variant={"light"}>Text button</Button>
            <Card>
                Содержание карточки
            </Card>

            <div style={{height: "300px"}}>
                <ScrollBox>
                    sakelfmklsmgl <br/>sakelfmklsmgl <br/>sakelfmklsmgl <br/>sakelfmklsmgl <br/>sakelfmklsmgl <br/>sakelfmklsmgl <br/>sakelfmklsmgl <br/>sakelfmklsmgl <br/>sakelfmklsmgl <br/>sakelfmklsmgl <br/>sakelfmklsmgl <br/>sakelfmklsmgl <br/>sakelfmklsmgl <br/>sakelfmklsmgl <br/>sakelfmklsmgl <br/>sakelfmklsmgl <br/>d
                </ScrollBox>
            </div>
            <TaskContinue continue={()=>console.log(123213)} isRightAnswer={true} rightAnswer={"awdawd"}/>
            <TaskContinue continue={()=>console.log(123213)} isRightAnswer={false} rightAnswer={"awdawd"}/>
            <TaskProgress currentTaskId={3} tasks={[{id: 1}, {id: 2}, {id: 3}, {id: 4}]}/>
        </div>
    )
});
