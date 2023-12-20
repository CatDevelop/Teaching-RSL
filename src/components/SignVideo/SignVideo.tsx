import React, {FC, useCallback, useEffect, useState} from "react";
import {typedMemo} from "../../core/utils/typedMemo";
import {ComponentProps} from "../../core/models/ComponentProps";
import styles from "./SignVideo.module.css";
import clsx from "clsx";
import {Spinner} from "@nextui-org/react";

type Props = ComponentProps & Readonly<{
    src: string | null;
}>

/**
 * Видео жеста
 */
export const SignVideo: FC<Props> = typedMemo(function SignVideo(props) {
    const [isLoading, setIsLoading] = useState(true)
    const defaultSrc = "https://media.spreadthesign.com/video/mp4/12/320435.mp4"

    useEffect(() => {
        setIsLoading(true)
    }, [props.src]);

    const handleLoadVideo = useCallback(() => setIsLoading(false), [])

    return (
        <div className={clsx(styles.signVideo, props.className)}>
            {
                isLoading &&
                <Spinner className={styles.loader}/>
            }
            <video
                className={clsx(styles.signVideo__video, isLoading && styles.signVideo__video_hide)}
                src={props.src || defaultSrc}
                autoPlay
                loop
                muted
                onCanPlayThrough={handleLoadVideo}
            />
        </div>
    )
});
