const db = require(`../models`);

module.exports = {

    createTeams: function(teams, description, imgLink, cb) {
        db.teams.create({
            teams: teams,
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
    }
};