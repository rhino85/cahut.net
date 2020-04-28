var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;

var db = require('./db');

// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new Strategy(
  function(username, password, done) {
    console.log("newstrat");
    db.users.findByUsername(username, function(err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (user.password != password) { return done(null, false); }
      return done(null, user);
    });
  }));

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function(user, cb) {
  console.log("serialised")
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  console.log("deserialised")

  db.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

// Create a new Express application.
var app = express();

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
//app.use(require('morgan')('combined'));
app.use(express.json()) // for parsing application/json
//app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

var routes = new Object();                            //object that deals with routes
routes.map = new Map();                               //it got a map to store them
routes.handler = function(req, res, next){            //now thats a middlewar 
  console.log("routehandler");
  if(!routes.map.has(req.originalUrl)){               //if route doesn't already exist:
  var route = {
    url:req.originalUrl,
    markdown:"nothing yet",
    html : "nothing yet"
  };
    routes.map.set(req.originalUrl, route);       //register it in the map  
  }
  //console.log(routes.map.get(req.originalUrl).content);
  next();
}

app.use(express.static('public'))
app.use(routes.handler);

let prefix = "";
// Define routes.

  
/*
app.post(prefix+'/login', 
  passport.authenticate('local', { failureRedirect: prefix+'/login' }),
  function(req, res) {
    console.log(req.body);
    res.redirect(prefix+'/');
  });*/

  app.post(prefix+'/login', function(req, res, next) {
    
    passport.authenticate('local', function(error, user, info) {
      console.log("authenticate");
      if(error) {
        res.status(500).json(error);
      }
      else if(!user) {
        res.status(401).json(info.message);
      } else {
        req.login(user, function(err){
          console.log("req.login");
          //console.log(err);
          res.json(user);
        })
      }
    })(req, res, next);
  });
  
app.get(prefix+'/logout',
  function(req, res){
    req.logout();
    res.redirect(prefix+'/');
  });

  app.get(prefix+'/*', function(req, res){

    console.log("get /*");
    if(req.user){
      res.render('base', {a:{ user: req.user.username, prefix:prefix, data:routes.map.get(req.originalUrl) }});
    }  
    else {
      res.render('base', {a:{user: 0, prefix:prefix, data:routes.map.get(req.originalUrl) }});
    }
     });

  app.post(prefix+'/*', 
  function(req, res) {
    if(req.user){

      routes.map.get(req.originalUrl).markdown = req.body.markdown;
      routes.map.get(req.originalUrl).html = req.body.html;

      res.redirect(prefix+req.originalUrl);
    }  else {res.send("???");}
  });
  

app.listen(3000);


