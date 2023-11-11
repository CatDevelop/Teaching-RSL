import {typedMemo} from "../../../../../core/utils/typedMemo";
import React, {FC} from "react";
import {SelectContainer, SelectContainerProps} from "../SelectContainer";
import {Image} from "@nextui-org/react";
import {Typography} from "../../../../../components/Typography";
import styles from './SelectImage.module.css'

/** 
 * Изображение, которое можно выбрать
 */
export const SelectImage: FC<SelectContainerProps> = typedMemo(function SelectImage(props) {
    return (
        <SelectContainer {...props}>
            {
                props.wordObject.imageSource
                    ? <div className={styles.selectImage__image}>
                        <Image
                            className={styles.selectImage__imageTest}
                            alt="Изображения для жеста"
                            src={props.wordObject.imageSource}
                        />
                    </div>

                    : <div className={styles.selectImage__altText}>
                        <Typography variant={"h1"}>
                            {props.wordObject.text}
                        </Typography>
                    </div>
            }
        </SelectContainer>
    );
});
