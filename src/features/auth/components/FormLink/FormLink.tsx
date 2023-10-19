import { typedMemo } from "../../../../core/utils/typedMemo";
import React, { FC } from "react";
import styles from "./FormLink.module.css";
import { Typography } from "../../../../components/Typography";
import { Link } from "../../../../components/Link";
import { ComponentProps } from "../../../../core/models/ComponentProps";
import clsx from "clsx";

type Props = ComponentProps & Readonly<{
    label?: string;
    linkUrl: string;
    linkText: string;
}>

/**
 * Ссылки в форме
 */
export const FormLink: FC<Props> = typedMemo(function FormLink(props){
    return (
        <div className={clsx(styles.formLink, props.className)}>
            <Typography variant="span" className={styles.formLink__label}>
                {props.label} 
                <Link to={props.linkUrl}className={styles.formLink__link}>{props.linkText}</Link>
            </Typography>
        </div>
    )
})