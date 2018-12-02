const express   = require('express');
const route      = express.Router();
const users     = require('./users');
const jwt       = require('jsonwebtoken');


route.use('/',function(req,res,next){  //routing level middleware
    
    next();
    const token = req.get('x-token');
   
    if(token===undefined){ 
        res.locals.token = null;
      
        // res.send(jwt.sign({
        //     exp: Math.floor(Date.now() / 1000) + (600),
        //     data: 'foobar'
        //   }, '36f8814a15d2ff06601240a1cd3a87b22845e5b4e546f4e6870555837e4cf2f7'));
        //   return;
        // next();
    }else{
        
        // try {
        //     console.log('inside ');
        //     const tokenData = jwt.verify(token, '36f8814a15d2ff06601240a1cd3a87b22845e5b4e546f4e6870555837e4cf2f7');
           
        // } catch(err) {
        // // err
        //     res.status(403).send('Invalidsssss request');
        // }
    }
});

route.use('/users',users);

route.use('*', function(req, res){
    res.status(403).send("This is GG");
});

module.exports = route;