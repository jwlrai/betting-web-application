const db = require(`../models`);

module.exports = {


    createSchedule: function(team1, team2, dateTime, location, cb) {
        db.schedule.create({
            team1: team1,
            team2: team2,
            dateTime: dateTime,
            location: location
        },
        (err, data) => {
            if (err) {
                cb(err, null);
            } else {
                cb(false, data);
            };
        });
    },

};
