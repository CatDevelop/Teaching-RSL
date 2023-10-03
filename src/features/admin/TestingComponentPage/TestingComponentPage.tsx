import React, { FC } from "react";
import { typedMemo } from "../../../core/utils/typedMemo";
import styles from "./TestingComponentPage.module.css";
import {Button} from "../../../components/Button";
import {Card} from "../../../components/Card";
import {ScrollBox} from "../../../components/ScrollBox";
import { Range } from "../../../components/Range";

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
            <Range />
        </div>
    )
});
