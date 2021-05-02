CREATE TABLE todo_item (
	id serial PRIMARY KEY,
	title VARCHAR ( 50 ) NOT NULL,
	description VARCHAR ( 255 ) NOT NULL,
	category VARCHAR ( 50 ) NOT NULL,
    estimated_date_to_do DATE NOT NULL,
    finished DATE,
    done BOOLEAN NOT NULL DEFAULT false,
);

CREATE TABLE tax (
	id serial PRIMARY KEY,
	title VARCHAR (50) NOT NULL,
	description VARCHAR ( 55),
	category VARCHAR ( 50 ) NOT NULL,
    amount INT,
    payment_method VARCHAR ( 50 ) NOT NULL,
    estimated_date_pay DATE NOT NULL,
    paid DATE
);

// Date format yyyy-mm-dd
insert into tax values (DEFAULT,'Edenor', 'Pagar la luz de la casa de buenos aires', 'HOUSE', 2100, 'Efectivo','2021-04-30');