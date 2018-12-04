const db = require(`../models`);

module.exports = {

    getTeams: function(cb) {
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
    deleteTeams: function(teamId, cb) {
        db.teams.findOneAndRemove({
            _id: teamId
        },
        (err, data) => {
            if (err) {
                cb(err, null);
            } else {
                cb(false, data);
            };
        });
    },
    editTeams: function(teamId, updateData, cb) {
        db.teams.findByIdAndUpdate(teamId, updateData,
        (err, data) => {
            if (err) {
                cb(err, null);
            } else {
                cb(false, data);
            };
        });
    }
};