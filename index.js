/** @format */

var express = require('express');
var app = express();
var path = require('path')
app.set('view engine', 'ejs');
app.use('/static', express.static('public'));
app.use('/uploads', express.static('uploads'))
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
const mongoose = require('mongoose');
mongoose
    .connect(
        'mongodb+srv://admin:Yoe2YBTV4qw2kWNO@cluster.eqwhj.gcp.mongodb.net/carental?retryWrites=true&w=majority',
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log('succesfully to connect to database'))
    .catch((error) => console.log('<Failed to connect to database>', error));
const carRoutes = require('./routes/car');
const customerRoutes = require('./routes/customer');
const rentRoutes = require('./routes/rent');


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use('/car', carRoutes);
app.use('/customer', customerRoutes);
app.use('/rent', rentRoutes);
app.use('/',(req,res)=> res.send({"status": "connected"}));


app.listen(process.env.PORT || 3000, function () {
    console.log('Example app listening at localhost:3001');
});
