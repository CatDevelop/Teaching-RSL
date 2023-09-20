import {typedMemo} from "../../../../core/utils/typedMemo";
import React, {FC} from "react";
import styles from "./UserTestPreview.module.css";
import Setting from "../../../../assets/images/Settings.svg";
import {Button} from "../../../../components/Button";

type Props = Readonly<{
    name: string;
    allWordsCount: number;
}>

/** User test preview. */
export const UserTestPreview: FC<Props> = typedMemo(function UserTestPreview(props){
    return (
        <div className={styles.userTestPreview} onClick={() => {}}>
            <div className={styles.userTestPreview__content}>
                <p className={styles.userTestPreview__name}>{props.name}</p>
                <div className={styles.userTestPreview__info}>
                    <p className={styles.userTestPreview__description}>{props.allWordsCount} слов</p>
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
