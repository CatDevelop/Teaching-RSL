import { Page } from "components/Page";
import { PageContent } from "components/PageContent";
import { typedMemo } from "core/utils/typedMemo";
import React, { FC } from "react";
import styles from "./DictionaryWordPage.module.css";
import Logo from "../../../../assets/images/Logo.svg"
import { GetWordResponse } from "core/models/words/GetWordResponse";
import { Card } from "components/Card";
import { Typography } from "components/Typography";
import { Button } from "components/Button";

const word: GetWordResponse = {
    description: 'bla bla',
    id: '0',
    word: 'Бука',
    illustrations: []
}

export const DictionaryWordPage: FC= typedMemo(function DictionaryWordPage(){
    return (
        <Page>
            <PageContent className={styles.dictionaryWordPage}>
                <div className={styles.dictionaryWordPage__logoContainer}>
                    <img src={Logo} rel="preload" alt="Логотип" width={230}/>
                </div>
                <Card className={styles.dictionaryWordPage__word}>
                    <Typography
                        variant="h3"
                        className={styles.dictionaryWordPage__wordName}
                        >
                        {word.word}
                    </Typography>
                    <div className={styles.dictionaryWordPage__illustrations}>

                    </div>
                    <div className={styles.dictionaryWordPage__actions}>
                        <Button color="primary">Потренироваться</Button>
                        <Button variant="bordered" color="primary">Добавить в тест</Button>
                    </div>
                </Card>
            </PageContent>
        </Page>
    )
})