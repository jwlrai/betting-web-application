const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db  = require('../models');
const auth = require('./m.auth');

module.exports = {

    userCreate : function(userData,cb){
        bcrypt.hash(userData.password, 10, function(err, hash) {

            userData.password = hash;
           
            db.group.find({name:'user'},function(err,data){
                if(err){
                    cb(err, false);
                }
                else{
                    userData.groupId = data[0]._id;
                    
                    db.users.create(userData,function(err,data){
                        cb(err, data);
                    });   
                }
            });
                     
        });
    },
    validateUser : function(email,password,cb){
        
        db.users.find({email:email},(err,data)=>{
            if(err){
                cb(err,null);
            }else{
                if(data.length > 0){
                    bcrypt.compare(password, data[0].password, (err, res)=> {
                        if(err){
                            cb('invalid',null);
                        }else{
                            cb(false,auth.getToken(data[0]._id));
                        }
                    });
                }
                else{
                    cb('invalid',null);
                }
            }
        });
    }
    
};