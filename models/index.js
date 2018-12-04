const mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/bettingweb" );

const group     = require('./db.group');
const betting   = require('./db.betting');
const matches   = require('./db.matches');
const team      = require('./db.team');
const users     = require('./db.users');
const beggingHistory = require('./db.group');

module.exports = {
    team    : team,
    users   : users,
    group   : group,
    // sport   : sport,
    // league  : league,
    betting : betting,
    matches : matches,
    beggingHistory : beggingHistory
}