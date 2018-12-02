const mongoose = require('mongoose');

const leagueSchema = new mongoose.Schema({
    name:String,
    imgLink:String,
    sportId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'sports'
    }
});

module.exports = mongoose.model('league',leagueSchema); 