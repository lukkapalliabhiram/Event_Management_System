const express = require("express");
const router = express.Router();
// const bcrypt = require("bcryptjs");
const crypto  = require("crypto");
const saltLength = 10;
const jwt = require("jsonwebtoken");
const URL = require("../../../config/keys").URL;
const User = require("../../dbSchema/login/User");
const Owner = require("../../dbSchema/login/Owner");
const keys = require("../../../config/keys");// Load input validation
// const forgotpassword = require("../../validation/forgotpasswd");
const tokenGenerator = require("../../../config/createToken");
const emailSender = require("../../../config/sendEmails");


router.post("/googleSignIn", (req, res) => {
  console.log("Data recieved:",req.body);
  const email = req.body.email;
  const picture = req.body.picture;
  // console.log(req.body.picture);
  // console.log("Checking user");
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      Owner.findOne({ email }).then(owner => {
        // Check if user exists
        if (!owner) {
          return res.json({
            success: false,
            message: "Account does not exists, Try Signing Up!"
          })
        }
        const userProfile = {}
        userProfile.name = owner.fname+" "+owner.lname;
        userProfile.email = owner.email;
        userProfile.login = 1;
        userProfile.picture = picture;
        userProfile.role = 1;
        return res.json({
          success: true,
          message: `Welcome  ${userProfile.name}!`,
          profile: userProfile
        });
      });
    }
    else{
      const userProfile = {}
      userProfile.name = user.fname+" "+user.lname;;
      userProfile.email = user.email;
      userProfile.login = 1;
      userProfile.picture = picture;
      userProfile.role = 0;
      return res.json({
        success: true,
        message: `Welcome  ${userProfile.name}!`,
        profile: userProfile
      });
    }
  });
});

// @route POST /users/signup
// @desc Register user
// @access Public
router.post("/signup", (req, res) => {
  // Form validation
  console.log("Got Data:",req.body);
  const validateRegisterInput = require("../signup");  
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    console.log(errors);
    return res.json({
      success: false,
      message: errors.message
    });
  }
  var role_app = req.body.role;
  if(role_app == 'Owner'){
    role_app = 1
  }
  else{
    role_app = 0
  }
  // console.log(role_app);
  if (role_app==0) {
    const newUser = new User({
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      password: req.body.password,
      picture: '',
      loginType: 0
    });
    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.json({
          success: false,
          message: "Account already exists, Try Logging In!"
        });
      } else {
        // Hash password before saving in database
        crypto.randomBytes(saltLength, (err, salt) => {
          if (err) throw err;
          const saltString = salt.toString('hex');
          crypto.pbkdf2(newUser.password, saltString, 100000, 64, 'sha512', (err, derivedKey) => {
            if (err) throw err;
            const hash = derivedKey.toString('hex');        
            // Update the user's password and save the user
            newUser.password = hash;
            newUser
              .save()
              .then(() => {
                res.json({
                  success: true,
                  message: "Successfully Registered!"
                });
              })
              .catch(err => {
                res.json({
                  success: false,
                  message: err
                });
              });
          });
        });
        // bcrypt.genSalt(10, (err, salt) => {
        //   bcrypt.hash(newUser.password, salt, async (err, hash) => {
        //     if (err) throw err;
        //     newUser.password = hash;
        //     newUser
        //       .save()
        //       .then(res.json({
        //         success: true,
        //         message: "Successfully Registered!"
        //       }))
        //       .catch(err => res.json({
        //         success: false,
        //         message: err
        //       }));
        //   });
        // });
      }
    });
  }
  else if(role_app==1){
    const newUser = new Owner({
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      password: req.body.password,
      picture: '',
      loginType: 0
    });
    Owner.findOne({ email: req.body.email }).then(owner => {
      if (owner) {
        return res.json({
          success: false,
          message: "Account already exists, Try Logging In!"
        });
      } else {
        // Hash password before saving in database
        crypto.randomBytes(saltLength, (err, salt) => {
          if (err) throw err;
          const saltString = salt.toString('hex');
          crypto.pbkdf2(newUser.password, saltString, 100000, 64, 'sha512', (err, derivedKey) => {
            if (err) throw err;
            const hash = derivedKey.toString('hex');        
            // Update the user's password and save the user
            newUser.password = hash;
            newUser
              .save()
              .then(() => {
                res.json({
                  success: true,
                  message: "Successfully Registered!"
                });
              })
              .catch(err => {
                res.json({
                  success: false,
                  message: err
                });
              });
          });
        });
        // bcrypt.genSalt(10, (err, salt) => {
        //   bcrypt.hash(newUser.password, salt, (err, hash) => {
        //     if (err) throw err;
        //     newUser.password = hash;
        //     newUser
        //       .save()
        //       .then(res.json({
        //         success: true,
        //         message: "Successfully Registered"
        //       }))
        //       .catch(err => res.json({
        //         success: false,
        //         message: err
        //       }));
        //   });
        // });
      }
    });
  }
});


