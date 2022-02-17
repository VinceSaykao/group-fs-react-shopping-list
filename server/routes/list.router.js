const express = require("express");
const router = express.Router();
const pool = require("../modules/pool.js");

// TODO - Add routes here...

// ======================== UPDATE  =====================

router.put("/:id", (req, res) => {
	let updateItem = req.params.id;
	let purchaseValue = req.body.purchased;
	console.log("Updating this id:", updateItem);
	console.log("This is the value it is changing to", purchaseValue);

	queryParam = `UPDATE "shopping-list" 
    SET "purchased" = ${purchaseValue}
    WHERE "id" = ${updateItem};
    `;

    pool.query(queryParam)
    .then( result => {
        console.log(result);
        res.sendStatus(200);
    })
    .catch( err => {
        console.log('Error on Put',err);
        res.sendStatus(500);
    })
});

module.exports = router;
