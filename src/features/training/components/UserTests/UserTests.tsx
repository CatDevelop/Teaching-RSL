import React, {FC, useEffect, useState} from "react";
import {clsx} from "clsx";
import {typedMemo} from "../../../../core/utils/typedMemo";
import {ComponentProps} from "../../../../core/models/ComponentProps";
import {ScrollBox} from "../../../../components/ScrollBox";
import {Typography} from "../../../../components/Typography";
import {userTests} from "../../../../core/data";
import {UserTestPreview} from "../UserTestPreview";
import styles from "./UserTests.module.css";
import {Link} from "../../../../components/Link";
import {Card} from "../../../../components/Card";

type Props = ComponentProps;

/** User tests. */
export const UserTests: FC<Props> = typedMemo(function UserTests(props) {
    const [tests, setTests] = useState(userTests);

    useEffect(() => {
        setTests([
            {name: "Тест", id: 0, wordsCount: 10},
            {name: "Тест2", id: 1, wordsCount: 15},
            {name: "Тест3", id: 2, wordsCount: 10},
            {name: "Тест4", id: 3, wordsCount: 11},
            {name: "Тест5", id: 4, wordsCount: 12},
            {name: "Тест5", id: 5, wordsCount: 12},
            {name: "Тест5", id: 6, wordsCount: 12},
            {name: "Тест5", id: 7, wordsCount: 12}
        ])
    }, []);

    return (
        <Card className={styles.userTests}>
            <div className={styles.userTests__header}>
                <Typography variant="h2" className={styles.userTests__title}>Твои тесты</Typography>
                {/*<Link to="/">Перейти к созданию теста</Link>*/}
            </div>

            <ScrollBox className={clsx(styles.userTests__container)}>
                {tests.map(test => <UserTestPreview {...test}/>)}
            </ScrollBox>
        </Card>
    );
});
