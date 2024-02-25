import React, {FC, useCallback} from "react";
import clsx from "clsx";
import {typedMemo} from "../../../../core/utils/typedMemo";
import {Typography} from "../../../../components/Typography";
import {ComponentProps} from "../../../../core/models/ComponentProps";
import {TestWordsModal} from "../TestWordsModal";
import styles from "./SystemTestPreview.module.css";
import {GetUnitResponse} from "../../../../core/models/unit/GetUnitResponse";
import {useNavigate} from "react-router-dom";
import {GetThemeResponse} from "../../../../core/models/themes/GetThemeListResponse";
import {TrainingService} from "../../../../api/services/training";
import {TestTypeEnum} from "../../../../core/models/themes/TestTypeEnum";

type Props = ComponentProps & GetUnitResponse & {
    type: TestTypeEnum
};

/**
 * System test preview
 */
export const SystemTestPreview: FC<Props> = typedMemo(function SystemTestPreview(props) {

    const navigate = useNavigate();

    const start = useCallback(async (wordsCount: GetThemeResponse['wordsCount']) => {
        const test = await TrainingService.postTrainingCreate({
            id: props.id,
            wordsCount,
            trainingType: props.type
        });
        navigate(test.id)
    }, [navigate, props.id])

    const renderTestPreview = useCallback((onOpen: () => void) => {
        return (
            <div className={clsx(styles.systemTestPreview, props.className)} onClick={onOpen}>
                <Typography
                    variant={props.type === TestTypeEnum.TestByUnit ? "p" : "h3"}
                    className={styles.systemTestPreview__name}>
                    {props.name}
                </Typography>
                <Typography className={styles.systemTestPreview__description}>0 / {props.wordsCount}</Typography>
            </div>
        )
    }, [props])

    return <TestWordsModal triggerComponent={renderTestPreview} start={start} maxWordsCount={props.wordsCount}/>;
});
