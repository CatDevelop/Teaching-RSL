import React, {
    FC,
    Suspense,
    useCallback,
    useState,
    FocusEventHandler,
    ChangeEventHandler
} from "react";
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
import {Button} from "../../../../components/Button";
import { CreateUserTestForm } from "./CreateUserTestForm";

export const DictionaryPage: FC = typedMemo(function DictionaryPage() {
    const [search, setSearch] = useState('');
    const [selectedWordId, setSelectedWordId] = useState<string | null>(null);

    const changeSearch: ChangeEventHandler<HTMLInputElement> = useCallback(event => {
        setSearch(event.target.value);
    }, [])

    const blurSearch: FocusEventHandler<Element> = useCallback(event => {
        setSearch((event.target as HTMLInputElement).value.trim());
    }, [])

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
                        <div className={styles.dictionary__titleContainer__content}>
                            <Typography
                                variant="p"
                                className={styles.dictionary__titleContainer__description}
                            >
                                Здесь можно найти абсолютно все жесты
                            </Typography>

                            <CreateUserTestForm
                                triggerComponent={onOpen => <Button color="primary" variant="light" onClick={onOpen}>
                                    Создать тест
                                </Button>}
                            />

                        </div>
                    </Card>

                    <div className={styles.dictionary__chooseWordBlock}>
                        <Input 
                            placeholder="Поиск" 
                            classNames={{
                                inputWrapper: [styles.dictionary__wordSearch],
                                input: [styles.dictionary__wordSearchInput],
                            }}
                            onChange={changeSearch}
                            onBlur={blurSearch}
                            variant="faded"
                        />
                        <DictionaryWordBlock selectedWordId={selectedWordId}/>
                    </div>

                    <Suspense fallback={<Spinner/>}>
                        <SelectWordBlock
                            selectWord={setSelectedWordId}
                            search={search}
                            className={styles.dictionary__selectDictionaryDisplay}
                        />
                    </Suspense>
                </Suspense>
            </PageContent>
        </Page>
    )
})
