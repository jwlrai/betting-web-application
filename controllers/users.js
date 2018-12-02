const express = require('express');
const route = express.Router();
const users = require('../modules/m.users');
const validate = require('../modules/m.validator');
// const gQur   = require('../models/getQuerys');

route.get('/',(req,res)=>{
   
    // apiReq.getCurrentLocation((err,data)=>{
    //     if(err){
    //         res.status(500).json({
    //             "message" : "no data found",
    //             "status" : "NODATA"
    //         });
    //     }
    //     else{                  
    //         const currLoc = JSON.parse(data);
    //         gQur.getRestaurants(currLoc.city.toLowerCase(),req.query.type,(err,getData)=>{
    //             if(getData.length > 0){
    //                 let restaurantList = {
    //                     status:"ok",
    //                     results:[]
    //                 };
    //                 getData.forEach((ele)=>{
    //                     restaurantList.results = restaurantList.results.concat(ele.data);
                      
    //                 });
    //                 res.json(restaurantList);
    //             }
    //             else{
    //                 apiReq.getRestaurants(currLoc.city.toLowerCase(),currLoc.loc,req.query.type,(err,restaurants)=>{
    //                     if(err){
    //                         res.status(500).json({
    //                             "message" : "no data found",
    //                             "status" : "NODATA"
    //                         });
    //                     }
    //                     else{
    //                         res.json(restaurants);
    //                     }
    //                 });
    //             }
    //         });
    //     }
    // });
});

route.post('/userCreate',(req,res)=>{
    // name:String,
    // address:String,
    // email:String,
    // phone:String
    // fund:Number,
    // password:String,
    // salt:String,
    // active:String,
    if( validate.isEmpty(req.body.name) && validate.isAlphaNumericSpace(req.body.name)) {
        res.send('valid name')
    }
    else{
        res.send('invalid name')
    }
    if( validate.isEmpty(req.body.address) && validate.isAlphaNumericSpace(req.body.address)) {
        res.send('valid name')
    }
    if( validate.isEmpty(req.body.address) && validate.isAlphaNumericSpace(req.body.address)) {
        res.send('valid name')
    }
    return;
   
});
module.exports = route;