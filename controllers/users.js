const express = require('express');
const route = express.Router();
const users = require('../modules/m.users');
const validate = require('../modules/m.validator');


route.post('/userCreate',(req,res)=>{
    if(res.locals.userData===null){
        validate.setRules('Name',req.body.name,'alphaNumericSpace','name');
        validate.setRules('Address',req.body.address,'alphaNumericSpace','address');
        validate.setRules('email',req.body.email,'email','email');
        validate.setRules('phone',req.body.phone,'numeric','phone');
        validate.setRules('password',req.body.password,'istring','password');
        if(validate.exec()){
            // console.log(validate.getData());
            users.userCreate(validate.getData(),function(err,data){
                if(err){
                    res.status(500).end();
                }
                else{
                    res.end('sucess');
                }
            });
        }
        else{
            res.json(validate.getError()).end();  
        }
    }
    else{
        res.status(403).end();
    }
    
});
route.post('/userValidate',(req,res)=>{
    if(res.locals.userData===null){
        users.validateUser(req.body.email,req.body.password,(err,data)=>{
            if(err){
                if(err==='invalid') res.status(203).end('invalid username or password');
                else res.status(500).end();
            }
            else{
                res.set('x-token',data).send('sucess');
            }
        });
    }
    else{
        res.status(403).end();
    }
});
module.exports = route;