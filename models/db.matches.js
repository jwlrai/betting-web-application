const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  
    date:Number,
    location:Number,
    teamId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'team'
    },
   
});

module.exports = mongoose.model('matches',teamSchema); 