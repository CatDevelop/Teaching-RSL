import React,  { FC } from "react";
import { Link as RouterLink, LinkProps } from "react-router-dom";
import { clsx } from "clsx";
import { typedMemo } from "../../core/utils/typedMemo";
import styles from "./Link.module.css";

type Props = LinkProps;

/** Link. */
export const Link: FC<Props> = typedMemo(function Link(props){
    return <RouterLink {...props} className={clsx(styles.link, props.className)} />;
});
