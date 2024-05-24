//apidoc -i routes/ -o doc/

const express = require('express');
const router = express.Router();
var db = require('./connections.js');
// Require library
//var xl = require('excel4node');
const mysql = require('mysql');
const path = require('path');
const app = express();
var apiRoutes = express.Router();

app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(express.json({limit: "50mb"}));

// Other imports and configurations...
const usersRouter = require('./routes/apartmani'); // Adjust the path as necessary

// Use the router
app.use(router);

app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/', require('./routes'));

app.use('/api', apiRoutes);

app.use(express.static('public'));

db.connect((err) => {//gleda jel imamo error prija radnje
    if(err){
        throw err;
    }
    console.log('Mysql Connected');
})
app.use(express.static('images'));

app.listen('3000',  () => {
  console.log('Server started on port 3000');
});


