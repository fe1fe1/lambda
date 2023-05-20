/* users */
CREATE TABLE user (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    isAadmin BOOLEAN NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
);

/* products */
CREATE TABLE product (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    platform VARCHAR(64) NOT NULL,
    type VARCHAR(64) NOT NULL,
    img VARCHAR(255) NOT NULL,
    price FLOAT NOT NULL DEFAULT 500, 
    stock BIGINT NOT NULL DEFAULT 500,
    PRIMARY KEY (id)
);

/* payment */
CREATE TABLE payment (
    id BIGINT NOT NULL AUTO_INCREMENT,
    userId INT,
    method VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_user_payment
        FOREIGN KEY (userId) 
        REFERENCES user(id)
        ON DELETE SET NULL
        ON UPDATE SET NULL
);

/* shipping */
CREATE TABLE shipping (
    id BIGINT NOT NULL AUTO_INCREMENT,
    userId INT,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    postal_code VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_user_shipping
        FOREIGN KEY (userId) 
        REFERENCES user(id)
        ON DELETE SET NULL
        ON UPDATE SET NULL
);

/* order */
CREATE TABLE purchase_order (
    id BIGINT NOT NULL AUTO_INCREMENT,
    userId INT,
    shippingId BIGINT,
    paymentId BIGINT,
    itemsPrice FLOAT NOT NULL,
    shippingPrice FLOAT NOT NULL,
    totalPrice FLOAT NOT NULL,
    isPaid BOOLEAN NOT NULL DEFAULT 0,
    paidAt DATETIME NOT NULL, 
    isDelivered BOOLEAN NOT NULL DEFAULT 0,
    deliveredAt DATETIME NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_user_order
        FOREIGN KEY (userId) 
        REFERENCES user(id)
        ON DELETE SET NULL
        ON UPDATE SET NULL,
    CONSTRAINT fk_shipping
        FOREIGN KEY (shippingId)
        REFERENCES shipping(id)
        ON DELETE SET NULL
        ON UPDATE SET NULL,
    CONSTRAINT fk_payment
        FOREIGN KEY (paymentId)
        REFERENCES payment(id)
        ON DELETE SET NULL
        ON UPDATE SET NULL
);

/* order item */
CREATE TABLE order_item (
    id BIGINT NOT NULL AUTO_INCREMENT,
    orderId BIGINT,
    productId INT,
    qty BIGINT NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_order
        FOREIGN KEY (orderId) 
        REFERENCES purchase_order(id)
        ON DELETE SET NULL
        ON UPDATE SET NULL,
    CONSTRAINT fk_order_item_product
        FOREIGN KEY (productId) 
        REFERENCES product(id)
        ON DELETE SET NULL
        ON UPDATE SET NULL
);

