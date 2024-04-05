import {typedMemo} from "core/utils/typedMemo";
import React, {FC, useMemo} from "react";
import styles from "./TestProgress.module.css";
import {Typography} from "components/Typography";
import {UserTestHistoryRecordResponse} from "core/models/user/UserTestHistoryRecordResponse";
import dayjs from 'dayjs'

type Props = UserTestHistoryRecordResponse

/**
 * Прогресс выполнененного теста
 */
export const TestProgress: FC<Props> = typedMemo(function TestProgress(props) {
    const completedDate = useMemo(() => dayjs(props.completedDateTime), [props.completedDateTime]);

    return (
        <div className={styles.testProgress}>
            <div className={styles.testProgress__info}>
                <Typography variant="p" className={styles.testProgress__name}>
                    {props.name}

                    <Typography variant="span" className={styles.testProgress__progress}>
                        {props.wordsCompletedCount}/{props.wordsCount}
                    </Typography>
                </Typography>
                <div className={styles.testProgress__dates}>
                    <Typography variant="span" className={styles.testProgress__time}>
                        {completedDate.format('HH:mm')}
                    </Typography>
                    <Typography variant="span" className={styles.testProgress__date}>
                        {completedDate.format('DD.MM.YYYY')}
                    </Typography>
                </div>
            </div>
        </div>
    )
})
