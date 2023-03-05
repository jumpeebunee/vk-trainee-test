# Сапёр
[Live demo](https://jumpeebunee-vk-game.netlify.app/). Простая игра сапер, написанная на React, TypeScript и SCSS с использованием приложенного спрайта.

## Описание игры
Игра представляет собой поле размером 16 на 16 клеток, на котором расставлены случайным образом 40 мин. Слева от поля находится счётчик мин, который показывает сколько мин осталось найти.

Игрок открывает ячейки на поле, кликая на них левой кнопкой мыши. Если ячейка содержит мину, игра проиграна. Если ячейка не содержит мины, но рядом с ней есть другие ячейки без мин, то в них также будет открыта.

Чтобы отметить место, где находится мина, можно кликнуть правой кнопкой мыши на ячейку. Это поможет игроку запомнить место, где находится мина и избежать её взрыва.

При клике по смайлику в центре поля игра начинается заново.
## Дополнительные функции
- Если игрок нажимает на правую кнопку мыши, флажок ставится на ячейке, где находится мина.
- Если игрок нажимает на правую кнопку мыши ещё раз, на ячейку ставится вопросительный знак, показывающий сомнения игрока по поводу наличия мины в этой ячейке.
- Если игрок кликает на ячейку правой кнопкой мыши в третий раз, выделение снимается.
- Когда пользователь нажимает на клавишу, но ещё не отпустил её, появляется смайлик со страхом.
- Когда пользователь проигрывает, смайлик меняется на грустный и открывается карта мин. Таймер останавливается.
- Когда пользователь открывает все ячейки на поле, кроме ячеек с минами, смайлик надевает солнечные очки, таймер останавливается.
## Законченная работа
![image](https://user-images.githubusercontent.com/105386597/222890676-0ab2e058-91b1-406e-ab2b-351905bdb8df.png)
# Инструкция по установке и запуску
Следуйте этим инструкциям, чтобы установить и запустить игру.
## Установка
1. Убедитесь, что у вас установлен Node.js и npm.
2. Склонируйте этот репозиторий на свой компьютер или загрузите архив и распакуйте его.
3. Откройте терминал и перейдите в корневую папку проекта.
4. Введите команду npm install, чтобы установить необходимые зависимости.

## Запуск
1. Введите команду npm start, чтобы запустить приложение.
2. Откройте браузер и перейдите по адресу http://localhost:3000, чтобы начать играть.
