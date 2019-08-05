const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});


const item = mongoose.model('item', schema);

module.exports = item;