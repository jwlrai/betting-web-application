const mongoose = require(`mongoose`);
const scheduleSchema = new mongoose.Schema({
    team1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: `team`
    },
    team2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: `team`
    },
    dateTime: String,
    location: String
});

module.exports = mongoose.model(`schedule`, scheduleSchema);
