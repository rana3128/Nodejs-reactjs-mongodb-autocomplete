const express = require("express");
const router = express.Router();
const fs = require("fs");
const Item = require("./item");

router.get('/autosearch/:key', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    let q = req.params.key;
    let query = {
        "$or": [{"name": {"$regex": q, "$options": "i"}}]
    };
    Item.find(query, 'name')
        .sort({date: -1})
        .limit(10)
        .then(items => res.json(items));
});


module.exports = router;