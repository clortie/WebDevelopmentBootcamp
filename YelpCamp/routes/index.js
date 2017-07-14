var express = require("express");
var router = express.Router();
var passport = require("passport");
var async = require("async");
var nodemailer = require("nodemailer");
var crypto = require("crypto");
var User = require("../models/user");

//ROOT
router.get("/", function(req, res){
    res.render("landing");
});



// ===================================
// SIGN-UP
// ===================================

//show signup form
router.get("/signup",function(req,res){
    res.render("signup", {page:"signup"}); 
});

//handle signup
router.post("/signup",function(req, res){
    var newUser = {
        username:req.body.username,
        email:req.body.email
    };
    User.register(new User(newUser),req.body.password, function(err,user){
        if(err){
            console.log(err);
            req.flash("error",err.message);
            return res.redirect("/signup");
        }
        passport.authenticate("local")(req,res,function(){
            req.flash("success","Welcome, "+user.username);
            res.redirect("/campgrounds");
        });
    });
});


// ===================================
// LOGIN
// ===================================

// show login form
router.get("/login",function(req,res){
   res.render("login", {page:"login"}); 
});

//handle login
router.post("/login",passport.authenticate("local",{
        successRedirect:"/campgrounds",
        failureRedirect:"/login",
        badRequestMessage:"Username/password is incorrect or does not exist.",
        failureFlash:true
    }),function(req,res){
    //Nothing needed for now
});



// ===================================
// LOGOUT
// ===================================

//logout route
router.get("/logout",function(req,res){
    req.logout();
    req.flash("info","Logged out.");
    res.redirect("/campgrounds");
});

// ===================================
// FORGOT PASSWORD
// ===================================

router.get("/forgot",function(req,res){
    res.render("forgot");
});

router.post("/forgot",function(req,res,next){
   async.waterfall([
       function(done){
           crypto.randomBytes(20,function(err,buf){
               var token = buf.toString("hex");
               done(err,token);
           });
       },
       function(token,done){
           User.findOne({email:req.body.email},function(err,user){
               if(err){
                   req.flash("error",err.message);
                   return res.redirect("/forgot");
               }
               if(!user){
                   req.flash("error","No account with that email address exists.");
                   return res.redirect("/forgot");
               }
               user.resetPasswordToken = token;
               user.resetPasswordExpires = Date.now()+3600000;
               
               user.save(function(err){
                   done(err,token,user);
               });
           });
       },
       function(token,user,done){
           var smtpTransport = nodemailer.createTransport({
               service:"Gmail",
               auth:{
                   user:"clortie.yelpcamp@gmail.com",
                   pass:process.env.GMAILPW
               }
           });
           var mailOptions={
               to:user.email,
               from:"clortie.yelpcamp@gmail.com",
               subject:"Yelpcamp Password Reset",
               text:"You are receiving this email because you (or someone else) have requested the reset of the password for your account. \n\n"+
                    "Please click on the following link, or paste this into your browser to compete the process. \n\n"+
                    "http://"+req.headers.host+"/reset/"+token+"\n\n"+
                    "If you did not request this, please ignore this email and your password will remain unchanged."
            };
            smtpTransport.sendMail(mailOptions,function(err){
                console.log("mail sent");
                req.flash("success","An email has been sent to "+user.email+" with further instructions.");
                done(err,"done");
            });    
       }
   ], function(err){
       if(err) return next(err);
       res.redirect("/forgot");
   }) ;
});

router.get("/reset/:token",function(req,res){
    User.findOne({resetPasswordToken:req.params.token, resetPasswordExpires:{$gt:Date.now()}},function(err,user){
        if(err){
            req.flash("error",err.message);
            return res.redirect("/forgot");
        }
        if(!user){
            req.flash("error","Password reset token is invalid or has expired.");
            return res.redirect("/forgot");
        }
        res.render("reset",{token:req.params.token});
    });
});

router.post("/reset/:token",function(req,res){
    async.waterfall([
        function(done){
            User.findOne({resetPasswordToken:req.params.token,resetPasswordExpires:{$gt:Date.now()}},function(err,user){
                if(err){
                    req.flash("error",err.message);
                    return res.redirect("/forgot");
                }
                if(!user){
                    req.flash("error","Password token is invalue or has expired.");
                    res.redirect("back");
                }
                if(req.body.password === req.body.confirm){
                    user.setPassword(req.body.password,function(err){
                        if(err){
                            req.flash("error",err.message);
                            return res.redirect("back");
                        }
                        user.resetPasswordToken=undefined;
                        user.resetPasswordExpires=undefined;
                        
                        user.save(function(err){
                            if(err){
                                req.flash("error",err.message);
                                res.redirect("back");
                            }
                            req.logIn(user,function(err){
                                done(err,user);
                            });
                        });
                    });
                }else{
                    req.flash("error","Passwords do not match.");
                    return res.redirect("back");
                }
            });
        },
        function(user,done){
            var smtpTransport=nodemailer.createTransport({
                service:"Gmail",
                auth:{
                    user:"clortie.yelpcamp@gmail.com",
                    pass:process.env.GMAILPW
                }
            });
            var mailOptions={
                to:user.email,
                from:"clortie.yelpcamp@gmail.com",
                subject:"Your Password Has Been Changed",
                text:"Hello, \n\n"+
                    "This is a confirmation that the password for your account "+user.email+" has just been changed."
            };
            smtpTransport.sendMail(mailOptions,function(err){
                req.flash("success","Success! Your password has been changed.");
                done(err);
            });
        }
    ], function(err){
        if(err){
            req.flash("error","Error.");
            res.redirect("/campgrounds");
        }
        res.redirect("/campgrounds");
    });
});


module.exports = router;
