import {typedMemo} from "../../../../core/utils/typedMemo";
import React, {FC, useCallback} from "react";
import {ComponentProps} from "../../../../core/models/ComponentProps";
import {Button} from "../../../../components/Button";
import {useNavigate} from "react-router-dom";
import {TrainingService} from "api/services/training";
import {GetThemeResponse} from "core/models/themes/GetThemeListResponse";
import {TestWordsModal} from "../TestWordsModal";
import {TestTypeEnum} from "core/models/themes/TestTypeEnum";

type Props = ComponentProps & Readonly<{
}>

const RANDOM_TEST_MAX_WORDS_COUNT = 50

export const RandomTestButton: FC<Props> = typedMemo(function RecognitionBlock(props) {
    const navigate = useNavigate();

    const start = useCallback(async (wordsCount: GetThemeResponse['wordsCount'] ) => {
        const test = await TrainingService.postTrainingCreate({wordsCount, trainingType: TestTypeEnum.RandomTest});
        navigate(test.id)
    }, [navigate])

    const renderTestPreview = useCallback((onOpen: () => void) => {
        return (
            <Button color="primary" variant="light" onClick={onOpen}>Create a random test</Button>
        )
    }, []);

    return <TestWordsModal triggerComponent={renderTestPreview} start={start} maxWordsCount={RANDOM_TEST_MAX_WORDS_COUNT}/>;
});
