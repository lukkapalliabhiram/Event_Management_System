const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const URL = require("../../../config/keys").URL;
const User = require("../../dbSchema/login/User");
const Owner = require("../../dbSchema/login/Owner");
const keys = require("../../../config/keys");// Load input validation
// const forgotpassword = require("../../validation/forgotpasswd");
const tokenGenerator = require("../../../config/createToken");
const emailSender = require("../../../config/sendEmails");


router.post("/googleSignIn", (req, res) => {
  // Form validation
  const GoogleUser = require("../../dbSchema/login/GoogleUser");
  const role_app = req.body.role;
  // console.log(role_app);
  const userProfile = req.body.user._json;  
  // console.log(userProfile);
  const newUser = new GoogleUser({
    name: userProfile.name,
    email: userProfile.email,
    picture: userProfile.picture,
    role: 0
  });
  GoogleUser.findOne({ email: userProfile.email }).then(user => {
    if (user) {
      console.log("google user found");
      req.session.name = user.name;
      req.session.email = user.email;
      req.session.login = 1;
      req.session.picture = user.picture;
      req.session.role = 0;
      req.session.save();
      return res.json(1);
    } else {
      console.log("google user not found");
      req.session.name = newUser.name;
      req.session.email = newUser.email;
      req.session.login = 1;
      req.session.picture = newUser.picture;
      req.session.role = 0;
      req.session.save();
      console.log(req.session);
      newUser
      .save()
      .then(res.json(1))
      .catch(err => {
        res.redirect('/login?error=1&message=' + err)
        req.session.destroy();
      });
    }
  });
  
  // const newUser = new GoogleUser({
  //   name: userProfile.name,
  //   email: userProfile.email,
  //   picture: userProfile.picture,
  //   role: 1
  // });
  // GoogleUser.findOne({ email: userProfile.email }).then(owner => {
  //   if (owner) {
  //     return res.status(400).json({ email: "User has already Signed Up!" });
  //   } else {
  //     // Hash password before saving in database
  //     newUser
  //     .save()
  //     .then(res.json("Successfully Registered!"))
  //     .catch(err => console.log(err));
  //   }
  // });
});

// @route POST /users/signup
// @desc Register user
// @access Public
router.post("/signup", (req, res) => {
    // Form validation
    const validateRegisterInput = require("../signup");
    console.log(req.body);
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
      // return res.json(errors);
      console.log(errors);
      return res.redirect('/login?error=1&message=' + errors['message']);
    }
    const role_app = req.body.role;
    console.log(role_app);
    if (role_app==0) {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        picture: '',
        loginType: 0
      });
      User.findOne({ email: req.body.email }).then(user => {
        if (user) {
          return res.redirect('/login?error=1&message=' + encodeURIComponent('"Email already exists"!'));
        } else {
          // Hash password before saving in database
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, async (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(res.redirect('/login?error=0&message=' + encodeURIComponent('Successfully Registered!')))
                .catch(err => console.log(err));
            });
          });
        }
      });
    }
    else if(role_app==1){
      const newUser = new Owner({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        picture: '',
        loginType: 0
      });
      Owner.findOne({ email: req.body.email }).then(owner => {
        if (owner) {
          return res.redirect('/login?error=1&message=' + encodeURIComponent('"Email already exists"!'));
        } else {
          // Hash password before saving in database
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              // const token = tokenGenerator({email:newUser.email})
              // const link = res.hostname + ":3500/api/email/verify?token="+token;
              // const sendMail = await  
              // console.log("token",tokenGenerator({email:newUser.email}))
              newUser
                .save()
                .then(res.redirect('/login?error=0&message=' + encodeURIComponent('Successfully Registered!')))
                .catch(err => console.log(err));
            });
          });
        }
      });
    }
  });

