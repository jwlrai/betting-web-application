const express   = require('express');
const route     = express.Router();
const users     = require('./users');
const auth      = require('../modules/m.auth');
const views     = require('./views');
const betting   = require('./betting');
const teams     = require(`./teams`);
const schedule  = require(`./schedule`);


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
route.use(`/betting`, betting);
route.use(`/teams`, teams);
route.use(`/schedule`, schedule);


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