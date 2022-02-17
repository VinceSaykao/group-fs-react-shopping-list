const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// TODO - Add routes here...
router.post('/', (req, res) => {
    
    const sqlText = `
    INSERT INTO "shopping-list" ("name", "qty", "unit", "purchased")
    VALUES
        ($1, $2, $3, $4);
    `;
    
    const [ name, qty, unit, purchased ] = req.body;
    const sqlOptions = [
        name,
        qty,
        unit,
        purchased,
    ]

    pool.query(sqlText, sqlOptions)
        .then(response => {
            
        })
})


module.exports = router;