-- Получить список всех категорий
SELECT * from categories;

-- Получить список категорий для которых создано минимум одно объявление
SELECT * FROM categories
WHERE id IN(SELECT category_id FROM offers_categories);

-- Получить список категорий с количеством объявлений
SELECT
    categories.id,
    categories.name,
    count(categories.id)
FROM offers_categories
INNER JOIN categories
    ON offers_categories.category_id = categories.id
GROUP BY categories.id, categories.name
ORDER BY categories.id ASC;

-- Получить список объявлений. Сначала свежие объявления
SELECT
	offers.id,
	offers.title,
	offers.sum,
	offers.description,
	offers.date,
	types.name AS "type",
	users.name As "user_name",
	users.surname AS "user_surname",
	users.email AS "user_email",
 	(
 		SELECT
 			string_agg(categories.name, ', ') AS "categories"
 		FROM offers_categories
 		LEFT JOIN categories
 			ON offers_categories.category_id = categories.id
			AND offers_categories.offer_id = offers.id
	),
	count(comments.offer_id) AS "count_comments"
FROM offers
INNER JOIN types
	ON offers.type_id = types.id
INNER JOIN users
	ON offers.user_id = users.id
INNER JOIN comments
	ON comments.offer_id = offers.id
GROUP BY
	offers.id,
	types.name,
	users.name,
	users.surname,
	users.email
ORDER BY offers.date DESC;

-- Получить полную информацию определённого объявления (offer_id: 1)
SELECT
	offers.id,
	offers.title,
	offers.sum,
	offers.description,
	offers.picture,
	offers.date,
	types.name AS "type",
	users.name As "user_name",
	users.surname AS "user_surname",
	users.email AS "user_email",
 	(
 		SELECT
 			string_agg(categories.name, ', ') AS "categories"
 		FROM offers_categories
 		INNER JOIN categories
 			ON offers_categories.category_id = categories.id
			AND offers_categories.offer_id = offers.id
	),
	count(comments.offer_id) AS "count_comments"
FROM offers
INNER JOIN types
	ON offers.type_id = types.id
INNER JOIN users
	ON offers.user_id = users.id
INNER JOIN comments
	ON comments.offer_id = offers.id
WHERE offers.id = 1
GROUP BY
	offers.id,
	types.name,
	users.name,
	users.surname,
	users.email;

-- Получить список из 5 свежих комментариев
SELECT
	comments.id,
	comments.text,
	comments.offer_id,
	users.name AS "user_name",
	users.surname AS "user_surname"
FROM comments
INNER JOIN users
	ON comments.user_id = users.id
ORDER by comments.id DESC
LIMIT 5;

-- Получить список комментариев для определённого объявления (offer_id: 1). Сначала новые.
SELECT
	comments.id,
	comments.text,
	comments.offer_id,
	users.name AS "user_name",
	users.surname AS "user_surname",
FROM comments
INNER JOIN users
	ON comments.user_id = users.id
WHERE comments.offer_id = 1
ORDER by comments.id DESC

-- Выбрать 2 объявления, соответствующих типу «куплю»
SELECT offers.* FROM offers
WHERE offers.type_id = 1
LIMIT 2;

-- Обновить заголовок определённого объявления на «Уникальное предложение!» (offer_id: 3)
UPDATE offers
	set title = 'Уникальное предложение!'
WHERE offers.id = 3;
