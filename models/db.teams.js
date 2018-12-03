const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name:String,
    imgLink:String,
    description: String
    // sportId:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'sports'
    // },
    // leagueId:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'league'
    // }
});

module.exports = mongoose.model('team',teamSchema); 