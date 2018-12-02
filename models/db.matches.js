const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  
    date:Number,
    location:Number,
    teamId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'team'
    },
    leagueId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'league'
    }
});

module.exports = mongoose.model('matches',teamSchema); 