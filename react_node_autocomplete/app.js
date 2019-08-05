const express = require('express');
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const items = require("./routes/api/items");
const app = express();

app.use(bodyparser.json());

const dburi = require("./config/mongodb_key").dburi;
mongoose.connect(dburi)
    .then(() => console.log("mongodb connected"))
    .catch((err) => console.log(err));

//app.use('/import', require('./routes/importdata.js'));
app.use('/api/items', items);
const port = process.env.PORT || 5000;
app.listen(port, ()=> console.log('server is running os port'+ port));


