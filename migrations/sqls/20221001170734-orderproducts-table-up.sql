CREATE TABLE orderproducts (id SERIAL PRIMARY KEY,quantity integer,order_id integer REFERENCES orders(id),product_id integer REFERENCES Products(id));
