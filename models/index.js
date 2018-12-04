const mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/bettingweb" );

const group     = require('./db.group');
const betting   = require('./db.betting');
const matches   = require('./db.matches');
const team      = require('./db.teams');
const users     = require('./db.users');
const beggingHistory = require('./db.group');
const schedule = require(`./db.schedule`);

module.exports = {
    teams   : team,
    users   : users,
    group   : group,
    schedule: schedule,
    betting : betting,
    matches : matches,
    beggingHistory : beggingHistory
}