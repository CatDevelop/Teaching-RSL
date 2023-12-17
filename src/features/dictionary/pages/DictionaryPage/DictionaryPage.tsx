import React, {FC, Suspense, useState} from "react";
import {typedMemo} from "../../../../core/utils/typedMemo";
import styles from "./DictionaryPage.module.css";
import {Typography} from "../../../../components/Typography";
import {Page} from "../../../../components/Page";
import {PageContent} from "../../../../components/PageContent";
import {SideBar} from "../../../../components/SideBar";
import {Card} from "../../../../components/Card";
import {Input, Spinner} from "@nextui-org/react";
import { SelectWordBlock } from "./SelectWordBlock";
import { DictionaryWordBlock } from "./DictionaryWordBlock";

const tempData = {
    themes: [
        {
            name:'Theme1',
            id: '0',
            sections: [
                {
                    name: 'Section1',
                    id:'0',
                    words: [
                        {
                            word: 'Word1',
                            id:'0527d08e-1db9-46bd-a556-b2c458619816',
                        }
                    ]
                },
                {
                    name: 'Section2',
                    id: '1',
                    words: [
                        {
                            word: 'Word1',
                            id:'0527d08e-1db9-46bd-a556-b2c458619816',
                        }
                    ]
                }
            ]
        }
    ],
}

export const DictionaryPage: FC = typedMemo(function DictionaryPage() {
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
                        <DictionaryWordBlock/>
                    </div>
                    
                    <SelectWordBlock 
                        themes={tempData.themes} 
                        className={styles.dictionary__selectDictionaryDisplay}
                    />
                </Suspense>
            </PageContent>
        </Page>
    )
})
