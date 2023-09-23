import { typedMemo } from "../../../../../../core/utils/typedMemo";
import React, { FC } from "react";
import styles from "./UserTestPreview.module.css";
import Setting from "../../../../../../assets/images/Settings.svg";
import { Button } from "../../../../../../components/Button";
import { Typography } from "../../../../../../components/Typography";
import { ComponentProps } from "../../../../../../core/models/ComponentProps";
import clsx from "clsx";

type Props = ComponentProps & Readonly<{
    name: string;
    allWordsCount: number;
}>

/** User test preview. */
export const UserTestPreview: FC<Props> = typedMemo(function UserTestPreview(props){
    return (
        <div className={clsx(styles.userTestPreview, props.className)} onClick={() => {}}>
            <div className={styles.userTestPreview__content}>
                <Typography
                    variant="h3"
                    className={styles.userTestPreview__name}>
                    {props.name}
                </Typography>
                <div className={styles.userTestPreview__info}>
                    <Typography className={styles.userTestPreview__description}>{props.allWordsCount}{props.name}</Typography>
                    <div className={styles.userTestPreview__separator}></div>
                    <Button color="primary" variant="light" className={styles.userTestPreview__button} onClick={() => {}}>
                        Скопировать ссылку
                    </Button>
                </div>
            </div>
            <button className={styles.userTestPreview__settings} onClick={() => {}} type="button">
                <img src={Setting} alt="Edit user test" className={styles.userTestPreview__startIcon} />
            </button>
        </div>
    );
});
