
CREATE TABLE orders (id SERIAL PRIMARY Key ,user_id integer REFERENCES users(id),status VARCHAR(15));