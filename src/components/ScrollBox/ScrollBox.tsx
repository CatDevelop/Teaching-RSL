import { FC, PropsWithChildren } from "react";
import { typedMemo } from "../../core/utils/typedMemo";
import styles from "./ScrollBox.module.css";
import { Card } from "../Card";

type Props = PropsWithChildren;

/** Scroll box.  */
export const ScrollBox: FC<Props> = typedMemo(function ScrollBox(props){
    return (
        <Card className={styles.scrollBox}>
            {props.children}
        </Card>
    )
});
