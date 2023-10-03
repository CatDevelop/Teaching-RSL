import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { ComponentProps } from "../../../../../../core/models/ComponentProps";
import { typedMemo } from "../../../../../../core/utils/typedMemo";
import React,  { FC, ReactElement, useCallback, useState } from "react";
import { Button } from "../../../../../../components/Button";
import { Range } from "../../../../../../components/Range";
import { GetThemeResponse } from "../../../../../../core/models/themes/GetThemeListResponse";

type Props = ComponentProps & Readonly<{
    triggerComponent: (onOpen: () => void) => ReactElement;
    start: (wordsCount: GetThemeResponse['wordsCount']) => void;
}>;

const MIN_WORDS_COUNT = 10;
const MAX_WORDS_COUNT = 45;

export const TestWordsModal: FC<Props> = typedMemo(function TestWordsModal({
    triggerComponent, 
    start,
}){
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [wordsCount, setWordsCount] = useState(MIN_WORDS_COUNT);

    const handleWordsChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setWordsCount(Number(event.target.value));
    }, []);

    return (
        <>
            {triggerComponent(onOpen)}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                        <ModalHeader className="flex flex-col gap-1">Выберите количество слов</ModalHeader>
                        <ModalBody>
                            <Range min={MIN_WORDS_COUNT} max={MAX_WORDS_COUNT} value={wordsCount} onChange={handleWordsChange} />
                        </ModalBody>
                        <ModalFooter>
                            <Button variant="faded" onPress={onClose}>
                                Назад
                            </Button>
                            <Button color="primary" onPress={() => start(wordsCount)}>
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