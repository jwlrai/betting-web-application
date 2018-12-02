const express       = require('express');
const bodyParser      = require('body-parser');
const controller    = require('./controllers');
const app           = express();


app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))



// all the request is sent to controller
app.use('/',controller);//application level middleware localhost:3000/


app.listen(process.env.PORT || 3000);


