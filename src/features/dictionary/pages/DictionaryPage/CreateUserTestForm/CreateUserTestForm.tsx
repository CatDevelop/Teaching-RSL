import React, {FC, ReactElement, useCallback, useEffect} from "react";
import {typedMemo} from "../../../../../core/utils/typedMemo";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure
} from "@nextui-org/react";
import {Button} from "../../../../../components/Button";
import {Input} from "../../../../../components/Input";
import {Resolver, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from 'yup';
import { CreateUserTestRequest } from "core/models/training/CreateUserTestRequest";
import {useMutation} from "react-query";
import { TrainingService } from "api/services/training";
import { useNavigate } from "react-router-dom";
import { UserTestStorageService } from "api/services/userTestStorageService";
import styles from './CreateUserTestForm.module.css'
import {SelectUserTestWords} from "./SelectUserTestWords";

type Props = Readonly<{
    triggerComponent: (onOpen: () => void) => ReactElement;
    onChangeWords?: () => void;
}>

const validationSchema = Yup.object({
    testName: Yup.string().trim().required('Enter test name'),
    wordIdList: Yup.array().min(1, 'Сhoose words')
})

/**
 * Форма создания пользовательского теста
 */
export const CreateUserTestForm: FC<Props> = typedMemo(function CreateUserTestForm(props){
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<CreateUserTestRequest>({resolver: yupResolver(validationSchema) as Resolver<CreateUserTestRequest>})

    const navigate = useNavigate();
    const {mutate: create} = useMutation(TrainingService.createUserTest, {
        onSuccess: data => {
            navigate(`/training/${data.id}`)
        }
    })

    const onChangeWordIds = useCallback((wordIds: string[]) => {
        setValue('wordIdList', wordIds);
        props.onChangeWords?.();
    }, [])

    const onSubmit = useCallback((data: CreateUserTestRequest) => {
        create(data)
        data.wordIdList?.forEach(id => UserTestStorageService.deleteWord(id));
    }, [create])

    useEffect(() => {
        reset();
    }, [isOpen, reset])

    return (
        <>
            {props.triggerComponent(onOpen)}
            {isOpen &&
                <Modal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                >
                    <ModalContent className={styles.modalContent}>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Creating a test</ModalHeader>
                                <ModalBody>
                                    <SelectUserTestWords onChangeWordIds={onChangeWordIds}/>
                                    <Input
                                        label="Test name"
                                        isInvalid={errors.testName !== undefined}
                                        color={errors.testName !== undefined ? "danger" : "default"}
                                        errorMessage={errors.testName?.message}
                                        {...register('testName')}
                                    />
                                </ModalBody>
                                <ModalFooter>
                                    <Button variant="faded" onPress={onClose}>
                                        Back
                                    </Button>
                                    <Button color="primary" onClick={handleSubmit(onSubmit)} type="submit">
                                        Create a test
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
