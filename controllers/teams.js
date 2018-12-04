const express = require(`express`);
const route = express.Router();
const teams = require(`../modules/teams`);

route.get(`/get`, (req, res) => {
    const teamName = req.body.teamName;
    const description = req.body.description;
    const imgLink = req.body.imgLink;
    teams.getTeams(teamName, description, imgLink, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.json(data);
        };
    });
});

route.post(`/create`, (req, res) => {
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
});

route.delete(`/:teamId`, (req, res) => {
    const teamId = req.params.teamId;
    teams.deleteTeams(teamId, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.json(data);
        };
    });
});

route.put(`/edit/:teamId`, (req, res) => {
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
})


module.exports = route;