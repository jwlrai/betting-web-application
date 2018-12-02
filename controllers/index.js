const express   = require('express');
const route     = express.Router();
const users     = require('./users');
const auth       = require('../modules/m.auth');


route.use('/',function(req,res,next){  //routing level middleware
    
    const token = req.get('x-token');   
    if(token===undefined){ 
        res.locals.userData = null;
        next();
    }else{
        auth.validateToken(token,(err,data)=>{
            if(err ){
                res.end('tokenExpire');
            }
            else{
               res.locals.userData = data;
               next();
            }
        });
    }
});

route.use('/users',users);

route.use('*', function(req, res){
    res.status(404).end('nodata');
});

module.exports = route;