import { typedMemo } from "core/utils/typedMemo";
import React, { FC } from "react";
import { Tabs, Tab } from "@nextui-org/tabs";
import styles from './SelectDictionaryDisplay.module.css';
import { Typography } from "components/Typography";
import { Card } from "components/Card";
import { ComponentProps } from "core/models/ComponentProps";
import clsx from "clsx";
import { ScrollBox } from "components/ScrollBox";

type Props = ComponentProps & Readonly<{
    themes: any[];
    letters: any[];
    onSectionClick: (section:any) => void;
}>

export const SelectDictionaryDisplay: FC<Props> = typedMemo(function SelectDictionaryDisplay(props){
    console.log(props)
    return (
        <div className={clsx(styles.selectDictionaryDisplay, props.className)}>
            <Tabs className={styles.selectDictionaryDisplay__tabs} classNames={{
                panel: styles.selectDictionaryDisplay__tabsPanel
            }}>
                <Tab key="themes" title="По темам">
                    <Card className={styles.selectDictionaryDisplay__themes}>
                        <ScrollBox className={styles.selectDictionaryDisplay__themesScroll}>
                            {props.themes.map((theme, i) => (
                                <div className={styles.selectDictionaryDisplay__theme}>
                                    <Typography variant='h3' className={styles.selectDictionaryDisplay__themeTitle}>{theme.name}</Typography>
                                    {
                                        theme.sections.map((section: any,i:number) => 
                                            <Typography 
                                                variant='p' 
                                                key={i} 
                                                className={styles.selectDictionaryDisplay__section}
                                                onClick={() => props.onSectionClick(section)}
                                            >
                                                {section.name}
                                                </Typography>
                                        )}
                                </div>
                            ))}
                        </ScrollBox>
                    </Card>
                </Tab>
                <Tab key="alphabetical" title="По алфавиту">
                    <Card className={styles.selectDictionaryDisplay__alphabetical}>
                        <ScrollBox className={styles.selectDictionaryDisplay__alphabeticalScroll}>
                            {props.letters.map((letter, i) => (
                                <div className={styles.selectDictionaryDisplay__letter} key={i}>
                                    <Typography variant='h3' className={styles.selectDictionaryDisplay__letterTitle}>{letter.name}</Typography>
                                    <div className={styles.selectDictionaryDisplay__letterWords}>
                                        {letter.words.slice(0, Math.ceil(letter.words.length / 2)).map((word: any,i:number) => <Typography key={i} variant='p' className={styles.selectDictionaryDisplay__word}>{word.word}</Typography>)}
                                    </div>
                                    <div className={styles.selectDictionaryDisplay__letterWords}>
                                        {letter.words.slice(Math.ceil(letter.words.length / 2)).map((word: any,i:number) => <Typography key={i} variant='p' className={styles.selectDictionaryDisplay__word}>{word.word}</Typography>)}
                                    </div>
                                </div>
                            ))}
                        </ScrollBox>
                    </Card>
                </Tab>
            </Tabs>
        </div>
    )
})