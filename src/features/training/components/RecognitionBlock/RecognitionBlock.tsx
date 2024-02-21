import {Card} from "../../../../components/Card";
import {typedMemo} from "../../../../core/utils/typedMemo";
import React, {Dispatch, FC, ReactElement, SetStateAction, useCallback, useEffect, useState} from "react";
import styles from "./RecognitionBlock.module.css";
import {Typography} from "../../../../components/Typography";
import {ComponentProps} from "../../../../core/models/ComponentProps";
import clsx from "clsx";
import {WebCamera} from "../WebCamera/WebCamera";
import {Spinner} from "@nextui-org/react";
import {TimeoutId} from "@reduxjs/toolkit/dist/query/core/buildMiddleware/types";
import {WordInTest} from "../../../../core/models/training/GetTestResponse";
import {stopAllTracks} from "../../../../core/utils/stopAllTracks";
import {socket} from "../../../../core/utils/connectToModal";
import {Button} from "../../../../components/Button";
import {TaskSetting} from "components/TaskSetting";
import {TaskFeedback} from "../../../../components/TaskFeedback";
import {LocalStorageService} from "../../../../api/services/localStorageService";

type Props = ComponentProps & Readonly<{
    word: WordInTest;
    onSuccess: () => void;
    intervalID: TimeoutId | undefined;
    setIntervalID: Dispatch<SetStateAction<TimeoutId | undefined>>;
    signRecognizeText: string[]
    setSignRecognizeText: Dispatch<SetStateAction<string[]>>;
    buttons?: ReactElement;
}>

export const RecognitionBlock: FC<Props> = typedMemo(function RecognitionBlock(props) {
    let videoElement: any;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const [isWasSuccess, setIsWasSuccess] = useState(false)
    const [defaultDevice, setDefaultDevice] = React.useState<string | null>();

    useEffect(() => {
        setIsWasSuccess(false)
    }, [props.word]);

    const onConnectToModal = useCallback(() => {
        console.log("Connected to server");
    }, [])

    const onDisconnectFromModal = useCallback(() => {
        console.log("Disconnect");
        socket.connect()
    }, [])

    const onReceiveText = useCallback((text: string) => {
        let results: string[] = Object.values(JSON.parse(text))
        if(props.signRecognizeText.at(-1) !== results[0].toLowerCase())
            props.setSignRecognizeText([...props.signRecognizeText, results[0].toLowerCase()])
    }, [props.setSignRecognizeText, props.signRecognizeText, props])

    useEffect(() => {
        socket.on("send_not_normalize_text", onReceiveText);
        return () => {
            socket.off("send_not_normalize_text", onReceiveText)
        }
    }, [onReceiveText]);


    const startWebcam = useCallback(async (addFrameSender: () => void, device: string) => {
        try {
            stopAllTracks(videoElement.srcObject)
            videoElement.srcObject = await navigator.mediaDevices.getUserMedia({video: {deviceId: device || ""}});
            videoElement.addEventListener('play', addFrameSender, {once: true});
        } catch (error) {
            console.error('Error accessing webcam:', error);
        }

        return () => {
            videoElement.removeEventListener('play', addFrameSender, {once: true});
            stopAllTracks(videoElement.srcObject)
        }
    }, [videoElement, props.intervalID, defaultDevice])

    const addFrameSender = useCallback(() => {
        let id = setInterval(() => {
            console.log("Send frame")
            const originalWidth = videoElement.videoWidth;
            const originalHeight = videoElement.videoHeight;
            const aspectRatio = originalWidth / originalHeight;
            let newWidth = 224;
            // let newHeight = newWidth / aspectRatio;
            let newHeight = 224;

            canvas.width = 224;
            canvas.height = 224;

            context?.drawImage(videoElement, 0, (224 - newHeight) / 2, newWidth, newHeight);
            const image = canvas.toDataURL('image/jpeg');
            socket.emit("data", image);
        }, 30);
        props.setIntervalID(id)
    }, [context, canvas, videoElement, props.setIntervalID])


    useEffect(() => {
        socket.connect()

        socket.on("connect", onConnectToModal);
        socket.on("disconnect", onDisconnectFromModal);

        videoElement = document.getElementById('webcam');
        const device: string = LocalStorageService.get('deviceID') || ""
        if (videoElement)
            startWebcam(addFrameSender, device);

        return () => {
            socket.off("connect", onConnectToModal);
            socket.off("disconnect", onDisconnectFromModal);
            socket.disconnect();
            videoElement.removeEventListener('play', addFrameSender);
            stopAllTracks(videoElement.srcObject)
        }
    }, []);

    useEffect(() => {
        return () => clearInterval(props.intervalID)
    }, [props.intervalID])

    useEffect(() => {
        console.log(props.signRecognizeText, props)
        if (!isWasSuccess && props.signRecognizeText.includes(props.word.word?.toLowerCase() ?? '') ) {
            console.log("SUCCESS")
            props.onSuccess()
            setIsWasSuccess(true)
        }
    }, [props.signRecognizeText])

    if (!props)
        return;

    return (
        <Card className={clsx(styles.recognitionBlock, props.className)}>
            <div className={styles.recognitionBlock__wordHeader}>
                <div className={styles.recognitionBlock__wordHeader__title}>
                    <Typography variant="h2" className={styles.recognitionBlock__gesture}>
                        {props.word.word}
                    </Typography>
                    <Typography variant="span" className={styles.recognitionBlock__title}>
                        Покажите жест в камеру
                    </Typography>
                </div>
                <div className={styles.recognitionBlock__wordHeader__buttons}>
                    <TaskSetting className={styles.recognitionBlock__cameraSettingsButton}/>
                    <TaskFeedback
                        className={styles.recognitionBlock__errorButton}
                        text="Сообщить об ошибке"
                        items={
                            [
                                {
                                    id: "0",
                                    label: "Мой ответ следовало принять"
                                },
                                {
                                    id: "1",
                                    label: "Слова не распознаются"
                                },
                                {
                                    id: "2",
                                    label: "Задание некорректное"
                                },
                                {
                                    id: "3",
                                    label: "Что-то ещё пошло не так"
                                }
                            ]
                        }/>
                </div>
            </div>

            <div className={styles.recognitionBlock__cameraAndRec}>
                <div className={styles.recognitionBlock__camera}>
                    <Spinner className={styles.recognitionBlock__cameraLoading}/>
                    <WebCamera/>
                </div>

                <div className={styles.recognitionBlock__recognizedContainer}>
                    <Typography variant="h3" className={styles.recognitionBlock__recognized}>
                        Распознанные жесты
                    </Typography>
                    <div className={clsx(styles.recognitionBlock__recognizedWords)}>
                        {
                            props.signRecognizeText.slice(-6).map(word => {
                                return (
                                    <Typography
                                        variant="span"
                                        className={clsx(
                                            styles.recognitionBlock__recognizedWord,
                                            word.toLowerCase() === props.word.word?.toLowerCase() && styles.recognitionBlock__rightWord
                                        )}
                                    >
                                        {word}
                                    </Typography>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            {props.buttons}
        </Card>
    );
});
