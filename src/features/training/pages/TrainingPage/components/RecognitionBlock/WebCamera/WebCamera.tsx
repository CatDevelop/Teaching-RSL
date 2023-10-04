import styles from './WebCamera.module.css'
import React, {FC} from "react";
import {typedMemo} from "../../../../../../../core/utils/typedMemo";
import {ComponentProps} from "../../../../../../../core/models/ComponentProps";
import clsx from "clsx";

type Props = ComponentProps & Readonly<{
    isClosing: boolean;
}>

export const WebCamera: FC<Props> = typedMemo(function PracticeSelectWord(props) {
    return (
        <div className={clsx(styles.container, props.isClosing ? styles.close : '')}>
            <video id="webcam" autoPlay style={{transform: 'scale(-1, 1)'}} className={styles.container}></video>
        </div>
    )
});
