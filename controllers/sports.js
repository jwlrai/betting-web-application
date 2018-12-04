const express   = require('express');
const route     = express.Router();
const sports    = require('../modules/m.sports');
const validate  = require('../modules/m.validator');
const multer    = require('multer')

const storage = multer.diskStorage({
    destination: './public/images/upload',
    filename: function (req, file, cb) {
        let name = file.originalname.split('.');
        cb( null, file.originalname+ '-' + Date.now()+"."+name[1]);
      
    }
})
const upload = multer({ storage: storage });
var fs = require('fs');


route.get('/game',(req,res)=>{});
route.post('/create/game',upload.single('fileToUpload'),(req,res)=>{
   
    console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzzz');
    // if(!req.file){
    //     fs.writeFile(req.file.path, function (err) {
    //         if (err) {
    //             return console.log(err);
    //         }
    //         console.log("The file was saved!");
    //     });
    // }else{

    // }
    res.send('good');
//    console.log(req.file);
    // validate.setRules('name',req.body.phone,'numeric','phone');
    // if(validate.exec()){

    // }
});
route.delete('/delete/game/:gameId',(req,res)=>{});

route.get('/league',(req,res)=>{});
route.post('/create/league',(req,res)=>{});
route.delete('/delete/league/:leagueId',(req,res)=>{});

route.get('/team',(req,res)=>{});
route.post('/create/team',(req,res)=>{});
route.delete('/delete/team/:teamId',(req,res)=>{});

route.post('assign/team/:teamId',(req,res)=>{

});

module.exports = route;