const db = require(`../models`);

module.exports = {

    getSchedule: function(cb) {
        db.schedule.find({}).populate(`team1`).populate(`team2`).exec((err, data) => {
            if (err) {
                cb(err, null);
            } else {
                cb(false, data);
            };
        });
    },

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


    deleteSchedule: function(matchId, cb) {
        db.schedule.findOneAndRemove({
            _id: matchId
        },
        (err, data) => {
            if (err) {
                cb(err, null);
            } else {
                cb(false, data);
            };
        });
    },

    editSchedule: function(matchId, dateTime, cb) {
        db.schedule.findByIdAndUpdate(matchId, dateTime, (err, data) => {
            if (err) {
                cb(err, null);
            } else {
                cb(false, data);
            };
        });
    }

};
