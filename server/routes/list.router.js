const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// TODO - Add routes here...
























































router.delete('/:id', (req, res) =>{
    let listID = req.params.id;
    console.log('DELETE id', listID);
    let queryText = 'DELETE FROM "shopping-list" WHERE "id" = $1;';
    pool.query(queryText, [listID])
        .then((result) => {
            console.log('shopping list item deleted');
            res.sendStatus(200);
            
        })
        .catch((error) =>{
            console.log('error making database query', queryText, error);
            res.sendStatus(500);
            
        })
    
  })
  
module.exports = router;