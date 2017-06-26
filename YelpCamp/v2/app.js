var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose");

//connect mongoose to db
mongoose.connect("mongodb://localhost/yelp_camp");
// verify connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("mongoose connected to db");
});

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name:String,
    image:String,
    description: String
});

var Campground = mongoose.model("Campground",campgroundSchema);

//APP SETTINGS
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


//add two campgounds ONLY FOR FIRST RUN
// Campground.create(
//     {
//         name:"Granite Hill",
//         image:"https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg",
//         description:"This is a huge granite hill. No bathrooms, no water. Just granite."
//     },
//     function(err, campground){
//         if(err){
//             console.log(err);
//         }else{
//             console.log(campground);
//         }
//     }
//     );
// Campground.create(
//     {
//         name:"Death Valley",
//         image:"https://img.hipcamp.com/image/upload/c_limit,f_auto,h_1200,q_60,w_1920/v1440478008/campground-photos/csnhvxn0qcki2id5vxnc.jpg",
//         description:"Over 99% of visitors have died here during their visit."
//     },
//     function(err, campground){
//         if(err){
//             console.log(err);
//         }else{
//             console.log(campground);
//         }
//     }
//     );


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
    Campground.findById(req.params.id, function(err, foundCampground){
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

