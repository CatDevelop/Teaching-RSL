import React, {FC} from "react";
import {typedMemo} from "../../../../core/utils/typedMemo";
import {Card} from "../../../../components/Card";
import styles from "./ModelWarning.module.css";
import {Typography} from "../../../../components/Typography";
import GitHubLogo from "../../../../assets/images/GitHubLogo.svg";

export const ModelWarning: FC = typedMemo(function ModelWarning() {
    return (
        <Card className={styles.modelWarning__container}>
            <Typography variant={"h3"} className={styles.modelWarning__title}>
                Предупреждение
            </Typography>
            <Typography variant={"p"} className={styles.modelWarning__description}>
                Распознавание работает только при запущенной на локальной машине модели распознавания <br/>
                чтобы развернуть её следуйте
                инструкции в Readme.md данного репозитория:
                <div className={styles.modelWarning__gitLink}>
                    <img src={GitHubLogo} alt="GitHub логотип" />
                    <a href={"https://github.com/CatDevelop/Teaching-RSL/tree/stand"} target={"_blank"} rel="noreferrer">
                        Teaching-RSL
                    </a>
                </div>
            </Typography>
        </Card>
    )
});
