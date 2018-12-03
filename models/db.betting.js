const mongoose = require('mongoose');

const bettingSchema = new mongoose.Schema({

    amount: Number,
    teamId: String,
    matchId: String,
    active: Number
});

module.exports = mongoose.model('betting', bettingSchema); 