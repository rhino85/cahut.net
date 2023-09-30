var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
const jsonfile = require('jsonfile');
const fileUpload = require('express-fileupload');
var fs = require('fs');
var db = require('./db');
var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(fileUpload({
   createParentPath:true,
}));





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

 
    res.redirect(req.path);
 


})


app.use(function(req, res, next){              //middleware pour redirect, ex : /pages/blabla.html => /blabla

  if(req.originalUrl.startsWith("/pages/") && req.method == "GET" && req.originalUrl.includes(".html")){
    req.originalUrl = req.originalUrl.replace("/pages", "");
    req.originalUrl = req.originalUrl.replace(".html", "");
    req.originalUrl = req.originalUrl.replace("index", ""); 
   res.redirect(req.originalUrl);
  }else{
    next();
  }

})


app.use('/', express.static('public/', {"index": false}));



app.get('/connected', function(req, res, next){
  if(req.user){
    res.json({
      connected : true
  });
  }
  else{
    res.json({
      connected : false
  });

  }
})



app.get('/login', function(req, res, next){

  var options = {
    root: __dirname,
    dotfiles: 'allow',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true,
      'Content-Type': 'text/html'
    }
  }
  res.sendFile('public/interface/html/login.html', options, function (err) {  
    if (err) {
      console.log(err);
    } else {
      console.log('Sent: default');
    }

  });
})

app.post('/login', function(req, res, next) {          // i need to work on this
    console.log("login post");
    console.log(req.body);
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
  
app.get('/logout',    // i need to work on this
  function(req, res){
    console.log("logout!!!!")
    req.logout();
  });

app.delete('/*', function(req, res){
    console.log("delete : ");
    console.log(req.path);
    if(req.user){
      console.log("!!!!!");
      let uri = "public" + decodeURI(req.path);
      console.log(uri);
      if(fs.existsSync(uri)){
        //check if dir

        fs.stat(uri,function(err, stat) {
          if(stat.isDirectory()){
            try {
              fs.rmdir(uri, {recursive:true},function(err){
                if (err) throw err;
                console.log('deleted');
                res.send({m:"deleted"});
              })
            } catch (err){
              console.log("bon ça a pas marché lol");
            }

          }else{
            console.log(uri);

            fs.unlink(uri, function(err){
              if (err) throw err;
              console.log('deleted');
              res.send({m:"deleted"});
            })
          }
        });


      } else {
        console.log("error file not found");
      }
    }  
    else {
      res.render('base', {
        user : "",
        data:req.data 
      });
    }
  });

  
  
   app.get('/public/*', function(req, res){

    

  

  let uri =decodeURI(req.path);
  let uri2 = uri.slice(7);  // passer de /public/* à /*

  console.log("1. " +req.path);
  console.log("2. " +uri);
  console.log("3. " +uri2);
  

  if(req.user){


  if(uri.endsWith("!getfilelist")){
    //send list of files/folder in json
    uri2 = uri2.slice(0, -12);
    
    console.log("public+uri2 : "+"public"+uri2)
    fs.readdir("public"+uri2 , {withFileTypes:1}, function(err, files){
      
        console.log("endswith !getfilelist")
        console.log(files);
        for (let index = 0; index < files.length; index++) {
          if(files[index].isDirectory()){
            files[index].isDirectory=1;
          }
          else{
          files[index].isDirectory=0;
        }
      }
        console.log(JSON.stringify(files));

        res.json({files});
        //res.send json data

      })
  }else{
    console.log("sendfile");
    var options = {
      root: __dirname,
      dotfiles: 'allow',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true,
        'Content-Type': 'text/html'
      }
    }
    res.sendFile("public/interface/html/filesNavigation.html", options);
  }
}  else {
        res.render('base-editor', {
          user : "",
          data:""
      });
      }
  
 });

  app.post('/public/*', function(req, res){  //used to mkdir
    console.log("--------");

    let dir = req.path;
    console.log("1  " + dir);
    dir = dir.slice(7);
    console.log("2  " + dir);
    console.log("req.body : " + req.body);
    console.log("post (mkdir) " + dir);

    if(req.user){    

      dir = "public" + dir.slice(0, dir.lastIndexOf('/')) + "/"+ req.body.name + "/";          
      console.log("dir : " + dir);
      
      fs.mkdir(dir, { recursive: true },                                                            
        (err) => { 
          if (err) { 
            return console.error(1 + err); 
          }
        }
      )
      res.send(req.body);
    }  
    else {
      res.render('base', {
          user : "",
          data:req.data 
      });
    }
  });

  app.put('/public/*', 
  function(req, res) {

    console.log("*******************");
    console.log("put files :");
     console.log("1 : " + req.body);
     console.log("2 : " + req.path);
     console.log("3 : " +decodeURI(req.path));

     console.log(req.files);
    if(req.user){     
      
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
      }
    
      // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
      let sampleFile = req.files.sampleFile;  
    
      let tosave = decodeURI(req.path);  //ex : /files/loup.jpg ou /files/loup en somme /files/*
      console.log("4 : " +tosave);
      tosave = tosave.slice(7);
      console.log("5 : " +tosave);


      if(req.path.endsWith("/")){    //ex : /files/loups/
        //better find the file a name (maybe keep the original file name, maybe ask the user), anyway i'll need to find and asign the file extension
        tosave = tosave + sampleFile.name;     //ça donne par exemple /files/loups/loup.jpg
      }
      else{
        if(req.path.includes('.')){     //si on essaye d'upload sur une url à extension ex : /files/loup.jpg
          //alors pas besoin de rajouter l'extension à priori
        }else{                          // url sans extention type /files/loups/1
          tosave = tosave + sampleFile.name.slice(sampleFile.name.lastIndexOf('.'));         //je rajoute l'extension
        }
      }
      console.log("6 " + tosave);

      tosave="public" + tosave;


      console.log("7 " + tosave);
      

      //should check here for file existence, i won't overwrite myself
      //user will have to manually delete if he wants to actually overwrite, 
      //but anyway, would be clever to do that front-end too
      if(fs.existsSync(tosave)){
         res.send({message:false});

      }else{
        sampleFile.mv(tosave, function(err) {
          if (err)
          {return res.status(500).send(err);}
          else{
            res.send({message:"cool"});
          }
        });
      }




    }  else {res.send("???");}                           //in case not auth
  });




