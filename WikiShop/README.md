# WikiShop Project
**Eshop selling products from WikiPedia, retrieving products by sending HTPP GET requests to https://wiki-shop.onrender.com, supported by a server
that handles user login and adding products to the cart**

<br />

**Instructions to run the project:**
1. npm install
1. node server.js
1. On browser enter: localhost:8080/

<br />

**In order to have access to the system and add products to cart:**
* You can use existing credentials

| Username | Password |
| -------- | -------- |
| thanos   | Thanos1! |
| dimitris | Dimitris1! |

* You can select sign in and then sign up action, in order to register as a new user. 

<br />

**Flow of system operations:**
* When a user logs in or signs up, the password is sent hashed using SHA256 for security purposes.
* In sign up action, the username and the password are sent to the server and the server stores them in the mongoDB database.
* When a user logs in, the server checks if the received username with the hashed password corresponds to a user within the database.
* The user's cart is also stored in the database, so every time the user logs back in, their cart will be retrieved from the database and 
access it without losing any data.
