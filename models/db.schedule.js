const mongoose = require(`mongoose`);
const scheduleSchema = new mongoose.Schema({
    team1: String,
    team2: String,
    dateTime: String,
    location: String
});

module.exports = mongoose.model(`schedule`, scheduleSchema);
