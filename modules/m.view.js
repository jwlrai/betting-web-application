const db = require('../models');

module.exports = {
    schedule: function(cb){
        db.teams.find({},(err,data)=>{
            cb(err,data);
        });
    },
    profile : function(id,cb){
        db.users.findById(id,(err,data)=>{
            cb(err,data);
        });
    },
    betting: function(cb){
        db.betting.find({},(err,bdata)=>{
            var matchids = [];
            if(err){
                cb(er,null);
            }else{
                bdata.forEach(function(bit){
                    if(!matchids.includes(bit.matchId.toString())){
                        matchids.push(bit.matchId.toString());
                    }
                   
                });
            }
           
            db.schedule.find({},(err,sdata)=>{
                var obj = [];
                
                sdata.forEach(function(els){
               
                    if(!matchids.includes(els._id.toString())){
                        
                        obj.push(els);
                    }
                    
                });
               
                cb(err,obj);
            });
        });
       
    }
};