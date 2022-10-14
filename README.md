# Storefront Backend Project

## Breif Project
this project is to connect to database ,create Restful APIS to get information from database or update
Files
`server.ts --> create an Express Application listen on port 3000`
database.ts-->use information on .env file to connect database
`database name "store" `
type :postgres database
`port:5432 on local host`
 also Create client to connect database with env variables from POOl in pg
 `client name :"admin_store"`
 `Password:"password123"`

models --> contain query sql to get information database

handlers -->contain restful routes to (Get, PUT,Delete) from database

Services --> contain general information from database



## Set up and connect to database
run on cmd on project folder `docker-compose -f docker-compose.yml up ` to create  a docker contaioner contain postgres on port 5432
run on psql local 
`CREATE database store ;`
`CREATE user admin_store with password 'password124';`
`\c  store`
run on cmd on project folder `db-migrate up` to create schema all tables
## Frondend port 
on local host port 3000
## package installation
run on cmd on project folder `npm install .`

## run project 
run on cmd on project folder ` yarn watch`

## database schema
database name "store"
user "admin_store"
password "password123"
 admin_store create tables
 1-products table (id SERIAL PRIMARY KEY,name VARCHAR(50),price integer)
 2- users table(id  SERIAL PRIMARY KEY,firstName VARCHAR(50),lastName VARCHAR(50),password text)
 3-orders  table (id SERIAL PRIMARY Key ,user_id bigint REFERENCES users(id),status VARCHAR(15)) 
 4-orderproducts table(id SERIAL PRIMARY KEY,quantity integer,order_id bigint REFERENCES orders(id),product_id bigint REFERENCES Products(id))

 ## Restful routes with http verbes
 for products:
  1- index , get('/products')
  2- show  , get('/products/:id')
  3- create, post('/products')
  also a function to delete product added (models)
  also a function to update product price added (models) 

  for users
  1- index , get('/users')
  2- show  , get('/users/:id')
  3- create, post('/users')
  also a function to delete user added (models)


  for orders
  1-index ,get('/orders')
  2- show ,get('/orders/:id')
  3- create ,post('/orders')
  4-to add products to order, post('/orders/:id/products')
  also a function to delete orders added (models)

  for dashboard
    1- to get products in orders ,get('/products_in_orders')
    2- to get users With Orders, get('/users-with-orders')
    3-to get user orders ,get('/userOrders')

## env variables
POSTGRES_HOST= 127.0.0.1
POSTGRES_DB=store
POSTGRES_USER=admin_store
POSTGRES_PASSWORD=password123
bcrypt_password=new1
SaltRounds=10
TOKEN_SECRET=fffpwd
POSTGRES_DB_test=store_test
POSTGRES_USER_test=user_test
POSTGRES_PASSWORD=password123


