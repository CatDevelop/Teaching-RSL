import React, {FC} from "react";
import {typedMemo} from "core/utils/typedMemo";
import {ComponentProps} from "core/models/ComponentProps";
import {Link} from "react-router-dom";
import {ArrowIcon} from "../Icons";
import styles from "./Back.module.css"

type Props = ComponentProps & Readonly<{
    to: string;
}>

/**
 * Ссылка Назад
 */
export const Back: FC<Props> = typedMemo(function Back(props) {
    return (
        <Link to={props.to} className={styles.back}>
            <ArrowIcon className={styles.back__icon}/>
            Назад
        </Link>
    )
})