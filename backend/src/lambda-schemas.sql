/* users */
CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    isAdmin BOOLEAN NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
);

/* products */
CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    platform VARCHAR(64) NOT NULL,
    type VARCHAR(64) NOT NULL,
    img VARCHAR(255) NOT NULL,
    price FLOAT NOT NULL DEFAULT 500, 
    stock BIGINT NOT NULL DEFAULT 500,
    PRIMARY KEY (id)
);

/* order item */
CREATE TABLE order_item (
    id BIGINT NOT NULL AUTO_INCREMENT,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    qty BIGINT NOT NULL,
);

/* order */
CREATE TABLE oder (
    id BIGINT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
);
