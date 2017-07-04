var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    Campground    = require("./models/campground"),
    Comment       = require("./models/comment"),
    seedDB        = require("./seeds");

seedDB();
//connect mongoose to db
mongoose.connect("mongodb://localhost/yelp_camp");
// verify connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("mongoose connected to db");
});

//APP SETTINGS
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));

//ROUTES

app.get("/", function(req, res){
    res.render("landing");
});

// INDEX -- show all campgrounds
app.get("/campgrounds", function(req, res){
    // res.render("campgrounds", {campgrounds:campgrounds});
    //get all campground from db then render
    Campground.find({},function(err, campgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index", {campgrounds:campgrounds})
        }
    })
});

// CREATE -- add new campground to DB
app.post("/campgrounds",function(req, res){
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
app.get("/campgrounds/new", function(req, res){
    res.render("campgrounds/new");
});

// SHOW -- shows more info about one template 
app.get("/campgrounds/:id", function(req, res){
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


// COMMENTS ROUTES

//NEW -- form to create comment
app.get("/campgrounds/:id/comments/new",function(req,res){
    Campground.findById(req.params.id,function(err, campground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new",{campground:campground});
        }
    });
});

//CREATE
app.post("/campgrounds/:id/comments",function(req, res){
   //look up campground using id
   Campground.findById(req.params.id,function(err,campground){
      if(err){
          console.log(err);
          res.redirect("/campgrounds");
      } else{
         Comment.create(req.body.comment,function(err,comment){
            if(err){
                console.log(err);
            } else{
                campground.comments.push(comment);
                campground.save();
                res.redirect("/campgrounds/"+campground._id);
            }
         });
      }
   });
});


// start server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server has started");
});

