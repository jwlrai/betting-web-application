const express = require(`express`);
const route = express.Router();
const schedule = require(`../modules/schedule`);

route.get(`/get`, (req, res) => {
    if (res.locals.userData !== null) {
        schedule.getSchedule((err, data) => {
            if (err) {
                
            } else {
                res.json(data);
            };
        });
    } else {
        res.status(403).end();
    };

});

route.post(`/create`, (req, res) => {
    if (res.locals.userData !== null && res.locals.userData.group == `admin`) {
    
        const team1 = req.body.team1;
        const team2 = req.body.team2;
        const dateTime = req.body.dateTime;
        const location = req.body.location;
        schedule.createSchedule(team1, team2, dateTime, location, (err, data) => {
            if (err) {
                
            } else {
                res.json(data);
            };
        });
    } else {
        res.status(403).end();
    };

});

route.delete(`/:matchId`, (req, res) => {
    if (res.locals.userData !== null && res.locals.userData.group == `admin`) {
        const matchId = req.params.matchId;
        schedule.deleteSchedule(matchId, (err, data) => {
            if (err) {
                
            } else {
                res.json(data);
            };
        });
    } else {
        res.status(403).end();
    };

});

route.put(`/edit/:matchId`, (req, res) => {
    if (res.locals.userData !== null && res.locals.userData.group == `admin`) {
        const matchId = req.params.matchId;
        const dateTime = req.body.dateTime;
        
        schedule.editSchedule(matchId, {dateTime: dateTime}, (err, data) => {
            if (err) {
                
            } else {
                res.json(data);
            };
        });
    } else {
        res.status(403).end();
    };
});



module.exports = route;