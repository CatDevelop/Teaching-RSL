import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure} from "@nextui-org/react";
import {ComponentProps} from "../../../../core/models/ComponentProps";
import {typedMemo} from "../../../../core/utils/typedMemo";
import React, {FC, ReactElement, useCallback, useState} from "react";
import {Button} from "../../../../components/Button";
import {Range} from "../../../../components/Range";
import {GetThemeResponse} from "../../../../core/models/themes/GetThemeListResponse";

type Props = ComponentProps & Readonly<{
    triggerComponent: (onOpen: () => void) => ReactElement;
    start: (wordsCount: GetThemeResponse['wordsCount']) => void;
    maxWordsCount: number;
}>;

const MIN_WORDS_COUNT = 10;

export const TestWordsModal: FC<Props> = typedMemo(function TestWordsModal(props) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [wordsCount, setWordsCount] = useState(MIN_WORDS_COUNT);

    const handleWordsChange = useCallback((value: number) => {
        setWordsCount(value);
    }, [setWordsCount]);

    const openModal = useCallback(() => {
        if (props.maxWordsCount < MIN_WORDS_COUNT) {
            props.start(props.maxWordsCount)
        } else {
            onOpen();
        }
    }, [onOpen, props.maxWordsCount, props.start])

    return (
        <>
            {props.triggerComponent(openModal)}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Выберите количество слов</ModalHeader>
                            <ModalBody>
                                <Range min={MIN_WORDS_COUNT} max={props.maxWordsCount} value={wordsCount}
                                       onChange={handleWordsChange}/>
                            </ModalBody>
                            <ModalFooter>
                                <Button variant="faded" onPress={onClose}>
                                    Назад
                                </Button>
                                <Button color="primary" onPress={() => {
                                    props.start(wordsCount)
                                }}>
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
