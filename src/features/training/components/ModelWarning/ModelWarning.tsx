import React, {FC} from "react";
import {typedMemo} from "../../../../core/utils/typedMemo";
import {Card} from "../../../../components/Card";
import styles from "./ModelWarning.module.css";
import {Typography} from "../../../../components/Typography";
import {clsx} from "clsx";
import {ComponentProps} from "../../../../core/models/ComponentProps";

export const ModelWarning: FC<ComponentProps> = typedMemo(function ModelWarning(props) {
    return (
        <Card className={clsx(styles.modelWarning__container, props.className)}>
            <Typography variant={"h3"} className={styles.modelWarning__title}>
                Произошла ошибка 🤖💔
            </Typography>
            <Typography variant={"p"} className={styles.modelWarning__description}>
                Распознавание работает только при запущенной на сервере модели распознавания.
                Чтобы запустить её обратитесь к
                <div className={styles.modelWarning__gitLink}>
                    <a href={"https://t.me/roma_cheby"} target={"_blank"} rel="noreferrer">
                        @roma_cheby
                    </a>
                </div>
            </Typography>
        </Card>
    )
});
