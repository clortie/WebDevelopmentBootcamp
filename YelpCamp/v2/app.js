var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose");

//connect mongoose to db
mongoose.connect("mongodb://localhost/yelp_camp");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("mongoose connected to db");
});

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name:String,
    image:String
});

var Campground = mongoose.model("Campground",campgroundSchema);

//APP SETTINGS
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


// //add two campgounds ONLY FOR FIRST RUN
// Campground.create(
//     {
//         name:"Granite Hill",
//         image:"https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"
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
//         image:"https://img.hipcamp.com/image/upload/c_limit,f_auto,h_1200,q_60,w_1920/v1440478008/campground-photos/csnhvxn0qcki2id5vxnc.jpg"
//     },
//     function(err, campground){
//         if(err){
//             console.log(err);
//         }else{
//             console.log(campground);
//         }
//     }
//     );

// var campgrounds = [{name: "Salmon Creek", image: "https://img.hipcamp.com/image/upload/c_limit,f_auto,h_1200,q_60,w_1920/v1440478008/campground-photos/csnhvxn0qcki2id5vxnc.jpg"},
//         {name: "Death Valley", image: "https://img.hipcamp.com/image/upload/c_limit,f_auto,h_1200,q_60,w_1920/v1440478008/campground-photos/csnhvxn0qcki2id5vxnc.jpg"},
//         {name: "Lover's Cliff", image: "https://img.hipcamp.com/image/upload/c_limit,f_auto,h_1200,q_60,w_1920/v1440478008/campground-photos/csnhvxn0qcki2id5vxnc.jpg"}
//     ];
    


app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    // res.render("campgrounds", {campgrounds:campgrounds});
    //get all campground from db then render
    Campground.find({},function(err, campgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds", {campgrounds:campgrounds})
        }
    })
});

app.post("/campgrounds",function(req, res){
   // get data from form and add to campgrounds array
   var name = req.body.name;
   var image = req.body.image;
   //create new campground and save to db
   Campground.create({name:name, image:image},function(err,campground){
       if(err){
           console.log(err);
       }else{
           res.redirect("campgrounds");
       }
   });
});

app.get("/campgrounds/new", function(req, res){
    res.render("new");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server has started");
});