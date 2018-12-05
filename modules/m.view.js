const db = require('../models');

module.exports = {
    schedule: function(cb){
        db.teams.find({},(err,data)=>{
            cb(err,data);
        });
    }
};