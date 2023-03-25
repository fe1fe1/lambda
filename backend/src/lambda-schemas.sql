/* users table */

CREATE TABLE users (
            id INT NOT NULL AUTO_INCREMENT,
            user_name VARCHAR(255) NOT NULL,
            user_email VARCHAR(255) NOT NULL,
            user_password VARCHAR(255) NOT NULL,
            user_isAdmin BOOLEAN NOT NULL DEFAULT 0,
            PRIMARY KEY (id)
)

/* products table */
CREATE TABLE products (
            id INT NOT NULL AUTO_INCREMENT,
            product_name VARCHAR(255) NOT NULL,
            product_platform VARCHAR(64) NOT NULL,
            product_type VARCHAR(64) NOT NULL,
            product_img VARCHAR(255) NOT NULL,
            PRIMARY KEY (id)
)
