const express = require('express');
const route = express.Router();
const views = require('../modules/m.view');


route.get('/',(req,res)=>{   
    res.render('index',{data : (res.locals.userData===null)?null:res.locals.userData.group});
});
route.get('/login',(req,res)=>{
    res.writeHead(302, {
        'Location': '/'
    });
    res.end();
});
route.get('/logout',(req,res)=>{
    res.clearCookie("bettingweb");
    if(req.xhr){
        res.end();
    }else{
        res.writeHead(302, {
            'Location': '/'
        });
        res.end();
    }
    
});

route.get('/page/users',(req,res)=>{
 
    if(res.locals.userData!==null &&  res.locals.userData.group=='admin'){
        res.render('user');
    }else{
        res.status(403).end();
    }
});
route.get('/page/teams',(req,res)=>{
    if(res.locals.userData!==null){
        res.render('team',{data : res.locals.userData.group});

    }else{
        res.status(403).end();
    }
});
route.get('/page/schedules',(req,res)=>{
    if(res.locals.userData!==null){
        views.schedule(function(err,sdata){
            res.render('schedule',{data : res.locals.userData.group,team:sdata});
        });
        
    }else{
        res.status(403).end();
    }
});
route.get('/page/bettings',(req,res)=>{
    if(res.locals.userData!==null ){
        res.render('betting',{data : res.locals.userData.group});
    }else{
        res.status(403).end();
    }
});
route.get('/page/profile',(req,res)=>{
    if(res.locals.userData!==null ){
        views.profile(res.locals.userData.id,function(err,sdata){
            if(err){
                res.status(404).end();
            }else{
                res.render('profile',{data : res.locals.userData.group,profile:sdata});
            }
           
        });
    }else{
        res.status(403).end();
    }
});

module.exports = route;