app.get('/*', function (req, res, next) {


  /*

  page par defaut :
  si !exist && connected && !file...


  /blibli : /par-defaut
  /blabla/ : /blabla/par-defaut
  /blabla/truc : /blabla/par-defaut



  */



  req.originalUrl = decodeURI(req.originalUrl);
  var exist;                                                           //boolean does the page already exist?
  var hidden = req.originalUrl.includes("::hidden");                   //boolean is it a "hidden" page?
  var source = req.originalUrl.endsWith("::source");                   //boolean is user trying to access the "source edit" interface ?
  var connected = req.user != undefined;                               //boolean is user connected ?
  var file = req.originalUrl.includes(".");                            //boolean is user trying to access a "static file" (ex : .js .css .txt) 
  var fileURI = req.originalUrl;                                       //URI de la ressource sur le serveur

  var options = {
    root: __dirname,
    dotfiles: 'allow',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true,
      'Content-Type': 'text/html'
    }
  }


  console.log("////////////////////////////");

 console.log(req.originalUrl);
 let temp = req.originalUrl.split("/");
 console.log(temp);
 let temp2 = "";
 let temp3 ="";
 let modele = 'public/interface/html/default.html';
 for (let index = 0; index < temp.length-1; index++) {
     temp2 = temp2 + temp[index] + "/";
     console.log("temp2 : " + temp2);
     temp3 = "public/pages" + temp2 + "modele.html";
     console.log("temp3 : " + temp3);
     //bon faut check si ça exist.... faut check dans le dossier pages 
     if(fs.existsSync(temp3)){
       console.log("MODEL EXIST!!!!")
       modele = temp3;

     } 
}

console.log("modele : " + modele);

  console.log("////////////////////////////");
  

  if(!file){                                                           //si la ressource recherchée n'est pas "static" (page html)
    fileURI ="public/pages" +fileURI;                                  //on construit l'URI de la page html sur le serveur ex : /chaton/ => public/pages/chaton/index.html
    if(fileURI.endsWith("/")){                                         //si fichier sur une racine ("/") on le nomme index               
      fileURI = fileURI + "index" 
    }                                                  
  fileURI = fileURI + ".html";                                       //on rajoute l'extention
  }else{
    fileURI = "public/" + fileURI;
  }
  exist = fs.existsSync(fileURI);                                    // est-ce que le fichier existe?

  console.log("exist " + exist);
  console.log("hidden " + hidden);
  console.log("source " + source);
  console.log("connected " + connected);
  console.log("file " + file);
  console.log("fileURI " + fileURI);



if((!exist && !connected) || (hidden && !connected))
{
  //sendblank

  console.log("sendblank");
    res.sendFile('public/interface/html/default.html', options);
}else{
  if(!exist && connected && !source && !file){
    //senddefaut
    console.log("senddefaut");
    res.sendFile(modele, options);
  }else{
    if(exist && !source){
      //sendURI
    console.log("send URI");
      res.sendFile(fileURI, options);
    }else{
      if(source && connected){
        //sendsource
    console.log("send source")
        res.sendFile("public/interface/html/sourceEdit.html", options);
      }else{
        if(file && !exist){
          //redirect + send sourceEdit
        }
      }
    }
  }
}







});



