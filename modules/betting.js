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
        db.betting.deleteMany({
            matchId: matchId
        },
        (err, data) => {
            if (err) {
                cb(err, null);
            } else {
                cb(false, data);
            };
        });
    },
    makeBet: function(poolId, amount, userId, userFund, cb) {
        db.betting.findById(poolId, (err, pdata) => {
            if (err) {
                cb(err, null);
            } else {
                const sum = pdata.amount + amount;

                db.betting.findByIdAndUpdate(poolId, {amount:sum}, (err, data) => {
                    if (err) {
                        cb(err, null);
                    } else {
                        db.users.findByIdAndUpdate(userId, {fund:userFund}, (err, data) => {
                            db.bettingHistory.create({    
                                amount: amount,
                                date: new Date(Date.now()),
                                userId: userId,
                                teamId: pdata.teamId,
                                poolId: poolId
                            }, 
                            (err, data) => {
                                if (err) { cb(err, null);} 
                                else { cb(false, data);}
                            });
                        });
                    }
                });
            }
        });
    },
    distributeFunds: function(poolId, cb) {
        db.betting.findById(poolId, (err, data) => {
            if (err) {
                cb(err, null);
            } else {
                db.betting.find({matchId: data.matchId}, (err, hdata) => {
                    if (err) {
                        cb(err, null);
                    } else {
                        let obj = {};
                        hdata.forEach((element) => {
                            if (element._id == poolId) {
                                obj.win = element.amount;
                            } else {
                                obj.lose = element.amount;
                            }
                        });
                        const ratio = obj.los/obj.win;
                        this.distributeToUser(ratio, poolId, (err, rdata) => {
                            if (err) {
                                cb(err, null);
                            } else {
                                cb(false, rdata);
                            }
                        });
                    }
                });
            }
        });
        
    },
    distributeToUser: function(ratio, poolId, cb) {
        db.bettingHistory.find({poolId: poolId}, (err, data) => {
            if (err) {
                cb(err, null);
            } else {
                const arr = [];
                data.forEach(element => {
                    const userId = element.userId;
                    const amount = element.amount*ratio;
                    // arr.push({})
                    db.users.findById(userId, (err, wdata) => {
                        if (err) {
                            cb(err, null);
                        } else {
                            const obj = {amount: wdata.amount+amount};
                            db.users.findByIdAndUpdate(userId, obj);
                        }
                    })
                });
            }
        })
    }
};