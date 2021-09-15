-- Get the average duration of all reservations.

SELECT avg(end_date - start_date) as average_duration
FROM reservations;



-- Expected Result:

--   average_duration
-- ---------------------
--  14.6636000000000000
-- (1 row)