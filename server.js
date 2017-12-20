// import modules
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const logger = require('morgan');
// initialize express app
let app = express();
const port = 8000;
/**
 * Here we are importing our routes;
 */ 
require("./mongodb");
const routers = require("./routes.js");
// Middleware
app.use((req, res, next) => {
    console.log("method " + req.method + " to " + req.url);
    next();
})
// app.use(logger('dev'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) 
// parse application/json
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Credentials', "true");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use(routers);
// Starting server
app.listen(port, () => {
    console.log("server is running!!")
});
//