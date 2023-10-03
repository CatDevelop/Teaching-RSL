import React, { FC, useCallback } from "react";
import clsx from "clsx";
import { typedMemo } from "../../../../../../../../core/utils/typedMemo";
import Arrow from "../../../../../../../../assets/images/Arrow.svg";
import { Typography } from "../../../../../../../../components/Typography";
import { ComponentProps } from "../../../../../../../../core/models/ComponentProps";
import { TestWordsModal } from "../../../TestWordsModal";
import styles from "./SystemTestPreview.module.css";
import { GetUnitResponse } from "../../../../../../../../core/models/GetUnitResponse";
import { useNavigate } from "react-router-dom";
import { GetThemeResponse } from "../../../../../../../../core/models/themes/GetThemeListResponse";

type Props = ComponentProps & GetUnitResponse;

/** System test preview. */
export const SystemTestPreview: FC<Props> = typedMemo(function SystemTestPreview(props){

    const navigate = useNavigate();

    const start = useCallback((wordsCount: GetThemeResponse['wordsCount']) => {
        
    }, [navigate])

    const renderTestPreview = useCallback((onOpen: () => void) => {
        return (
            <div className={clsx(styles.systemTestPreview, props.className)} onClick={onOpen} style={{backgroundColor: "#AE7EDE"}}>
                <div className={styles.systemTestPreview__content}>
                    <Typography
                        variant="h3"
                        className={styles.systemTestPreview__name}>
                        {props.name}
                    </Typography>
                    <div className={styles.systemTestPreview__info}>
                        <Typography className={styles.systemTestPreview__description}>Тест к разделу</Typography>
                        <div className={styles.systemTestPreview__separator}></div>
                        <Typography className={styles.systemTestPreview__description}>{props.wordsCount} из {props.wordsCount} слов пройдено</Typography>
                    </div>
                </div>
                <button className={styles.systemTestPreview__start} type="button">
                    <img src={Arrow} alt="Start test" className={styles.systemTestPreview__startIcon} />
                </button>
            </div>
        )
    },[props])

    return <TestWordsModal triggerComponent={renderTestPreview} />;
});
