const db = require(`../models`)

module.exports = {

    createPool: function(team1, team2, matchId, cb) {
        db.betting.create( {
            amount: 0,
            teamId: team1,
            matchId: matchId
        },
        {
            amount: 0,
            teamId: team2,
            matchId: matchId
        }, (err, data) => {
            if (err) {
                cb(err, null);
            } else {
                cb(false, data);
            };
        });


    }
};
