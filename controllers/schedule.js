const express = require(`express`);
const route = express.Router();
const schedule = require(`../modules/schedule`);

route.get(`/get`, (req, res) => {
    const team1 = req.body.team1;
    const team2 = req.body.team2;
    const dateTime = req.body.dateTime;
    const location = req.body.location;
    schedule.getSchedule(team1, team2, dateTime, location, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.json(data);
        };
    });
});

route.post(`/create`, (req, res) => {
    const team1 = req.body.team1;
    const team2 = req.body.team2;
    const dateTime = req.body.dateTime;
    const location = req.body.location;
    schedule.createSchedule(team1, team2, dateTime, location, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.json(data);
        };
    });
});

route.delete(`/:matchId`, (req, res) => {
    const matchId = req.params.matchId;
    schedule.deleteSchedule(matchId, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.json(data);
        };
    });
});



module.exports = route;