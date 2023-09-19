import { FC, PropsWithChildren } from "react";
import { typedMemo } from "../../core/utils/typedMemo";
import styles from "./ScrollBox.module.css";
import { Card } from "../Card";
import clsx from "clsx";
import { ComponentProps } from "../../core/models/ComponentProps";

type Props = PropsWithChildren & ComponentProps;

/** Scroll box.  */
export const ScrollBox: FC<Props> = typedMemo(function ScrollBox(props){
    return (
        <Card className={clsx(styles.scrollBox, props.className)}>
            {props.children}
        </Card>
    )
});
