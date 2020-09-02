-- Создание схемы базы

-- Удаляет buy_and_sell, если она существует
DROP DATABASE IF EXISTS buy_and_sell;

-- Создание базы с именем buy_and_sell
CREATE DATABASE buy_and_sell
	WITH
	OWNER = academy_buy_and_sell
	ENCODING = 'UTF8'
	CONNECTION LIMIT = -1;

-- Определение прав доступа.
GRANT ALL ON DATABASE buy_and_sell TO academy_buy_and_sell;

-- Удаление таблиц базы
DROP TABLE IF EXISTS offers_categories;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS offers;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS types;

-- Создание таблицы users
CREATE TABLE users (
	id serial PRIMARY KEY NOT NULL,
	name varchar(50) NOT NULL,
	surname varchar(50) NOT NULL,
	email varchar(100) UNIQUE NOT NULL,
	password varchar(100) NOT NULL,
	avatar text
);

-- Уникальный индекс для email
CREATE UNIQUE INDEX email_idx ON users (email);

ALTER TABLE users OWNER to academy_buy_and_sell;

-- Создание таблицы types
CREATE TABLE types (
	id serial PRIMARY KEY NOT NULL,
	name varchar(50) UNIQUE NOT NULL
);

ALTER TABLE types OWNER to academy_buy_and_sell;

-- Создание таблицы offers
CREATE TABLE offers (
	id bigserial PRIMARY KEY NOT NULL,
	title varchar(100) NOT NULL,
	description varchar(1000) NOT NULL,
	picture text,
	sum INTEGER NOT NULL,
	date DATE NOT NULL,
	user_id INTEGER NOT NULL,
	type_id INTEGER NOT NULL,

	FOREIGN KEY (user_id) REFERENCES users (id)
		ON DELETE SET NULL
		ON UPDATE SET NULL,

	FOREIGN KEY (type_id) REFERENCES types (id)
		ON DELETE SET NULL
		ON UPDATE SET NULL
);

-- Уникальный индекс для title (по ТЗ по этому полю будет осуществляться поиск)
CREATE INDEX title_idx ON offers (lower(title));

ALTER TABLE offers OWNER to academy_buy_and_sell;

-- Создание таблицы comments
CREATE TABLE comments (
	id bigserial PRIMARY KEY NOT NULL,
	text text,
	user_id INTEGER NOT NULL,
	offer_id INTEGER NOT NULL,

	FOREIGN KEY (user_id) REFERENCES users (id)
		ON DELETE SET NULL
		ON UPDATE SET NULL,

	FOREIGN KEY (offer_id) REFERENCES offers (id)
		ON DELETE SET NULL
		ON UPDATE SET NULL
);

ALTER TABLE comments OWNER to academy_buy_and_sell;

-- Создание таблицы categories
CREATE TABLE categories (
	id serial PRIMARY KEY NOT NULL,
	name varchar(50) UNIQUE NOT NULL
);

ALTER TABLE categories OWNER to academy_buy_and_sell;

-- Создание таблицы offers_categories
-- Реализуется связь many_to_many между таблицами offers и categories
CREATE TABLE offers_categories (
	offer_id INTEGER NOT NULL,
	category_id INTEGER NOT NULL,

	CONSTRAINT offers_categories_pk PRIMARY KEY (offer_id, category_id),

	FOREIGN KEY (offer_id) REFERENCES offers (id)
		ON DELETE CASCADE
		ON UPDATE CASCADE,

	FOREIGN KEY (category_id) REFERENCES categories (id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

ALTER TABLE offers_categories OWNER to academy_buy_and_sell;