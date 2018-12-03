const express = require('express');
const route = express.Router();


route.get('/',(req,res)=>{
    res.sendFile('views/index.html', {root :__dirname+'/../'});
});

module.exports = route;