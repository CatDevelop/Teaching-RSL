# Сервис для изучения русской жестовой речи
Проект выполнен в рамках дисциплины "Проектный практикум" студентов 2-3 курсов Уральского федерального 
университета имени первого Президента России Б. Н. Ельцина.

## Возможности сервиса:
1. Изучение жестов: теория + закрепление практическими заданиями
2. Проверка знаний с помощью распознавания жестов, показываемых обучающимся в камеру 
3. Словарь жестов 
4. Создание пользовательских тренировок 
5. Система уровней и достижений

## Инструкция запуска
1. Перейти в папку recognition (cd recognition)
2. Установить библиотеки для python (pip install -r requirements.txt)
3. Проверить, что все библиотеки в SLT_API.py установлены (Если что-то не установлено, установить вручную)
4. Запустить модель распознования (python SLT_API.py)
5. Перейти к фронтенду (cd ..)
6. Установить пакеты для фронтенда (npm i)
7. Запустить фронтенд (npm run start)

## Иллюстрации
![Home](https://github.com/CatDevelop/Teaching-RSL/blob/main/src/assets/images/Demo1.png "Teaching-RSL")
![Theory](https://github.com/CatDevelop/Teaching-RSL/blob/main/src/assets/images/Demo2.png "Teaching-RSL")
![Practice](https://github.com/CatDevelop/Teaching-RSL/blob/main/src/assets/images/Demo3.png "Teaching-RSL")
![Result](https://github.com/CatDevelop/Teaching-RSL/blob/main/src/assets/images/Demo4.png "Teaching-RSL")
![Training](https://github.com/CatDevelop/Teaching-RSL/blob/main/src/assets/images/Demo5.png "Teaching-RSL")
