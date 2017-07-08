var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

// INDEX -- show all campgrounds
router.get("/", function(req, res){
    // res.render("campgrounds", {campgrounds:campgrounds});
    //get all campground from db then render
    Campground.find({},function(err, campgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index", {campgrounds:campgrounds});
        }
    });
});

// CREATE -- add new campground to DB
router.post("/",function(req, res){
   // get data from form and add to campgrounds array
   var name = req.body.name;
   var image = req.body.image;
   var description = req.body.description;
   //create new campground and save to db
   Campground.create({name:name, image:image, description:description},function(err,campground){
       if(err){
           console.log(err);
       }else{
           res.redirect("campgrounds");
       }
   });
});

// NEW -- show form to create new campground
router.get("/new", function(req, res){
    res.render("campgrounds/new");
});

// SHOW -- shows more info about one template 
router.get("/:id", function(req, res){
    //find the campground with provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err){
           console.log(err);
       } else{
           //render show template with that campground
           res.render("campgrounds/show", {campground:foundCampground});
       }
    });
});

module.exports = router;