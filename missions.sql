CREATE TABLE missions (
    id INT PRIMARY KEY,
    ship_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    date DATE NOT NULL,
    status VARCHAR(10) NOT NULL,
    CONSTRAINT fk_ship
    FOREIGN KEY (ship_id)
    REFERENCES ships (id)
);
