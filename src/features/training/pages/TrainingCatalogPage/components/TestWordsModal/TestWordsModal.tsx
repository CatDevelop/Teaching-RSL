import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { ComponentProps } from "../../../../../../core/models/ComponentProps";
import { typedMemo } from "../../../../../../core/utils/typedMemo";
import React,  { FC, ReactElement } from "react";
import { Button } from "../../../../../../components/Button";

type Props = ComponentProps & Readonly<{
    triggerComponent: (onOpen: () => void) => ReactElement;
}>;

export const TestWordsModal: FC<Props> = typedMemo(function TestWordsModal({
    triggerComponent
}){
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <>
            {triggerComponent(onOpen)}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1">Выберите количество слов</ModalHeader>
                    <ModalBody>
                        body
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="faded" onPress={onClose}>
                            Назад
                        </Button>
                        <Button color="primary" onPress={onClose}>
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