# Web Betting Application 


![bettingweb](https://user-images.githubusercontent.com/42447565/55149423-0b40d380-5142-11e9-9963-518d4e195312.jpeg)


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



## Code For Sharing

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


## Views For The Future

- This site can be expanded by accommodating more sports, and by introducing real monetisation rather than 'fake' money.  

- If we had more time, we would implament socket.io. This will mean when other users make bets and add to the pool, other users will not need to refresh the page to see the increased pool amount.  

- We could have also implamented edge cases. This would mean that users cannot sign in with the same email address. 
