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
1. Проверяем на наличие ошибок, убеждаемся что все работает исправно и деплоим на сервер, ссылку на работающее приложение размещаем в README.md.-->