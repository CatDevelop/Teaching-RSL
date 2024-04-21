import React, {FC, useCallback, useEffect, useState} from "react";
import {typedMemo} from "../../core/utils/typedMemo";
import {ComponentProps} from "../../core/models/ComponentProps";
import styles from "./SignVideo.module.css";
import clsx from "clsx";
import {Spinner} from "@nextui-org/react";
import {Video} from "../Video/Video";
import {MaterialModal} from "../MaterialModal/MaterialModal";

type Props = ComponentProps & Readonly<{
    src: string | null;
}>


/**
 * Видео жеста
 */
export const SignVideo: FC<Props> = typedMemo(function SignVideo(props) {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
    }, [props.src]);

    const handleLoadVideo = useCallback(() => setIsLoading(false), [])

    if(!props.src){
        return null
    }
    return (
        <div className={clsx(styles.signVideo, props.className)}>
            {
                isLoading &&
                <Spinner className={styles.loader}/>
            }
            <MaterialModal
                className={clsx(styles.signVideo__video, isLoading && styles.signVideo__video_hide)}
                material={<Video
                    src={props.src}
                    autoPlay
                    loop
                    muted
                    onCanPlayThrough={handleLoadVideo}
                />}
                expandedMaterial={
                    <Video
                        src={props.src}
                        autoPlay
                        loop
                        muted
                        controls
                        onCanPlayThrough={handleLoadVideo}
                    />
                }
            />
        </div>
    )
});
