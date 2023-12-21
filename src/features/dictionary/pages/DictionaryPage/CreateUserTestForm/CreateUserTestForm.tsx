import React, {FC, ReactElement, useState} from "react";
import {typedMemo} from "../../../../../core/utils/typedMemo";
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure} from "@nextui-org/react";
import {Button} from "../../../../../components/Button";
import {Input} from "../../../../../components/Input";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {schema} from "../../../../auth/pages/LoginPage/LoginPage.settings";

type Props = Readonly<{
    triggerComponent: (onOpen: () => void) => ReactElement;
}>

export const CreateUserTestForm: FC<Props> = typedMemo(function CreateUserTestForm(props){
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<{name: string}>({resolver: yupResolver(schema)})

    return (
        <>
            {props.triggerComponent(onOpen)}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Создание теста</ModalHeader>
                            <ModalBody>
                                <Input
                                    label="Название теста"
                                    isInvalid={errors.name !== undefined}
                                    color={errors.name !== undefined ? "danger" : "default"}
                                    errorMessage={errors.name?.message}
                                    {...register('name')}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button variant="faded" onPress={onClose}>
                                    Назад
                                </Button>
                                <Button color="primary" onPress={() => {}}>
                                    Создать тест
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
})