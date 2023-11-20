import React, {FC, PropsWithChildren} from "react";
import {typedMemo} from "../../core/utils/typedMemo";
import styles from "./ScrollBox.module.css";
import clsx from "clsx";
import {ComponentProps} from "../../core/models/ComponentProps";
import {ScrollShadow} from "@nextui-org/react";

type Props = PropsWithChildren & ComponentProps;

/*
    Контейнер со скроллом
*/
export const ScrollBox: FC<Props> = typedMemo(function ScrollBox(props){
    return (
        <div className={styles.container}>
            <ScrollShadow size={10} className={clsx(styles.scrollBox, props.className)}>
                {props.children}
            </ScrollShadow>
        </div>
    )
});
