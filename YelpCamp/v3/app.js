var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    Campground    = require("./models/campground"),
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
            res.render("index", {campgrounds:campgrounds})
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
    res.render("new");
});

// SHOW -- shows more info about one template 
app.get("/campgrounds/:id", function(req, res){
    //find the campground with provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err){
           console.log(err);
       } else{
           //render show template with that campground
           res.render("show", {campground:foundCampground});
       }
    });
});


// start server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server has started");
});

