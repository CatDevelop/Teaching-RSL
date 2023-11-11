import React, { FC } from "react";
import { ComponentProps } from "../../core/models/ComponentProps";
import { typedMemo } from "../../core/utils/typedMemo";
import Setting from "../../assets/images/Settings.svg";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from "@nextui-org/react";
import { Button } from "../Button";
import styles from "./TaskSetting.module.css";

type Props = ComponentProps;

/** 
 * Настройки тренировки
*/
export const TaskSetting: FC<Props> = typedMemo(function TaskSetting({
    className,
}){
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <>
            <Button 
                className={className}
                variant="faded"
                onClick={onOpen}
                endContent={<img src={Setting} alt="Change training setting"/>}
            >
                Настройки
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                        <ModalHeader className="flex flex-col gap-1">Настройка камеры</ModalHeader>
                        <ModalBody>
                          <div className={styles.taskSetting__camera}></div>
                          <Select label="Камера">
                            {[0,0,0].map((_, i) => (
                                <SelectItem key={i} value={i}>
                                    Камера
                                </SelectItem>
                            ))}
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
