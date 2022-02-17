-- Don't forget to add your create table SQL 
-- It is also helpful to include some test data


CREATE TABLE "shopping-list" (
	id SERIAL PRIMARY KEY,
	name VARCHAR(80) NOT NULL,
	qty decimal(5,2) NOT NULL,
	unit VARCHAR(20) NOT NULL,
	purchased BOOLEAN
);


insert into "shopping-list" ("name", "qty", "unit", "purchased")
VALUES ('avacados', 3, '2lbs', false);




select * from "shopping-list";
