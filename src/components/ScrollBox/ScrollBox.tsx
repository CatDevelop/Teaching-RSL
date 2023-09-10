import { FC, PropsWithChildren } from "react";
import { typedMemo } from "../../core/utils/typedMemo";
import styles from "./ScrollBox.module.css";

type Props = PropsWithChildren;

/** Scroll box.  */
export const ScrollBox: FC<Props> = typedMemo(function ScrollBox(props){
    return (
        <div className={styles['scroll-box']}>
            {props.children}
        </div>
    )
});
