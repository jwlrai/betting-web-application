const express   = require('express');
const route     = express.Router();
const users     = require('../modules/m.users');
const validate  = require('../modules/m.validator');


route.get('/p/:pageNo/s/:state',(req,res)=>{
   
    if(res.locals.userData !== null && res.locals.userData.group =='admin'){
      
        const status = {'enable':1,'disable':0};
        if(status[req.params.state]==undefined){
            res.status(404).end();
        }
        else{
          
            users.getUsers(req.params.pageNo,status[req.params.state],function(err,data){
                if(err){
                    res.json({"message":"fail"});
                }else{
                    res.status(200).json(data)
                }
                
            });
        }
        
    }else{
        res.status(403).end();
    }
});
route.post('/register',(req,res)=>{
    if(!req.xhr){
        if(res.locals.userData===null){ // creates user only if its not logedin
            validate.setRules('Name',req.body.name,'alphaNumericSpace','name');
            validate.setRules('Address',req.body.address,'alphaNumericSpace','address');
            validate.setRules('email',req.body.email,'email','email');
            validate.setRules('phone',req.body.phone,'numeric','phone');
            validate.setRules('password',req.body.password,'istring','password'); 
            if(validate.exec()){
            obj = validate.getData();
            obj.fund = 0;
            obj.active = 1;
                users.userCreate(obj,function(err,data){
                    if(err){
                        res.status(500).end();
                    }
                    else{
                        res.cookie('bettingweb',data, { expires: new Date(Date.now() + 86400000), httpOnly: true,maxAge:86400000 });
                        res.writeHead(302, {
                            'Location': '/'
                        });
                        res.end();
                    }
                });
            }
            else{
                res.json(validate.getError());  
                validate.resetValidation();
            }
        }
        else{
            res.writeHead(302, {
                'Location': '/'
            });
            res.end();
        }
    }
    else{
        res.status(403).end();
    }
});

route.post('/login',(req,res)=>{ // validate user only if not loged in
    if(!req.xhr){
        if(res.locals.userData===null){
        
            users.validateUser(req.body.email,req.body.password,(err,data)=>{
                if(err){
                    if(err==='invalid') res.status(203).end('invalid username or password');
                    else if(err==='disabled') res.status(203).end('user is disabled');
                    else res.status(500).end();
                }
                else{
                
                    res.cookie('bettingweb',data, { expires: new Date(Date.now() + 86400000), httpOnly: true,path:'/',maxAge:86400000 });
                    res.writeHead(302, {
                        'Location': '/'
                    });
                    res.end();
                }
            });
        
        }
    }
    else{
        res.writeHead(302, {
            'Location': '/'
        });
        res.end();
    }
   
});

route.put('/:userid/status/:type',(req,res)=>{
    if(res.locals.userData!==null && res.locals.userData.group ==='admin'){
        const type = ['disable','enable'];
        if(type.includes(req.params.type)){
            validate.setRules('parameter',req.params.userid,'alphaNumeric');
            if(validate.exec()){
                users.editUserStatus(req.params.userid,type.indexOf(req.params.type),(err,data)=>{
                    if(err){
                        if(err == 'nochange'){
                            res.send('nochange');
                        }
                        else{
                            res.status(500).end();
                        }
                    }
                    else{
                        res.send('sucess');
                    }
                });
            }else{
                console.log(/^[0-9a-zA-Z\s]+$/.test(req.params.userid));
                res.end('invalid');
            }
        }else{
            res.end('invalid');
        }
    }
    else{
        res.status(403).end('invalid request');
    }
    
});

route.put('/edit/:type',(req,res)=>{
    if(res.locals.userData!==null && res.locals.userData=='user'){
        
        const type = ['password','email','name','address','phone','fund'];
        validate.setRules('',req.params.type,'alpha');   
        if(validate.exec()){

            validate.resetValidation();   
        
            if(type.includes(req.params.type)){ 
                const change =  req.params.type;  
                if(change =='password' ){
                    validate.setRules('change to',req.body.changeto,'alphaNumericSpace',change);
                    validate.setRules('Password',req.body.oldpassword,'istring','oldpassword');
                }
                else if(change =='fund'){
                    validate.setRules('change to',req.body.changeto,'numeric',change);
                    validate.setRules('Password',req.body.oldpassword,'istring','oldpassword');
                }
                else if(change =='email'){
                    validate.setRules('change to',req.body.changeto,'email',change);
                    validate.setRules('Password',req.body.oldpassword,'istring','oldpassword');
                }
                else{
                
                    validate.setRules('change to',req.body.changeto,'alphaNumericSpace',change);

                }
                if(validate.exec()){
                    
                    const updateObject      = validate.getData();
                    updateObject.type       = change;
                    updateObject.oldFund    = res.locals.userData.fund;
                    updateObject.id         = res.locals.userData.id
                    updateObject.hashPassword = res.locals.userData.password;
                    
                    users.editUser(updateObject,(err,resData)=>{
                        if(err){
                            if(err=='noFund'){
                                res.send('nofund');
                            }
                            else{
                                res.status(500).end();
                            }

                        }else{
                            res.json(resData);
                        }
                    });
                }
                else{
                   
                    res.json(validate.getError());  
                    return res.end();
                }
            }
            else{
                res.json(["Invalid Type parameter"]);
            }
        }
        else{
            res.json(validate.getError());  
        }
    }
    else{
        res.status(403).end();
    }
});
module.exports = route;