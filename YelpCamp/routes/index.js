var express = require("express");
var router = express.Router();
var passport = require("passport");
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
    res.render("signup"); 
});

//handle signup
router.post("/signup",function(req, res){
    User.register(new User({username:req.body.username}),req.body.password, function(err,user){
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
   res.render("login"); 
});

//handle login
router.post("/login",passport.authenticate("local",{
        successRedirect:"/campgrounds",
        failureRedirect:"/login",
        badRequestMessage:"Username and/or is incorrect or does not exist.",
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


module.exports = router;
