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
router.post("/",isLoggedIn,function(req, res){
   // get data from form and add to campgrounds array
   var name = req.body.name;
   var image = req.body.image;
   var description = req.body.description;
   var author = {id:req.user._id, username:req.user.username};
   //create new campground and save to db
   Campground.create({name:name, image:image, description:description,author:author},function(err,campground){
       if(err){
           console.log(err);
       }else{
           res.redirect("campgrounds");
       }
   });
});

// NEW -- show form to create new campground
router.get("/new",isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

// SHOW -- shows more info about one campground 
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


// EDIT
router.get("/:id/edit",doesOwnCampground,function(req,res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.render("campgrounds/edit",{campground:foundCampground});
        }
    });
});

// UPDATE
router.put("/:id",doesOwnCampground,function(req,res){
   //find and update the correct campground then redirect to show page
   Campground.findByIdAndUpdate(req.params.id,req.body.updatedData,function(err,updatedCampground){
      if(err){
          res.redirect("/campgrounds");
      } else{
          res.redirect("/campgrounds/"+req.params.id);
      }
   });
   
});

// DESTROY
router.delete("/:id",doesOwnCampground,function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
       if(err){
           res.redirect("/campgrounds");
       } else{
           res.redirect("/campgrounds");
       }
    });
});

function isLoggedIn(req,res,next){
    return req.isAuthenticated() ? next() : res.redirect("/login");
}

function doesOwnCampground(req,res,next){
//logged in?
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                res.redirect("back");
            }else{
                //own the campground??
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                }else{
                    res.redirect("back");
                }
            }
        });
    }else{
        res.redirect("back");
    }
}


module.exports = router;