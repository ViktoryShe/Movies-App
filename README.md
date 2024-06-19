Ссылка на сайт https://movies-app-seven-livid.vercel.app/

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

<!-- App 1 Первая часть - получить список фильмов с сервера и отобразить их в приложении.

1. Сверстайте макет по мокапам. Достаточно списка фильмов - без поиска.
2. Зарегистрируйтесь на сервисе, создайте API ключ для вашего приложения (Тип использования 3. 3.выберите "Обучение", поля можно заполнить любыми данными)
3. Используя API поиска фильмов получите фильмы по поиску по ключему слову "return" и выведите их на страницу
Примечания:
Настройте все инструменты по контролю качества кода, как и в предыдущей проекте (eslint/prettier/husky/lint-staged). Для всех последующих проектов этот шаг требуется по-умолчанию.
Для форматирования времени пользуйтесь date-fns
Напишите отдельную функцию для сокращения текста описания, сокращенный текст не должен обрезать слова на середине.
На жанры пока сделайте "заглушки" - отобразим настоящие данные из апи позже 

App #2 доработаем наше приложение.
1. Добавить индикатор загрузки - возьмите из библиотеки Antd компонент Spin.
2. Реализуйте обработку ошибок - возьмите компонент Alert
3. Реализуйте обработку ситуации, когда у пользователя нет сети (вы можете эмулировать это в chrome dev tools).

App #3 Добавим функционал поиска и пагинации. Пагинация - это постраничный вывод информации в веб страницах.

1. Добавить текстовое поле ввода, по изменению которого будет выполняться поиск
2. Сделать серверную пагинацию (при переключении страниц должны отправляться новые запросы) с применением компонента Pagination.

Требования к поиску:
Поиск должен происходить сразу после того, как пользователь ввел поисковый запрос (без нажатия на кнопку)
При вводе символов в поле ввода запросы не должны отправляться сразу в целях избежания лишних запросов на сервер. Дождитесь, пока пользователь допечатает. Используйте для этого функцию debounce из lodash
Если поиск не дал результатов, должно отображаться сообщение об этом
Пока фильмы загружаются, должен отображаться спиннер загрузки
Результаты поиска должны быть разделены постранично (используйте antd pagination). Постраничное деление данных (pagination) реализовывается на сервере, вам лишь нужно отобразить интерфейс для его использования. Найдите необходимое API для этого и воспользуйтесь им.

App #4 Добавим функционал добавления в избранное и отображение жанров.

1. При запуске вашего приложения создаем новую гостевую сессию по апи
2. Разделяем приложение на 2 таба - Search и Rated, в табе Rated выводим только список тех фильмов, которы оценивали (см апи) без строки поиска - в остальном макет идетичен.
3. Добавляем звезды для голосования (компонент Rate). Если вы не голосовали за фильм - все звезды должны быть пустыми, если голосовали - тот рейтинг, что вы проставили фильму.
4. Добавить блок с текущим рейтингом в правом-верхнем углу блока, сделать изменение цвета круга в зависимости от рейтинга (см ниже).
5. При старте приложения получать список жанров, хранить данные с помощью React.Context, отображать по соотвествующим ID в списке жанров карточки.

App #5
1. Проверяем на наличие ошибок, убеждаемся что все работает исправно и деплоим на сервер, ссылку на работающее приложение размещаем в README.md.
Ошибки Mistake
1.	Пагинация должна показывать полное количество страниц и должна быть возможность перелистнуть на последнюю страницу. Для пагинации лучше использовать готовый компонент antd.
2.	Гостевая сессия должна сохраняться при повторном открытии приложения.
3.	Работа с api это уже не просто утилита. Познакомься с примером популярной архитектуры приложений https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md
4.	https://github.com/ViktoryShe/Movies-App/tree/main/src/utils формат jsx/tsx должен быть только у файлов с разметкой.
5.	Рекомендую познакомиться с объектом URL и searchParams.
6.	У каждого запроса к серверу должен проверяться статус.
7.	В случае ошибок запросов об этом нужно оповещать пользователя, а не выводить их в консоль. В готовом приложение в целом не должно быть выводов в консоль.
8.	https://github.com/ViktoryShe/Movies-App/blob/main/src/components/App/App.jsx#L80 этот catch никогда не отработает. Тут получается излишняя вложенность, тройной уровень try/catch. Стоит подумать об оптимизации.
Так же нужно провести ревизию других запросов на аналогичные проблемы.
9.	https://github.com/ViktoryShe/Movies-App/blob/main/src/components/App/App.jsx#L137 функция возвращающая jsx — это компонент, соответственно нужно выносить в отдельный файл, либо убирать обертку в виде функции.
10.	https://github.com/ViktoryShe/Movies-App/blob/main/src/components/GenresContext/GenresContext.jsx обычно в проектах не смешивают хуки и классовые компоненты.
11.	https://github.com/ViktoryShe/Movies-App/blob/main/src/components/CardList/CardList.jsx#L28C21-L28C29 индексы массивов не используются для ключей.
12.	https://github.com/ViktoryShe/Movies-App/blob/main/src/components/CardList/CardList.jsx#L23C1-L41C4 опять же нет смыла выносить эту логику в самостоятельную функцию. Перенеси в return компонента.
13.	Перепроверь все компоненты и убери лишние функции создания верстки.
14.	https://github.com/ViktoryShe/Movies-App/blob/main/src/components/Card/Card.jsx#L86C39-L86C76 старайся избегать инлйан стилей.
15.	https://github.com/ViktoryShe/Movies-App/tree/main/src/components/MoviesContext неиспользуемое нужно удалять.
16.	https://github.com/ViktoryShe/Movies-App/blob/main/src/components/NoResults/NoResults.jsx уже существует оповещение об ошибках, переиспользуй его для различных сообщений.
17.	При повторном открытии приложения оцененные ранее фильмы должны отображаться.
18.	Логика обработки ошибок запросов при создании гостевой сессии должна быт во всех запросах. Т.е. в случае ошибки запрос не должен возвращать никаких результатов и не должен делать выводов в консоль. Он должен пробросить ошибку, которую перехватит компонент и обработает её как нужно.
19.	https://github.com/ViktoryShe/Movies-App/blob/main/src/components/Card/Card.jsx#L40C1-L63C4 нужно либо вынести в отдельные компоненты, либо убрать функции создания и перенести в render этого компонента. Не должно быть функций создания компонентов в компонентах.
20.	Оцененные ранее фильмы нужно получать из api. Локальное хранилище не используется как база данных.  

-->