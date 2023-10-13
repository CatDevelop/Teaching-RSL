import React,{ FC, useState } from "react";
import { clsx } from "clsx";
import { typedMemo } from "../../../../core/utils/typedMemo";
import { ComponentProps } from "../../../../core/models/ComponentProps";
import { ScrollBox } from "../../../../components/ScrollBox";
import { Typography } from "../../../../components/Typography";
import { userTests } from "../../../../core/data";
import { UserTestPreview } from "../UserTestPreview";
import styles from "./UserTests.module.css";
import { Link } from "../../../../components/Link";

type Props = ComponentProps;

/** User tests. */
export const UserTests: FC<Props> = typedMemo(function UserTests(props){
    const [tests, setTests] = useState(userTests);

    return (
        <ScrollBox className={clsx(styles.userTests, props.className)}>
            <div className={styles.userTests__header}>
                <Typography variant="h3" className={styles.userTests__title}>Пользовательские тесты</Typography>
                <Link to="/">Перейти к созданию теста</Link>
            </div>

            {tests.map(test => <UserTestPreview {...test}/>)}
        </ScrollBox>
    );
});
