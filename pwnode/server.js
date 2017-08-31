//node configuration
//server.js
//modules ==============================================

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

//configuration ========================================
//config file - enter credentials in config/database.js
var db = require('./config/database');

//set port
var port = process.env.PORT ||8080;

//connect to our mongoDB database
mongoose.connect(db.url);