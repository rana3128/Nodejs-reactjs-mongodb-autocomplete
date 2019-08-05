const express = require("express");
const router = express.Router();
const fs = require("fs");
const Item = require("../../models/item");

function insertdata(items, key){
    const newitem = new Item({
        name : items.employee_name,
    });

    newitem.save().then(ritem => console.log('inserted : '+ritem));
}


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

router.get('/import', (req, res) => {
    fs.readFile('./public/employee.json', 'utf8', (err, data) => {
        if (err) console.log(err);
        data = JSON.parse(data);
        data.forEach(insertdata);
        res.send("imported");
    });
});

router.get('/', (req, res) => {
    Item.find()
        .sort({date: -1})
        .then(items => res.json(items));
});

router.post('/', (req, res) => {
    const newitem = new Item({
        name : req.body.name,
    });

    newitem.save().then(ritem => res.json(ritem));
});


router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(ritem =>
            ritem.remove().then(() => res.json({success : true}))
        ).catch(err => res.json({success : false}));
});



module.exports = router;