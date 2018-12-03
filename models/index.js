const mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/bettingweb" );

const group     = require('./db.group');
const betting   = require('./db.betting');
const league    = require('./db.league');
const matches   = require('./db.matches');
const sport     = require('./db.sport');
const team      = require('./db.teams');
const users     = require('./db.users');
const beggingHistory = require('./db.group');

module.exports = {
    teams   : team,
    users   : users,
    group   : group,
    sport   : sport,
    league  : league,
    betting : betting,
    matches : matches,
    beggingHistory : beggingHistory
}