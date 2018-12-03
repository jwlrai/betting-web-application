const express = require(`express`);
const route = express.Router();
const teams = require(`../modules/teams`);

console.log(`inside`);

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


module.exports = route;