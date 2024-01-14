import React, {FC} from "react";
import {typedMemo} from "core/utils/typedMemo";
import {ComponentProps} from "core/models/ComponentProps";
import {Link} from "react-router-dom";
import {ArrowIcon} from "../Icons";
import styles from "./Back.module.css"

type Props = ComponentProps & Readonly<{
    to: string;
    type?: 'icon' | 'text'
}>

/*
    Ссылка назад
*/
export const Back: FC<Props> = typedMemo(function Back({type = 'text', ...props}) {
    if (type === 'icon') {
        return (
            <Link to={props.to} className={styles.back_type_icon}>
                <ArrowIcon className={styles.back__icon}/>
            </Link>
        )
    }

    return (
        <Link to={props.to} className={styles.back}>
            <ArrowIcon className={styles.back__icon}/>
            Назад
        </Link>
    )
})
