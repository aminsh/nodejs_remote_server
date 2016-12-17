var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var MemoryStore = require('session-memory-store')(session);
var request = require('request');
var Enumerable = require('linq');
var path = require('path');

var app = express();


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    store: new MemoryStore(),
    name: 'JSESSION',
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.use('/script', express.static(path.normalize(__dirname + '/dist/')));
app.use('/content', express.static(path.normalize(__dirname + '/../Content')));
app.use('/css', express.static(path.normalize(__dirname + '/dist/content')));
app.use('/fonts', express.static(path.normalize(__dirname + '/../fonts')));
app.use('/assets', express.static(path.normalize(__dirname + '/../assets')));
app.use('/app', express.static(path.normalize(__dirname + '/../app')));

var plugins = require('./plugins');
var remoteUrlMatch = [
    '/api',
    '/token'
];
app.use(function (req, res, next) {

    if (!Enumerable
            .from(remoteUrlMatch)
            .any(n => req.originalUrl.startsWith(n)))
        return next();

        var options = {
            uri: `http://91.109.22.2:82${req.path}`,
            method: req.method
        };

        if (req.path == '/token')
            options.form = req.body;
        else
            options.json = req.body;

        return request(options).pipe(res);
});

app.get('/', function (req, res) {
    res.render('index.ejs', {
        plugins: plugins
    });
});

app.listen(8080, function () {
    console.log('listening on 8080');
    console.log('go to http://localhost:8080 in your browser.');
});