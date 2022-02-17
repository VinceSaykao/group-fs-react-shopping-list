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

	const {name, qty, unit, purchased} = req.body;
    console.log({name, qty, unit, purchased});
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

module.exports = router;