// @route POST users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation
  // console.log(req.body);
  const validateLoginInput = require("../login");
  const { errors, isValid } = validateLoginInput(req.body);// Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  
  console.log(req.body.email);
  console.log(req.body.password);
  const email = req.body.email;
  const password = req.body.password;// Find user by email
  const userProfile = {};        
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      Owner.findOne({ email }).then(owner => {
        // Check if user exists
        if (!owner) {
          return res.json({
            success: false,
            message: "Account does not exists, Try Signing Up!"
          })
        }// Check password
        const hash = crypto.createHash('sha256').update(password).digest('hex');
        if (hash === owner.password) {
          userProfile.name = owner.fname+" "+owner.lname;
          userProfile.email = owner.email;
          userProfile.login = 1;
          userProfile.picture = owner.picture;
          userProfile.role = 1;
          console.log(req.session);
          return res.json({
            success: true,
            message: `Welcome  ${userProfile.name}!`,
            profile: userProfile
          });
        } else {
          return res.json({
            success: false,
            message: "Password incorrect!"
          });
        }
        // bcrypt.compare(password, owner.password).then(isMatch => {
        //   if (isMatch) {
        //     req.session.name = owner.fname+" "+owner.lname;
        //     req.session.email = owner.email;
        //     req.session.login = 1;
        //     req.session.picture = owner.picture;
        //     req.session.role = 1;
        //     req.session.save();
        //     console.log(req.session);
        //     return res.json({
        //       success: true,
        //       message: `Welcome  ${req.session.name}!`
        //     });
        //   } else {
        //     return res.json({
        //       success: false,
        //       message: "Password incorrect!"
        //     });
        //   }
        // });
      });
    }// Check password
    else{
      const hash = crypto.createHash('sha256').update(password).digest('hex');
      if (hash === user.password) {
        // User matched          
        userProfile.name = user.fname+" "+user.lname;;
        userProfile.email = user.email;
        userProfile.login = 1;
        userProfile.picture = user.picture;
        userProfile.role = 0;
        return res.json({
          success: true,
          message: `Welcome  ${userProfile.name}!`,
          profile: userProfile
        });
      } else {
        return res.json({
          success: false,
          message: "Password incorrect!"
        });
      }
    }
  });
});

// @route POST /users/forgotpasswd
// @desc Forgot
// @access Public
router.post("/forgotpassword", (req, res) => {
  // Form validation
  const email = req.body.email;
  // console.log("Email:"+email);
  User.findOne({ email: email }).then(async user => {
    if(user){
      const token = tokenGenerator({email:user.email});
      const link = URL + "/users/verifyToken?token="+token;
      const sendMail = await emailSender(owner.email, "Forgot Password", ` To reset password, Please click on this <a href="${link}">link`);
      // console.log(link);
      // console.log(sendMail);
      if(sendMail){
        res.json({ success: false, message: "Failed to send the email!" })
      }
      else{
        res.json({ success: true, message: `Link already sent to ${user.email} , follow the link to reset password!`}) 
      }
    }
    else{
      Owner.findOne({ email: email }).then(async owner => {
        if(owner){
          const token = tokenGenerator({email:owner.email})
          const link = URL + "/users/verifyToken?token="+token;
          const sendMail = await emailSender(owner.email, "Forgot Password", ` To reset password, Please click on this <a href="${link}">link`);
          // console.log(link);
          // console.log(sendMail);
          if(sendMail){
            res.json({ success: false, message: "Failed to send the email!" })
          }
          else{
            res.json({ success: true, message: `Link already sent to ${user.email} , follow the link to reset password!`}) 
          }
        }
        else{
          return res.json({ success: false, message: "User not found!"});
        }
      });
    }
  });     
});// Check password

router.get("/verifyToken", (req, res) => {
  // Form validation
  // console.log(req.query);
  const {token} = req.query;
  if(!token){
    return res
      .status(404)
      .json({success: false, msg:'Invalid Token!'});
  }
  let decodedToken;
  try{
    decodedToken = jwt.verify(token, 'secret');
  }catch(err){
    return res
      .status(400)
      .json({success: false, msg:'Invalid Token!', error: err});
  }
  res
  .status(200)
  .json({success: true, data : decodedToken});
});

router.post("/resetPassword", (req, res) => {
  // Form validation
  const validateResetPasswordInput = require("../resetPassword");
  // console.log(req.body);
  const { errors, isValid } = validateResetPasswordInput(req.body);
  if (!isValid) {
    // return res.json(errors);
    console.log(errors);
    return res.json({success: false,message: errors.message});
  }
  if(req.body.role == 0){
    User.findOne({ email: req.body.email }).then(async user => {
      if(user){
        const saltRounds = 10;
        const newHash = await bcrypt.hash(user.password, saltRounds); 
        User.updateOne({ email: req.body.email }, { $set: { password: newHash } }, (err, result) => {
          if (err) {
            res.json({success: false,message: err})
          }
          res.json({success: true, message: 'Password successfully reset!'})
        });
      }
      else{
        res.json({success: false, message: 'Unable to find user!'});
      }
    });
  }
  else if(req.body.role == 1){
    Owner.findOne({ email: req.body.email }).then(async owner => {
      if(owner){
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(owner.password, salt, async (err, hash) => {
            if (err){
              console.log(error.message);
            }
            else {
              Owner.updateOne({ email: req.body.email }, { $set: { password: hash } }, (err, result) => {
                if (err) {
                  res.json({success: false,message: err})
                }
                res.json({success: true, message: 'Password successfully reset!'})
              });
            }
          });
        });
      }
      else{
        res.json({success: false, message: 'Unable to find owner!'});
      }
    });
  }
  else{
    res.json({success: false, message: 'This type of Role does not exist!'});
  }
});

module.exports = router;