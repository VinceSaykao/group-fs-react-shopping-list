const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// TODO - Add routes here...


// setup GET route to get all shopping-list from database
router.get('/', (req,res) => {
    const sqlText= `SELECT * FROM "shopping-list" ORDER BY name DESC;`;
    pool.query(sqlText)
    .then((result) => {
        console.log('GET router works from the database', result);
        res.sendStatus(result.rows);
    })
    .catch((error) => {
        console.log(`Error making database query ${sqlText}`, error);
        res.sendStatus(500);
    })
})





module.exports = router;