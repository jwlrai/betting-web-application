const express = require(`express`);
const route = express.Router();
const betting = require(`../modules/betting`);


//make query rules

route.post(`/create/pool`, (req, res) => {

    console.log(`inside`);
    const team1 = req.body.team1;
    const team2 = req.body.team2;
    const matchId = req.body.matchId;
    betting.createPool(team1, team2, matchId, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.json(data);
        };
    });
});

route.delete(`/delete/pool`, (req, res) => {
    const matchId = req.body.matchId;
    console.log(matchId);
    betting.deletePool(matchId, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.json(data);
        }
    })
})





module.exports = route;