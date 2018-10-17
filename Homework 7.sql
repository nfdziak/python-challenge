USE SAKILA;

-- 1a
SELECT first_name, last_name FROM actor;

-- 1b
SELECT CONCAT(first_name,' ',last_name) AS "ACTOR NAME" 
FROM actor;

-- 2a 
SELECT * FROM actor
WHERE first_name = "Joe";
 
-- 2b
SELECT * FROM actor 
WHERE last_name LIKE '%GEN%';

-- 2c
SELECT * FROM actor 
WHERE last_name LIKE '%LI%';

-- 
ALTER TABLE actor
MODIFY COLUMN last_name varchar(45) AFTER actor_id;

-- 2d
SELECT country_id, country
FROM sakila.country
WHERE country
IN ("Afghanistan", "Bangladesh", "China");

-- 3a
ALTER TABLE actor
ADD COLUMN description BLOB;

-- 3b
ALTER TABLE actor
DROP COLUMN description;

-- 4a
SELECT last_name, 
    COUNT(last_name)
FROM actor
GROUP BY last_name
HAVING COUNT(last_name) > 0;

-- 4b
SELECT last_name, 
    COUNT(last_name)
FROM actor
GROUP BY last_name
HAVING COUNT(last_name) > 1;

-- 4c
SELECT * FROM actor 
WHERE last_name = "WILLIAMS";
UPDATE actor
SET first_name='HARPO'
WHERE actor_id=172;
ROLLBACK; -- this returned HARPO to Harpo, which I originally had entered.

-- 4d
UPDATE actor
SET first_name='GROUCHO'
WHERE actor_id=172;

-- 5a
SHOW CREATE TABLE address;

-- 6a
SELECT staff.first_name, staff.last_name, address.address
FROM  staffas
INNER JOIN address
ON staff.address_id=address.address_id;
 
-- 6b
SELECT staff.last_name, SUM(payment.amount) -- payment.payment_date
FROM staff 
JOIN payment
ON staff.staff_id=payment.staff_id
Group by staff.last_name;

-- 6c
SELECT title, COUNT(film_actor.actor_id) AS 'Number of Actors'
FROM film 
INNER JOIN film_actor
USING (film_id)
GROUP BY film_id;

-- 6d
SELECT title, Count(inventory_id) AS 'Copies'
FROM film
JOIN inventory
Using (film_id)
WHERE title = 'Hunchback Impossible';

-- 6e
SELECT first_name, last_name, SUM(payment.amount) AS 'Total Paid'
FROM customer
JOIN payment 
USING (customer_id)
group by last_name;

-- 7a
Select title, language.name
FROM film
JOIN language
Using (language_id)
WHERE title REGEXP '^[KQ]';

-- 7b
SELECT first_name, last_name
FROM actor
WHERE actor_id IN
(
  SELECT actor_id
  FROM film_actor
  WHERE film_id IN
  (
  SELECT film_id
  FROM film
  WHERE title = 'Alone Trip'
  ) 
);

-- 7c
SELECT first_name, last_name, email, country.country
FROM customer
JOIN address ON customer.address_id=address.address_id
JOIN city ON city.city_id=address.city_id
JOIN country ON city.country_id=country.country_id
WHERE country = 'Canada';

-- 7d
SELECT title
FROM film 
WHERE film_id IN
(
SELECT film_id
FROM film_category
WHERE category_id IN 
(
SELECT category_id
FROM category
WHERE name = 'Family'
)
);

-- 7e
SELECT film.title, count(film.title) as 'Number of Rentals' 
FROM inventory
JOIN film ON inventory.film_id = film.film_id     
JOIN rental ON inventory.inventory_id = rental.inventory_id
GROUP BY title
Having count(title) > 0
ORDER BY count(title) desc;

-- 7f
Select customer.store_id AS 'STORE', SUM(amount) as 'Total Income'
FROM Payment 
Join customer 
Using (customer_id)
Group by store_id; 

-- 7g
SELECT store.store_id AS 'Store', city.city, country.country
FROM city
JOIN address ON address.city_id=city.city_id
JOIN country ON city.country_id=country.country_id
JOIN store ON store.address_id=address.address_id;

-- 7h
SELECT category.name AS 'Genre', SUM(payment.amount) AS 'Revenue'
FROM payment
JOIN rental ON payment.rental_id=rental.rental_id
JOIN inventory ON rental.inventory_id=inventory.inventory_id
JOIN film_category ON inventory.film_id=film_category.film_id
JOIN category ON film_category.category_id=category.category_id
Group By category.name
Order by SUM(payment.amount) desc;

-- 8a
CREATE VIEW revenue_per_genre AS 
SELECT category.name AS 'Genre', SUM(payment.amount) AS 'Revenue'
FROM payment
JOIN rental ON payment.rental_id=rental.rental_id
JOIN inventory ON rental.inventory_id=inventory.inventory_id
JOIN film_category ON inventory.film_id=film_category.film_id
JOIN category ON film_category.category_id=category.category_id
Group By category.name
Order by SUM(payment.amount) desc;

-- 8b
-- To display the view, I would click on Views, then click on the view I created (revenue_per_genre). With the cursor on view 
-- name, I would then click on the db icon appearing at the end of the line. This brings up the query shown below in a new query tab. 
-- Running the query will pull up the view.
SELECT * FROM sakila.revenue_per_genre;

-- 8c
DROP VIEW revenue_per_genre;





