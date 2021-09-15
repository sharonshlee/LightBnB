-- Show all details about properties located in Vancouver including their average rating.
-- Select all columns from the properties table for properties located in Vancouver, and the average rating for each property.
-- Order the results from lowest cost_per_night to highest cost_per_night.
-- Limit the number of results to 10.
-- Only show listings that have a rating >= 4 stars.

-- SELECT p.*, avg(pr.rating) as average_rating
SELECT p.id, p.title, p.cost_per_night, avg(pr.rating) as average_rating
FROM properties p
JOIN property_reviews pr ON p.id = pr.property_id
WHERE p.city LIKE '%ancouver%' 
GROUP BY p.id, p.title, p.cost_per_night
HAVING avg(pr.rating) >= 4
ORDER BY p.cost_per_night
LIMIT 10;



-- Expected Result:
--  id  |       title        | cost_per_night |   average_rating
-- -----+--------------------+----------------+--------------------
--  224 | Nature bite        |          10526 | 4.1000000000000000
--  197 | Build they         |          34822 | 4.1000000000000000
--   47 | Aside age          |          35421 | 4.2500000000000000
--  149 | Present television |          53062 | 4.2222222222222222
-- (4 rows)
