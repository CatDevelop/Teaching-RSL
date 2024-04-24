import React, {
    DetailedHTMLProps,
    FC,
    MediaHTMLAttributes,
    ReactNode,
    useCallback,
    useEffect,
    useRef,
    useState
} from 'react';
import {typedMemo} from "../../core/utils/typedMemo";
import {ComponentProps} from "../../core/models/ComponentProps";
import clsx from "clsx";
import styles from "./Video.module.css";
import {ReactComponent as Play} from 'assets/images/Play.svg';
import {ReactComponent as Pause} from 'assets/images/Pause.svg';
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import {useZoomWithDragging} from "../../core/hooks/useZoom";

export type Props =
    ComponentProps &
    DetailedHTMLProps<MediaHTMLAttributes<HTMLVideoElement>, HTMLVideoElement> &
    {
        /**
         * Дополнительные контролы слева
         */
        controlsLeft?: ReactNode;

        /**
         * Дополнительные контролы по центру
         */
        controlsCenter?: ReactNode;

        /**
         * Дополнительные контроллы справа
         */
        controlsRight?: ReactNode;
    }

const PLAY_RATES = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

/**
 * Видео с кастомными контролами
 */
export const Video: FC<Props> = typedMemo(function Video({
                                                             controls,
                                                             className,
    controlsCenter,
    controlsLeft,
    controlsRight,
                                                             ...videoProps
                                                         }) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isPlayed, setIsPlayed] = useState(false)
    const [rate, setRate] = useState(1)
    const {scale, onScaleUp, onScaleDown, position} = useZoomWithDragging(videoRef.current)

    const onPlay = useCallback(() => {
        videoRef.current?.play();
        setIsPlayed(true)
    }, [videoRef.current])

    const onPause = useCallback(() => {
        videoRef.current?.pause();
        setIsPlayed(false)
    }, [videoRef.current])

    const changeActiveRate = useCallback((rate: number) => {
        if (videoRef.current) {
            videoRef.current.playbackRate = rate
            setRate(rate)
        }
    }, [])

    return (
        <div className={clsx(styles.video, className)}>
            <video
                {...videoProps}
                ref={videoRef}
                onPlay={onPlay}
                style={{
                    transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
                    cursor: controls ? 'move' : ''
                }}
                onPause={onPause}
            />

            {controls &&
                <div className={styles.controls}>
                    <div className={styles.controlsLeft}>
                        {
                            isPlayed ?
                                <button className={styles.controlButton} onClick={onPause}>
                                    <Pause className={styles.controlButtonIcon}/>
                                </button> :
                                <button className={styles.controlButton} onClick={onPlay}>
                                    <Play className={styles.controlButtonIcon}/>
                                </button>
                        }
                        <Dropdown>
                            <Dropdown>
                                <DropdownTrigger>
                                    <button className={styles.controlButton}>
                                        {rate}x
                                    </button>
                                </DropdownTrigger>
                                <DropdownMenu aria-label="playback rates">
                                    {PLAY_RATES.map(rate => (
                                        <DropdownItem key={rate} onClick={() => changeActiveRate(rate)}>
                                            {rate}x
                                        </DropdownItem>
                                    ))}
                                </DropdownMenu>
                            </Dropdown>
                            );
                        </Dropdown>
                        {controlsLeft}
                    </div>

                    <div className={styles.controlsCenter}>
                        {controlsCenter}
                    </div>

                    <div className={styles.controlsRight}>
                        <button className={styles.controlButton} onClick={onScaleUp}>
                            +
                        </button>
                        <button className={styles.controlButton} onClick={onScaleDown}>
                            -
                        </button>
                        {controlsRight}
                    </div>
                </div>
            }
        </div>
    );
})
