import React, {FC, useState} from "react";
import {clsx} from "clsx";
import {typedMemo} from "../../../../core/utils/typedMemo";
import {ComponentProps} from "../../../../core/models/ComponentProps";
import {ScrollBox} from "../../../../components/ScrollBox";
import {Typography} from "../../../../components/Typography";
import {userTests} from "../../../../core/data";
import {UserTestPreview} from "../UserTestPreview";
import styles from "./UserTests.module.css";
import {Card} from "../../../../components/Card";

type Props = ComponentProps;

/** Пользовательские тесты. */
export const UserTests: FC<Props> = typedMemo(function UserTests(props) {
    const [tests, setTests] = useState(userTests);

    return (
        <Card className={styles.userTests}>
            <div className={styles.userTests__header}>
                <Typography variant="h2" className={styles.userTests__title}>Твои тесты</Typography>
            </div>

            <ScrollBox className={clsx(styles.userTests__container)}>
                {tests.map(test => <UserTestPreview {...test}/>)}
            </ScrollBox>
        </Card>
    );
});
