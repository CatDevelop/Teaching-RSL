import {LKIcon} from "../../assets/images/LKIcon"
import {LearningIcon} from "../../assets/images/LearningIcon"
import {TrainingIcon} from "../../assets/images/TrainingIcon"
import {DictionaryIcon} from "../../assets/images/DictionaryIcon"

/**
 * Получить все навигационные ссылки
 * @param isAuth Авторизован ли пользователь
 */
export function getNavigationItems(isAuth: boolean){
    const items = []

    if(isAuth){
        items.push({
            id: 0,
            label: "Личный кабинет",
            icon: LKIcon,
            link: "/profile"
        })
    }

    return items.concat([
        {
            id: 1,
            label: "Обучение",
            icon: LearningIcon,
            link: "/learning"
        },
        {
            id: 2,
            label: "Тренировки",
            icon: TrainingIcon,
            link: "/training"
        },
        {
            id: 3,
            label: "Словарь",
            icon: DictionaryIcon,
            link: "/dictionary/by-theme"
        },
    ])
}