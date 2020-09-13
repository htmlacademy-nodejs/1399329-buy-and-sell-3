-- Заполнение таблицы users
INSERT INTO users VALUES
(DEFAULT, 'Ivan', 'Ivanov', 'ivan@mail.com', 'UXhDWA', 'ivan_avatar.jpg'),
(DEFAULT, 'Maria', 'Petrova', 'maria@mail.com', 'MMIp12', 'maria_avatar.jpg');

-- Заполнение таблицы types
INSERT INTO types VALUES
(DEFAULT, 'Куплю'),
(DEFAULT, 'Продам');

-- Заполнение таблицы categories
INSERT INTO categories VALUES
(DEFAULT, 'Игры'),
(DEFAULT, 'Туризм'),
(DEFAULT, 'Программирование'),
(DEFAULT, 'Разное');

-- Заполнение таблицы offers
INSERT INTO offers VALUES
(DEFAULT, 'Куплю фильмы 80-x', 'Это настоящая находка для коллекционера!', 'image.jpg', 5000, '2016-01-01', 1, 1),
(DEFAULT, 'Продам носки без пары', 'Пользовались всего два раза. Отдам почти бесплатно!', 'image.jpg', 45, '2017-01-01', 1, 2),
(DEFAULT, 'Куплю гараж', 'Даю недельную гарантию.', 'image.jpg', 15000, '2018-01-01', 1, 1),
(DEFAULT, 'Продам советский диван', 'Товар в отличном состоянии. Только лень может остановить Вас от этого.', 'image.jpg', 7000, '2019-01-01', 2, 2),
(DEFAULT, 'Куплю породистого кота', 'Лучший выбор. Проверил сын маминой подруги.', 'image.jpg', 37000, '2020-01-01', 2, 1);

-- Заполнение таблицы comments
INSERT INTO comments VALUES
(DEFAULT, 'Оплата наличными или перевод на карту?', 2, 1),
(DEFAULT, 'Совсем немного...', 2, 1),
(DEFAULT, 'С чем связана продажа? Почему так дешёво?', 2, 2),
(DEFAULT, 'Продаю в связи с переездом. Отрываю от сердца.', 2, 2),
(DEFAULT, 'Почему в таком ужасном состоянии?', 2, 3),
(DEFAULT, 'А где блок питания?', 2, 3),
(DEFAULT, 'Неплохо, но дорого.', 1, 4),
(DEFAULT, 'А сколько игр в комплекте?', 1, 4),
(DEFAULT, 'Вы что?! В магазине дешевле.', 1, 5),
(DEFAULT, 'Не советую никому!', 1, 5);

-- Заполнение таблицы offers_categories (связь между таблицами offers и categories)
INSERT INTO offers_categories VALUES
(1, 1),
(2, 2),
(2, 4),
(3, 3),
(3, 4),
(4, 1),
(4, 2),
(4, 3),
(4, 4),
(5, 4);
