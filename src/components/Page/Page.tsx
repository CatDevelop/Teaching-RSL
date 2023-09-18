import { typedMemo } from "../../core/utils/typedMemo";
import { FC, PropsWithChildren } from "react";
import styles from "./Page.module.css";
import clsx from "clsx";

type Props = PropsWithChildren & Readonly<{
    className?: string;
}>;

export const Page: FC<Props> = typedMemo(function Page(props){
    return <div className={clsx(styles.page, props.className)}>
        {props.children}
    </div>
})