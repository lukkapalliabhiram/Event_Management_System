const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const db = require("./config/keys").mongoURI;
const users = require("./models/validation/routes/loginApi");
const app = express();// Bodyparser middleware
const GOOGLE_CLIENT_ID =  require("./config/keys").GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET =  require("./config/keys").GOOGLE_CLIENT_SECRET;
const URL =  require("./config/keys").URL;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const session = require('express-session');
const cookieParser = require("cookie-parser");
const request = require('request');
const cors = require('cors');

app.use(cors());

app.use(express.static("pages/assets"));
app.use(cookieParser());
const cookie_expire = 1000 * 60 * 60 * 1;
app.use(
  bodyParser.urlencoded({
    extended: false
  }),
  session({
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: cookie_expire, secure: true },
    secret: 'SECRET' 
  })
);
app.use(bodyParser.json());// DB Config
// const db = require("./config/keys").mongoURI;// Connect to MongoDB
mongoose.connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

var userProfile, msg;
// Passport middleware
app.use(passport.initialize());// Passport config
app.use(passport.session());

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});
passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: URL+"/auth/google/callback"
},
  function(accessToken, refreshToken, profile, done) {
    userProfile=profile;
    return done(null, userProfile);
  }
));

app.get('/error', (req, res) => res.redirect('/login'+req.body));
app.get('/success', (req, res) => res.redirect('/'));
app.use("/users", users);

app.get('/userdata', (req, res) => {
  // Get user data from the session
  const user = req.session.user;
  res.json(user);
});

app.get('/',function(req,res) {
  // console.log(req.session);
  if(req.session.login){
    if(req.session.login==0){
      res.redirect('/login');
    }
    else{
      // console.log(req.session.role)
      req.session.save();
      // if(req.session.role==1){
      //   res.json(rquser);
      // }
      // else if(req.session.role==0){
        
      // }
      res.json(req.session.user)
    }
  }
  else{
    res.redirect('/login');
  }
});

app.get('/login',function(req,res) {
  console.log("login")
  // console.log(req.session);
  if(req.session.login){
    req.session.save();
    res.redirect('/');
  }
  else{
    res.sendFile('pages/login.html', { root: '.' });
  }
});

app.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));

app.get('/forgotPassword',function(req,res) {
  res.sendFile('pages/forgot_password.html', { root: '.' })});
  
 
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    // Successful authentication, redirect success.
    const options = {
        url: URL+'/users/googleSignIn',
        json: true,
        body: {
            user: userProfile,
            role: 1
        }
    };
    request.post(options, (err, req_res, body) => {
        if (err) {
          console.log("error found"+err);
          res.redirect('/login?message='+err.message);
        }
        console.log("error not found");
        console.log("body"+body);
        console.log(`Status: ${req_res.statusCode}`);
        // console.log("Google Login");
        // console.log(req.session);
        // msg = req_res.body;
        req.session.login = 1;
        req.session.role = 0;
        req.session.name = req.session.passport.displayName;
        req.session.save();
        console.log(req.session);
        res.redirect('/');
    });
    
  });


require("./config/passport")(passport);// Routes

const port = process.env.PORT || 3500; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));