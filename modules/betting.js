const db = require(`../models`);

module.exports = {
    getPool : function(cb){
        db.betting.find({active:1}).populate('teamId').populate('matchId').exec((err,data)=>{
            if(err){
                cb(err,null);
            }else{
                var pool = {};
                if(data.length > 0){
                    data.forEach((ele)=>{
                        if(pool[ele.matchId._id] == undefined){
                            pool[ele.matchId._id] = [ele];
                        }else{
                            pool[ele.matchId._id].push(ele);
                        }
                    
                    });
                }
                cb(false,pool);
            }
        });
    },
    createPool: function(team1, team2, matchId, cb) {
        db.betting.create( {
            amount: 0,
            teamId: team1,
            matchId: matchId,
            active:1
        },
        {
            amount: 0,
            teamId: team2,
            matchId: matchId,
            active:1
        }, (err, data) => {
            if (err) {
                cb(err, null);
            } else {
                db.betting.find({matchId: data.matchId}).populate('teamId').populate('matchId').exec((res,bdata)=>{
                    cb(false, bdata);
                });;
               
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

                db.betting.findByIdAndUpdate(poolId, {amount:sum}, (err,pldata) => {
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
                                else { cb(false,{amount:sum});}
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
                        let pools = [];
                        hdata.forEach((element) => {
                            if (element._id == poolId) {
                                
                                obj.win = element.amount;
                            } else {
                                obj.lose = element.amount;
                            }
                            pools.push(element._id);
                        });
                    
                        const ratio = parseFloat(obj.lose)/parseFloat(obj.win);
                        
                        this.distributeToUser(ratio, poolId, (err, rdata) => {
                            if (err) {
                                cb(err, null);
                            } else {
                                db.betting.findOneAndUpdate({_id:pools[0]},{active:0},(err,odata)=>{
                                    db.betting.findOneAndUpdate({_id:pools[1]},{active:0},(err,odata)=>{
                                        cb(false, rdata);
                                    })
                                })
                               
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
                    
                    db.users.findById(userId, (err, wdata) => {
                        if (err) {
                            cb(err, null);
                        } else {
                            
                            const obj = {fund: wdata.fund+amount};
                            db.users.findByIdAndUpdate(userId, obj,(err,updata)=>{
                                cb(err,updata);
                            });
                        }
                    })
                });
            }
        })
    }
};