const mongoose = require('mongoose');

const bettingSchema = new mongoose.Schema({

    amount: Number,
    teamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: `team`
    },
    matchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: `schedule`
    },
    active: Number
});

module.exports = mongoose.model('betting', bettingSchema); 