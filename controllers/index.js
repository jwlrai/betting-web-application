const express   = require('express');
const route     = express.Router();
const users     = require('./users');
const sports    = require('./sports');
const auth      = require('../modules/m.auth');
const views     = require('./views');


route.use('/',function(req,res,next){  //routing level middleware for authenticating users

    const token = req.cookies.bettingweb; 
    if(token===undefined){ 
        res.locals.userData = null;
        next();
    }else{        
        auth.validateToken(token,(err,data)=>{
            if(err ){
                res.status(403).end();
            }
            else{
               res.locals.userData = data;
               
               next();
            }
        });
    }
});

route.use('/',views);

route.use('/users',users);
route.use('/sports',sports);

route.use('*', function(req, res,next){
    if(res.locals.userData === null){
        res.writeHead(302, {
            'Location': '/'
        });
        res.end();
    }
    else{
        res.status(404).end("no result found");
    }
    
   
});

module.exports = route;