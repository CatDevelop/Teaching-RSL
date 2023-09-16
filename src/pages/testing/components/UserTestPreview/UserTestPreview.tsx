import { typedMemo } from "../../../../core/utils/typedMemo";
import { FC } from "react";
import styles from "./UserTestPreview.module.css";
import Setting from "../../../../assets/images/Settings.svg";
import { Button } from "../../../../components/Button";

type Props = Readonly<{
    name: string;
    allWordsCount: number;
}>

/** Плашка с описанием пользовательского теста. */
export const UserTestPreview: FC<Props> = typedMemo(function UserTestPreview(props){
    return (
        <div className={styles.userTestPreview} onClick={() => {}}>
            <div className={styles.userTestPreview__content}>
                <p className={styles.userTestPreview__name}>{props.name}</p>
                <div className={styles.userTestPreview__info}>
                    <p className={styles.userTestPreview__description}>{props.allWordsCount}</p>
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
