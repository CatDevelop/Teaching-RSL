import React, {FC, useCallback} from "react";
import clsx from "clsx";
import {typedMemo} from "../../../../core/utils/typedMemo";
import {ComponentProps} from "../../../../core/models/ComponentProps";
import styles from "./SystemTestPreview.module.css";
import {GetUnitResponse} from "../../../../core/models/unit/GetUnitResponse";
import {useNavigate} from "react-router-dom";
import {GetThemeResponse} from "../../../../core/models/themes/GetThemeListResponse";
import {TrainingService} from "../../../../api/services/training";
import {TestTypeEnum} from "../../../../core/models/themes/TestTypeEnum";
import {ThemeCatalogPresentation} from "../../../../components/TULCatalogPresentations/ThemeCatalogPresentation";
import {UnitCatalogPresentation} from "../../../../components/TULCatalogPresentations/UnitCatalogPresentation";
import {LevelCatalogPresentation} from "../../../../components/TULCatalogPresentations/LevelCatalogPresentation";

type Props = ComponentProps & GetUnitResponse & {
    type: TestTypeEnum;
    disabled?: boolean;
    number?: number;
};

/**
 * System test preview
 */
export const SystemTestPreview: FC<Props> = typedMemo(function SystemTestPreview(props) {
    const navigate = useNavigate();

    const start = useCallback(async (wordsCount: GetThemeResponse['wordsCount']) => {
        const test = await TrainingService.postTrainingCreate({
            id: props.id,
            wordsCount,
            trainingType: props.type
        });
        navigate(test.id)
    }, [navigate, props])

    return (
        <div className={clsx(styles.systemTestPreview, props.className)} onClick={() => start(props.wordsCount)}>
            {
                props.type === TestTypeEnum.TestByTheme &&
                <ThemeCatalogPresentation
                    id={props.id}
                    name={props.name}
                    completeWordsCount={props.completedWordsCount || 0}
                    allWordsCount={props.wordsCount}
                />
            }

            {
                props.type === TestTypeEnum.TestByUnit &&
                <UnitCatalogPresentation
                    id={props.id}
                    name={props.name}
                    completeWordsCount={props.completedWordsCount || 0}
                    allWordsCount={props.wordsCount}
                />
            }

            {
                props.type === TestTypeEnum.TestByLevel &&
                <LevelCatalogPresentation
                    id={props.id}
                    completeWordsCount={0}
                    allWordsCount={props.wordsCount}
                    disabled={props.disabled || false}
                    number={props.number || 0}/>
            }
        </div>
    );
});
