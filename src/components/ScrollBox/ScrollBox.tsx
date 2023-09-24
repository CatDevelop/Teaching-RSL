import React, { FC, PropsWithChildren } from "react";
import { typedMemo } from "../../core/utils/typedMemo";
import styles from "./ScrollBox.module.css";
import { Card } from "../Card";
import clsx from "clsx";
import { ComponentProps } from "../../core/models/ComponentProps";

type Props = PropsWithChildren & ComponentProps;

/** Scroll box.  */
export const ScrollBox: FC<Props> = typedMemo(function ScrollBox(props){
    return (
        <Card className={styles.scrollBox}>
            <div className={clsx(styles.scrollBox__scroll, props.className)}>
                {props.children}
            </div>
        </Card>
    )
});
