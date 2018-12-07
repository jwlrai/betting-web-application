const express       = require('express');
const bodyParser    = require('body-parser');
const controller    = require('./controllers');
const app           = express();
const cookieParser  = require('cookie-parser');

app.set('view engine','ejs');
app.use(express.json());
app.use(cookieParser())
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

// all the request is sent to controller
app.use('/',controller);//application level middleware localhost:3000/


app.listen(process.env.PORT || 3000);


