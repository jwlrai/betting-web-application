# web betting application 

## Technologies and framework  used

    NodeJS  
    MongoDB  
    Mongoose  
    Express Js  
    Bordy-parser  
    cookie-parser  
    Multer  
    Bycript   
    Jquery  
    Jsonwebtoken (JWT)  
    Ajax  
    ejs (view engine)  



## Code for sharing
    
```
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
```
The code above is routing level middleware which collects user status and data according to incoming query if uesr have valid cookies will be treated as logged in and all the data is collected inside res.locals which retains all users' data during the query lifecycle. 


