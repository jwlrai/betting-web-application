const mongoose = require('mongoose');

const bettingSchema = new mongoose.Schema({

    amount:Number,
    date:Number,
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    teamId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'team'
    },
    matchId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'matches'
    },
    leagueId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'league'
    }
});

module.exports = mongoose.model('bettingHistory',bettingSchema); 