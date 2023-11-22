import { Card } from "components/Card";
import { ScrollBox } from "components/ScrollBox";
import { typedMemo } from "core/utils/typedMemo";
import React, { FC } from "react";
import styles from "./ThemeDictionary.module.css";
import { Typography } from "components/Typography";
import { ComponentProps } from "core/models/ComponentProps";
import clsx from "clsx";
import { NavLink } from "react-router-dom";
import { Link } from "@nextui-org/react";

type Props = ComponentProps & Readonly<{
    // TODO прописать тип
    theme: any | null;
}>

export const ThemeDictionary: FC<Props> = typedMemo(function ThemeDictionary(props){
    if(props.theme === null){
        return (
            <Card className={clsx(styles.themeDictionary_empty, props.className)}>
                <Typography variant='p' className={styles.themeDictionary_empty__title}>Вы пока не выбрали тему</Typography>
            </Card>
        )
    }
    return (
        <Card className={clsx(props.className)}>
            <Typography variant='h3' className={styles.themeDictionary__name}>{props.theme.name}</Typography>
            <ScrollBox className={styles.themeDictionary__scroll}>
                {
                    props.theme.sections.map((section:any, i: number) => (
                        <div className={styles.themeDictionary__section} key={i}>
                            <Typography variant='p' className={styles.themeDictionary__sectionName}>{section.name}</Typography>
                            <div className={styles.themeDictionary__sectionWords}>
                                {section.words.slice(0, Math.ceil(section.words.length / 2)).map((word: any, i: number) => (
                                    <Link as={NavLink} to={`/dictionary/${word.word}`}>
                                        <Typography variant='p' className={styles.themeDictionary__word} key={i}>{word.word}</Typography>
                                    </Link>
                                ))}
                            </div>
                            <div className={styles.themeDictionary__sectionWords}>
                                {section.words.slice(Math.ceil(section.words.length / 2)).map((word: any, i: number) => (
                                    <Link as={NavLink} to={`/dictionary/${word.word}`}>
                                        <Typography variant='p' className={styles.themeDictionary__word} key={i}>{word.word}</Typography>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))
                }
            </ScrollBox>
        </Card>
    )
})