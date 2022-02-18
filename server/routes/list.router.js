const express = require("express");
const router = express.Router();
const pool = require("../modules/pool.js");

// TODO - Add routes here...
router.post("/", (req, res) => {
	const sqlText = `
    INSERT INTO "shopping-list" ("name", "qty", "unit", "purchased")
    VALUES
        ($1, $2, $3, $4);
    `;

	const { name, qty, unit, purchased } = req.body;
	console.log({ name, qty, unit, purchased });
	const sqlOptions = [name, qty, unit, purchased];

	pool
		.query(sqlText, sqlOptions)
		.then((response) => {
			console.log("Success from server post route:", response);
			res.sendStatus(201);
		})
		.catch((err) => {
			console.error("Error from server post route:", err);
			res.sendStatus(500);
		});
});

// setup GET route to get all shopping-list from database

router.get("/", (req, res) => {
	const sqlText = `SELECT * FROM "shopping-list" ORDER BY name DESC;`;
	pool
		.query(sqlText)
		.then((result) => {
			console.log("GET router works from the database", result);
			res.send(result.rows);
		})
		.catch((error) => {
			console.log(`Error making database query ${sqlText}`, error);
			res.sendStatus(500);
		});
});

router.put("/:id", (req, res) => {
	let updateItem = req.params.id;
	let purchaseValue = req.body.purchased;
	console.log("Updating this id:", updateItem);
	console.log("This is the value it is changing to", purchaseValue);

	queryParam = `UPDATE "shopping-list" 
    SET "purchased" = ${purchaseValue}
    WHERE "id" = ${updateItem};
    `;

	pool
		.query(queryParam)
		.then((result) => {
			console.log(result);
			res.sendStatus(200);
		})
		.catch((err) => {
			console.log("Error on Put", err);
			res.sendStatus(500);
		});
});

router.delete("/:id", (req, res) => {
	const itemId = req.params.id;

	const sqlText = `
        DELETE FROM "shopping-list" WHERE "id" = $1;
    `;
	const sqlOptions = [itemId];

	pool
		.query(sqlText, sqlOptions)
		.then((response) => {
			res.sendStatus(200);
		})
		.catch((err) => {
			console.error("Error with server delete:", err);
			res.sendStatus(500);
		});
});

module.exports = router;
