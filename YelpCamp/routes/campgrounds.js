var express = require("express");
var router = express.Router();
var geocoder = require("geocoder");
var middleware = require("../middleware");
var Campground = require("../models/campground");

// INDEX -- show all campgrounds
router.get("/", function(req, res){
    //if there is a search term
    if(req.query.search){
        const regex = new RegExp(escapreRegex(req.query.search),"gi");
        Campground.find({name:regex},function(err, campgrounds){
            if(err){
                console.log(err);
            }else{
                var noMatch;
                if(campgrounds.length<1){
                    noMatch="No campgrounds match that query, please try again.";
                }
                res.render("campgrounds/index",{campgrounds:campgrounds, noMatch:noMatch});
            }
        });
    }else{
        //get all campground from db then render
        Campground.find({},function(err, campgrounds){
            if(err){
                console.log(err);
            }else{
                res.render("campgrounds/index", {campgrounds:campgrounds, noMatch:null});
            }
        });
    }
});

// CREATE -- add new campground to DB
router.post("/",middleware.isLoggedIn,function(req, res){
   // get data from form
   var name = req.body.name;
   var price = req.body.price;
   var image = req.body.image;
   var location = req.body.location;
   var description = req.body.description;
   var author = {id:req.user._id, username:req.user.username};
   var fieldError = checkFields(name,price,location,image,description,req,res);
   if(fieldError.length>0){
       return(fieldError);
   }
   geocoder.geocode(location,function(err,data){
       if(err){
           console.log(err);
           req.flash("error","You must provide a valid location.");
           res.redirect("back");
       }
       else{
           var lat = data.results[0].geometry.location.lat;
           var lng = data.results[0].geometry.location.lng;
           location = data.results[0].formatted_address;
           //create new campground and save to db
           Campground.create({name:name,price:price, image:image, description:description,author:author, location:location, lat:lat, lng:lng},function(err,campground){
                if(err){
                    console.log(err);
                }else{
                    req.flash("success","Added new campground.");
                    res.redirect("campgrounds");
                }
            });
       }
   });
});

// NEW -- show form to create new campground
router.get("/new",middleware.isLoggedIn, function(req, res){
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
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.render("campgrounds/edit",{campground:foundCampground});
        }
    });
});

// UPDATE
router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
   var name = req.body.name;
   var price = req.body.price;
   var image = req.body.image;
   var location = req.body.location;
   var description = req.body.description;
   var fieldError = checkFields(name,price,location,image,description,req,res);
   if(fieldError.length>0){
       return(fieldError);
   }
   geocoder.geocode(location,function(err,data){
       if(err){
           console.log(err);
           req.flash("error","You must provide a valid location.");
           res.redirect("back");
       }
       else{
            var lat = data.results[0].geometry.location.lat;
            var lng = data.results[0].geometry.location.lng;
            location = data.results[0].formatted_address;
            var newData = {
                name,
                image,
                description,
                price,
                location:location,
                lat:lat,
                lng:lng
            };
            //find and update the correct campground then redirect to show page
            Campground.findByIdAndUpdate(req.params.id,newData,function(err,updatedCampground){
                if(err){
                    req.flash("error",err.message);
                    res.redirect("/campgrounds");
                } else{
                    req.flash("info","Campground edited.");
                    res.redirect("/campgrounds/"+updatedCampground._id);
                }
            });
       }
   });
});

// DESTROY
router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
       if(err){
           res.redirect("/campgrounds");
       } else{
           req.flash("info","Campground deleted.");
           res.redirect("/campgrounds");
       }
    });
});

function checkFields(name,price,location,image,description,req,res){
    var result=[];
    if(name.length<1){
        result=[req.flash("error","You must enter a campground name."),res.redirect("back")];
   }else if(price.length<1){
        result=[req.flash("error","You must enter a price per night."),res.redirect("back")]; 
   }else if(location.length<1){
        result=[req.flash("error","You must enter a location."),res.redirect("back")]; 
   }else if(image.length<1){
        result=[req.flash("error","You must enter an image."),res.redirect("back")]; 
   }else if(description.length<1){
        result=[req.flash("error","You must enter a description."),res.redirect("back")]; 
   }
   return(result);
}

function escapreRegex(text){
    return text.replace(/[=[\]{}()*+?.,\\^$|#\x]/g,"\\$&");
};

module.exports = router;