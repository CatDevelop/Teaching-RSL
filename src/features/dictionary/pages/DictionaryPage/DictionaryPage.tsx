import React, {FC, Suspense, useState} from "react";
import {typedMemo} from "../../../../core/utils/typedMemo";
import styles from "./DictionaryPage.module.css";
import {Typography} from "../../../../components/Typography";
import {Page} from "../../../../components/Page";
import {PageContent} from "../../../../components/PageContent";
import {SideBar} from "../../../../components/SideBar";
import {Card} from "../../../../components/Card";
import {Input, Spinner} from "@nextui-org/react";
import { SelectThemeDictionary } from "./SelectThemeDictionary";
import { ThemeDictionary } from "./ThemeDictionary";

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
}

export const DictionaryPage: FC = typedMemo(function DictionaryPage() {
    const [openedTheme, setOpenedTheme] = useState<any>(null)

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

                    <div className={styles.dictionary__chooseWordBlock}>
                        <Input 
                            placeholder="Поиск" 
                            classNames={{
                                inputWrapper: [styles.dictionary__wordSearch],
                                input: [styles.dictionary__wordSearchInput],
                            }} 
                            variant="faded"
                        />
                        <ThemeDictionary theme={openedTheme}/>
                    </div>
                    
                    <SelectThemeDictionary 
                            themes={tempData.themes} 
                            className={styles.dictionary__selectDictionaryDisplay}
                            onThemeClick={setOpenedTheme}
                        />
                </Suspense>
            </PageContent>
        </Page>
    )
})
