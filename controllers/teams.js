const express = require(`express`);
const route = express.Router();
const teams = require(`../modules/teams`);

route.get(`/get`, (req, res) => {
    if (res.locals.userData !== null) {
        teams.getTeams((err, data) => {
            if (err) {
                console.log(err);
            } else {
                res.json(data);
            };
        });
    } else {
        res.status(403).end();
    };

});

route.post(`/create`, (req, res) => {
    if (res.locals.userData !== null && res.locals.userData.group == `admin`){
        const teamName = req.body.teamName;
        const description = req.body.description;
        const imgLink = req.body.imgLink;
        teams.createTeams(teamName, description, imgLink, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                res.json(data);
            };
        });
    } else {
        res.status(403).end();
    }

});

route.delete(`/:teamId`, (req, res) => {
    if (res.locals.userData !== null && res.locals.userData.group == `admin`) {
        const teamId = req.params.teamId;
        teams.deleteTeams(teamId, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                res.json(data);
            };
        });
    } else {
        res.status(403).end();
    }

});

route.put(`/edit/:teamId`, (req, res) => {
    if (res.locals.userData !== null && res.locals.userData.group == `admin`) {
        console.log(`inside`);
        const teamId = req.params.teamId;
        const teamName = req.body.teamName;
        const description = req.body.description;
        const updateData = {
        };
        if (teamName !== undefined) {
            updateData.name = teamName;
        };
        if (description !== undefined) {
            updateData.description = description;
        };
        console.log(teamId);
        teams.editTeams(teamId, updateData, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                res.json(data);
            };
        });
    } else {
        res.status(403).end();
    }

})


module.exports = route;