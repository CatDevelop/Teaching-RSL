import React, {FC, ReactElement, useCallback, useEffect, useState} from "react";
import {typedMemo} from "../../../../../core/utils/typedMemo";
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure} from "@nextui-org/react";
import {Button} from "../../../../../components/Button";
import {Input} from "../../../../../components/Input";
import {Resolver, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from 'yup';
import { CreateUserTestRequest } from "core/models/training/CreateUserTestRequest";
import { useMutation } from "react-query";
import { TrainingService } from "api/services/training";
import { useNavigate } from "react-router-dom";
import { SelectUserTestWords } from "./SelectUserTestWords";

type Props = Readonly<{
    triggerComponent: (onOpen: () => void) => ReactElement;
}>

const validationSchema = Yup.object({
    testName: Yup.string().trim().required('Введите название теста'),
    wordIdList: Yup.array().min(1, 'Выберите слова')
})

export const CreateUserTestForm: FC<Props> = typedMemo(function CreateUserTestForm(props){
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        resetField,
        formState: { errors },
    } = useForm<CreateUserTestRequest>({resolver: yupResolver(validationSchema) as Resolver<CreateUserTestRequest>})

    const navigate = useNavigate();
    const {mutate: create} = useMutation(TrainingService.createUserTest, {
        onSuccess: data => {
            navigate(`/training/${data.id}`)
        }
    })

    const onSubmit = useCallback((data: CreateUserTestRequest) => {
        create(data)
    }, [create]) 

    useEffect(() => {
        reset();
    }, [isOpen, reset])

    return (
        <>
            {props.triggerComponent(onOpen)}
            {isOpen && 
                <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Создание теста</ModalHeader>
                                <ModalBody>
                                    <Input
                                        label="Название теста"
                                        isInvalid={errors.testName !== undefined}
                                        color={errors.testName !== undefined ? "danger" : "default"}
                                        errorMessage={errors.testName?.message}
                                        {...register('testName')}
                                    />
                                    <SelectUserTestWords onChangeWordIds={ids => setValue('wordIdList', ids)}/>
                                </ModalBody>
                                <ModalFooter>
                                    <Button variant="faded" onPress={onClose}>
                                        Назад
                                    </Button>
                                    <Button color="primary" onClick={handleSubmit(onSubmit)} type="submit">
                                        Создать тест
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            }
        </>
    )
})