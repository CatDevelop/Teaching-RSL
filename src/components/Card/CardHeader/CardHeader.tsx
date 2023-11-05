import React, {FC, PropsWithChildren} from "react";
import {typedMemo} from "../../../core/utils/typedMemo";
import styles from "./CardHeader.module.css"
import {Typography} from "../../Typography";
import {ComponentProps} from "../../../core/models/ComponentProps";
import clsx from "clsx";

type Props = ComponentProps & PropsWithChildren;

/**
 * Стандартный заголовок карточки
 */
export const CardHeader:FC<Props> = typedMemo(function CardHeader(props){
    return (
        <Typography variant='h2' className={clsx(styles.cardHeader, props.className)}>{props.children}</Typography>
    )
})