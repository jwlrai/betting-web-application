const express = require(`express`);
const route = express.Router();
const betting = require(`../modules/betting`);


//make query rules

route.get('/pool',(req,res)=>{
    betting.getPool((err,data)=>{
        if(err){
            res.status(500).end('error');
        }else{
            res.json(data);
        }
    });
});
route.post(`/create/pool`, (req, res) => {

    
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

route.post(`/makeBet`, (req, res) => {
    const poolId = req.body.poolId;
    const amount = req.body.amount;
    const userId = res.locals.userData.id;
    const userAmount = res.locals.userData.fund - amount;

    if(userAmount < 0 ){
        res.end('no_fund');
    }
    else{
        betting.makeBet(poolId, amount, userId, userAmount, (err, data) => {
            if (err) {
                res.status(500).end();
            } else {
                res.json(data);
            };
        });
    }
    
});

route.put('/setwinner/:poolId',(req,res)=>{
    betting.distributeFunds(req.params.poolId,(err,data)=>{
        if(err){
            res.status(500).end();
        }else{
            res.json(data);
        }
    });
});





module.exports = route;