const mongoose = require('mongoose');

const sportsSchema = new mongoose.Schema({
    name:String,
    imgLink:String
});

module.exports = mongoose.model('sports',sportsSchema); 