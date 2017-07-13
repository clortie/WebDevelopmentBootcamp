var express = require("express");
var router = express.Router({mergeParams:true});
var middleware = require("../middleware");
var Campground = require("../models/campground"),
    Comment = require("../models/comment");

//NEW -- form to create comment
router.get("/new",middleware.isLoggedIn,function(req,res){
    Campground.findById(req.params.id,function(err, campground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new",{campground:campground});
        }
    });
});

//CREATE
router.post("/",middleware.isLoggedIn,function(req, res){
   var comment = req.body.comment;
   if(comment.text.length<1){
      return(req.flash("error","Comment cannot be empty."),res.redirect("back"));
   }
   Campground.findById(req.params.id,function(err,campground){
      if(err){
          console.log(err);
          res.redirect("/campgrounds");
      } else{
         Comment.create(comment,function(err,newComment){
            if(err){
                req.flash("error","Something went wrong.");
                console.log(err);
            } else{
                //add username and id to comment
                newComment.author.username=req.user.username;
                newComment.author.id = req.user._id;
                //save comment
                newComment.save();
                //save campground
                campground.comments.push(newComment);
                campground.save();
                req.flash("info","Added comment.");
                res.redirect("/campgrounds/"+campground._id);
            }
         });
      }
   });
});

// EDIT
router.get("/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
    Comment.findById(req.params.comment_id,function(err,foundComment){
       if(err){
           res.redirect("back");
       } else {
           res.render("comments/edit", {campground_id:req.params.id, comment:foundComment});
       }
    });
});

// UPDATE
router.put("/:comment_id",middleware.checkCommentOwnership,function(req,res){
    var comment = req.body.comment;
    if(comment.text.length<1){
      return(req.flash("error","Comment cannot be empty."),res.redirect("back"));
    }
    Comment.findByIdAndUpdate(req.params.comment_id,comment,function(err,updatedComment){
        if(err){
            res.redirect("back");
        }else{
            req.flash("info","Comment edited.");
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

// DESTROY
router.delete("/:comment_id",middleware.checkCommentOwnership,function(req,res){
   Comment.findByIdAndRemove(req.params.comment_id,function(err){
       if(err){
           res.redirect("back");
       }else{
           req.flash("info","Comment deleted.");
           res.redirect("/campgrounds/"+req.params.id);
       }
   });
});




module.exports = router;