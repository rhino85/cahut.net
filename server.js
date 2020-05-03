var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
const jsonfile = require('jsonfile')
var fs = require('fs');

var db = require('./db');


// Configure the local strategy for use by Passport.

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
app.use(express.json()) // for parsing application/json

app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

var routes = new Object();                            //object that deals with routes
routes.map = new Map();                               //it got a map to store them
routes.handler = function(req, res, next){            //now thats a middlewar
  if(!routes.map.has(req.originalUrl)){               //if route doesn't already exist in memory
  jsonfile.readFile('public/html'+req.originalUrl+'.json', function (err, obj) {    // i try to read it from files
    if (err) {                                                                      // if not in files (i guess)
      console.log('gni');
      console.error(err)
      var route = {                                                                 //i create a route object to store in memory
        url:req.originalUrl,
        markdown:"nothing yet",
        html : "nothing yet",
        nothing : 1                                                                    //stating it is not modified yet (latter use : no need to look for a file if nothing = 1)
      };
      routes.map.set(req.originalUrl, route);                             //storing in memory (map object) + populate the req object for next 
      req.wesh = route;
    }
    else {                                                                            //(else) the file already exist ! (i guess)
      routes.map.set(req.originalUrl, obj);                               //storing in memory (map object) + populate the req object for next 
      req.wesh = obj;

    }
    next();                                                                         //ok next
  });
  }
  else {                                                                            //if route already registred in memory
    routes.map.get(req.originalUrl);
    req.wesh = routes.map.get(req.originalUrl);

    next();
  }

}

app.use(express.static('public'))
app.use(routes.handler);

let prefix = "";
// Define routes.

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
    console.log("gna");
    console.dir(req.wesh);
    if(req.user){
        res.render('base', {a:{ user: req.user.username, prefix:prefix, data:req.wesh }});
      }  
      else {
        res.render('base', {a:{user: 0, prefix:prefix, data:req.wesh }});
      }

  });

  app.post(prefix+'/*', 
  function(req, res) {

    if(req.user){     
    
      routes.map.get(req.originalUrl).markdown = req.body.markdown;           //storing data in memory
      routes.map.get(req.originalUrl).html = req.body.html;                
      console.log(req.originalUrl);
      let dir = 'public/html'+ req.originalUrl.slice(0, req.originalUrl.lastIndexOf('/'));          // path of the directory if any
      console.log(dir);
      fs.mkdir(dir, { recursive: true },                                                            //create dir 
        (err) => { 
          if (err) { 
            return console.error(1 + err); 
          }
          jsonfile.writeFile('public/html'+req.originalUrl+'.json', routes.map.get(req.originalUrl), function (err) {   //write the corresponding map object in file
            if (err) {
              console.error(2 + err);
              res.send("error saving");
            }
            else {
              console.log('saved');
              res.send("saved");
            }
          })
      });
    }  else {res.send("???");}                           //in case not auth
  });
  

app.listen(3001);


