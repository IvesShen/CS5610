
var express = require('express');

var app = express();
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var passport = require('passport');


var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(session({ secret: "put your text here" }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname+'/public'));

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

require('./assignment/app')(app);