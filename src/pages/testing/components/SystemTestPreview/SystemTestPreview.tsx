import { typedMemo } from "../../../../core/utils/typedMemo";
import { FC } from "react";
import styles from "./SystemTestPreview.module.css";
import Arrow from "../../../../assets/images/Arrow.svg";
import clsx from "clsx";

type Props = Readonly<{
    name: string;
    allWordsCount: number;
    passedWordsCount: number;
    onClick: () => void;
    className?: string;
}>

/** Плашка с описанием теста. */
export const SystemTestPreview: FC<Props> = typedMemo(function SystemTestPreview(props){
    return (
        <div className={clsx(styles.systemTestPreview, props.className)} onClick={props.onClick}>
            <div className={styles.systemTestPreview__content}>
                <p className={styles.systemTestPreview__name}>{props.name}</p>
                <div className={styles.systemTestPreview__info}>
                    <p className={styles.systemTestPreview__description}>Тест к разделу</p>
                    <div className={styles.systemTestPreview__separator}></div>
                    <p className={styles.systemTestPreview__description}>{props.passedWordsCount} из {props.allWordsCount} слов пройдено</p>
                </div>
            </div>
            <div className={styles.systemTestPreview__start}>
                <img src={Arrow} alt="Start test" className={styles.systemTestPreview__startIcon} />
            </div>
        </div>
    );
});
