const express       = require('express');
const bodyParser      = require('body-parser');
const controller    = require('./controllers');
const app           = express();
const cookieParser = require('cookie-parser')
// const multer  = require('multer')
// const upload = multer({ dest: 'upload' });
app.set('view engine','ejs');
app.use(express.json());
app.use(cookieParser())
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }))

// app.post('/sport',upload.single('fileToUpload'),(req,res)=>{
//     res.end('sdfsd');
// });

// all the request is sent to controller
app.use('/',controller);//application level middleware localhost:3000/


app.listen(process.env.PORT || 3000);


