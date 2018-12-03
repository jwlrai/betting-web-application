const db = require(`../models`);

module.exports = {

    getTeams: function(teams, description, imgLink, cb) {
        db.teams.find({
        },
        (err, data) => {
            if (err) {
                cb(err, null);
            } else {
                cb(false, data);
            };
        });
    },

    createTeams: function(teams, description, imgLink, cb) {
        db.teams.create({
            name: teams,
            description: description,
            imgLink: imgLink
        },
        (err, data) => {
            if (err) {
                cb(err, null);
            } else {
                cb(false, data);
            };
        });
    },
    deleteTeams: function(matchId, cb) {
        db.teams.findOneAndRemove({
            matchId: matchId
        },
        (err, data) => {
            if (err) {
                cb(err, null);
            } else {
                cb(false, data);
            };
        });
    }
};