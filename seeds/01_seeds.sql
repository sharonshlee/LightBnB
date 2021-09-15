-- password: $2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.

INSERT INTO users (name, email, password)
VALUES ('lorem', 'lorem@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
       ('ipsum', 'ipsum@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
       ('hipsum', 'hipsum@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');


INSERT INTO properties 
(owner_id, title, description, thumbnail_photo_url, 
cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms,
country, street, city, province, post_code)
VALUES (1, 'title', 'description', 'thumbnail_photo_url',
          'cover_photo_url', 1, 1, 1, 1,
          'country', 'street', 'city', 'province', 'post_code'),
       (2, 'title', 'description', 'thumbnail_photo_url',
          'cover_photo_url', 2, 3, 3, 3,
          'country', 'street', 'city', 'province', 'post_code'),
       (3, 'title', 'description', 'thumbnail_photo_url',
          'cover_photo_url', 4, 4, 4, 4,
          'country', 'street', 'city', 'province', 'post_code');

INSERT INTO reservations (guest_id, property_id, start_date, end_date)
VALUES (1, 1, '2018-09-11', '2018-09-26'),
       (2, 2, '2019-01-04', '2019-02-01'),
       (3, 3, '2021-10-01', '2021-10-14');

INSERT INTO properties_reviews (property_id, guest_id, reservation_id, message)
VALUES (1, 1, 1, 'message'),
       (2, 2, 2, 'message'),
       (3, 3, 3, 'message');