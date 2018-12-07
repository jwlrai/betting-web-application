const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db  = require('../models');
const auth = require('./m.auth');

module.exports = {
    getUsers : function(offset,status,cb){
            db.group.find((err,data)=>{
                if(err){
                    cb(err,null);
                }else{
                    data.forEach((ele)=>{
                        if(ele.name =='user'){
                            db.users.find({groupId:ele._id,active:status}).skip(offset*10).limit(10).exec((err,udata)=>{
                                if(err){
                                    cb(err,null);
                                }else{
                                    cb(false,udata);
                                }
                            });
                        }
                    });
                }
                
            });
    },
    userCreate : function(userData,cb){
        bcrypt.hash(userData.password, 10, function(err, hash) {

            userData.password = hash;
           
            db.group.find({name:'user'},function(err,data){
                if(err){
                    cb(err, false);
                }
                else{
                    userData.groupId = data[0]._id;
                    
                    db.users.create(userData,function(err,udata){
                        if(err){
                            cb(err,false)
                        }
                        else{
                            cb(err, auth.getToken(udata._id));
                        }
                        
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
                    if(data[0].active === 1){
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
                    }else{
                        cb('disabled',null);
                    }
                }
                else{
                    cb('invalid',null);
                }
              
                

                
            }
        });
    },
    editUser : function(obj,cb){
        var updateObj = {};
        if(obj.type== 'email' || obj.type =='password' || obj.type=='fund'){
            bcrypt.compare(obj.oldpassword, obj.hashPassword, (err, res)=> {
                
                if(err){
                    cb(err,null);
                }else{                    
                    if(obj.type =='password' ){
                        bcrypt.hash(obj[obj.type], 10, function(err, hash) {
                            updateObj['password'] = hash;
                            db.users.findByIdAndUpdate(obj.id,updateObj,(err,data)=>{
                                if(err){
                                    cb(err,null);
                                }
                                else{
                                    cb(false,data);
                                }
                            });
                        });
                    }else{
                        if(obj.type == 'fund'){
                            if( obj['fund'] + obj.oldFund < 0 ){
                                cb('noFund',null);
                                return;
                            }else{
                                updateObj['fund'] = parseFloat(obj['fund'])+ parseFloat(obj.oldFund);
                            }
                        }else{
                            updateObj[obj.type] = obj[obj.type];
                        }
                        db.users.findByIdAndUpdate(obj.id,updateObj,(err,data)=>{
                            if(err){
                                cb(err,null);
                            }
                            else{
                                cb(false,data);
                            }
                        });
                    }
                }

            });
        }
        else{
            updateObj[obj.type] = obj[obj.type];          
            db.users.findByIdAndUpdate(obj.id,updateObj,(err,data)=>{
                if(err){
                    cb(err,null);
                }
                else{
                    cb(false,data);
                }
            });
        }
        
    },
    editUserStatus : function(userid,type,cb){

        db.users.findById(userid,(err,data)=>{
            if(err){
                cb(err,null);
            }else{
                console.log(data);
                if(type === data.active){
                    cb('nochange',null);
                }else{
                    db.users.findByIdAndUpdate(userid,{active:type},(err,changeData)=>{
                        if(err){
                            cb(err,null);
                        }else{
                            cb(false,'sucess');
                        }

                    });
                }
            }
        });

    }
    
};