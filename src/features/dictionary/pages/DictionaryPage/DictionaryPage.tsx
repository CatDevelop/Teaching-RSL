import React, {FC, Suspense, useState} from "react";
import {typedMemo} from "../../../../core/utils/typedMemo";
import styles from "./DictionaryPage.module.css";
import {Typography} from "../../../../components/Typography";
import {Page} from "../../../../components/Page";
import {PageContent} from "../../../../components/PageContent";
import {SideBar} from "../../../../components/SideBar";
import {Card} from "../../../../components/Card";
import {Spinner} from "@nextui-org/react";
import { SelectDictionaryDisplay } from "./SelectDictionaryDisplay";

const tempData = {
    themes: [
        {
            name:'Theme1',
            sections: [
                {
                    name: 'Section1',
                    words: [
                        {
                            word: 'Word1'
                        }
                    ]
                },
                {
                    name: 'Section2',
                    words: [
                        {
                            word: 'Word1'
                        }
                    ]
                }
            ]
        }
    ],
    letters: [
        {
            name: 'Б',
            words: [
                {
                    word: 'Бука'
                },
                {
                    word: 'Бука'
                },
                {
                    word: 'Бука'
                },
            ]
        }
    ]
}

export const DictionaryPage: FC = typedMemo(function DictionaryPage() {
    const [openedSection, setOpenedSection] = useState<any>(null)

    return (
        <Page className={styles.dictionary}>
            <SideBar/>
            <PageContent className={styles.dictionary__pageContent}>
                <Suspense fallback={<Spinner className={styles.dictionary__loading}/>}>
                    <Card className={styles.dictionary__titleContainer}>
                        <Typography
                            variant="h1"
                            className={styles.dictionary__titleContainer__title}
                        >
                            Словарь
                        </Typography>
                        <Typography
                            variant="p"
                            className={styles.dictionary__titleContainer__description}
                        >
                            Здесь можно найти абсолютно все жесты
                        </Typography>
                    </Card>
                    <SelectDictionaryDisplay 
                        themes={tempData.themes} 
                        letters={tempData.letters} 
                        className={styles.dictionary__selectDictionaryDisplay}
                        onSectionClick={setOpenedSection}
                    />
                </Suspense>
            </PageContent>
        </Page>
    )
})
