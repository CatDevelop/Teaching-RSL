import React, {FC, ReactElement, useState} from "react";
import {typedMemo} from "../../../../../core/utils/typedMemo";
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure} from "@nextui-org/react";
import {Range} from "../../../../../components/Range";
import {Button} from "../../../../../components/Button";

type Props = Readonly<{
    triggerComponent: (onOpen: () => void) => ReactElement;
}>

export const CreateDictionaryForm: FC<Props> = typedMemo(function CreateDictionaryForm(props){
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <>
            {props.triggerComponent(onOpen)}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Создание теста</ModalHeader>
                            <ModalBody>

                            </ModalBody>
                            <ModalFooter>
                                <Button variant="faded" onPress={onClose}>
                                    Назад
                                </Button>
                                <Button color="primary" onPress={() => {}}>
                                    Начать тест
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
})