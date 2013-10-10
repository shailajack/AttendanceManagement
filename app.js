
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

//New code
var mongo = require('mongodb');
var mongoose = require('mongoose');
var monk = require('monk');
var db = monk('localhost:27017/studatt');
//var dbURL = 'mongodb://localhost/studatt';
//var db = require('mongoose').connect(dbURL);



var app = express();
                           
//Authenticator
app.use(express.basicAuth(function(user, pass, callback){
	var result = (user === 'testUser' && pass === 'testPass');
	callback(null /* error */,result);
}));

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));






// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}



app.get('/', routes.index);
app.get('/users', user.list);
app.get('/StudentsAtt', routes.StudentsAtt);
app.get('/studentlist', routes.studentlist(db));
app.get('/attendance_page', routes.attendance_page(db));
app.get('/feestrack_page', routes.feestrack_page(db));
app.get('/newstudent', routes.newstudent);
app.get('/attmark', routes.attmark);
app.get('/feestrack', routes.feestrack);


app.get('/', function (req, res) {
	res.render('StudentsAtt', {title:'Home'})
});

app.get('/studentlist', function(req, res) {
	res.render('studentlist', {title:'studentlist'})
});

app.get('/attendance_page', function(req, res) {
	res.render('attendance_page', {title:'attendance_page'})
});

app.get('/feestrack_page', function(req, res) {
	res.render('feestrack_page', {title:'feestrack_page'})
});

app.get('/attmark', function(req, res) {
	res.render('attmark', {title:'attmark'})
});

app.get('feestrack', function(req, res) {
	res.render('feestrack', {title:'feestrack'})
});


app.get('/', function(req, res) {
	mgs(dbColl).find(function(data){
		res.render('attendance_page.jade', {data: data});
	});
});



app.post('/addstudent', routes.addstudent(db));
app.post('/addattendance', routes.addattendance(db));
app.post('/addfeestrack', routes.addfeestrack(db));


//Student routes






http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
