CREATE DATABASE restaurant;

USE restaurant;

CREATE TABLE chef(
	chef_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR (30) NOT NULL, 
    last_name VARCHAR (30) NOT NULL,
    email VARCHAR (50) NOT NULL UNIQUE,
    password VARCHAR (50) NOT NULL,
    description VARCHAR (200) NOT NULL,
    phone VARCHAR (13) NOT NULL,
    chef_img VARCHAR (200) NOT NULL
);

CREATE TABLE dish(
	dish_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR (30) NOT NULL, 
    description VARCHAR (200) NOT NULL,
    dish_img VARCHAR (200) NOT NULL,
    chef_id INT NOT NULL,
    CONSTRAINT fk_dish_chef_1 FOREIGN KEY (chef_id) REFERENCES chef(chef_id)
    ON DELETE CASCADE 
);