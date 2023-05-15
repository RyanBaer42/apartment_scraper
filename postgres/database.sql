CREATE DATABASE apartments;

\c apartments;

CREATE TABLE listings(
    listing_id SERIAL PRIMARY KEY,
    title VARCHAR(100),
    image_URL VARCHAR(255)
);