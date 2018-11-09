var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var eventsearchRouter = require('./routes/eventsearch');
var eventDetailRouter = require('./routes/eventdetail');
var searchRouter = require('./routes/customizedsearch');
var searchRouter2 = require('./routes/customizedsearch2');
var musicRouter = require('./routes/musichandle');
var venueRouter = require('./routes/venue');
var upcomingeventRouter = require('./routes/upcomingevent');

var app = express();
const port = 8081

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(function(req, res, next) { 
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-Control-Allow-Header", "Origin, X-Requested-With, Content-Type, Accept")
	next()
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static('public'));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/route', eventsearchRouter);
app.use('/eventdetail', eventDetailRouter);
app.use('/customizedsearch',searchRouter);
app.use('/customizedsearch2',searchRouter2);
app.use('/musichandle', musicRouter);
app.use('/venuesearch', venueRouter);
app.use('/upcomingevent', upcomingeventRouter);

app.get('/', function (req, res) {
 res.sendFile( __dirname + "/" + "index.html" );
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
