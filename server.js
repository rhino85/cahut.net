var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
const jsonfile = require('jsonfile')
var fs = require('fs');
var db = require('./db');
var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static('public'));


// Configure the local strategy for use by Passport.

passport.use(new Strategy(
  function(username, password, done) {
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

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(express.json()) // for parsing application/json

app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());



app.use(function(req, res, next){              //silly middleware to get rid of unwanted querystring (ex : fbclid from fb)
  console.log('------------------------------------------------');
  console.log("1 redirect middleware " + req.originalUrl + " " +req.path);
  if (req.originalUrl == req.path){
    console.log("1.1 next");
    next();
  } else {
    console.log("1.2 redirected");
    res.redirect(req.path);
  }
})





var routes = new Object();                            //object that deals with routes
routes.map = new Map();                               //it got a map to store them in memory (so i can avoid useless FS operation)
routes.handler = function(req, res, next){            //now thats a middlewar that i use on "get" request
  console.log("3 routehandler " + req.originalUrl);
  if(!routes.map.has(req.originalUrl)){                                   //if route doesn't already exist in map
    console.log("3.1 not in map " + req.originalUrl);
    jsonfile.readFile('public/html'+req.path+'.json', function (err, fileContent) {    // i try to read it from files
      if (err) {                                                                  // if not in files
        console.log("3.1.1 nor in file " + req.originalUrl);
        var route = {                                                                //i create a route object to store in map
          url:req.originalUrl,
          markdown:"",
          html : "",
          nothing : 1                                                                //stating it is not modified yet (latter use : no need to look for a file if nothing = 1)
        };
        routes.map.set(req.path, route);                                             //storing in map object 
        req.data = route;                                                            //populate the res object for next 
      }
      else {                                                                      //(else) the file already exist but not in map object
        console.log("3.1.2 but in file " + req.originalUrl);
        routes.map.set(req.path, fileContent);                                       //storing in map object 
        req.data = fileContent;                                                      //populate the res object for next
      }
      next();
    });
  }
  else {                                                                            //if route already registred in memory
    console.log("3.2 it's already in map " + req.originalUrl);
    req.data = routes.map.get(req.originalUrl);    
    next();                                 
  }

}


  app.post(prefix+'/login', function(req, res, next) {          // i need to work on this
    console.log("login post");
    
    passport.authenticate('local', function(error, user, info) {
      if(error) {
        res.status(500).json(error);
      }
      else if(!user) {
        res.status(401).json(info);
      } else {
        req.login(user, function(err){
          console.log("logged in");

          res.json({
            connected : true,
            user : user
        });
      })
    }
    })(req, res, next);
  });
  
app.get(prefix+'/logout',    // i need to work on this
  function(req, res){
    req.logout();
    res.redirect(prefix+'/');
  });

  app.get(prefix+'/*', routes.handler, function(req, res){
    console.log("4 get* " + req.originalUrl);
    //console.dir("req.data : " + req.data);
    if(req.user){
      res.render('base', {
        user : req.user.username,
        data:req.data 
    });
      }  
      else {
        res.render('base', {
          user : "",
          data:req.data 
      });
      }

  });

  app.post(prefix+'/*', 
  function(req, res) {

    if(req.user){     
      
      routes.map.get(req.path).markdown = req.body.markdown;           //storing data in memory
      routes.map.get(req.path).html = req.body.html;    
      console.log("4 post* " + req.originalUrl);
      let dir = 'public/html'+ req.path.slice(0, req.path.lastIndexOf('/'));          // path of the directory if any
      fs.mkdir(dir, { recursive: true },                                                            //create dir 
        (err) => { 
          if (err) { 
            return console.error(1 + err); 
          }
          jsonfile.writeFile('public/html'+req.path+'.json', routes.map.get(req.path), function (err) {   //write the corresponding map object in file
            if (err) {
              console.error(2 + err);
              res.send({state : "error saving"});
            }
            else {
              res.send({state : "saved"});
            }
          })
      });
    }  else {res.send("???");}                           //in case not auth
  });
  

app.listen(3001);
