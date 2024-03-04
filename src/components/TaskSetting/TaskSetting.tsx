import React, {ChangeEventHandler, FC, useCallback, useEffect} from "react";
import {ComponentProps} from "../../core/models/ComponentProps";
import {typedMemo} from "../../core/utils/typedMemo";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Select,
    SelectItem,
    useDisclosure
} from "@nextui-org/react";
import {Button} from "../Button";
import styles from "./TaskSetting.module.css";
import clsx from "clsx";
import {LocalStorageService} from "../../api/services/localStorageService";

type Props = ComponentProps;

/**
 * Настройки тренировки
 */
export const TaskSetting: FC<Props> = typedMemo(function TaskSetting(props) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [devices, setDevices] = React.useState<MediaDeviceInfo[]>([]);
    const [defaultDevice, setDefaultDevice] = React.useState<string | null>();

    const handleDevices = useCallback((mediaDevices: MediaDeviceInfo[]) => {
        setDevices(mediaDevices.filter(({kind, label}) => kind === "videoinput" && label))
    }, [setDevices]);

    React.useEffect(() => {
        if(!navigator.mediaDevices){
            return
        }
         navigator.mediaDevices.enumerateDevices().then(handleDevices);
        }, [handleDevices]
    );

    const selectDevice: ChangeEventHandler<HTMLSelectElement> = useCallback((e) => {
        LocalStorageService.set('deviceID', e.target.value)
        window.location.reload(); // TODO Надо камеру обновлять
    }, [LocalStorageService])

    useEffect(() => {
        setDefaultDevice(LocalStorageService.get('deviceID'))
    }, []);

    if (devices.length === 0)
        return;

    return (
        <>
            <Button
                className={clsx(styles.taskSetting__openBtn, props.className)}
                variant="light"
                onClick={onOpen}
            >
                Настройки камеры
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Настройка камеры</ModalHeader>
                            <ModalBody>
                                <div className={styles.taskSetting__camera}></div>
                                <Select
                                    label="Камера"
                                    defaultSelectedKeys={[defaultDevice || devices[0].deviceId]}
                                    onChange={selectDevice}
                                >
                                    {
                                        devices.map(device => {
                                            return <SelectItem key={device.deviceId} value={device.deviceId}>
                                                {device.label}
                                            </SelectItem>
                                        })
                                    }
                                </Select>
                            </ModalBody>
                            <ModalFooter className={styles.taskFeedback__actions}>
                                <Button variant="faded" onPress={onClose}>
                                    Назад
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
});
