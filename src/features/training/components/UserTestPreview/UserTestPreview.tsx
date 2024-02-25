import React, { FC, useCallback } from "react";
import clsx from "clsx";
import { typedMemo } from "../../../../core/utils/typedMemo";
import { Button } from "../../../../components/Button";
import { Typography } from "../../../../components/Typography";
import { ComponentProps } from "../../../../core/models/ComponentProps";
import { TestWordsModal } from "../TestWordsModal";
import styles from "./UserTestPreview.module.css";
import {useNavigate} from "react-router-dom";
import {normalizeCountForm} from "../../../../core/utils/normalizeCountForm";
import {toast} from "react-toastify";

type Props = ComponentProps & Readonly<{
    name: string;
    wordsCount: number;
    id: string;
}>

/**
 * User test preview
 */
export const UserTestPreview: FC<Props> = typedMemo(function UserTestPreview(props){
    const navigate = useNavigate();

    const start = useCallback(() => {
        navigate(props.id)
    }, [navigate, props.id])

    const renderTestPreview = useCallback((onOpen: () => void) => {
        return (
            <div className={clsx(styles.userTestPreview, props.className)} onClick={onOpen}>
                <div className={styles.userTestPreview__content}>
                    <Typography
                        variant="h3"
                        className={styles.userTestPreview__name}>
                        {props.name}
                    </Typography>
                    <div className={styles.userTestPreview__info}>
                        <Typography className={styles.userTestPreview__description}>
                            {props.wordsCount} {normalizeCountForm(props.wordsCount, ["слово", "слова", "слов"])}
                        </Typography>
                        <Button
                            color="primary"
                            variant="light"
                            className={styles.userTestPreview__button}
                            onClick={() => {
                                navigator.clipboard.writeText("http://изучение-ржя.рф/training/"+props.id).then(() => {
                                    toast.success("Ссылка успешно скопирована!")
                                })
                            }}
                        >
                            Скопировать ссылку
                        </Button>
                    </div>
                </div>
            </div>
        )
    },[props])

    return <TestWordsModal triggerComponent={renderTestPreview} start={start} maxWordsCount={props.wordsCount} />;
});
