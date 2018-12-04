const db = require(`../models`);

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
    },
    deletePool: function(matchId, cb) {
        db.betting.findOneAndRemove({
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

// from practace
// editPool: function(oldTeam, newTeam, matchId, cb) {
//     db.betting.findOneAndUpdate({
//         matchId: matchId,
//         teamId: oldTeam,
//     },
//     {
//         teamId: newTeam
//     }, (err, data) =>{
//         if (err) {
//             cb(err, null);
//         } else {
//             cb(false, data);
//         }
//     }
//     );
// },
//end of from practace