app.post('/*', function(req, res) {




 console.log("Làààààààààà : "  + req.originalUrl);

 req.originalUrl = decodeURI(req.originalUrl);

 //console.log("Làààààààààà3 : "  + req.path);



 let htmlFile;

     if(req.originalUrl.includes(".")){                                   //je teste si c'est on essaie d'acceder à un fichier brut (url avec extention)
      console.log("static, " +  req.originalUrl);
      req.originalUrl = "public/" + req.originalUrl;
      req.htmlFile = req.originalUrl;                                  //fichier à extention : sendfile (.css, .js .jpg etc..)

  }else{                                                              //url SANS  extention, correspond à une "page" (choix arbitraire de ma part)
    console.log("not static")
    htmlFile ="public/pages" +req.originalUrl;               //adresse du fichier recherché
    if(req.originalUrl.endsWith("/"))                                    
       {htmlFile = htmlFile + "index" }                               //si fichier à une racine ("/") on le nomme index
    htmlFile = htmlFile + ".html";                                    //on rajoute l'extention
    req.htmlFile = htmlFile;                                 //adresse du fichier recherché
  }
    /////////////////////////////////////////////


    console.log("post ! ");
    console.log("post data : "+ req.body.html);
    htmlFile = req.htmlFile;
    console.log(htmlFile);
    console.log("sliced : " + htmlFile.slice(0, htmlFile.lastIndexOf('/')));

    if(req.user){    
      fs.mkdir(htmlFile.slice(0, htmlFile.lastIndexOf('/')), { recursive: true }, (err) => {     ///// MKDIR -R (ARBORESCENCE DE DOSSIER)
        if (err) throw err;
        fs.writeFile(htmlFile, req.body.html, (err) => {                                                  //ecriture du fichier html sur le Disque Dur
          if (err) throw err;                      // throws an error, you could also catch it here
          // success case, the file was saved
          console.log('html written to DD!');
          res.send({state : "saved"});
        });
      });
    }  else {
      res.send({'connected' : false});
    }                          
});








app.listen(3001);