// @route POST users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    // Form validation
    const validateLoginInput = require("../login");
    const { errors, isValid } = validateLoginInput(req.body);// Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }const email = req.body.email;
    const password = req.body.password;// Find user by email
      User.findOne({ email }).then(user => {
        // Check if user exists
        if (!user) {
          Owner.findOne({ email }).then(owner => {
            // Check if user exists
            if (!owner) {
              return res.redirect('/login?error=1&message=' + encodeURIComponent('User Does not exist!'))
            }// Check password
            bcrypt.compare(password, owner.password).then(isMatch => {
              if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                  id: owner.id,
                  name: owner.name
                };// Sign token
                jwt.sign(
                  payload,
                  keys.secretOrKey,
                  {
                    expiresIn: 31556926 // 1 year in seconds
                  },
                  (err, token) => {
                    res.json({
                      success: true,
                      token: "Bearer " + token
                    });
                  }
                );
                req.session.name = owner.name;
                req.session.email = owner.email;
                req.session.login = 1;
                req.session.picture = owner.picture;
                req.session.role = 1;
                req.session.save();
                console.log(req.session);
                // return res.json(`Welcome  ${owner.name}!`);
                return res.redirect('/');
              } else {
                return res.redirect('/login?error=1&message=' + encodeURIComponent('Password incorrect!'))
              }
            });
          });
        }// Check password
        else{
          bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
              // User matched
              // Create JWT Payload
              const payload = {
                id: user.id,
                name: user.name
              };// Sign token
              jwt.sign(
                payload,
                keys.secretOrKey,
                {
                  expiresIn: 31556926 // 1 year in seconds
                },
                (err, token) => {
                  res.json({
                    success: true,
                    token: "Bearer " + token
                  });
                }
              );
              req.session.name = user.name;
              req.session.email = user.email;
              req.session.login = 1;
              req.session.picture = user.picture;
              req.session.role = 0;
              req.session.save();
              console.log(req.session);
              return res.redirect('/');
            } else {
              return res.redirect('/login?error=1&message=' + encodeURIComponent('Password incorrect!'));
            }
          });
        }
      });
      
  });

// @route POST /users/forgotpasswd
// @desc Forgot
// @access Public
router.post("/forgotpassword", (req, res) => {
  // Form validation
  const email = req.body.email;
  console.log("Email:"+email);
  User.findOne({ email }).then(async user => {
    // Check if user exists
    if (!user) {
      Owner.findOne({ email }).then( async owner => {
        // Check if user exists
        console.log("owner")
        if (!owner) {
          return res.json({ success: false, message: "User not found" });
        }
        else{
          const token = tokenGenerator({email:owner.email})
          const link = URL + "/users/verifyToken?token="+token;
          // console.log(link);
          const sendMail = await emailSender(owner.email, "Forgot Password", ` To reset password, Please click on this <a href="${link}">link`)
          console.log(sendMail);
          if(sendMail){
            res.json({ success: false, message: "Failed to send the email!" })
          }
          else{
            res.json({ success: true, message: "Email has been sent!" })
          }
        }
      });
      
    }// Check password
    else{
      console.log("user")
      const fp_token = tokenGenerator({email:user.email})
      const fp_link = URL + "/users/verifyToken?token="+fp_token;
      // console.log(fp_link);
      const fp_sendMail = await emailSender(user.email, "Forgot Password", ` To reset password, Please click on this <a href="${fp_link}">link`)
      console.log(fp_sendMail);
      if(fp_sendMail){
        res.json({ success: false, message: "Failed to send the email!" })
      }
      else{
        res.json({ success: true, message: "Email has been sent!" })
      }
    }
  });
});

router.get("/verifyToken", (req, res) => {
  // Form validation
  console.log(req.query);
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

// router.post("/resetPassword", (req, res) => {
//   // Form validation
//   const {token} = res.query;
//   if(!token){
//     return res
//       .status(404)
//       .json({success: false, msg:'Invalid Token!'});
//   }
//   let decodedToken;
//   try{
//     decodedToken = jwt.verify(token, 'secret');
//   }catch(err){
//     return res
//       .status(400)
//       .json({success: false, msg:'Invalid Token!', error: err});
    
//   }
//   res
//   .status(200)
//   .json({success: true, data : decodedToken});

// });

module.exports = router;