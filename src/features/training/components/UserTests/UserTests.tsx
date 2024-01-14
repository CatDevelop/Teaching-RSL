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
import {useQuery} from "react-query";
import {TrainingService} from "../../../../api/services/training";
import Plus from "../../../../assets/images/Plus.svg"
import {Button} from "../../../../components/Button";
import {CreateUserTestForm} from "../../../dictionary/pages/DictionaryPage/CreateUserTestForm";

type Props = ComponentProps;

/**
 * Пользовательские тесты
 */
export const UserTests: FC<Props> = typedMemo(function UserTests(props) {
    const userTests = useQuery(['training/getusertests'], () => TrainingService.getUserTests());

    return (
        <Card className={styles.userTests}>
            <div className={styles.userTests__header}>
                <Typography variant="h2" className={styles.userTests__title}>Твои тесты</Typography>
            </div>

            <ScrollBox className={clsx(styles.userTests__container)}>
                <CreateUserTestForm
                    triggerComponent={onOpen => <div className={styles.userTests__createNewContainer} onClick={onOpen}>
                        <img src={Plus} alt=""/>
                        <p className={styles.userTests__createNew}>Создать новый тест</p>
                    </div>}
                />

                {userTests.data?.userTestList.map(test => <UserTestPreview
                    name={test.testName}
                    wordsCount={test.words.length}
                    id={test.id}
                />)}
            </ScrollBox>
        </Card>
    );
});
