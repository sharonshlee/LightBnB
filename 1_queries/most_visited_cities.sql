-- Get a list of the most visited cities.
-- Select the name of the city and the number of reservations for that city.
-- Order the results from highest number of reservations to lowest number of reservations.

SELECT p.city, count(r) as total_reservations
FROM reservations r
JOIN properties p ON r.property_id = p.id
GROUP BY p.city
ORDER BY total_reservations DESC;


-- Expected Result:

--        city        | total_reservations
-- -------------------+--------------------
--  Carcross          |                405
--  Town of Hay River |                379
--  Whitehorse        |                376
--  Town of Inuvik    |                298
--  Yellowknife       |                257
--  (251 rows)
