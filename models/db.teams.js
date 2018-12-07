const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name:String,
    imgLink:String,
    description: String
});

module.exports = mongoose.model('team',teamSchema); 